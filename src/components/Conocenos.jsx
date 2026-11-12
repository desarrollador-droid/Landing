import React, { useState, useEffect, useRef } from 'react';

// Exact team roster: strictly laboratory personnel matching the instructions
const teamMembers = [
  {
    name: "Cesar Orlando",
    role: "Director científico",
    image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/staff-cesar-orlando.png",
    bio: "Bacteriólogo y Laboratorista Clínico de la Universidad de Antioquia. Magister en Ciencias Básicas Biomédicas con Énfasis en Microbiología y Parasitología de la CCBB-UdeA. Doctor en Biotecnología en Salud de la UFRN, Brasil. Una vida profesional dedicada al diseño, estandarización y validación de pruebas moleculares con fines diagnósticos. A lo largo de los 20 años de experiencia en la vida"
  },
  {
    name: "Luna",
    role: "Auxiliar de laboratorio",
    image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/staff-luna.png",
    bio: "Bacterióloga"
  },
  {
    name: "Ángela",
    role: "Analista de laboratorio",
    image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/staff-angela.png",
    bio: "Médico veterinario zootecnista con diplomado en bioestadística y epidemiología. Encargada del procesamiento y control analítico de las pruebas de biología molecular."
  },
  {
    name: "Felipe",
    role: "Analista de laboratorio",
    image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/staff-felipe.png",
    bio: "Biotecnólogo con Diplomado en herramientas moleculares - curso avanzado en biología molecular y cursos avanzados de investigación en biomedicina."
  },
  {
    name: "Maria Helena",
    role: "Analista de laboratorio",
    image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_100/osdiagnostic/staff-maria-elena-new.jpg",
    bio: "Médico veterinario zootecnista con diplomado en dermatología veterinaria. Estandarización y análisis de perfiles dermatológicos qPCR.",
    objectPosition: "center 15%",
    scale: "scale-100"
  },
  {
    name: "Anderson",
    role: "Analista de laboratorio",
    image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/staff-anderson.png",
    bio: "Analista de laboratorio especializado en el control analítico de las muestras remitidas al laboratorio."
  },
  {
    name: "Juan Esteban",
    role: "Analista de laboratorio",
    image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_100/osdiagnostic/staff-juan-esteban-new.jpg",
    bio: "Médico Veterinario. Especialista en la carga técnica, procesamiento de muestras y validación de controles qPCR.",
    objectPosition: "center 22%",
    scale: "scale-100"
  },
  {
    name: "Farley",
    role: "Analista de laboratorio",
    image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/staff-farley.png",
    bio: "Médico veterinario zootecnista. Encargado de la extracción y preparación de ácidos nucleicos de muestras remitidas a nivel nacional."
  },
  {
    name: "María Paula",
    role: "Analista de laboratorio",
    image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/staff-maria-paula.png",
    bio: "Analista de laboratorio brindando soporte técnico en el procesamiento molecular."
  },
  {
    name: "Valentina Zapata",
    role: "Analista de laboratorio",
    image: "/team/valentina-zapata.jpg",
    bio: "Microbiología y control analítico. Encargada del procesamiento técnico y control de calidad analítico en el laboratorio clínico.",
    objectPosition: "center 20%",
    scale: "scale-100"
  }
];

