import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCosmetic } from '../context/cosmeticlab';
import type { RegisteredUser } from './logincosmeticlab';
import { USERS_STORAGE_KEY } from './logincosmeticlab';

const emptyForm = {
  firstName: '',
  lastName: '',
  documentType: 'Cedula de ciudadania',
  documentNumber: '',
  birthDate: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  password: '',
  confirmPassword: '',
  terms: false,
};

type RegistrationForm = typeof emptyForm;

const getStoredUsers = (): RegisteredUser[] => {
  try {
    return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]') as RegisteredUser[];
  } catch {
    return [];
  }
};

const RegistroCosmeticLab = () => {
  const { language } = useCosmetic();
  const navigate = useNavigate();
  const english = language === 'en';
  const [form, setForm] = useState<RegistrationForm>(emptyForm);
  const [users, setUsers] = useState<RegisteredUser[]>(getStoredUsers);
  const [error, setError] = useState('');

  const updateField = (field: keyof RegistrationForm, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitRegistration = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentUsers = getStoredUsers();
    if (currentUsers.some((user) => user.email.toLowerCase() === form.email.toLowerCase())) {
      setError(english ? 'This email is already registered.' : 'Este correo ya esta registrado.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError(english ? 'Passwords do not match.' : 'Las contrasenas no coinciden.');
      return;
    }
    if (!form.terms) {
      setError(english ? 'Accept the data policy and terms to continue.' : 'Acepta la politica de datos y los terminos para continuar.');
      return;
    }

    const newUser: RegisteredUser = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      firstName: form.firstName,
      lastName: form.lastName,
      documentType: form.documentType,
      documentNumber: form.documentNumber,
      birthDate: form.birthDate,
      email: form.email,
      phone: form.phone,
      country: form.country,
      city: form.city,
      password: form.password,
    };
    const updatedUsers = [...currentUsers, newUser];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    navigate('/login', { state: { email: newUser.email, name: newUser.firstName } });
  };

  const removeUser = (id: string) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  return (
    <main className="registration-page">
      <section className="registration-card">
        <div className="registration-heading">
          <span className="section-kicker">CosmeticLAB community</span>
          <h1>{english ? 'Create your account' : 'Crea tu cuenta'}</h1>
          <p>{english ? 'Join a more intentional beauty ritual.' : 'Unete a un ritual de belleza mas consciente.'}</p>
          <Link to="/login" className="back-login">{english ? 'Already have an account? Sign in' : 'Ya tienes una cuenta? Inicia sesion'}</Link>
        </div>

        <form className="registration-form" onSubmit={submitRegistration}>
          <fieldset>
            <legend>01. {english ? 'Personal information' : 'Datos personales'}</legend>
            <div className="form-grid two-columns">
              <label>{english ? 'First name' : 'Nombre'}<input value={form.firstName} onChange={(event) => updateField('firstName', event.target.value)} required /></label>
              <label>{english ? 'Last name' : 'Apellido'}<input value={form.lastName} onChange={(event) => updateField('lastName', event.target.value)} required /></label>
              <label>{english ? 'Document type' : 'Tipo de documento'}<select value={form.documentType} onChange={(event) => updateField('documentType', event.target.value)}><option>Cedula de ciudadania</option><option>Pasaporte</option><option>Cedula de extranjeria</option></select></label>
              <label>{english ? 'Document number' : 'Numero de documento'}<input value={form.documentNumber} onChange={(event) => updateField('documentNumber', event.target.value)} required /></label>
              <label>{english ? 'Date of birth' : 'Fecha de nacimiento'}<input type="date" value={form.birthDate} onChange={(event) => updateField('birthDate', event.target.value)} required /></label>
            </div>
          </fieldset>

          <fieldset>
            <legend>02. {english ? 'Contact details' : 'Datos de contacto'}</legend>
            <div className="form-grid two-columns">
              <label>{english ? 'Email address' : 'Correo electronico'}<input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} required /></label>
              <label>{english ? 'Phone number' : 'Numero de telefono'}<input type="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} required /></label>
              <label>{english ? 'Password' : 'Contrasena'}<input type="password" value={form.password} onChange={(event) => updateField('password', event.target.value)} minLength={6} required /></label>
              <label>{english ? 'Confirm password' : 'Confirmar contrasena'}<input type="password" value={form.confirmPassword} onChange={(event) => updateField('confirmPassword', event.target.value)} minLength={6} required /></label>
            </div>
          </fieldset>

          <fieldset>
            <legend>03. {english ? 'Address' : 'Domicilio'}</legend>
            <div className="form-grid two-columns">
              <label>{english ? 'Country of residence' : 'Pais de domicilio'}<input value={form.country} onChange={(event) => updateField('country', event.target.value)} required /></label>
              <label>{english ? 'City of residence' : 'Ciudad de domicilio'}<input value={form.city} onChange={(event) => updateField('city', event.target.value)} required /></label>
            </div>
          </fieldset>

          <label className="terms-check"><input type="checkbox" checked={form.terms} onChange={(event) => updateField('terms', event.target.checked)} required /> <span>{english ? <>I accept the <a href="#politica">data treatment policy</a> and terms of service.</> : <>Acepto la <a href="#politica">politica de tratamiento de datos</a> y terminos de servicio.</>}</span></label>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn-submit">{english ? 'Submit form' : 'Enviar formulario'}</button>
        </form>

        <section className="stored-users" aria-live="polite">
          <div><span className="section-kicker">LocalStorage</span><h2>{english ? 'Saved registrations' : 'Registros guardados'}</h2></div>
          {users.length === 0 ? <p>{english ? 'No registrations yet.' : 'Aun no hay registros.'}</p> : users.map((user) => <div className="stored-user" key={user.id}><div><strong>{user.firstName} {user.lastName}</strong><span>{user.email} · {user.documentNumber}</span></div><button type="button" onClick={() => removeUser(user.id)}>{english ? 'Delete' : 'Eliminar'}</button></div>)}
        </section>
      </section>
    </main>
  );
};

export default RegistroCosmeticLab;
