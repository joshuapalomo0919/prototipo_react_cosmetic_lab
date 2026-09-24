import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCosmetic } from '../context/cosmeticlab';

export interface RegisteredUser {
  id: string;
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  birthDate: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  password: string;
}

export const USERS_STORAGE_KEY = 'cosmeticlab_users';

const LoginCosmeticLab = () => {
  const { language } = useCosmetic();
  const location = useLocation();
  const registeredData = location.state as { email?: string; name?: string } | null;
  const [email, setEmail] = useState(registeredData?.email || '');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(registeredData?.name ? `Registro exitoso para ${registeredData.name}.` : '');
  const [error, setError] = useState('');
  const english = language === 'en';
  const submitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const users: RegisteredUser[] = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const user = users.find((item) => item.email === email && item.password === password);
    if (!user) {
      setError(english ? 'Email or password not found.' : 'Correo o contrasena incorrectos.');
      setMessage('');
      return;
    }
    setError('');
    setMessage(english ? `Successful login. Welcome, ${user.firstName}.` : `Inicio de sesion exitoso. Bienvenido, ${user.firstName}.`);
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <span className="section-kicker">CosmeticLAB community</span>
        <h2>{english ? 'Welcome back' : 'Bienvenido de nuevo'}</h2>
        <p className="subtitle">{english ? 'Sign in to continue your beauty ritual.' : 'Inicia sesion para continuar tu ritual de belleza.'}</p>
        
        <form className="login-form" onSubmit={submitLogin}>
          <div className="form-group">
            <label>{english ? 'Email address' : 'Correo electronico'}</label>
            <div className="input-wrapper">
              <span className="input-icon">✉️</span>
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="tu@correo.com" required />
            </div>
          </div>
          
          <div className="form-group">
            <div className="label-row">
              <label>{english ? 'Password' : 'Contrasena'}</label>
              <span className="link-recuperar">{english ? 'Private & secure' : 'Privado y seguro'}</span>
            </div>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="********" required />
            </div>
          </div>
          
          <button type="submit" className="btn-submit">{english ? 'Sign in' : 'Iniciar sesion'}</button>
          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}
        </form>
        <p className="register-prompt">{english ? 'No account yet?' : 'Aun no tienes una cuenta?'} <Link to="/registro">{english ? 'Create one' : 'Registrate'}</Link></p>
      </div>
    </div>
  );
};

export default LoginCosmeticLab;