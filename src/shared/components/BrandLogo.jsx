import { Link } from 'react-router-dom';

const BrandLogo = ({ className = '', compact = false, showCopy = true }) => {
  const rootClassName = ['brand-logo', compact ? 'brand-logo--compact' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Link to="/" className={rootClassName} aria-label="On Site Diagnostic">
      <img
        src="https://res.cloudinary.com/oiaig120/image/upload/osdiagnostic/laboratorio-para-veterinarias.svg"
        alt="On Site Diagnostic"
        className="brand-logo__image"
      />
      {showCopy ? (
        <span className="brand-logo__copy">
          <span className="brand-logo__name">On Site Diagnostic</span>
          <span className="brand-logo__tagline">Laboratorio de biología molecular veterinaria</span>
        </span>
      ) : null}
    </Link>
  );
};

export default BrandLogo;