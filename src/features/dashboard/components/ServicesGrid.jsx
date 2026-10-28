import { Link } from 'react-router-dom';
import './ServicesGrid.css';

const ServicesGrid = () => {
  const services = [
    {
      title: 'PCR Felino',
      description: 'Detección temprana de VIF, ViLeF y hemoparásitos con alta sensibilidad para gatos.',
      icon: '🐱',
      to: '/veterinarios'
    },
    {
      title: 'PCR Canino',
      description: 'Paneles diagnósticos completos para enfermedades infecciosas y hemotrópicos en perros.',
      icon: '🐶',
      to: '/veterinarios'
    },
    {
      title: 'Test de Disbiosis',
      description: 'Análisis del microbioma intestinal para detectar desequilibrios antes de que haya síntomas.',
      icon: '🔬',
      to: '/disbiosis'
    }
  ];

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        <div className="services-header">
          <h2 className="gradient-text">Nuestros Servicios</h2>
          <p>Tecnología de última generación para resultados precisos</p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card glass-panel" key={index}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link to={service.to} className="service-link">Leer más &rarr;</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
