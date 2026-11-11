import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import FloatingRecoleccionButton from './FloatingRecoleccionButton';

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

function InteractiveCapsule() {
  const [isTriggered, setIsTriggered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // 1. Auto-trigger after 450ms on load so the user sees the smooth fluid roll
    const timer = setTimeout(() => {
      setIsTriggered(true);
    }, 450);

    // 2. Also trigger immediately on any initial scroll if user scrolls before 450ms
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      if (scrollY > 5) {
        setIsTriggered(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // When triggered, roll the circle smoothly all the way across and complete without stopping halfway
  useEffect(() => {
    if (isTriggered) {
      const finishTimer = setTimeout(() => {
        setIsCompleted(true);
      }, 750);
      return () => clearTimeout(finishTimer);
    }
  }, [isTriggered]);

  return (
    <div className="relative inline-flex flex-col items-center select-none">
      {/* Outer capsule:
          - Initial state (while rolling): soft light grayish-white (#ECEFF2) with subtle clean border
          - Completed state (circle reached end): turns rich royal purple (#6014CA to #721FE0)
      */}
      <div
        className={`relative inline-flex items-center justify-center rounded-full py-4 sm:py-5 px-6 sm:px-10 md:px-12 overflow-hidden select-none transition-all duration-500 ease-out ${
          isCompleted
            ? 'bg-gradient-to-r from-[#6014CA] via-[#6717D6] to-[#721FE0] shadow-[0_12px_35px_rgba(96,20,202,0.35)] border border-purple-300/40'
            : 'bg-[#ECEFF2] shadow-[0_6px_20px_rgba(0,0,0,0.06)] border border-gray-300/80'
        }`}
        style={{
          width: '580px',
          maxWidth: '92vw',
          minHeight: '82px',
        }}
      >
        {/* Revealed text:
            - Fully hidden while circle is rolling to guarantee NO text overlap
            - Right padding leaves space for parked circle, left padding keeps text centered and prevents 3-line wrap
        */}
        <div 
          className={`relative z-10 pr-14 sm:pr-20 md:pr-24 pl-6 sm:pl-8 text-center pointer-events-none transition-opacity duration-400 ease-in ${
            isCompleted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="text-white font-extrabold text-base sm:text-xl md:text-2xl lg:text-[25px] leading-[1.2] tracking-tight text-center drop-shadow-sm">
            <div className="whitespace-nowrap">Tu aliado estratégico en el</div>
            <div className="whitespace-nowrap">proceso diagnóstico</div>
          </div>
        </div>

        {/* Rolling Circle Dot:
            - Glides across from left to right all the way to 100% without stopping halfway
        */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center z-20 pointer-events-none transition-all duration-300 ${
            isCompleted
              ? 'bg-white text-[#6014CA] shadow-[0_4px_14px_rgba(0,0,0,0.22)]'
              : 'bg-[#6014CA] text-white shadow-[0_4px_14px_rgba(96,20,202,0.4)]'
          }`}
          style={{
            width: 'var(--capsule-dot-size, 50px)',
            height: 'var(--capsule-dot-size, 50px)',
            left: isTriggered
              ? 'calc(100% - 8px - var(--capsule-dot-size, 50px))'
              : '8px',
            transition: 'left 0.75s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s ease-out, color 0.3s ease-out'
          }}
        >
          {isCompleted ? (
            <span className="font-black text-sm sm:text-base">✔</span>
          ) : (
            <span className="font-black text-xs sm:text-sm">➔</span>
          )}
        </div>
      </div>
    </div>
  );
}

function InteractiveChallengeCard({ title, description, index = 0 }) {
  const [isTriggered, setIsTriggered] = useState(false);
  const [isSwapped, setIsSwapped] = useState(false);
  const [showDesc, setShowDesc] = useState(true);
  const [shifts, setShifts] = useState({ titleX: 0, descX: 0, titleY: 0, descY: 0, isMobile: false });
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const measure = () => {
      if (!cardRef.current || !titleRef.current || !descRef.current) return;
      const isMobile = window.innerWidth < 640;
      const titleRect = titleRef.current.getBoundingClientRect();
      const descRect = descRef.current.getBoundingClientRect();

      if (isMobile) {
        const gap = 12;
        setShifts({
          titleX: 0,
          descX: 0,
          titleY: descRect.height + gap,
          descY: titleRect.height + gap,
          isMobile: true
        });
      } else {
        setShifts({
          titleX: descRect.width,
          descX: titleRect.width,
          titleY: 0,
          descY: 0,
          isMobile: false
        });
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (cardRef.current) observer.observe(cardRef.current);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  useEffect(() => {
    if (!cardRef.current) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsTriggered(true);
      setIsSwapped(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isTriggered) {
            setIsTriggered(true);
            const staggerDelay = (index % 2) * 120;

            setTimeout(() => {
              // 1. Fade out description text first so the moving title badge NEVER overlaps it
              setShowDesc(false);

              // 2. Once description is faded out, smoothly glide the purple title badge across
              setTimeout(() => {
                setIsSwapped(true);

                // 3. Once title badge arrives in place, smoothly fade in description on the left
                setTimeout(() => {
                  setShowDesc(true);
                }, 600);
              }, 180);
            }, staggerDelay);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [isTriggered, index]);

  const titleTransform = shifts.isMobile
    ? isSwapped ? `translateY(${shifts.titleY}px)` : 'translateY(0)'
    : isSwapped ? `translateX(${shifts.titleX}px)` : 'translateX(0)';

  const descTransform = shifts.isMobile
    ? isSwapped ? `translateY(-${shifts.descY}px)` : 'translateY(0)'
    : isSwapped ? `translateX(-${shifts.descX}px)` : 'translateX(0)';

  return (
    <div 
      ref={cardRef}
      className="w-full bg-[#ECEFF2] rounded-[32px] sm:rounded-full p-2.5 sm:p-3 relative overflow-hidden flex flex-col sm:flex-row items-stretch shadow-sm hover:shadow-md transition-shadow duration-300 min-h-[145px] sm:min-h-[160px] md:min-h-[170px] border border-gray-200/80"
    >
      {/* Purple Rolling Title Badge: "el circulo morado con texto" */}
      <div 
        ref={titleRef}
        className="w-full sm:w-[36%] md:w-[35%] lg:w-[34%] bg-gradient-to-r from-[#6014CA] to-[#6E1FD8] text-white rounded-[26px] sm:rounded-full py-5 px-5 sm:px-6 md:py-6 flex items-center justify-center text-center shadow-md flex-shrink-0 z-20 select-none will-change-transform"
        style={{
          transform: titleTransform,
          transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
        }}
      >
        <span className="font-extrabold text-base sm:text-lg md:text-[19px] lg:text-[20px] leading-snug tracking-tight text-white drop-shadow-sm">
          {title}
        </span>
      </div>

      {/* Description Area: smoothly swaps position with purple title badge upon scrolling into view */}
      <div
        ref={descRef}
        className="w-full sm:w-[64%] md:w-[65%] lg:w-[66%] relative flex items-center py-4 px-4 sm:py-5 sm:px-6 md:px-8 select-none z-10 will-change-transform"
        style={{
          transform: descTransform,
          transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
        }}
      >
        <p 
          className={`text-[#1e1e1e] font-normal text-xs sm:text-sm md:text-[15px] lg:text-[15.5px] leading-relaxed transition-opacity duration-200 ${
            showDesc ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {description}
        </p>
      </div>

    </div>
  );
}

export default function Veterinarios() {
  const [activeSlide, setActiveSlide] = useState(0);
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

  const challengeCards = [
    {
      title: "Asesoría científica para casos complejos",
      description: "Cuando los casos clínicos complejos presentan hallazgos atípicos o contradictorios que requieren conocimiento científico especializado para orientar las decisiones diagnósticas."
    },
    {
      title: "Perfiles qPCR de amplio espectro",
      description: "Cuando las pruebas seleccionadas no incluyen algunos de los agentes infecciosos clínicamente más probables, disminuyendo las posibilidades de identificar la causa de la enfermedad"
    },
    {
      title: "Formación en razonamiento clínico basado en evidencia",
      description: "Cuando la complejidad de los casos clínicos dificulta integrar hallazgos, formular hipótesis y tomar decisiones que reduzcan la incertidumbre diagnóstica."
    },
    {
      title: "Actualización científica continua",
      description: "Cuando la complejidad de los casos clínicos dificulta integrar hallazgos, formular hipótesis y tomar decisiones que reduzcan la incertidumbre diagnóstica."
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
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
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
      
      {/* Floating Sample Collection CTA (Sleek Bottom-Center Pill Dock) */}
      <FloatingRecoleccionButton />

      {/* Responsive capsule CSS variables */}
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --capsule-dot-size: 50px;
          --challenge-dot-size: 46px;
        }
        @media (min-width: 768px) {
          :root {
            --capsule-dot-size: 68px;
            --challenge-dot-size: 54px;
          }
        }
      `}} />

      {/* 1. Slider / Hero Banner */}
      <section className="relative w-full min-h-[520px] sm:min-h-[580px] md:min-h-[640px] flex flex-col justify-center items-center pt-14 sm:pt-16 md:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 md:px-10 lg:px-14 z-20 overflow-hidden">
        {/* Background Slides Container with overflow-hidden */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                idx === activeSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {/* Background Image: Mantiene su tamaño original (bg-cover) y posición (center 20%) */}
              <div 
                className="absolute inset-0 bg-cover transition-all duration-700" 
                style={{ 
                  backgroundImage: `url(${slide.bgImage})`,
                  backgroundPosition: 'center 20%'
                }}
              >
                {/* Suave degradado lateral para asegurar legibilidad sobre la foto */}
                <div className="absolute inset-y-0 left-0 w-3/5 md:w-1/2 bg-gradient-to-r from-white/75 via-white/30 to-transparent pointer-events-none"></div>

                {/* Degradado inferior que conecta limpiamente con la sección de abajo */}
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-[1240px] mx-auto w-full flex flex-col items-center text-center justify-center">
          
          {/* Interactive Purple Capsule with Draggable / Rolling Reveal Dot */}
          <div className="mb-6 sm:mb-8 md:mb-10">
            <InteractiveCapsule />
          </div>

          {/* Slide Text */}
          <div className="max-w-4xl mx-auto px-2 mb-6 sm:mb-8 min-h-[140px] sm:min-h-[160px] md:min-h-[180px] flex flex-col items-center justify-center">
            <h1 
              key={`title-${activeSlide}`}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] xl:text-[50px] font-bold text-[#240068] leading-[1.18] mb-3 sm:mb-4 tracking-tight animate-fadeIn"
            >
              {slides[activeSlide].title}
            </h1>
            <p 
              key={`desc-${activeSlide}`}
              className="text-sm sm:text-base md:text-lg lg:text-[21px] font-bold text-[#1e1e1e] leading-relaxed max-w-3xl mx-auto animate-fadeIn"
            >
              {slides[activeSlide].description}
            </p>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center space-x-3 mt-2 sm:mt-4">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlide(idx)}
                className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  activeSlide === idx ? 'w-10 bg-[#6014CA]' : 'w-3 bg-[#D8C7F8] hover:bg-[#A882EB]'
                }`}
                aria-label={`Ir al slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Left Slide Arrow Button */}
        <button
          type="button"
          onClick={handlePrevSlide}
          className="absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-[#6014CA] hover:text-[#240068] shadow-[0_4px_20px_rgba(36,0,104,0.18)] hover:shadow-[0_6px_25px_rgba(36,0,104,0.28)] border border-purple-100 flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 z-30 group"
          aria-label="Diapositiva anterior"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current transform transition-transform group-hover:-translate-x-0.5" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>

        {/* Right Slide Arrow Button */}
        <button
          type="button"
          onClick={handleNextSlide}
          className="absolute right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-[#6014CA] hover:text-[#240068] shadow-[0_4px_20px_rgba(36,0,104,0.18)] hover:shadow-[0_6px_25px_rgba(36,0,104,0.28)] border border-purple-100 flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 z-30 group"
          aria-label="Siguiente diapositiva"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current transform transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </section>

      {/* 2. Desafíos Diagnósticos Section (PDF Pages 5, 6, 7) */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-white relative z-10 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto text-center">
          
          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-[#240068] tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Somos el aliado estratégico que tu clínica necesita.
          </h2>

          {/* Subtitle / Intro text */}
          <p className="text-base sm:text-lg md:text-xl lg:text-[22px] text-[#222222] font-normal leading-relaxed max-w-4xl mx-auto mt-5 sm:mt-7">
            Sabemos que tu clínica merece un aliado estratégico que te ayude a reducir la incertidumbre de tus procesos diagnósticos. Por eso, además de ofrecer pruebas diagnósticas, somos un equipo que te escucha, te orienta y respalda, para que puedas tomar decisiones clínicas mejor sustentadas.
          </p>

          {/* Purple Downward Arrow Indicator */}
          <div className="flex justify-center mt-8 sm:mt-10 mb-12 sm:mb-16">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#240068] fill-current animate-bounce" viewBox="0 0 24 24">
              <path d="M12 18L4 8h16l-8 10z" />
            </svg>
          </div>

          {/* 4 Cards in 2 Columns (2 on each side) matching exact design from screenshot */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 max-w-[1440px] mx-auto text-left">
            {/* Columna Izquierda: 2 tarjetas */}
            <div className="flex flex-col gap-6 xl:gap-8">
              <InteractiveChallengeCard 
                title={challengeCards[0].title} 
                description={challengeCards[0].description} 
                index={0}
              />
              <InteractiveChallengeCard 
                title={challengeCards[1].title} 
                description={challengeCards[1].description} 
                index={1}
              />
            </div>

            {/* Columna Derecha: 2 tarjetas */}
            <div className="flex flex-col gap-6 xl:gap-8">
              <InteractiveChallengeCard 
                title={challengeCards[2].title} 
                description={challengeCards[2].description} 
                index={2}
              />
              <InteractiveChallengeCard 
                title={challengeCards[3].title} 
                description={challengeCards[3].description} 
                index={3}
              />
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

      {/* 7. Testimonials Section (Tamaño más moderado y proporcionado) */}
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