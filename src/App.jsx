import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './LandingPage';
import SEOManager from './components/SEOManager';
import './index.css';

// Lazy-loaded route views for optimal bundle splitting and First Contentful Paint
const Clinica = lazy(() => import('./components/Clinica'));
const BiologiaMolecular = lazy(() => import('./components/BiologiaMolecular'));
const Veterinarios = lazy(() => import('./components/Veterinarios'));
const Contacto = lazy(() => import('./components/Contacto'));
const Disbiosis = lazy(() => import('./components/Disbiosis'));
const PruebaFecal = lazy(() => import('./components/PruebaFecal'));
const Conocenos = lazy(() => import('./components/Conocenos'));
const Aprende = lazy(() => import('./components/Aprende'));
const AprendeDetalle = lazy(() => import('./components/AprendeDetalle'));
const Investigacion = lazy(() => import('./components/Investigacion'));
const Noticias = lazy(() => import('./components/Noticias'));
const ProteccionDatos = lazy(() => import('./components/ProteccionDatos'));
const PoliticaPrivacidad = lazy(() => import('./components/PoliticaPrivacidad'));
const Pqrs = lazy(() => import('./components/Pqrs'));
const NoticiaDetalle = lazy(() => import('./components/NoticiaDetalle'));
const TestDisbiosisMascotas = lazy(() => import('./components/TestDisbiosisMascotas'));
const PruebaMicrobiotaMascotas = lazy(() => import('./components/PruebaMicrobiotaMascotas'));
const PreguntasFrecuentes = lazy(() => import('./components/PreguntasFrecuentes'));

// ScrollToTop handler component to reset scroll window offset on route shifts
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <div className="w-10 h-10 border-4 border-[#2B017C]/20 border-t-[#2B017C] rounded-full animate-spin" />
    </div>
  );
}