export default function Conocenos() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [triggerAnim, setTriggerAnim] = useState(false);
  const [userRole, setUserRole] = useState('vet');
  const autoPlayRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const activeIndexRef = useRef(0);
  activeIndexRef.current = activeIndex;

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole') || 'vet';
    setUserRole(storedRole);
  }, []);

  // Preload all team member images into browser cache to prevent rendering lag
  useEffect(() => {
    teamMembers.forEach((m) => {
      if (m.image) {
        const img = new Image();
        img.src = m.image;
      }
    });
  }, []);

  const goToSlide = (nextIndex) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setTriggerAnim(true);

    setTimeout(() => {
      setActiveIndex(nextIndex);
      setTriggerAnim(false);
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 350);
    }, 180);
  };

  const handleNext = () => {
    goToSlide((activeIndexRef.current + 1) % teamMembers.length);
  };

  const handlePrev = () => {
    goToSlide((activeIndexRef.current - 1 + teamMembers.length) % teamMembers.length);
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, 4500);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const member = teamMembers[activeIndex];

  return (
    <div className="w-full bg-[#f6f8fa] font-sans antialiased text-[#555555] overflow-x-hidden">
      
      {/* 1. Header Introducción (Somos Únicos - Frameless) - Hidden in pet owner flow */}
      {userRole !== 'owner' && (
        <section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 text-left">
            {/* Left Column: Text Content */}
            <div className="flex-1 space-y-6">
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#2B017C] leading-tight">
                Somos únicos y #1 en calidad diagnóstica
              </h1>
              <h3 className="text-lg md:text-xl font-bold text-gray-700">
                Trabajamos con sondas de hidrólisis diseñadas para ofrecer:
              </h3>
              
              <ul className="space-y-3">
                {[
                  "Alta sensibilidad, permitiendo un diagnóstico completo de los géneros y especies en una sola prueba.",
                  "Alta especificidad, eliminando el riesgo de falsos negativos.",
                  "Sin problemas de inhibiciones de PCR, asegurando resultados precisos y confiables."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm md:text-base">
                    <span className="text-[#00ebd2] text-xl font-bold font-sans">✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="font-extrabold text-[#6F2BCC] text-sm md:text-base">
                ¡Todo lo que necesitas para garantizar un diagnóstico de calidad en tu veterinaria!
              </p>

              <div className="pt-2">
                <a 
                  href="https://wa.me/573005143727" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-block bg-[#2B017C] hover:bg-[#6F2BCC] text-white font-bold py-3.5 px-8 rounded-lg text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  Contáctenos
                </a>
              </div>
            </div>

            {/* Right Column: Illustration Image */}
            <div className="flex-1 max-w-md w-full flex justify-center">
              <img 
                src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/PCR-para-veterinarias-en-Cali.png" 
                alt="PCR Veterinaria" 
                className="w-full h-auto object-contain drop-shadow-md"
              />
            </div>
          </div>
        </section>
      )}

      {/* 2. Nuestro Talento (Staff Slider - Natural Document flow prevents banner clipping) */}
      <section 
        className={`bg-white relative w-full py-8 md:py-12 ${userRole === 'owner' ? 'pt-16' : ''}`}
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
      >
        {/* Header Title inside a dark purple bar - Hidden in pet owner flow */}
        {userRole !== 'owner' && (
          <div className="bg-[#2B017C] text-white text-center py-6 w-full relative z-20 mb-8 md:mb-12">
            <h2 className="text-3xl md:text-[44px] font-bold font-sans tracking-tight">Nuestro talento</h2>
          </div>
        )}

        {/* Main Slider Box - Flow-based flex container */}
        <div className="w-full bg-white px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 flex flex-col lg:flex-row items-center justify-between gap-12 relative mx-auto overflow-visible">
          
          {/* Navigation arrows (Prev/Next) on the top-left inside the padding */}
          <div className="absolute top-0 left-6 sm:left-12 md:left-20 lg:left-28 xl:left-36 flex space-x-3.5 z-30">
            <button 
              onClick={handlePrev}
              disabled={isTransitioningRef.current}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-700 shadow-sm transition-all disabled:opacity-60"
              title="Anterior"
            >
              ❮
            </button>
            <button 
              onClick={handleNext}
              disabled={isTransitioningRef.current}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-700 shadow-sm transition-all disabled:opacity-60"
              title="Siguiente"
            >
              ❯
            </button>
          </div>

          {/* Left Side: Text Profile content */}
          <div 
            className={`flex-1 text-left space-y-6 pt-16 lg:pt-0 z-20 max-w-2xl relative transition-all duration-300 ease-in-out ${
              triggerAnim ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
            }`}
          >
            <div className="space-y-2">
              <h3 className="text-4xl sm:text-5xl md:text-[70px] font-black text-[#2B017C] leading-none tracking-tight font-sans">
                {member.name}
              </h3>
              <span className="text-xl md:text-[27px] font-normal text-[#9506EE] block tracking-wide font-sans mt-2">
                {member.role}
              </span>
            </div>
            <p className="text-[#555555] text-sm md:text-[15px] leading-[1.7] font-light font-sans max-w-[699px]">
              {member.bio}
            </p>
          </div>

          {/* Right Side: Giant Circular Photo centered vertically and extended off the right & top/bottom */}
          <div className="flex-1 flex justify-end items-center relative h-full w-full z-10 overflow-visible">
            
            {/* Unified wrapper that groups all concentric circles and bubbles together - scaled down and adjusted translate-x to fit screen */}
            <div className="relative flex items-center justify-center w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[480px] md:h-[480px] lg:w-[640px] lg:h-[640px] translate-x-12 sm:translate-x-16 lg:translate-x-[180px] z-10 overflow-visible">
              
              {/* Outer grey background circle - perfectly concentric and scales with container */}
              <div 
                className={`w-[110%] h-[110%] rounded-full bg-[#E5E7EB] absolute z-0 transition-all duration-300 ease-out ${
                  triggerAnim ? 'translate-x-[-15px] opacity-40' : 'translate-x-0 opacity-100'
                }`} 
              />
              
              {/* Three light-grey horizontal pill background capsules connected to the concentric wrapper */}
              <div 
                className={`absolute right-[90%] w-[42%] h-[6%] bg-[#E5E7EB] rounded-full top-[25%] z-0 transition-all duration-300 ease-out ${
                  triggerAnim ? 'translate-x-[-50px] opacity-40' : 'translate-x-0 opacity-100'
                }`} 
              />
              <div 
                className={`absolute right-[95%] w-[58%] h-[6%] bg-[#E5E7EB] rounded-full top-1/2 -translate-y-1/2 z-0 transition-all duration-300 ease-out ${
                  triggerAnim ? 'translate-x-[-65px] opacity-40' : 'translate-x-0 opacity-100'
                }`} 
              />
              <div 
                className={`absolute right-[88%] w-[34%] h-[6%] bg-[#E5E7EB] rounded-full bottom-[25%] z-0 transition-all duration-300 ease-out ${
                  triggerAnim ? 'translate-x-[-40px] opacity-40' : 'translate-x-0 opacity-100'
                }`} 
              />

              {/* Concentric Grey backing circle filling the gap completely */}
              <div className="w-[105%] h-[105%] rounded-full bg-[#E5E7EB] absolute z-0" />

              {/* Main Photo Mask with overlaid green/cyan border - stacked images eliminate any microsecond desync */}
              <div className="w-full h-full rounded-full bg-white shadow-md overflow-hidden relative z-10">
                {teamMembers.map((m, idx) => (
                  <div
                    key={m.name}
                    className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${
                      idx === activeIndex
                        ? 'opacity-100 scale-100 z-10'
                        : 'opacity-0 scale-95 z-0 pointer-events-none'
                    }`}
                  >
                    {m.image ? (
                      <img 
                        src={m.image} 
                        alt={m.name} 
                        className={`w-full h-full object-cover select-none ${m.scale || 'scale-[1.24]'}`}
                        style={{ objectPosition: m.objectPosition || 'center', imageRendering: '-webkit-optimize-contrast' }}
                        loading="eager"
                      />
                    ) : (
                      <div className="text-gray-300 text-6xl select-none flex items-center justify-center h-full">👤</div>
                    )}
                  </div>
                ))}
                {/* Thick cyan/green border overlay is the sole frame enclosing the photo */}
                <div className="absolute inset-0 rounded-full border-[10px] md:border-[16px] border-[#01FADA] pointer-events-none z-20" />
              </div>

            </div>

          </div>

        </div>


      </section>

    </div>
  );
}
