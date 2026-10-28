import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Clinica() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(96);
  const [isShortViewport, setIsShortViewport] = useState(false);
  const scrollerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const slides = [
    {
      id: 0,
      colorTheme: 'purple',
      overline: 'LABORATORIO CLÍNICO OSD',
      headline: (
        <h1 className="text-[26px] xs:text-[32px] sm:text-4xl md:text-[38px] lg:text-5xl xl:text-6xl font-black font-display text-gray-900 leading-[1.08] tracking-tight uppercase">
          NO SUPONGAS.<br />
          <span className="text-[#2B017C]">DIAGNOSTICA.</span>
        </h1>
      ),
      description:
        'Transformamos el conocimiento científico en el respaldo que necesitas para tomar decisiones clínicas seguras. Resultados precisos, entregados a tiempo, para que conserves la confianza de tus clientes.',
      badge: 'Servicio de recolección de muestras gratuito exclusivo en Bogotá D.C.',
      cta: {
        text: 'AGENDAR RECOLECCIÓN GRATIS',
        link: 'https://docs.google.com/forms/d/1eRtxUD9p_W0UF0gQDPRhkHuuUZqWnMqhqdczEWR6vnQ/edit',
        buttonClass:
          'bg-[#2B017C] hover:bg-[#1E0054] text-white shadow-lg shadow-[#2B017C]/20 hover:shadow-xl hover:shadow-[#2B017C]/30'
      }
    },
    {
      id: 1,
      colorTheme: 'cyan',
      overline: 'LOGÍSTICA INVISIBLE',
      headline: (
        <div className="flex items-baseline space-x-1">
          <span className="text-5xl xs:text-6xl sm:text-7xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-display text-gray-900 tracking-tighter leading-none">
            0
          </span>
          <span className="text-2xl xs:text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-black font-display text-gray-900">
            $
          </span>
        </div>
      ),
      description:
        'La recolección de muestras es 100% gratuita para tu clínica (servicio exclusivo para Bogotá D.C.). Escanea, completa el formulario y nosotros nos encargamos del transporte especializado.',
      badge: 'Servicio de recolección gratuito disponible únicamente en Bogotá D.C.',
      cta: {
        text: 'AGENDAR RECOLECCIÓN GRATIS',
        link: 'https://docs.google.com/forms/d/1eRtxUD9p_W0UF0gQDPRhkHuuUZqWnMqhqdczEWR6vnQ/edit',
        buttonClass:
          'bg-[#01FADA] hover:bg-white text-[#2B017C] font-extrabold border-2 border-[#01FADA] shadow-lg shadow-[#01FADA]/25 hover:shadow-xl hover:shadow-[#01FADA]/35'
      }
    },
    {
      id: 2,
      colorTheme: 'purple',
      overline: 'CADA MINUTO CUENTA',
      headline: (
        <div className="flex items-baseline space-x-2">
          <span className="text-5xl xs:text-6xl sm:text-7xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-display text-gray-900 tracking-tighter leading-none">
            15
          </span>
          <span className="text-xl xs:text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl font-black font-display text-[#2B017C] uppercase tracking-wider">
            MIN
          </span>
        </div>
      ),
      description:
        'En urgencias, cada minuto cuenta. Resultados preliminares en 15 minutos exclusivos para pruebas de Coagulación Específicas (Dímero D, PT, PTT, TT, PRACT)',
      cta: {
        text: 'SOLICITAR ASESORÍA',
        link: 'https://wa.me/573005143727?text=Hola%20OSD,%20deseo%20solicitar%20asesor%C3%ADa%20sobre%20pruebas%20de%20coagulaci%C3%B3n%20en%2015%20minutos',
        buttonClass:
          'bg-[#2B017C] hover:bg-[#1E0054] text-white shadow-lg shadow-[#2B017C]/20 hover:shadow-xl hover:shadow-[#2B017C]/30'
      }
    }
  ];

  // Dynamic header and viewport measurement for sticky positioning
  useEffect(() => {
    const updateDimensions = () => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
      setIsShortViewport(window.innerHeight < 580);
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Sticky Scroll Listener: calculates scroll progress through the scrollytelling container
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollerRef.current || isShortViewport) return;
      const rect = scrollerRef.current.getBoundingClientRect();
      const stickyH = window.innerHeight - headerHeight;
      const totalScrollDist = rect.height - stickyH;
      if (totalScrollDist <= 0) return;

      const scrollInto = headerHeight - rect.top;
      const progress = Math.max(0, Math.min(1, scrollInto / totalScrollDist));

      if (progress < 0.33) {
        setActiveSlide(0);
      } else if (progress < 0.67) {
        setActiveSlide(1);
      } else {
        setActiveSlide(2);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headerHeight, isShortViewport]);

  const goToSlide = (index) => {
    setActiveSlide(index);
    if (!scrollerRef.current || isShortViewport) {
      return;
    }
    const rect = scrollerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const stickyH = window.innerHeight - headerHeight;
    const totalScrollDist = scrollerRef.current.offsetHeight - stickyH;
    if (totalScrollDist <= 0) return;

    const slideProgress = [0.05, 0.48, 0.85];
    const targetScroll = containerTop - headerHeight + (slideProgress[index] * totalScrollDist);
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  const handleNext = () => {
    goToSlide((activeSlide + 1) % slides.length);
  };

  const handlePrev = () => {
    goToSlide((activeSlide - 1 + slides.length) % slides.length);
  };

  // Touch swipe support for mobile and tablet devices
  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || !e.changedTouches || e.changedTouches.length === 0) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Trigger slide change if horizontal swipe is dominant and exceeds 45px
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const categories = [
    {
      titleLine1: 'Hematología y',
      titleLine2: 'Coagulación',
      title: 'Hematología y Coagulación',
      description:
        'Cuadro hemático, recuentos celulares, dímero D y tiempos de coagulación (PT, PTT, TT)'
    },
    {
      titleLine1: 'Química Sanguínea',
      titleLine2: 'y Electrolito',
      title: 'Química Sanguínea y Electrolito',
      description:
        'Paneles desde 2 hasta 10 analitos, perfiles electrolíticos y mediciones específicas como ácido láctico y amonio'
    },
    {
      titleLine1: 'Patología y',
      titleLine2: 'Dermatología',
      title: 'Patología y Dermatología',
      description:
        'Raspados de piel, citologías generales, análisis citoquímicos de líquidos, biopsias y necropsias'
    },
    {
      titleLine1: 'Microbiología y',
      titleLine2: 'Excretas',
      title: 'Microbiología y Excretas',
      description:
        'Coproanálisis (seriado, flotación), uroanálisis completo con UPC, y cultivos para hongos y bacterias con antibiograma'
    },
    {
      titleLine1: 'Hormonas y',
      titleLine2: 'Serología',
      title: 'Hormonas y Serología',
      description:
        'Medición de Cortisol, Tiroxina, Progesterona e inmunocromatografías para enfermedades infecciosas (VIF, VILEF, Parvovirus)'
    },
    {
      titleLine1: 'Perfiles',
      titleLine2: 'Especializados',
      title: 'Perfiles Especializados',
      description:
        'Agrupaciones estratégicas: Prequirúrgicos, Pancreáticos, Cardíacos, Hepáticos, Renales y Tiroideos'
    }
  ];

  const currentTheme = slides[activeSlide].colorTheme;

  return (
    <div className="w-full bg-[#f8fafc] font-sans text-gray-800">
      
      {/* --------------------------------------------------------------------- */}
      {/* 1. HERO SLIDER SECTION (Sticky Scrollytelling - Páginas 1, 2 y 3) */}
      {/* --------------------------------------------------------------------- */}
      <section
        ref={scrollerRef}
        className={`relative w-full ${isShortViewport ? 'h-auto' : 'h-[260vh] md:h-[300vh]'}`}
      >
        <div 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`${
            isShortViewport ? 'relative min-h-[520px]' : 'sticky overflow-hidden'
          } w-full bg-white z-20 flex flex-col md:flex-row border-b border-gray-100`}
          style={
            isShortViewport
              ? undefined
              : {
                  top: `${headerHeight}px`,
                  height: `calc(100dvh - ${headerHeight}px)`
                }
          }
        >
          {/* LADO IZQUIERDO / SUPERIOR: ILUSTRACIÓN DE MICROORGANISMOS (flex-1 en móvil para ocupar todo el espacio sobrante y lucir en proporción 1:1 completa) */}
          <div className="w-full flex-1 min-h-[200px] md:flex-initial md:w-[46%] lg:w-1/2 md:h-full relative overflow-hidden flex items-center justify-center md:justify-start bg-white select-none pointer-events-none">
            {/* Imagen Morada */}
            <img
              src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/bacterias-clinica-purple.png"
              alt="Microorganismos Laboratorio OSD (Morado)"
              className={`absolute inset-0 w-full h-full object-cover object-center md:object-left scale-[1.06] md:scale-[1.08] origin-center md:origin-left transition-opacity duration-700 ease-in-out ${
                currentTheme === 'purple' ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Imagen Cian */}
            <img
              src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/bacterias-clinica-cyan.png"
              alt="Microorganismos Laboratorio OSD (Cian)"
              className={`absolute inset-0 w-full h-full object-cover object-center md:object-left scale-[1.06] md:scale-[1.08] origin-center md:origin-left transition-opacity duration-700 ease-in-out ${
                currentTheme === 'cyan' ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Separador vertical fiel al diseño original en tablet y desktop */}
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[1.5px] bg-[#2B017C]/25 z-10"></div>
          </div>

          {/* LADO DERECHO / INFERIOR: CONTENIDO DINÁMICO (shrink-0 en móvil para eliminar todo el espacio blanco inferior) */}
          <div className="w-full shrink-0 min-h-[345px] xs:min-h-[360px] sm:min-h-[380px] md:min-h-0 md:w-[54%] lg:w-1/2 md:h-full flex flex-col justify-between md:justify-center text-left px-5 xs:px-6 sm:px-10 md:pl-8 md:pr-8 lg:pl-10 lg:pr-14 xl:pl-12 xl:pr-20 pt-2 pb-5 sm:pb-6 md:py-8 lg:py-10 relative z-10 bg-white">
            <div className="max-w-xl w-full mx-auto md:mx-0 flex-1 md:flex-initial flex flex-col justify-between md:justify-center md:space-y-4 lg:space-y-5">
              
              {/* Bloque de contenido inmediatamente debajo de la imagen */}
              <div className="space-y-2 xs:space-y-2.5 sm:space-y-3.5 lg:space-y-5">
                {/* Overline con barra cian que abarca exactamente el ancho del texto */}
                <div key={`overline-${activeSlide}`} className="inline-flex flex-col items-start animate-fadeIn">
                  <span className="text-[11px] xs:text-xs sm:text-sm md:text-xs lg:text-base font-black uppercase tracking-wider text-gray-900 font-sans block leading-tight">
                    {slides[activeSlide].overline}
                  </span>
                  <div className="w-full h-[2.5px] sm:h-[3.5px] bg-[#01FADA] mt-1 sm:mt-1.5 transition-all duration-300"></div>
                </div>

                {/* Titular / Cifra de impacto */}
                <div key={`headline-${activeSlide}`} className="animate-fadeIn">
                  {slides[activeSlide].headline}
                </div>

                {/* Párrafo descriptivo */}
                <p 
                  key={`desc-${activeSlide}`}
                  className="text-gray-600 text-[13px] xs:text-sm sm:text-base md:text-[15px] lg:text-lg leading-relaxed font-sans animate-fadeIn"
                >
                  {slides[activeSlide].description}
                </p>

                {/* Botón CTA de Acción Directa + Badge */}
                <div key={`cta-${activeSlide}`} className="pt-1 sm:pt-2 animate-fadeIn space-y-2 sm:space-y-3">
                  <a
                    href={slides[activeSlide].cta.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full sm:w-auto inline-flex items-center justify-center text-center font-bold py-3 sm:py-3.5 px-5 sm:px-8 rounded-xl sm:rounded-lg text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 ${slides[activeSlide].cta.buttonClass}`}
                  >
                    {slides[activeSlide].cta.text}
                  </a>

                  {/* Recordatorio de cobertura exclusiva en Bogotá */}
                  {slides[activeSlide].badge && (
                    <div className="flex items-start sm:items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-[#2B017C] bg-[#01FADA]/15 border border-[#01FADA]/50 px-3 sm:px-3.5 py-1.5 rounded-xl sm:rounded-full w-full sm:w-fit leading-snug">
                      <span className="text-xs sm:text-sm shrink-0 leading-none mt-0.5 sm:mt-0">📍</span>
                      <span>{slides[activeSlide].badge}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Controles de Navegación del Slider (Dots y Flechas) anclados al borde inferior en móvil */}
              <div className="pt-3 sm:pt-4 lg:pt-6 mt-3 md:mt-0 flex items-center justify-between border-t border-gray-100 shrink-0">
                
                {/* Dots indicadores */}
                <div className="flex items-center space-x-2 sm:space-x-2.5">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.id}
                      onClick={() => goToSlide(index)}
                      aria-label={`Ir al slide ${index + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeSlide === index
                          ? 'w-7 sm:w-8 bg-[#2B017C]'
                          : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                {/* Flechas Anterior / Siguiente */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Slide anterior"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200 hover:border-[#2B017C] hover:bg-[#2B017C] hover:text-white active:bg-[#2B017C] active:text-white text-gray-600 transition-colors flex items-center justify-center text-xs sm:text-sm font-bold cursor-pointer"
                  >
                    ←
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Slide siguiente"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200 hover:border-[#2B017C] hover:bg-[#2B017C] hover:text-white active:bg-[#2B017C] active:text-white text-gray-600 transition-colors flex items-center justify-center text-xs sm:text-sm font-bold cursor-pointer"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Indicador de scroll en desktop */}
              <div className="hidden lg:flex items-center space-x-2 text-xs font-semibold text-gray-400 pt-0.5">
                <span>Desplaza hacia abajo para explorar</span>
                <svg className="w-3.5 h-3.5 animate-bounce text-[#2B017C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 2. CATEGORÍAS DE ANÁLISIS CLÍNICO (Página 4) */}
      {/* --------------------------------------------------------------------- */}
      <section className="w-full bg-white">
        
        {/* Encabezado Morado Superior (Banner completo fiel al diseño) */}
        <div className="w-full bg-[#2B017C] text-white py-10 sm:py-14 lg:py-20 px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            <h2 className="text-2xl xs:text-[28px] sm:text-4xl lg:text-[44px] font-bold font-display tracking-tight text-white leading-tight">
              Categorías de Análisis Clínico
            </h2>
            <p className="text-white/95 text-[13px] xs:text-sm sm:text-base lg:text-lg font-sans font-normal max-w-2xl mx-auto leading-relaxed">
              Procesamos un amplio espectro de exámenes bajo estrictos estándares de calidad. Conoce nuestras principales áreas de diagnóstico
            </p>
          </div>
        </div>

        {/* Grid de 6 Tarjetas (Fondo blanco, borde redondeado #707070 y texto centrado fiel al diseño) */}
        <div className="max-w-6xl xl:max-w-7xl mx-auto py-10 sm:py-16 lg:py-24 px-4 xs:px-5 sm:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 xl:gap-10">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl sm:rounded-[28px] lg:rounded-[36px] border border-[#707070]/80 p-6 xs:p-7 sm:p-8 lg:p-8 xl:p-11 text-center flex flex-col justify-center items-center h-full min-h-[185px] sm:min-h-[240px] lg:min-h-[290px] xl:min-h-[330px] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <h3 className="text-xl sm:text-xl lg:text-[22px] xl:text-2xl font-black font-display text-[#2B017C] mb-3 sm:mb-4 lg:mb-5 leading-snug">
                  {cat.titleLine1 && cat.titleLine2 ? (
                    <>
                      {cat.titleLine1}
                      <br />
                      {cat.titleLine2}
                    </>
                  ) : (
                    cat.title
                  )}
                </h3>
                <p className="text-gray-800 text-[13.5px] sm:text-[15px] lg:text-base leading-relaxed font-sans font-normal max-w-[320px] sm:max-w-[310px] mx-auto">
                  {cat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 3. BANNER INFERIOR - ¿BUSCAS UNA PRUEBA ESPECÍFICA? (Página 5) */}
      {/* --------------------------------------------------------------------- */}
      <section className="pb-12 sm:pb-20 lg:pb-28 px-4 xs:px-5 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#2B017C] text-white rounded-2xl sm:rounded-[32px] lg:rounded-[40px] px-5 py-8 xs:p-8 sm:p-12 lg:p-16 text-center shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-4 sm:space-y-5 max-w-2xl mx-auto">
              <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold font-display tracking-tight text-white leading-snug">
                ¿Buscas una prueba específica?
              </h2>
              <p className="text-white/90 text-[13px] xs:text-sm sm:text-base font-sans leading-relaxed max-w-xl mx-auto">
                Nuestro Portafolio Diagnóstico Clínico detalla los precios, tiempos de entrega y tipos de muestra para cada examen
              </p>
              
              <div className="pt-2 sm:pt-3">
                <a
                  href="https://wa.link/osqeux"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-gray-100 text-black font-black py-3.5 sm:py-4 px-6 sm:px-10 rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all transform hover:scale-105 cursor-pointer"
                >
                  SOLICITAR PORTAFOLIO
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

