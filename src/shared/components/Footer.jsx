import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo.jsx';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <BrandLogo className="footer-brand-logo" compact />
            <p>Laboratorio de biología molecular veterinaria en Colombia.</p>
            <p>Precisión, confianza y calidad.</p>
          </div>
          
          <div className="footer-links">
            <h4>Enlaces Rápidos</h4>
            <ul>
              <li><Link to="/veterinarios">Servicios de qPCR</Link></li>
              <li><Link to="/disbiosis">Test de Disbiosis</Link></li>
              <li><Link to="/aprende">Aprende con OSD</Link></li>
              <li><Link to="/conocenos">Contáctanos</Link></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h4>Contacto</h4>
            <p>Medellín y Bogotá</p>
            <p>Servicio a nivel nacional</p>
            <a href="mailto:info@osdiagnostic.com" className="contact-link">info@osdiagnostic.com</a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} On Site Diagnostic SAS. Todos los derechos reservados.</p>
          <div className="legal-links">
            <Link to="/conocenos">Política de Privacidad</Link>
            <Link to="/aprende">Términos y Condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
