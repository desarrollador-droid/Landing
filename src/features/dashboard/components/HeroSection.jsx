import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section" id="home">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-text-container">
          <h2 className="hero-subtitle">Especialistas en biología molecular</h2>
          <h1 className="hero-title">Diagnósticos Precisos Sin Falsos Negativos</h1>
          <p className="hero-description">
            Tecnología de sondas de hidrólisis para veterinarias en toda Colombia. 
            Resultados confiables que salvan vidas.
          </p>
          <div className="hero-buttons">
            <Link to="/veterinarios" className="btn-primary-large">Conoce nuestros servicios</Link>
            <Link to="/conocenos" className="btn-secondary-large glass-panel">Hablar con un experto</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-brand-card glass-panel">
            <img
              src="https://res.cloudinary.com/oiaig120/image/upload/osdiagnostic/laboratorio-para-veterinarias.svg"
              alt="On Site Diagnostic"
              className="hero-brand-image"
            />
          </div>
          <div className="dna-animation-placeholder">
            <div className="floating-element el-1"></div>
            <div className="floating-element el-2"></div>
            <div className="floating-element el-3"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
