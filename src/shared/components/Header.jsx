import { Link, NavLink } from 'react-router-dom';
import BrandLogo from './BrandLogo.jsx';
import './Header.css';

const Header = () => {
  return (
    <header className="header glass-panel">
      <div className="header-container">
        <BrandLogo className="header-brand" />
        <nav className="main-nav">
          <ul>
            <li><NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}>Inicio</NavLink></li>
            <li><NavLink to="/veterinarios" className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}>Servicios</NavLink></li>
            <li><NavLink to="/conocenos" className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}>Nosotros</NavLink></li>
            <li><NavLink to="/aprende" className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}>Contacto</NavLink></li>
          </ul>
        </nav>
        <div className="header-actions">
          <Link to="/disbiosis" className="btn-secondary">Tienda</Link>
          <Link to="/veterinarios" className="btn-primary">Resultados</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
