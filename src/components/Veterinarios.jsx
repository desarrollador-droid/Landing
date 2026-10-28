import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AnimatedCounter({ target, prefix = "", suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  return (
    <span className="text-3xl md:text-4xl font-black text-osd-purple block mb-1">
      {prefix}{count}{suffix}
    </span>
  );
}

export default function Veterinarios() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [animateText, setAnimateText] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const slides = [
    {
      title: "Nunca estás solo.",
      description: "Acompañamiento experto: Estamos aquí para interpretar y respaldar cada decisión médica junto a ti",
      bgImage: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/carrusel-slide-3.png"
    },
    {
      title: "Investigación constante. Redefiniendo los límites de la medicina veterinaria.",
      description: "No esperamos el futuro; lo investigamos hoy. A través de proyectos avanzados, transformamos el conocimiento profundo en ayudas diagnósticas",
      bgImage: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/carrusel-slide-1.png"
    },
    {
      title: "Innovación desde la práctica. Soluciones pensadas para lo que tu paciente requiere",
      description: "Escuchamos tus desafíos diagnósticos con el fin de desarrollar soluciones para las decisiones clínicas que enfrentas cada día.",
      bgImage: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/carrusel-slide-2.png"
    },
    {
      title: "La excelencia científica es nuestro valor fundamental",
      description: "Investigamos, desarrollamos, innovamos y capacitamos para llevar la medicina veterinaria cada vez más lejos.",
      bgImage: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/carrusel-slide-1.png"
    }
  ];

  const testimonials = [
    {
      quote: "«Las pruebas son muy rápidas en cuanto a las PCR. También tienen muy buenos panales de resistencia que permiten darle continuidad a los pacientes y los más importante , tienen un acompañamiento por parte su equipo de trabajo»",
      author: "Luz Ángela Vanegas Moreno",
      role: "Veterinaria",
      avatar: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/pcr-veterinaria-Colombia-r5wro9alydl2mlg9mggimm094zql2k15cx87f9xt8e.png"
    },
    {
      quote: "«Ha sido muy, muy bueno el trato. Sobre todo la rapidez, los resultados confiables y el apoyo constante entre el laboratorio y los médicos...»",
      author: "Albeiro Díaz",
      role: "Veterinario",
      avatar: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/pcr-veterinaria-precisa-r5wroexn3dssk982piwa1kl0payscqnjdp54axpg72.png"
    }
  ];

  const carouselImages = [
    "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/laboratorio-de-biologia-molecular-en-Colombia-01-150x150.png",
    "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/laboratorio-de-biologia-molecular-en-Colombia-02-150x150.png",
    "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/laboratorio-de-biologia-molecular-en-Colombia-03-150x150.png",
    "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/laboratorio-de-biologia-molecular-en-Colombia-04-150x150.png",
    "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/laboratorio-de-biologia-molecular-en-Colombia-05-150x150.png",
    "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/laboratorio-de-biologia-molecular-en-Colombia-06-150x150.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeSlide]);

  const handleNextSlide = () => {
    setAnimateText(false);
    setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
      setAnimateText(true);
    }, 300);
  };

  const handlePrevSlide = () => {
    setAnimateText(false);
    setTimeout(() => {
      setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setAnimateText(true);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % (carouselImages.length - 2));
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const getVisibleImages = () => {
    return [
      carouselImages[carouselIndex],
      carouselImages[carouselIndex + 1],
      carouselImages[carouselIndex + 2]
    ];
  };

  return (
    <div className="w-full bg-white font-sans text-gray-800">
      
      {/* Floating Side Tab */}
      <a 
        href="https://docs.google.com/forms/d/e/1FAIpQLSeDPoSkLRQm7UiFy2f_U_2f8YE4bU85Ap5QixzMqUvQc-A4pA/viewform" 
        target="_blank" 
        rel="noreferrer" 
        className="fixed left-0 top-1/2 -translate-y-1/2 bg-osd-cyan text-osd-dark font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-r-lg z-50 shadow-lg hover:bg-white transition-all duration-300"
      >
        Formulario de recolección
      </a>

      {/* Styles for Team Banner */}
      <style dangerouslySetInnerHTML={{__html: `
        .team-banner-section {
          width: 100%;
          background-color: #ffffff;
          padding: 85px 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .team-banner-wrapper {
          position: relative;
          width: 100%;
          max-width: 1240px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .banner-shape-left {
          position: absolute;
          left: 5px;
          right: 50%;
          top: 50%;
          transform: translateY(-50%);
          height: 215px;
          background-color: #E6E6E6;
          clip-path: polygon(55px 0%, 100% 0%, 100% 100%, 0% 100%);
          z-index: 1;
        }
        .banner-shape-right {
          position: absolute;
          left: 50%;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
          height: 215px;
          background-color: #E6E6E6;
          clip-path: polygon(0% 0%, 100% 0%, calc(100% - 55px) 100%, 0% 100%);
          z-index: 1;
        }
        .team-banner-grid {
          position: relative;
          z-index: 2;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 390px 1fr;
          align-items: center;
          gap: 15px;
        }
        .doc-col-left {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 22px;
          padding-left: 15px;
        }
        .doc-col-right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 22px;
          padding-right: 15px;
        }
        .doc-photo-frame {
          width: 165px;
          height: 165px;
          border-radius: 50%;
          border: 6px solid #01FADA;
          background: #ffffff;
          overflow: hidden;
          flex-shrink: 0;
          box-shadow: 0 8px 24px rgba(0,0,0,0.14);
        }
        .doc-photo-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .doc-text-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .doc-text-box h2 {
          color: #6F2BCC;
          font-size: 34px;
          font-weight: 900;
          line-height: 0.95;
          margin: 0 0 7px 0;
        }
        .doc-text-box p {
          color: #333333;
          font-size: 13.5px;
          font-weight: 700;
          line-height: 1.35;
          margin: 0 0 12px 0;
        }
        .doc-btn-action {
          display: inline-block;
          background-color: #6F2BCC;
          color: #ffffff !important;
          font-size: 12.5px;
          font-weight: 700;
          padding: 8px 24px;
          border-radius: 12px;
          text-decoration: none;
          box-shadow: 0 4px 10px rgba(111,43,204,0.35);
          transition: all 0.2s ease;
        }
        .doc-btn-action:hover {
          opacity: 0.92;
          transform: translateY(-1px);
        }
        .center-card-box {
          background-color: #BDBDBD;
          border-radius: 38px;
          padding: 42px 26px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.06);
          z-index: 10;
        }
        .center-card-box img {
          width: 95px;
          height: auto;
        }
        .center-card-box p {
          color: #111111;
          font-size: 17.5px;
          font-weight: 800;
          line-height: 1.45;
          margin: 0;
        }
        @media (max-width: 1024px) {
          .team-banner-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .banner-shape-left, .banner-shape-right {
            display: none;
          }
          .doc-col-left, .doc-col-right {
            justify-content: center;
            padding: 0;
          }
        }
        @media (max-width: 640px) {
          .team-banner-section {
            padding: 40px 16px;
          }
          .doc-col-left, .doc-col-right {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
          .doc-photo-frame {
            width: 140px;
            height: 140px;
          }
          .doc-text-box h2 {
            font-size: 28px;
          }
          .center-card-box {
            padding: 30px 20px;
            border-radius: 28px;
            max-width: 320px;
            margin: 0 auto;
          }
          .center-card-box p {
            font-size: 15px;
          }
        }
      `}} />

      {/* 1. Slider / Hero Banner */}
      <section className="relative w-full min-h-[440px] md:min-h-[490px] lg:min-h-[520px] flex flex-col justify-end pt-12 md:pt-16 pb-10 sm:pb-14 px-4 sm:px-6 md:px-10 lg:px-14 z-20">
        {/* Background Slides Container with overflow-hidden */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                idx === activeSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {/* Background Image: Mantiene su tamaño original (bg-cover) y corrida un poco hacia el centro (center 20%) */}
              <div 
                className="absolute inset-0 bg-cover transition-all duration-700" 
                style={{ 
                  backgroundImage: `url(${slide.bgImage})`,
                  backgroundPosition: 'center 20%'
                }}
              >
                {/* Suave degradado lateral para asegurar legibilidad de las letras sobre la foto */}
                <div className="absolute inset-y-0 left-0 w-3/5 md:w-1/2 bg-gradient-to-r from-white/75 via-white/30 to-transparent pointer-events-none"></div>

                {/* Degradado inferior que conecta limpiamente con la sección de abajo */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-[1360px] xl:max-w-[1400px] mx-auto w-full flex flex-col justify-end">
          {/* Slide Text aligned over the crisp photo */}
          <div className="mb-2 md:mb-3 max-w-4xl">
            <h1 
              key={`title-${activeSlide}`}
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-black text-[#2B017C] leading-[1.14] mb-2 md:mb-3 tracking-tight transition-all duration-700 ${
                animateText ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              }`}
            >
              {slides[activeSlide].title}
            </h1>
            <p 
              key={`desc-${activeSlide}`}
              className={`text-sm sm:text-base md:text-lg lg:text-[20px] font-bold text-gray-900 leading-snug max-w-3xl transition-all duration-700 delay-100 ${
                animateText ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              }`}
            >
              {slides[activeSlide].description}
            </p>
          </div>

          {/* Carousel Controls: Navigation Dots & Arrow */}
          <div className="flex justify-between items-center mt-4 sm:mt-6 pr-2">
            {/* Dots Indicator */}
            <div className="flex items-center space-x-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setAnimateText(false);
                    setTimeout(() => {
                      setActiveSlide(idx);
                      setAnimateText(true);
                    }, 300);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeSlide === idx ? 'w-8 bg-[#6F2BCC]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ir al slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next Slide Arrow */}
            <button
              onClick={handleNextSlide}
              className="text-[#6F2BCC] hover:text-[#2B017C] p-1.5 transition-all duration-300 transform hover:translate-x-1.5 focus:outline-none cursor-pointer flex items-center group"
              aria-label="Siguiente diapositiva"
            >
              <svg className="w-8 h-8 md:w-10 md:h-10 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Somos Section */}
      <section className="py-16 sm:py-20 px-6 bg-white relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Side: Single Combined Image Asset (Enlarged) */}
          <div className="relative flex justify-center">
            <div className="w-full max-w-[360px] md:max-w-[420px] h-auto shadow-md rounded-2xl overflow-hidden">
              <img 
                src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/somos_combined.png" 
                alt="Somos Expertos en diagnósticos moleculares" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right Side: Text details */}
          <div className="space-y-4 text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-osd-dark">Somos</h2>
            <h3 className="text-lg font-bold text-gray-700">
              Expertos en diagnósticos moleculares en pequeñas especies:
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Nuestro experimentado equipo científico garantiza precisión y confiabilidad en cada análisis. Contamos con qPCR en tiempo real cuantitativo con sondas de hidrólisis. ¡Confíe en nosotros para resultados fiables y atención de primera categoría!
            </p>
            <div className="pt-2">
              <a 
                href="https://wa.link/2js1xk" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-block bg-osd-purple hover:bg-osd-dark text-white font-bold py-2.5 px-6 rounded-lg text-sm md:text-base shadow-md transition-all"
              >
                Contáctenos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3 & 4. Combined Recolección & Red de Laboratorios */}
      <section className="relative py-10 md:py-12 px-6 text-white bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url('https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/sample-4944424_1280.jpg')` }}>
        <div className="absolute inset-0 bg-[#2B017C]/70 backdrop-blur-[1px]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-center">
          {/* Header */}
          <div className="space-y-2.5 max-w-xl mx-auto">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight">
              Recolección directa en tu clínica
            </h2>
            <p className="text-xs md:text-sm leading-relaxed text-gray-100">
              <span className="text-osd-cyan font-bold">Todos los resultados son prioridad para nosotros.</span> Por eso, contamos con un equipo logístico que gestiona la recolección, <span className="text-osd-cyan font-bold">sin costo adicional</span>, directamente en tu clínica con entrega de resultados el mismo día hábil.
            </p>
          </div>

          {/* Grid Layout: Carousel left, Red de laboratorios right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center text-left pt-1">
            
            {/* Left side: Auto-sliding 3-image carousel (Compact size) */}
            <div className="space-y-3 max-w-[300px] mx-auto lg:mx-0 w-full">
              <div className="grid grid-cols-3 gap-2.5">
                {getVisibleImages().map((src, i) => (
                  <div key={i} className="aspect-square bg-white/10 rounded-lg overflow-hidden border border-white/20 shadow-md transition-all duration-300 transform hover:scale-105">
                    <img src={src} alt={`Lab Specimen ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex justify-center space-x-1.5 pt-0.5">
                {Array.from({ length: carouselImages.length - 2 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === carouselIndex ? 'bg-osd-cyan w-3.5' : 'bg-white/40 w-1.5'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right side: Red de laboratorios details */}
            <div className="space-y-3 lg:pl-3">
              <h3 className="text-base md:text-lg font-extrabold tracking-tight">
                Una red de laboratorios para responder diferente
              </h3>
              <p className="text-gray-200 text-xs md:text-sm leading-relaxed">
                Nuestra infraestructura conecta puntos estratégicos del país para un cubrimiento nacional.
              </p>
              <div className="border-l-3 border-osd-cyan pl-3 text-xs md:text-sm font-semibold space-y-0.5">
                <p>Medellín: Colmayor</p>
                <p>Bogotá: ECCI y VetWork</p>
              </div>
            </div>

          </div>

          <div className="pt-2">
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSeDPoSkLRQm7UiFy2f_U_2f8YE4bU85Ap5QixzMqUvQc-A4pA/viewform" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-block bg-white hover:bg-osd-cyan text-osd-purple hover:text-osd-dark font-bold py-2 px-6 rounded-full shadow-md text-xs md:text-sm tracking-wider transition-all"
            >
              Solicitar recolección
            </a>
          </div>
        </div>
      </section>

      {/* 5. Somos únicos y #1 en calidad diagnóstica */}
      <section className="py-16 px-6 max-w-5xl mx-auto bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Side: Layered images of the director with black cap */}
          <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative w-full max-w-[280px] aspect-[324/346]">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[60px] h-[110px] bg-osd-cyan rounded-md z-0"></div>
              
              <div className="absolute -bottom-4 -right-4 w-[140px] aspect-video bg-white p-1 rounded-xl shadow-lg border border-gray-100 z-10">
                <img 
                  src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/MARIAP-Recuperado-03-03.png" 
                  alt="Pipeteo OSD" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="relative w-[85%] aspect-[221/283] rounded-2xl overflow-hidden shadow-xl border-4 border-white z-20">
                <img 
                  src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/PCR-para-veterinarias-en-Cali.png" 
                  alt="Director científico OSD" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Quality checklist text */}
          <div className="space-y-4 order-1 lg:order-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-osd-dark leading-tight">
              Somos únicos y #1 en calidad diagnóstica
            </h2>
            <h5 className="font-semibold text-gray-700 text-sm md:text-base">
              Trabajamos con sondas de hidrólisis diseñadas para ofrecer:
            </h5>
            
            <ul className="space-y-3.5">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-osd-cyan/20 flex items-center justify-center text-osd-purple mr-2.5 mt-1">
                  <i className="fas fa-check text-[10px] text-osd-purple"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm md:text-base">Alta sensibilidad</h4>
                  <p className="text-gray-600 text-xs md:text-sm">Permitiendo un diagnóstico completo de los géneros y especies en una sola prueba.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-osd-cyan/20 flex items-center justify-center text-osd-purple mr-2.5 mt-1">
                  <i className="fas fa-check text-[10px] text-osd-purple"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm md:text-base">Alta especificidad</h4>
                  <p className="text-gray-600 text-xs md:text-sm">Eliminando el riesgo de falsos negativos.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-osd-cyan/20 flex items-center justify-center text-osd-purple mr-2.5 mt-1">
                  <i className="fas fa-check text-[10px] text-osd-purple"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm md:text-base">Sin problemas de inhibiciones de PCR</h4>
                  <p className="text-gray-600 text-xs md:text-sm">Asegurando resultados precisos y confiables.</p>
                </div>
              </li>
            </ul>

            <div className="pt-3 border-t border-gray-100">
              <h5 className="font-bold text-gray-700 text-xs md:text-sm">
                ¡Todo lo que necesitas para garantizar un diagnóstico de calidad en tu veterinaria!
              </h5>
            </div>

            <div className="pt-2">
              <a 
                href="https://wa.link/2js1xk" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-block bg-osd-purple hover:bg-osd-dark text-white font-bold py-2.5 px-6 rounded-lg text-sm shadow-md transition-all"
              >
                Contáctenos
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Perfiles diseñados para la práctica veterinaria real (Agrandado y Claro) */}
      <section className="py-20 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          
          {/* Left Column: Text checklist (Agrandado) */}
          <div className="space-y-5 text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-osd-dark leading-tight tracking-tight">
              Perfiles diseñados para la práctica veterinaria real
            </h2>
            <div className="text-gray-600 space-y-3.5 leading-relaxed text-base sm:text-lg">
              <p>
                Sabemos que en la consulta diaria no se enfrentan enfermedades aisladas, sino casos complejos que requieren un enfoque más completo.
              </p>
              <p>
                Por eso desarrollamos <span className="text-osd-purple font-bold">perfiles diagnósticos que agrupan múltiples agentes</span>, pensados para responder a necesidades clínicas reales desde el inicio.
              </p>
            </div>
            
            <div className="space-y-3 pt-2">
              <h4 className="font-extrabold text-gray-800 text-lg sm:text-xl">Enfocados en lo que ves todos los días</h4>
              <ul className="space-y-2.5">
                <li className="flex items-center space-x-3 text-gray-700 text-base sm:text-lg">
                  <i className="fas fa-check text-osd-cyan text-base"></i>
                  <span>Pacientes con signos inespecíficos</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-700 text-base sm:text-lg">
                  <i className="fas fa-check text-osd-cyan text-base"></i>
                  <span>Casos que no responden como se espera</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-700 text-base sm:text-lg">
                  <i className="fas fa-check text-osd-cyan text-base"></i>
                  <span>Sospechas clínicas que requieren confirmación</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-700 text-base sm:text-lg">
                  <i className="fas fa-check text-osd-cyan text-base"></i>
                  <span>Evaluaciones más completas en menos tiempo</span>
                </li>
              </ul>
            </div>

            <p className="font-bold text-gray-800 text-base sm:text-lg pt-2">
              Accede a perfiles que buscan facilitar tu abordaje clínico.
            </p>

            <div className="pt-2">
              <a 
                href="https://wa.link/c0khqc" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-block bg-osd-purple hover:bg-osd-dark text-white font-bold py-3.5 px-8 rounded-xl text-base shadow-md transition-all"
              >
                Solicitar portafolio
              </a>
            </div>
          </div>

          {/* Right Column: Tablet mockup frame (Agrandado) */}
          <div className="relative flex justify-center w-full">
            <div className="relative w-full max-w-[420px] md:max-w-[460px] aspect-[422/580] bg-black rounded-[28px] p-0 overflow-hidden shadow-2xl border-4 border-gray-800">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20"></div>
              <img 
                src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/pruebas-de-qpcr-en-medicina-veterinaria.png" 
                alt="Catálogo OSD Portada" 
                className="w-full h-full object-cover rounded-[24px] z-10"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 6.1 Director Científico César Orlando Muñoz Cadavid Section */}
      <section className="py-16 px-6 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
          {/* Left Column: Text on the Left, right-aligned on desktop, centered on mobile */}
          <div className="space-y-4 text-center lg:text-right pr-0 lg:pr-6 lg:order-1 order-1">
            <h2 className="text-3xl md:text-4xl font-extrabold text-osd-purple leading-tight">
              César Orlando Muñoz<br/>
              <span className="block mt-1">Cadavid</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 font-bold max-w-md mx-auto lg:ml-auto leading-relaxed">
              Nuestro Director científico cuenta con más de 20 años de experiencia
            </p>
          </div>

          {/* Right Column: Photo on the Right with absolute vertical badge offset at the top-right */}
          <div className="relative flex justify-center lg:justify-start lg:order-2 order-2">
            <div className="relative bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-100 max-w-[220px]">
              <img 
                src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/Laboratorio-para-veterinarias-en-Cali.png" 
                alt="César Orlando Muñoz" 
                className="w-full object-cover"
              />
              <div className="absolute -top-1.5 right-4 bg-osd-purple text-white text-[8px] font-bold tracking-widest uppercase py-3 px-1 rounded-sm shadow-md" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                Director Científico
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.2 Garantizamos Diagnósticos Precisos y Seguros */}
      <section className="py-16 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
          
          {/* Left Column */}
          <div className="flex justify-center">
            <img 
              src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/PCR-veterinaria-rapida-y-precisa-Cali.png" 
              alt="Muestra de sangre para PCR" 
              className="rounded-2xl shadow-xl w-full max-w-[340px] object-cover border border-gray-200"
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6 text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-osd-dark leading-tight">
              Garantizamos diagnósticos precisos y seguros
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              ¡Tu también puedes ser parte de la revolución del diagnóstico veterinario! Da el paso hacia una medicina veterinaria de mayor precisión, basada en evidencia molecular.
            </p>

            <div className="grid grid-cols-2 gap-3.5 sm:gap-6 py-2">
              <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100 text-center">
                <AnimatedCounter target={900} prefix="+" />
                <span className="text-gray-500 font-bold text-xs uppercase tracking-wide">Más clientes</span>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
                <AnimatedCounter target={100} prefix="+" />
                <span className="text-gray-500 font-bold text-xs uppercase tracking-wide">Muestras por día</span>
              </div>
            </div>

            <div>
              <a 
                href="https://wa.link/2js1xk" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-block bg-osd-purple hover:bg-osd-dark text-white font-bold py-3 px-8 rounded-lg text-xs md:text-sm shadow-lg transition-all"
              >
                Trabaja con nosotros
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 6.3 Detectamos Más de 500 Especies (Gran Espectro) */}
      <section className="relative py-20 px-6 text-center text-white bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url('https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/julia-koblitz-RlOAwXt2fEA-unsplash-1-scaled.jpg')` }}>
        <div className="absolute inset-0 bg-osd-purple/55 backdrop-blur-[1px]"></div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <span className="text-osd-cyan font-bold tracking-widest text-xs uppercase block mb-1">Gran Espectro</span>
          <h2 className="text-2xl md:text-4xl font-extrabold leading-tight">
            DECTECTAMOS MÁS DE
          </h2>
          <h3 className="text-4xl md:text-6xl font-black leading-none my-2">
            500 ESPECIES
          </h3>
          <p className="text-sm md:text-base text-gray-200 font-semibold tracking-wide uppercase">
            LOGRANDO RESULTADOS CON ALTA ESPECIFICIDAD
          </p>
          <div className="pt-4">
            <Link 
              to="/biologia-molecular" 
              className="inline-block bg-osd-cyan text-osd-dark hover:bg-white font-bold py-3 px-10 text-xs uppercase tracking-wider transition-all"
            >
              Descúbrelas
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Team & Advisory Section (Con tarjeta de equipo experto más grande y destacada) */}
      <section className="team-banner-section">
        <div className="team-banner-wrapper">
          <div className="banner-shape-left"></div>
          <div className="banner-shape-right"></div>
          
          <div className="team-banner-grid">
            {/* Valentina Castaño */}
            <div className="doc-col-left">
              <div className="doc-photo-frame">
                <img src="https://res.cloudinary.com/oiaig120/image/upload/v1793205178/osdiagnostic/staff-valentina-castano.png" alt="Valentina Castaño" />
              </div>
              <div className="doc-text-box">
                <h2>Valentina<br/>Castaño</h2>
                <p>Médica Veterinaria</p>
                <a href="https://wa.link/licxbp" target="_blank" rel="noreferrer" className="doc-btn-action">Agendar asesoría</a>
              </div>
            </div>

            {/* Center Card: Equipo Experto (Agrandado) */}
            <div className="center-card-box">
              <img src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/flaticon-expertos.png" alt="Expertos" />
              <p>Contamos con un equipo experto para que puedas resolver tus dudas y garantizar un excelente servicio.</p>
            </div>

            {/* César Muñoz */}
            <div className="doc-col-right">
              <div className="doc-text-box">
                <h2>César<br/>Muñoz</h2>
                <p>Bacteriólogo y<br/>Laboratorista Clínico</p>
                <a href="https://wa.link/oi5b3k" target="_blank" rel="noreferrer" className="doc-btn-action">Agendar asesoría</a>
              </div>
              <div className="doc-photo-frame">
                <img src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/Laboratorio-de-Diagnostico-Molecular.png" alt="César Muñoz" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Testimonials Section (Tamaño más moderado y proporcionado) */}
      <section className="bg-white pb-14 relative overflow-hidden">
        <div className="bg-osd-purple text-white pt-10 pb-20 text-center relative">
          <div className="max-w-3xl mx-auto px-6 space-y-2.5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">Testimonios</h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-100 max-w-xl mx-auto leading-relaxed opacity-95">
              Nuestro pilar es construir relaciones sólidas que nos permitan transformar la medicina veterinaria
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform translate-y-[2px] z-10">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] text-white fill-current">
              <path d="M0,120 C300,30 900,30 1200,120 L1200,120 L0,120 Z" className="text-white fill-current"></path>
            </svg>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 mt-[-48px] relative z-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <div 
              key={idx} 
              className="bg-osd-purple text-white rounded-[24px] p-6 sm:p-7 shadow-xl flex flex-col justify-between space-y-5 hover:shadow-2xl transition-all duration-300 border border-white/10"
            >
              <p className="text-xs sm:text-sm md:text-[14.5px] leading-relaxed text-gray-100 font-medium italic">
                {t.quote}
              </p>
              
              <div className="flex items-center space-x-3.5 pt-3.5 border-t border-white/15">
                <img 
                  src={t.avatar} 
                  alt={t.author} 
                  className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border-2 border-osd-cyan object-cover flex-shrink-0 shadow-md"
                  style={{ width: '56px', height: '56px' }}
                />
                <div className="text-left space-y-0.5">
                  <h4 className="font-extrabold text-white text-xs sm:text-sm">{t.author}</h4>
                  <p className="text-[11px] sm:text-xs text-osd-cyan font-bold uppercase tracking-wider">{t.role}</p>
                  
                  <div className="flex space-x-1 pt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-osd-cyan fill-current" viewBox="0 0 24 24">
                        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}