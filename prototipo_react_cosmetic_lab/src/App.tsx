import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CosmeticProvider, useCosmetic } from './context/cosmeticlab';
import HomeCosmeticLab from './componentes/homecosmeticlab';
import ProductosCosmeticLab from './componentes/productoscosmeticlab';
import LoginCosmeticLab from './componentes/logincosmeticlab';
import RegistroCosmeticLab from './componentes/registrocosmeticlab';
import './App.css';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    window.history.scrollRestoration = 'manual';

    if (hash) {
      requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }));
      return;
    }

    window.scrollTo(0, 0);
    requestAnimationFrame(() => window.scrollTo(0, 0));
  }, [pathname, hash]);

  return null;
};

const NavBar = () => {
  const { cart, language, toggleLanguage } = useCosmetic();
  const [cartOpen, setCartOpen] = useState(false);
  const total = cart.reduce((sum, product) => sum + product.price, 0);
  const copy = language === 'es'
    ? { home: 'Inicio', products: 'Productos', about: 'Nosotros', contact: 'Contacto', register: 'Registrarse', empty: 'Tu carrito esta vacio', total: 'Total', checkout: 'Finalizar compra', bag: 'Tu bolsa de belleza' }
    : { home: 'Home', products: 'Products', about: 'About us', contact: 'Contact', register: 'Sign up', empty: 'Your cart is empty', total: 'Total', checkout: 'Checkout', bag: 'Your beauty bag' };
  
  return (
    <>
      <nav className="navbar">
      <div className="logo">
        <span className="drop-icon">✦</span> <strong>CosmeticLAB</strong>
      </div>
      <div className="nav-links">
        <Link to="/">{copy.home}</Link>
        <Link to="/productos">{copy.products}</Link>
        <a href="/#nosotros">{copy.about}</a>
        <a href="/#contacto">{copy.contact}</a>
      </div>
      <div className="nav-actions">
        <button className="lang" onClick={toggleLanguage} aria-label="Cambiar idioma">◎ {language.toUpperCase()}</button>
        <button className="cart-icon" onClick={() => setCartOpen(true)} aria-label="Abrir carrito"><span className="cart-symbol" aria-hidden="true">💄</span>{cart.length > 0 && <span className="cart-count">{cart.length}</span>}</button>
        <Link to="/login" className="btn-admin">{language === 'es' ? 'Iniciar sesion' : 'Log in'}</Link>
      </div>
      </nav>
      {cartOpen && <CartDrawer copy={copy} total={total} onClose={() => setCartOpen(false)} />}
    </>
  );
};

const CartDrawer = ({ copy, total, onClose }: { copy: Record<string, string>; total: number; onClose: () => void }) => {
  const { cart, removeFromCart, clearCart } = useCosmetic();
  return (
    <div className="cart-backdrop" onClick={onClose}>
      <aside className="cart-drawer" onClick={(event) => event.stopPropagation()}>
        <div className="cart-heading"><div><span className="eyebrow">CosmeticLAB</span><h2>{copy.bag}</h2></div><button className="close-button" onClick={onClose}>×</button></div>
        {cart.length === 0 ? <p className="empty-cart">{copy.empty}</p> : <>
          <div className="cart-items">{cart.map((product, index) => <div className="cart-item" key={`${product.id}-${index}`}><img src={product.image} alt={product.name} /><div><strong>{product.name}</strong><span>${product.price.toFixed(2)}</span></div><button onClick={() => removeFromCart(product.id)} aria-label="Eliminar producto">×</button></div>)}</div>
          <div className="cart-total"><span>{copy.total}</span><strong>${total.toFixed(2)}</strong></div>
          <button className="btn-primary checkout-button" onClick={clearCart}>{copy.checkout}</button>
        </>}
      </aside>
    </div>
  );
};

function App() {
  return (
    <CosmeticProvider>
      <Router>
        <ScrollToTop />
        <div className="app-container">
          <NavBar />
          <Routes>
            <Route path="/" element={<HomeCosmeticLab />} />
            <Route path="/productos" element={<ProductosCosmeticLab />} />
            <Route path="/login" element={<LoginCosmeticLab />} />
            <Route path="/registro" element={<RegistroCosmeticLab />} />
          </Routes>
        </div>
      </Router>
    </CosmeticProvider>
  );
}

export default App;