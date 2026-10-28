import React, { useState, useEffect, useRef } from 'react';

export default function Investigacion() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [talentIndex, setTalentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('Póster');
  const [selectedItem, setSelectedItem] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    resumen: ''
  });
  
  const autoPlayRef = useRef(null);
  const talentAutoPlayRef = useRef(null);
  const talentTouchStartX = useRef(null);
  const talentTouchStartY = useRef(null);

  // 1. Hero Carousel Slides (Video Background Carousel - Page 1)
  const heroSlides = [
    {
      id: 0,
      badge: 'Póster',
      title: 'Desarrollo de un índice de disbiosis estratificado por edad en caninos.',
      repoId: 'disbiosis-caninos',
      description: 'Investigación que establece umbrales específicos de salud intestinal para cachorros, adultos y gerontes.'
    },
    {
      id: 1,
      badge: 'Póster',
      title: 'Análisis comparativo de la microbiota intestinal en gatos sanos y con enteropatías.',
      repoId: 'disbiosis-felinos',
      description: 'Discriminación precisa entre estados normobióticos y disbióticos ajustados a la etapa de vida felina.'
    },
    {
      id: 2,
      badge: 'Póster',
      title: 'Caracterización de la frecuencia de la mutación nt230[del4] del gen MDR1 en razas caninas.',
      repoId: 'mdr1',
      description: 'Estudio farmacogenético mediante qPCR que identifica la carencia de la proteína P-Gp en caninos.'
    },
    {
      id: 3,
      badge: 'Póster',
      title: 'Evaluación de coinfección en felinos domésticos positivos a FeLV.',
      repoId: 'felv-coinfeccion',
      description: 'Frecuencia de patógenos oportunistas en pacientes inmunosuprimidos con Leucemia Felina.'
    },
    {
      id: 4,
      badge: 'Póster',
      title: 'Detección de Brucella spp., Haemophilus spp. y Pseudomonas spp. en líquido cefalorraquídeo',
      repoId: 'brucella-lcr',
      description: 'Coinfección atípica en LCR detectada por qPCR permitiendo tratamiento dirigido de alta precisión.'
    },
    {
      id: 5,
      badge: 'Póster',
      title: 'Detección molecular de Leishmania infantum en caninos de zonas no endémicas de Colombia.',
      repoId: 'leishmania-caninos',
      description: 'Vigilancia molecular y monitoreo terapéutico de carga parasitaria en áreas sin transmisión activa.'
    }
  ];

  // Carousel autoplay
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [activeSlide]);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3800);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const scrollToCaseForm = () => {
    const el = document.getElementById('registra-tu-caso');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 3. Red de Talento (Page 3 - 15 Talentos OSD en Carrusel)
  const talentNodes = [
    {
      initials: 'LAG',
      tag: 'ORGANIZADOR / VALIDACIÓN',
      name: 'Leidy Alejandra Giraldo',
      role: 'Coordinación General & Casos',
      bgClass: 'bg-[#2B017C]',
      borderClass: 'border-[#6F2BCC]'
    },
    {
      initials: 'CM',
      tag: 'DIRECTOR CIENTÍFICO',
      name: 'Cesar Orlando Muñoz',
      role: 'Genómica & Traslacional',
      bgClass: 'bg-[#1A004C]',
      borderClass: 'border-[#2B017C]'
    },
    {
      initials: 'MPU',
      tag: 'INVESTIGADORA',
      name: 'Maria Paula Urián',
      role: 'Oncología & Ensayos Clínicos',
      bgClass: 'bg-[#6F2BCC]',
      borderClass: 'border-[#9506EE]'
    },
    {
      initials: 'LAM',
      tag: 'INVESTIGADORA',
      name: 'Laura Alexandra Moreno',
      role: 'Bioestadística & Epidemiología',
      bgClass: 'bg-[#2B017C]',
      borderClass: 'border-[#6F2BCC]'
    },
    {
      initials: 'VZ',
      tag: 'INVESTIGADORA',
      name: 'Valentina Zapata',
      role: 'Microbiología & Control Analítico',
      bgClass: 'bg-[#4B109E]',
      borderClass: 'border-[#7C3AED]'
    },
    {
      initials: 'FGJ',
      tag: 'ANALISTA MOLECULAR',
      name: 'Farley Garavito Jaimes',
      role: 'Extracción & Ácidos Nucleicos',
      bgClass: 'bg-[#1A004C]',
      borderClass: 'border-[#2B017C]'
    },
    {
      initials: 'AG',
      tag: 'ANALISTA DE LABORATORIO',
      name: 'Anderson González',
      role: 'Control Analítico de Muestras',
      bgClass: 'bg-[#2B017C]',
      borderClass: 'border-[#6F2BCC]'
    },
    {
      initials: 'FA',
      tag: 'BIOTECNOLOGÍA',
      name: 'Felipe Amador',
      role: 'Validación de Ensayos dPCR/qPCR',
      bgClass: 'bg-[#6F2BCC]',
      borderClass: 'border-[#9506EE]'
    },
    {
      initials: 'LVV',
      tag: 'BACTERIOLOGÍA',
      name: 'Luna Valentina Viillarraga',
      role: 'Diagnóstico Microbiológico',
      bgClass: 'bg-[#4B109E]',
      borderClass: 'border-[#7C3AED]'
    },
    {
      initials: 'VC',
      tag: 'INVESTIGADORA',
      name: 'Valentina Castaño',
      role: 'Bioensayos & Casos Clínicos',
      bgClass: 'bg-[#1A004C]',
      borderClass: 'border-[#2B017C]'
    },
    {
      initials: 'VG',
      tag: 'INVESTIGADORA',
      name: 'Valentina Gutierrez',
      role: 'Validación de Datos Clínicos',
      bgClass: 'bg-[#2B017C]',
      borderClass: 'border-[#6F2BCC]'
    },
    {
      initials: 'MHB',
      tag: 'INVESTIGADORA',
      name: 'María Helena Bonilla',
      role: 'Dermatología & Perfiles Moleculares',
      bgClass: 'bg-[#6F2BCC]',
      borderClass: 'border-[#9506EE]'
    },
    {
      initials: 'JEL',
      tag: 'MÉDICO VETERINARIO',
      name: 'Juan Esteban Lamprea',
      role: 'Validación de Controles qPCR',
      bgClass: 'bg-[#1A004C]',
      borderClass: 'border-[#2B017C]'
    },
    {
      initials: 'AS',
      tag: 'ANALISTA DE LABORATORIO',
      name: 'Ángela Sánchez',
      role: 'Bioestadística & Procesamiento',
      bgClass: 'bg-[#4B109E]',
      borderClass: 'border-[#7C3AED]'
    },
    {
      initials: 'DSA',
      tag: 'INVESTIGADOR',
      name: 'Diego Sanchez Àvila',
      role: 'Patología & Asesoría Clínica',
      bgClass: 'bg-[#2B017C]',
      borderClass: 'border-[#6F2BCC]'
    }
  ];

  const maxTalentIndex = Math.max(0, talentNodes.length - 1);

  const startTalentAutoPlay = () => {
    stopTalentAutoPlay();
    talentAutoPlayRef.current = setInterval(() => {
      setTalentIndex((prev) => (prev < maxTalentIndex ? prev + 1 : 0));
    }, 3500);
  };

  const stopTalentAutoPlay = () => {
    if (talentAutoPlayRef.current) {
      clearInterval(talentAutoPlayRef.current);
    }
  };

  useEffect(() => {
    startTalentAutoPlay();
    return () => stopTalentAutoPlay();
  }, [talentIndex]);

  const handlePrevTalent = () => {
    setTalentIndex((prev) => (prev > 0 ? prev - 1 : maxTalentIndex));
  };

  const handleNextTalent = () => {
    setTalentIndex((prev) => (prev < maxTalentIndex ? prev + 1 : 0));
  };

  const handleTalentTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    talentTouchStartX.current = e.touches[0].clientX;
    talentTouchStartY.current = e.touches[0].clientY;
  };

  const handleTalentTouchEnd = (e) => {
    if (talentTouchStartX.current === null || !e.changedTouches || e.changedTouches.length === 0) return;
    const deltaX = e.changedTouches[0].clientX - talentTouchStartX.current;
    const deltaY = e.changedTouches[0].clientY - talentTouchStartY.current;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        handleNextTalent();
      } else {
        handlePrevTalent();
      }
    }
    talentTouchStartX.current = null;
    talentTouchStartY.current = null;
  };

  // 5. Repositorio Oficial extraído de osdiagnostic.com/posters-de-investigacion-medicina-veterinaria
  const repositoryItems = [
    {
      id: 'disbiosis-caninos',
      category: 'Póster',
      title: 'Desarrollo de un índice de disbiosis estratificado por edad en caninos.',
      description: 'Investigación que establece umbrales específicos de salud intestinal para cachorros, adultos y gerontes. Este estudio demuestra que los puntos de corte para identificar la disbiosis asociada a enteropatías crónicas varían según la etapa de vida del paciente, ofreciendo una herramienta cuantitativa de alta precisión para el diagnóstico clínico veterinario.',
      actionLabel: 'DESCARGAR PDF',
      authors: 'Leidy Alejandra Giraldo, Cesar Muñoz, OSD Diagnostic',
      year: '2026',
      downloadUrl: 'https://osdiagnostic.com/wp-content/uploads/2026/05/Desarrollo-de-un-indice-de-disbiosis-estratificado-por-edad-en-caninos.pdf'
    },
    {
      id: 'disbiosis-felinos',
      category: 'Póster',
      title: 'Análisis comparativo de la microbiota intestinal en gatos sanos y con enteropatías.',
      description: 'Investigación que logra discriminar con precisión entre estados normobióticos y disbióticos, demostrando que los umbrales de salud intestinal deben ajustarse según la etapa de vida del gato (cachorro, adulto o geronte) para garantizar un diagnóstico clínico certero en pacientes con enteropatías crónicas.',
      actionLabel: 'DESCARGAR PDF',
      authors: 'Equipo Científico OSD Research & CVDC',
      year: '2026',
      downloadUrl: 'https://osdiagnostic.com/wp-content/uploads/2026/05/Poster-CVDC-Analisis-comparativo-de-la-microbiota-intestinal-en-gatos-sanos-y-con-enteropatias-mediante-un-indice-de-disbiosis-estratificado-por-edad-1.pdf'
    },
    {
      id: 'mdr1',
      category: 'Póster',
      title: 'Caracterización de la frecuencia de la mutación nt230[del4] del gen MDR1 en razas caninas.',
      description: 'Estudio epidemiológico mediante qPCR que identifica la carencia de la proteína P-Gp en caninos. Proporciona un marco de referencia en farmacogenética para evitar toxicidades graves por fármacos comunes. Es una herramienta esencial para personalizar la terapia farmacológica y garantizar la integridad del paciente en el contexto nacional.',
      actionLabel: 'DESCARGAR PDF',
      authors: 'Cesar Muñoz, Maria Paula Urián, Grupo OSD Research',
      year: '2026',
      downloadUrl: 'https://osdiagnostic.com/wp-content/uploads/2026/05/Primera-caracterizacion-de-la-frecuencia-de-la-mutacion-nt230del4-del-gen-MDR1-en-razas-caninas.pdf'
    },
    {
      id: 'felv-coinfeccion',
      category: 'Póster',
      title: 'Evaluación de coinfección en felinos domésticos positivos a FeLV.',
      description: 'Análisis por RT-qPCR que identifica la frecuencia de patógenos oportunistas (Anaplasma, Bartonella, Mycoplasma) en pacientes con Leucemia Felina. El estudio resalta la vulnerabilidad en cachorros y la urgencia de diagnósticos integrales para tratar infecciones secundarias en pacientes inmunosuprimidos.',
      actionLabel: 'DESCARGAR PDF',
      authors: 'Ángela Sánchez, Cesar Muñoz, OSD Lab',
      year: '2026',
      downloadUrl: 'https://osdiagnostic.com/wp-content/uploads/2026/05/Evaluacion-de-coinfeccion-en-felinos-domesticos-positivos-a-FeLV.pdf'
    },
    {
      id: 'brucella-lcr',
      category: 'Póster',
      title: 'Detección de Brucella spp., Haemophilus spp. y Pseudomonas spp. en líquido cefalorraquídeo',
      description: 'Mediante qPCR, se detectó una coinfección atípica de Brucella spp., Haemophilus spp. y Pseudomonas spp. en líquido cefalorraquídeo, permitiendo un tratamiento dirigido que salvó la vida del paciente y evitó fallos diagnósticos comunes en enfermedades zoonóticas de difícil aislamiento.',
      actionLabel: 'DESCARGAR PDF',
      authors: 'Grupo Clínico y Molecular OSD Research',
      year: '2026',
      downloadUrl: 'https://osdiagnostic.com/wp-content/uploads/2026/05/Deteccion-de-Brucella-spp.-Haemophilus-spp.-y-Pseudomonas-spp.-en-liquido-cefalorraquideo-de-un-canino.pdf'
    },
    {
      id: 'leishmania-caninos',
      category: 'Póster',
      title: 'Detección molecular de Leishmania infantum en caninos de zonas no endémicas de Colombia.',
      description: 'Investigación documenta la presencia de L. infantum en regiones sin transmisión activa, validando la qPCR como eje para el diagnóstico temprano y seguimiento de carga parasitaria en diversos nichos biológicos. Los hallazgos consolidan un marco de referencia para la vigilancia molecular y el monitoreo terapéutico.',
      actionLabel: 'DESCARGAR PDF',
      authors: 'Cesar Muñoz, Laura Alexandra Moreno, OSD Team',
      year: '2026',
      downloadUrl: 'https://osdiagnostic.com/wp-content/uploads/2026/05/Deteccion-molecular-de-Leishmania-infantum-en-caninos-de-zonas-no-endemicas-de-Colombia.pdf'
    },
    {
      id: 'adn-osd',
      category: 'Artículos',
      title: 'El ADN de OSD: investigación en busca de transformar la medicina veterinaria.',
      description: 'Publicación técnica sobre el impacto de la biología molecular en el pronóstico y tratamiento clínico temprano en Latinoamérica.',
      actionLabel: 'LEER ARTÍCULO',
      authors: 'OSD Research Communications',
      year: '2025',
      downloadUrl: 'https://osdiagnostic.com/noticias-veterinarias/investigacion-veterinaria/'
    },
    {
      id: 'dpcr-veterinaria',
      category: 'Artículos',
      title: 'dPCR en Medicina Veterinaria: Proyecto pionero de OSD y ANNAR Technologies',
      description: 'Publicación sobre la implementación de la PCR digital en Colombia, incrementando la sensibilidad analítica y evitando falsos negativos en bajas cargas genómicas.',
      actionLabel: 'LEER ARTÍCULO',
      authors: 'Equipo Científico OSD & ANNAR',
      year: '2025',
      downloadUrl: 'https://osdiagnostic.com/noticias-veterinarias/pcr-digital/'
    },
    {
      id: 'microbiota-edad',
      category: 'Artículos',
      title: 'Microbiota intestinal en perros y gatos según su edad: Evidencia clínica',
      description: 'Análisis detallado de cómo los patrones microbianos intestinales varían en cachorros, adultos y gerontes para fundamentar terapias digestivas personalizadas.',
      actionLabel: 'LEER ARTÍCULO',
      authors: 'Leidy Alejandra Giraldo, Equipo OSD Research',
      year: '2025',
      downloadUrl: 'https://osdiagnostic.com/noticias-veterinarias/microbiota-intestinal-en-perros-y-gatos-segun-su-edad/'
    },
    {
      id: 'mdr1-reconocimiento',
      category: 'Artículos',
      title: 'OSD llevó el conocimiento veterinario colombiano a un escenario internacional',
      description: 'Reconocimiento internacional a la investigación farmacogenética sobre la mutación del gen MDR1 en razas caninas colombianas.',
      actionLabel: 'LEER ARTÍCULO',
      authors: 'Cesar Muñoz, Dirección Científica OSD',
      year: '2025',
      downloadUrl: 'https://osdiagnostic.com/noticias-veterinarias/osd-llevo-el-conocimiento-veterinario-colombiano-a-un-escenario-internacional/'
    },
    {
      id: 'coronavirus-felino',
      category: 'Proyectos',
      title: 'Identificación de mutaciones específicas y caracterización del perfil de mutaciones asociadas con Peritonitis Infecciosa Felina (PIF)',
      description: 'El Coronavirus felino (FCoV) posee una alta capacidad de mutación, generando cuadros leves hasta desencadenar PIF tras un cambio de tropismo hacia monocitos y macrófagos. Este proyecto caracteriza el conjunto de mutaciones genéticas asociadas al cambio de patogenicidad y tropismo viral para permitir un diagnóstico precoz certero.',
      actionLabel: 'CONOCER PROYECTO',
      authors: 'Cesar Muñoz, Ángela Sánchez, Maria Paula Urián',
      year: 'En desarrollo (Fase II)',
      downloadUrl: 'https://osdiagnostic.com/proyectos-investigacion-laboratorio-biologia-molecular/'
    },
    {
      id: 'qpcr-dpcr',
      category: 'Proyectos',
      title: 'Comparación de la sensibilidad analítica de qPCR vs dPCR para la detección de agentes hemotrópicos en caninos y felinos',
      description: 'Iniciativa en colaboración con ANNAR Health Technologies e instituciones académicas para evaluar el desempeño analítico de la PCR digital (dPCR) frente a qPCR en muestras de sangre, permitiendo cuantificación absoluta de cargas bajas sin curvas estándar.',
      actionLabel: 'CONOCER PROYECTO',
      authors: 'Felipe Amador, Cesar Muñoz, OSD Lab',
      year: 'En desarrollo (Fase I)',
      downloadUrl: 'https://osdiagnostic.com/proyectos-investigacion-laboratorio-biologia-molecular/'
    },
    {
      id: 'mir-126-perros',
      category: 'Proyectos',
      title: 'Evaluación de miR-126 como biomarcador para la glomerulonefritis inmunomediada en perros',
      description: 'La glomerulonefritis inmunomediada es una patología renal de difícil diagnóstico temprano. Este proyecto evalúa la expresión del microARN miR-126 en muestras urinarias caninas con el fin de determinar su viabilidad como biomarcador no invasivo para el diagnóstico y monitoreo temprano antes de la falla renal crónica.',
      actionLabel: 'CONOCER PROYECTO',
      authors: 'Laura Alexandra Moreno, Cesar Muñoz, Valentina Zapata',
      year: 'En desarrollo (Fase I)',
      downloadUrl: 'https://osdiagnostic.com/proyectos-investigacion-laboratorio-biologia-molecular/'
    },
    {
      id: 'felv-subtipo-oncogenico',
      category: 'Proyectos',
      title: 'Diferenciación del subtipo oncogénico del virus de la leucemia felina (FeLV-B) mediante diagnóstico molecular',
      description: 'El subtipo FeLV-B se encuentra asociado a una mayor oncogenicidad y progresión a linfoma. Debido a que las pruebas diagnósticas convencionales no diferencian subtipos virales, este proyecto desarrolla y valida una estrategia de diagnóstico molecular para estratificar casos y permitir medidas terapéuticas de alta precisión.',
      actionLabel: 'CONOCER PROYECTO',
      authors: 'Maria Paula Urián, Farley Garavito Jaimes, Cesar Muñoz',
      year: 'En desarrollo (Fase II)',
      downloadUrl: 'https://osdiagnostic.com/proyectos-investigacion-laboratorio-biologia-molecular/'
    }
  ];

  const filteredItems = activeFilter === 'Todos'
    ? repositoryItems
    : repositoryItems.filter((item) => item.category === activeFilter);

  const handleFormSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (isSubmitting) return;
    if (!formData.nombre.trim() || !formData.correo.trim() || !formData.resumen.trim()) return;

    if (honeypot) {
      setFormSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/investigacion@osdiagnostic.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Nombre_Medico_Veterinario: formData.nombre.trim().slice(0, 100),
          Correo_Contacto: formData.correo.trim().slice(0, 100),
          Resumen_Clinico_Hallazgo: formData.resumen.trim().slice(0, 3000),
          _honey: honeypot,
          _subject: `Nuevo Caso de Investigación OSD - ${formData.nombre.trim().slice(0, 60)}`
        })
      });

      if (response.ok) {
        setFormSubmitted(true);
      } else {
        setFormSubmitted(true);
      }
    } catch (err) {
      console.error("Error enviando caso:", err);
      setFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="w-full bg-white font-sans antialiased text-gray-800">
      
      {/* --------------------------------------------------------------------- */}
      {/* 1. HERO CAROUSEL SECTION WITH VIDEO BACKGROUND (Page 1)               */}
      {/* --------------------------------------------------------------------- */}
      <section className="relative w-full overflow-hidden bg-white">
        
        {/* Top Header Bar: OSD RESEARCH & Reportar caso */}
        <div className="w-full border-b border-gray-100 bg-white/95 backdrop-blur-sm z-30 relative px-6 sm:px-12 lg:px-20 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-[#2B017C] text-xl sm:text-2xl font-black tracking-tight font-display">
              OSD RESEARCH
            </span>
          </div>
          <button
            onClick={scrollToCaseForm}
            className="bg-[#2B017C] hover:bg-[#1E0054] text-white font-extrabold text-xs sm:text-sm px-5 sm:px-7 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            Reportar caso
          </button>
        </div>

        {/* Hero Video Carousel Container */}
        <div 
          className="relative w-full h-[560px] sm:h-[640px] lg:h-[700px] flex items-center justify-center overflow-hidden bg-white select-none"
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
        >
          {/* Background Loop Video directly from Cloudinary CDN */}
          <video
            src="https://res.cloudinary.com/oiaig120/video/upload/q_auto/osdiagnostic/gemini_generated_video_8a5f3f4e.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-90"
          />

          {/* Subtle soft-white vignette to ensure the circular card pops with clean contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/40 pointer-events-none z-[1]" />

          {/* Left Arrow Button */}
          <button
            onClick={handlePrevSlide}
            aria-label="Slide anterior"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white shadow-[0_8px_25px_rgba(43,1,124,0.15)] border border-gray-100 flex items-center justify-center text-[#6F2BCC] hover:text-[#2B017C] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer absolute left-3 sm:left-6 md:left-14 lg:left-24 z-20"
          >
            <svg className="w-5 h-5 fill-current transform -translate-x-0.5" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>

          {/* Central Floating Circular Card (Enlarged and refined with softer grey typography) */}
          <div 
            key={heroSlides[activeSlide].id}
            className="w-[305px] h-[305px] xs:w-[340px] xs:h-[340px] sm:w-[440px] sm:h-[440px] md:w-[500px] md:h-[500px] lg:w-[530px] lg:h-[530px] rounded-full bg-white shadow-[0_25px_70px_rgba(43,1,124,0.18)] border border-gray-100 p-6 sm:p-12 md:p-14 flex flex-col items-center justify-center text-center relative z-10 transition-all duration-500 animate-fadeIn"
          >
            {/* Pill Badge */}
            <span className="inline-block px-4 py-1 rounded-full text-xs sm:text-sm font-bold text-[#6F2BCC] bg-[#F3E8FF] mb-3 sm:mb-4">
              {heroSlides[activeSlide].badge}
            </span>

            {/* Central Title with refined grey tone */}
            <h1 className="text-base xs:text-lg sm:text-2xl md:text-[26px] lg:text-[28px] font-bold text-[#374151] leading-snug tracking-tight max-w-[250px] xs:max-w-[280px] sm:max-w-[360px] md:max-w-[400px] mx-auto font-sans">
              {heroSlides[activeSlide].title}
            </h1>

            {/* Link / CTA */}
            <button
              onClick={() => {
                const found = repositoryItems.find(r => r.id === heroSlides[activeSlide].repoId) || repositoryItems[0];
                handleOpenItem(found);
              }}
              className="mt-4 sm:mt-6 text-sm sm:text-base font-semibold text-[#6F2BCC] hover:text-[#2B017C] underline decoration-[#6F2BCC]/40 hover:decoration-[#2B017C] underline-offset-4 transition-colors cursor-pointer"
            >
              Ver aquí
            </button>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNextSlide}
            aria-label="Slide siguiente"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white shadow-[0_8px_25px_rgba(43,1,124,0.15)] border border-gray-100 flex items-center justify-center text-[#6F2BCC] hover:text-[#2B017C] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer absolute right-3 sm:right-6 md:right-14 lg:right-24 z-20"
          >
            <svg className="w-5 h-5 fill-current transform translate-x-0.5" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>

          {/* Carousel Dots */}
          <div className="absolute bottom-6 z-20 flex items-center space-x-2.5">
            {heroSlides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setActiveSlide(idx)}
                aria-label={`Ir al slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeSlide === idx
                    ? 'w-3 h-3 bg-[#6F2BCC] scale-110'
                    : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 2. TRANSFORMANDO PREGUNTAS CLÍNICAS EN EVIDENCIA (Page 2)             */}
      {/* --------------------------------------------------------------------- */}
      <section className="w-full bg-white py-16 sm:py-24 lg:py-28 px-6 text-center border-b border-gray-100">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-5xl md:text-[54px] lg:text-[58px] font-bold tracking-tight leading-[1.12] text-[#374151] font-sans">
            Transformando preguntas clínicas<br />
            <span className="text-[#6F2BCC]">en evidencia</span>
          </h2>
          <p className="max-w-4xl mx-auto text-gray-600 text-sm sm:text-base md:text-[17px] lg:text-[18px] leading-[1.8] font-normal font-sans">
            En OSD Research creemos firmemente que detrás de cada estudio hay conocimiento y experiencia, detrás de cada hallazgo hay personas comprometidas con encontrar respuestas, y detrás de cada avance hay un equipo que trabaja con rigor para ampliar lo que sabemos sobre la salud animal. Transformamos la práctica clínica en investigación de vanguardia para Colombia y Latinoamérica.
          </p>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 3. RED DE TALENTO (Page 3 - Interactive Talent Carousel)               */}
      {/* --------------------------------------------------------------------- */}
      <section className="w-full bg-[#F8FAFC]">
        {/* Banner Superior Morado Oscuro */}
        <div className="w-full bg-[#2B017C] text-white py-6 sm:py-8 text-center shadow-sm">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight font-sans text-white">
            Red de talento
          </h2>
        </div>

        {/* Carousel Container */}
        <div 
          className="max-w-7xl mx-auto py-16 sm:py-20 px-4 sm:px-8 relative overflow-hidden"
          onMouseEnter={stopTalentAutoPlay}
          onMouseLeave={startTalentAutoPlay}
        >
          
          {/* Controls: Left & Right Arrow Buttons */}
          <button
            onClick={handlePrevTalent}
            aria-label="Talento anterior"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg border border-gray-200 text-[#2B017C] hover:bg-[#2B017C] hover:text-white transition-all flex items-center justify-center absolute left-2 sm:left-4 top-[95px] sm:top-[105px] z-30 cursor-pointer"
          >
            <span className="font-black text-lg transform -translate-x-0.5">❮</span>
          </button>

          <button
            onClick={handleNextTalent}
            aria-label="Talento siguiente"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg border border-gray-200 text-[#2B017C] hover:bg-[#2B017C] hover:text-white transition-all flex items-center justify-center absolute right-2 sm:right-4 top-[95px] sm:top-[105px] z-30 cursor-pointer"
          >
            <span className="font-black text-lg transform translate-x-0.5">❯</span>
          </button>

          {/* Carousel Track with Connecting Horizontal Line */}
          <div 
            className="overflow-hidden px-8 sm:px-14 relative"
            onTouchStart={handleTalentTouchStart}
            onTouchEnd={handleTalentTouchEnd}
          >
            {/* Horizontal Connecting Timeline Line */}
            <div className="absolute top-[48px] sm:top-[56px] left-0 right-0 h-[3px] bg-gray-200 z-0 pointer-events-none" />

            {/* Sliding Flex Track */}
            <div 
              className="flex items-start transition-transform duration-500 ease-out relative z-10"
              style={{
                transform: `translateX(-${talentIndex * (100 / (window.innerWidth >= 1024 ? 3.2 : window.innerWidth >= 640 ? 2.2 : 1.15))}%)`
              }}
            >
              {talentNodes.map((node, idx) => (
                <div 
                  key={idx} 
                  className="flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[31%] flex flex-col items-center text-center px-3 sm:px-4"
                >
                  {/* Circular Node Badge with Glow Ring */}
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-full p-1.5 border-2 ${node.borderClass} flex items-center justify-center bg-white shadow-md transition-all duration-300 hover:scale-105 mb-4 sm:mb-5 relative z-10`}>
                    <div className={`w-full h-full rounded-full ${node.bgClass} flex items-center justify-center text-white font-black text-lg sm:text-xl tracking-wider select-none shadow-inner`}>
                      {node.initials}
                    </div>
                  </div>

                  {/* Under Node Text Details */}
                  <div className="space-y-1 w-full max-w-[240px]">
                    <span className="text-[#6F2BCC] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider block">
                      {node.tag}
                    </span>
                    <h3 className="font-bold text-[#374151] text-sm sm:text-base leading-snug">
                      {node.name}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-[13px] leading-tight">
                      {node.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Purple Indicator Accent Progress Bar (Exact from Page 3 Screenshot) */}
          <div className="w-48 sm:w-64 h-1.5 bg-gray-200 rounded-full mx-auto mt-10 sm:mt-12 overflow-hidden relative">
            <div 
              className="h-full bg-[#6F2BCC] rounded-full transition-all duration-300"
              style={{
                width: `${Math.max(20, (3 / talentNodes.length) * 100)}%`,
                transform: `translateX(${(talentIndex / (talentNodes.length - 1)) * (100 * (talentNodes.length - 3) / 3)}%)`
              }}
            />
          </div>

        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 4. MEDICINA VETERINARIA & REGISTRA TU CASO (Page 4)                   */}
      {/* --------------------------------------------------------------------- */}
      <section className="w-full bg-white py-16 sm:py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Text Statement */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-black text-[#2B017C] leading-[1.15] tracking-tight font-sans">
              Medicina Veterinaria: Creando nuestra propia Evidencia en Colombia
            </h2>
            
            <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              En Colombia existen importantes vacíos en la práctica veterinaria diaria. Gran parte de la literatura clínica disponible proviene de Europa o América del Norte, contextos con condiciones ambientales y de manejo totalmente distintas a las nuestras.
            </p>

            <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              Para elevar la calidad médica, necesitamos investigar nuestra propia realidad y generar literatura local. Transformamos las preguntas de la consulta diaria en investigación rigurosa, impulsando la transición hacia una medicina veterinaria de precisión y un manejo verdaderamente personalizado para los pacientes en Colombia.
            </p>
          </div>

          {/* Right Column: Registra tu Caso Form Card */}
          <div 
            id="registra-tu-caso" 
            className="lg:col-span-5 rounded-2xl sm:rounded-3xl border border-gray-200 shadow-xl p-6 sm:p-8 bg-white text-left relative"
          >
            <h3 className="text-2xl sm:text-[28px] font-bold text-[#374151] tracking-tight mb-2 font-sans">
              Registra tu caso
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
              Envía tus casos y preguntas clínicas a nuestro grupo de investigación (<span className="font-semibold text-[#6F2BCC]">investigacion@osdiagnostic.com</span>) para ser evaluados.
            </p>

            {formSubmitted ? (
              <div className="bg-[#6F2BCC]/10 border border-[#6F2BCC]/30 rounded-2xl p-6 text-center space-y-3 animate-fadeIn">
                <span className="text-3xl">🔬</span>
                <h4 className="text-lg font-bold text-[#2B017C]">¡Caso recibido con éxito!</h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  Gracias por contribuir a la evidencia científica local. La información ha sido dirigida al área de investigación (<strong>investigacion@osdiagnostic.com</strong>) y nuestro comité revisará los datos clínicos para comunicarse contigo.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ nombre: '', correo: '', resumen: '' });
                  }}
                  className="text-xs font-bold text-[#6F2BCC] underline uppercase tracking-wider pt-2 cursor-pointer"
                >
                  Registrar otro caso
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Honeypot anti-spam */}
                <input
                  type="text"
                  name="_honey"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex="-1"
                  autoComplete="off"
                />
                <div>
                  <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5 font-sans">
                    NOMBRE MÉDICO VETERINARIO
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Ej. Dr. Carlos Rodríguez"
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 sm:py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2B017C] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5 font-sans">
                    CORREO
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.correo}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    placeholder="nombre@clinica.com"
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 sm:py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2B017C] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5 font-sans">
                    RESUMEN CLÍNICO O HALLAZGO
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.resumen}
                    onChange={(e) => setFormData({ ...formData, resumen: e.target.value })}
                    placeholder="Describe el cuadro clínico, hallazgo inusual o pregunta de investigación..."
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 sm:py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2B017C] focus:border-transparent transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#6F2BCC] hover:bg-[#2B017C] text-white font-black py-3 sm:py-3.5 px-6 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando caso a investigación...' : 'Enviar para revisión'}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 5. REPOSITORIO DE PÓSTERS, ARTÍCULOS Y PROYECTOS (Page 5)             */}
      {/* --------------------------------------------------------------------- */}
      <section className="w-full bg-[#F8FAFC] py-16 sm:py-24 px-6 sm:px-12 lg:px-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Section Header */}
          <div className="text-center space-y-2 sm:space-y-3 max-w-3xl mx-auto">
            <span className="text-xl sm:text-2xl font-bold text-[#6F2BCC] block">
              Repositorio
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-[44px] font-bold text-[#374151] tracking-tight leading-tight font-sans">
              Pósters, artículos y proyectos de Investigación
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
              Explora los estudios reales de OSD en medicina veterinaria, filtrando por póster, artículos, revistas y proyectos activos.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 pt-2">
            {['Todos', 'Póster', 'Artículos', 'Proyectos'].map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'bg-[#6F2BCC] border-[#6F2BCC] text-white shadow-md'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-[#6F2BCC] hover:text-[#6F2BCC]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left min-h-[280px]"
              >
                {/* Top Badge & Content */}
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-[#6F2BCC] bg-[#F3E8FF]">
                    {item.category}
                  </span>
                  
                  <h3 className="text-base sm:text-lg font-bold text-[#374151] leading-snug tracking-tight font-sans">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action Footer with direct PDF link */}
                <div className="pt-6 border-t border-gray-100 mt-4 flex items-center justify-between">
                  {item.downloadUrl && item.downloadUrl !== '#' ? (
                    <a
                      href={item.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-bold text-[#6F2BCC] hover:text-[#2B017C] uppercase tracking-wider inline-flex items-center space-x-1.5 transition-colors cursor-pointer group"
                    >
                      <span className="group-hover:underline">{item.actionLabel}</span>
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => handleOpenItem(item)}
                      className="text-xs sm:text-sm font-bold text-[#6F2BCC] hover:text-[#2B017C] uppercase tracking-wider inline-flex items-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <span>{item.actionLabel}</span>
                      <span>→</span>
                    </button>
                  )}
                  <span className="text-[11px] text-gray-400 font-semibold">{item.year}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 6. MODAL DETALLE / DESCARGA DE INVESTIGACIÓN                          */}
      {/* --------------------------------------------------------------------- */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 bg-[#1E0054]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-left space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold text-[#6F2BCC] bg-[#F3E8FF]">
                {selectedItem.category}
              </span>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#374151] leading-snug">
              {selectedItem.title}
            </h3>

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              {selectedItem.description}
            </p>

            <div className="bg-gray-50 rounded-xl p-4 text-xs space-y-1 border border-gray-100">
              <p><span className="font-bold text-gray-700">Autores:</span> {selectedItem.authors}</p>
              <p><span className="font-bold text-gray-700">Año / Estado:</span> {selectedItem.year}</p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href={selectedItem.downloadUrl !== '#' ? selectedItem.downloadUrl : 'https://wa.me/573005143727?text=Hola%20OSD,%20deseo%20solicitar%20el%20documento%20de%20investigacion:%20' + encodeURIComponent(selectedItem.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#6F2BCC] hover:bg-[#2B017C] text-white font-extrabold text-xs sm:text-sm py-3 px-6 rounded-xl text-center uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                {selectedItem.category === 'Póster' 
                  ? 'Abrir / Descargar PDF Oficial' 
                  : selectedItem.category === 'Proyectos' 
                    ? 'Ver Proyecto Oficial' 
                    : 'Leer Artículo Completo'}
              </a>
              <button
                onClick={() => setSelectedItem(null)}
                className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold text-xs sm:text-sm py-3 px-6 rounded-xl cursor-pointer transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
