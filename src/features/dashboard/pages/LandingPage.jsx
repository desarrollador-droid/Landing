import HeroSection from '../components/HeroSection.jsx';
import ServicesGrid from '../components/ServicesGrid.jsx';

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <section className="landing-callout">
        <div className="landing-callout__panel panel">
          <p className="section-eyebrow">SPA nativa</p>
          <h2 className="section-title">Todo el recorrido vive dentro de React, sin dependencias web externas.</h2>
          <p className="section-copy">
            La identidad visual sigue siendo la misma, pero ahora el sitio navega como una aplicación local,
            con componentes reales y assets servidos desde el proyecto.
          </p>
        </div>
      </section>
      <ServicesGrid />
    </>
  );
};

export default LandingPage;