function PageWrapper({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          {children}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <SEOManager />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* 1. INICIO / HOME */}
          <Route path="/" element={<LandingPage />} />

        {/* 2. SERVICIOS / BIOLOGÍA MOLECULAR / qPCR (Rutas actuales e históricas de Google) */}
        <Route path="/biologia-molecular" element={<PageWrapper><BiologiaMolecular /></PageWrapper>} />
        <Route path="/biologia-molecular/" element={<PageWrapper><BiologiaMolecular /></PageWrapper>} />
        <Route path="/clinica" element={<PageWrapper><Clinica /></PageWrapper>} />
        <Route path="/clinica/" element={<PageWrapper><Clinica /></PageWrapper>} />
        <Route path="/servicios" element={<PageWrapper><BiologiaMolecular /></PageWrapper>} />
        <Route path="/servicios/" element={<PageWrapper><BiologiaMolecular /></PageWrapper>} />
        <Route path="/servicios-de-qpcr-pcr" element={<PageWrapper><BiologiaMolecular /></PageWrapper>} />
        <Route path="/servicios-de-qpcr-pcr/" element={<PageWrapper><BiologiaMolecular /></PageWrapper>} />
        <Route path="/pcr-veterinaria-una-tecnica-para-diagnosticos-precisos-en-animales" element={<PageWrapper><BiologiaMolecular /></PageWrapper>} />
        <Route path="/pcr-veterinaria-una-tecnica-para-diagnosticos-precisos-en-animales/" element={<PageWrapper><BiologiaMolecular /></PageWrapper>} />
        <Route path="/espectro-de-agentes" element={<PageWrapper><BiologiaMolecular /></PageWrapper>} />
        <Route path="/espectro-de-agentes/" element={<PageWrapper><BiologiaMolecular /></PageWrapper>} />
        <Route path="/deteccion-molecular-de-hemoparasitos-en-perros-y-gatos-con-qpcr" element={<PageWrapper><AprendeDetalle profileOverride="perfil-joe" /></PageWrapper>} />
        <Route path="/deteccion-molecular-de-hemoparasitos-en-perros-y-gatos-con-qpcr/" element={<PageWrapper><AprendeDetalle profileOverride="perfil-joe" /></PageWrapper>} />
        <Route path="/infecciones-persistentes-en-felinos" element={<PageWrapper><AprendeDetalle profileOverride="joe-vif-vilef" /></PageWrapper>} />
        <Route path="/infecciones-persistentes-en-felinos/" element={<PageWrapper><AprendeDetalle profileOverride="joe-vif-vilef" /></PageWrapper>} />
        <Route path="/pcr-para-detectar-infecciones-en-felinos" element={<PageWrapper><AprendeDetalle profileOverride="rutina-felino" /></PageWrapper>} />
        <Route path="/pcr-para-detectar-infecciones-en-felinos/" element={<PageWrapper><AprendeDetalle profileOverride="rutina-felino" /></PageWrapper>} />

        {/* 3. VETERINARIOS */}
        <Route path="/veterinarios" element={<PageWrapper><Veterinarios /></PageWrapper>} />
        <Route path="/veterinarios/" element={<PageWrapper><Veterinarios /></PageWrapper>} />

        {/* 4. CONTACTO Y SEDES */}
        <Route path="/contacto" element={<PageWrapper><Contacto /></PageWrapper>} />
        <Route path="/contacto/" element={<PageWrapper><Contacto /></PageWrapper>} />
        <Route path="/laboratorio-molecular-medios-de-contacto" element={<PageWrapper><Contacto /></PageWrapper>} />
        <Route path="/laboratorio-molecular-medios-de-contacto/" element={<PageWrapper><Contacto /></PageWrapper>} />
        <Route path="/bogota" element={<PageWrapper><Contacto /></PageWrapper>} />
        <Route path="/bogota/" element={<PageWrapper><Contacto /></PageWrapper>} />

        {/* 5. DISBIOSIS Y TEST DE MICROBIOTA */}
        <Route path="/disbiosis" element={<PageWrapper><Disbiosis /></PageWrapper>} />
        <Route path="/disbiosis/" element={<PageWrapper><Disbiosis /></PageWrapper>} />
        <Route path="/veterinarios-test-indice-de-disbiosis" element={<PageWrapper><Disbiosis /></PageWrapper>} />
        <Route path="/veterinarios-test-indice-de-disbiosis/" element={<PageWrapper><Disbiosis /></PageWrapper>} />
        <Route path="/microbiota-perros-gatos-salud-digestiva" element={<PageWrapper><Disbiosis /></PageWrapper>} />
        <Route path="/microbiota-perros-gatos-salud-digestiva/" element={<PageWrapper><Disbiosis /></PageWrapper>} />
        <Route path="/prueba-fecal-para-mascotas" element={<PageWrapper><PruebaFecal /></PageWrapper>} />
        <Route path="/prueba-fecal-para-mascotas/" element={<PageWrapper><PruebaFecal /></PageWrapper>} />
        <Route path="/test-indice-de-disbiosis" element={<PageWrapper><PruebaFecal /></PageWrapper>} />
        <Route path="/test-indice-de-disbiosis/" element={<PageWrapper><PruebaFecal /></PageWrapper>} />
        <Route path="/test-disbiosis-mascotas" element={<PageWrapper><TestDisbiosisMascotas /></PageWrapper>} />
        <Route path="/test-disbiosis-mascotas/" element={<PageWrapper><TestDisbiosisMascotas /></PageWrapper>} />
        <Route path="/prueba-microbiota-una-solucion-en-la-salud-animal" element={<PageWrapper><PruebaMicrobiotaMascotas /></PageWrapper>} />
        <Route path="/prueba-microbiota-una-solucion-en-la-salud-animal/" element={<PageWrapper><PruebaMicrobiotaMascotas /></PageWrapper>} />
        <Route path="/duplicado-aprende-con-osd-2" element={<PageWrapper><PruebaMicrobiotaMascotas /></PageWrapper>} />
        <Route path="/duplicado-aprende-con-osd-2/" element={<PageWrapper><PruebaMicrobiotaMascotas /></PageWrapper>} />

        {/* 6. CONÓCENOS */}
        <Route path="/conocenos" element={<PageWrapper><Conocenos /></PageWrapper>} />
        <Route path="/conocenos/" element={<PageWrapper><Conocenos /></PageWrapper>} />
        <Route path="/conocenos-propietarios" element={<PageWrapper><Conocenos /></PageWrapper>} />
        <Route path="/conocenos-propietarios/" element={<PageWrapper><Conocenos /></PageWrapper>} />

        {/* 7. APRENDE Y PANELES qPCR */}
        <Route path="/aprende" element={<PageWrapper><Aprende /></PageWrapper>} />
        <Route path="/aprende/" element={<PageWrapper><Aprende /></PageWrapper>} />
        <Route path="/perfiles-moleculares-por-qpcr-guia-y-analisis-tecnico" element={<PageWrapper><Aprende /></PageWrapper>} />
        <Route path="/perfiles-moleculares-por-qpcr-guia-y-analisis-tecnico/" element={<PageWrapper><Aprende /></PageWrapper>} />
        <Route path="/aprende/:profileId" element={<PageWrapper><AprendeDetalle /></PageWrapper>} />
        <Route path="/aprende/:profileId/" element={<PageWrapper><AprendeDetalle /></PageWrapper>} />

        {/* 8. INVESTIGACIÓN */}
        <Route path="/investigacion" element={<PageWrapper><Investigacion /></PageWrapper>} />
        <Route path="/investigacion/" element={<PageWrapper><Investigacion /></PageWrapper>} />
        <Route path="/proyectos-investigacion-laboratorio-biologia-molecular" element={<PageWrapper><Investigacion /></PageWrapper>} />
        <Route path="/proyectos-investigacion-laboratorio-biologia-molecular/" element={<PageWrapper><Investigacion /></PageWrapper>} />
        <Route path="/posters-de-investigacion-medicina-veterinaria" element={<PageWrapper><Investigacion /></PageWrapper>} />
        <Route path="/posters-de-investigacion-medicina-veterinaria/" element={<PageWrapper><Investigacion /></PageWrapper>} />
        <Route path="/investigacion-indice-de-disbiosis" element={<PageWrapper><Investigacion /></PageWrapper>} />
        <Route path="/investigacion-indice-de-disbiosis/" element={<PageWrapper><Investigacion /></PageWrapper>} />

        {/* 9. NOTICIAS Y BLOG */}
        <Route path="/noticias-veterinarias" element={<PageWrapper><Noticias /></PageWrapper>} />
        <Route path="/noticias-veterinarias/" element={<PageWrapper><Noticias /></PageWrapper>} />
        <Route path="/category/noticias-veterinarias" element={<PageWrapper><Noticias /></PageWrapper>} />
        <Route path="/category/noticias-veterinarias/" element={<PageWrapper><Noticias /></PageWrapper>} />
        <Route path="/noticias-veterinarias/:articleSlug" element={<PageWrapper><NoticiaDetalle /></PageWrapper>} />
        <Route path="/noticias-veterinarias/:articleSlug/" element={<PageWrapper><NoticiaDetalle /></PageWrapper>} />

        {/* 10. PREGUNTAS FRECUENTES */}
        <Route path="/preguntas-frecuentes" element={<PageWrapper><PreguntasFrecuentes /></PageWrapper>} />
        <Route path="/preguntas-frecuentes/" element={<PageWrapper><PreguntasFrecuentes /></PageWrapper>} />
        <Route path="/laboratorio-de-biologia-molecular-preguntas-frecuntes" element={<PageWrapper><PreguntasFrecuentes /></PageWrapper>} />
        <Route path="/laboratorio-de-biologia-molecular-preguntas-frecuntes/" element={<PageWrapper><PreguntasFrecuentes /></PageWrapper>} />
        <Route path="/laboratorio-de-biologia-molecular-preguntas-frecuentes" element={<PageWrapper><PreguntasFrecuentes /></PageWrapper>} />
        <Route path="/laboratorio-de-biologia-molecular-preguntas-frecuentes/" element={<PageWrapper><PreguntasFrecuentes /></PageWrapper>} />

        {/* 11. LEGAL Y PQRS */}
        <Route path="/proteccion-de-datos" element={<PageWrapper><ProteccionDatos /></PageWrapper>} />
        <Route path="/proteccion-de-datos/" element={<PageWrapper><ProteccionDatos /></PageWrapper>} />
        <Route path="/politica-de-privacidad" element={<PageWrapper><PoliticaPrivacidad /></PageWrapper>} />
        <Route path="/politica-de-privacidad/" element={<PageWrapper><PoliticaPrivacidad /></PageWrapper>} />
        <Route path="/terms" element={<PageWrapper><PoliticaPrivacidad /></PageWrapper>} />
        <Route path="/terms/" element={<PageWrapper><PoliticaPrivacidad /></PageWrapper>} />
        <Route path="/privacy" element={<PageWrapper><PoliticaPrivacidad /></PageWrapper>} />
        <Route path="/privacy/" element={<PageWrapper><PoliticaPrivacidad /></PageWrapper>} />
        <Route path="/pqr-s" element={<PageWrapper><Pqrs /></PageWrapper>} />
        <Route path="/pqr-s/" element={<PageWrapper><Pqrs /></PageWrapper>} />
        <Route path="/osd-reclamos-quejas" element={<PageWrapper><Pqrs /></PageWrapper>} />
        <Route path="/osd-reclamos-quejas/" element={<PageWrapper><Pqrs /></PageWrapper>} />

        {/* 12. REDIRECCIONES CANÓNICAS HISTÓRICAS DE WORDPRESS */}
        <Route path="/shop" element={<Navigate to="/servicios" replace />} />
        <Route path="/shop/" element={<Navigate to="/servicios" replace />} />
        <Route path="/elementor-6116" element={<Navigate to="/proyectos-investigacion-laboratorio-biologia-molecular" replace />} />
        <Route path="/elementor-6116/" element={<Navigate to="/proyectos-investigacion-laboratorio-biologia-molecular" replace />} />
        <Route path="/clase-hemoleucograma-y-hemotropicos-en-medellin" element={<Navigate to="/noticias-veterinarias/clase-hemoleucograma-y-hemotropicos-en-medellin" replace />} />
        <Route path="/clase-hemoleucograma-y-hemotropicos-en-medellin/" element={<Navigate to="/noticias-veterinarias/clase-hemoleucograma-y-hemotropicos-en-medellin" replace />} />
        <Route path="/medicina-veterinaria-biorreguladora" element={<Navigate to="/noticias-veterinarias/osd-llevo-el-conocimiento-veterinario-colombiano-a-un-escenario-internacional" replace />} />
        <Route path="/medicina-veterinaria-biorreguladora/" element={<Navigate to="/noticias-veterinarias/osd-llevo-el-conocimiento-veterinario-colombiano-a-un-escenario-internacional" replace />} />

        {/* 13. WILDCARD FALLBACK */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
