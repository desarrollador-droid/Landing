import { Link } from 'react-router-dom';
import BrandLogo from '../../../shared/components/BrandLogo.jsx';

const InfoPage = ({
  eyebrow,
  title,
  description,
  points,
  primaryLabel,
  primaryTo,
  secondaryLabel,
  secondaryTo,
}) => {
  return (
    <section className="info-page">
      <div className="info-page__intro panel">
        <BrandLogo className="info-page__brand" compact />
        <p className="section-eyebrow">{eyebrow}</p>
        <h1 className="info-page__title">{title}</h1>
        <p className="info-page__description">{description}</p>
        <ul className="info-page__points">
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <div className="page-actions">
          <Link to={primaryTo} className="btn-primary-large">
            {primaryLabel}
          </Link>
          <Link to={secondaryTo} className="btn-secondary-large glass-panel">
            {secondaryLabel}
          </Link>
        </div>
      </div>

      <aside className="info-page__visual panel">
        <div className="info-page__visual-card">
          <img
            src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/laboratorio-de-biologia-molecular.png"
            alt="On Site Diagnostic"
            className="info-page__visual-image"
          />
        </div>
        <p className="info-page__note">Branding local cargado desde public/assets.</p>
      </aside>
    </section>
  );
};

export default InfoPage;