import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function PreguntasFrecuentes() {
  const [activeIndex, setActiveIndex] = useState(0); // Open the first item by default for great UX
  const [searchQuery, setSearchQuery] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const faqs = [
    {
      id: "qpcr-vs-pcr",
      question: "¿Cuál es la diferencia entre qPCR y PCR?",
      category: "Metodología",
      answer: (
        <div className="space-y-4 text-gray-700 leading-relaxed font-sans text-sm md:text-[15px]">
          <p>
            La <strong className="text-[#2B017C] font-bold">PCR convencional (PCR de punto final)</strong> amplifica el ADN blanco y el resultado solo se puede visualizar al final de la reacción, mediante electroforesis en gel de agarosa, lo que ofrece un resultado cualitativo (presencia o ausencia del patógeno).
          </p>
          <p>
            La <strong className="text-[#6F2BCC] font-bold">qPCR (PCR en tiempo real o cuantitativa)</strong> permite monitorear la amplificación en cada ciclo mediante fluorescencia, lo que aporta varias ventajas clave:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="bg-[#f8f9ff] border border-[#6F2BCC]/15 rounded-xl p-3.5 flex items-start space-x-2.5">
              <span className="text-[#01FADA] bg-[#2B017C] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
              <span className="text-xs sm:text-sm text-[#2B017C] font-semibold">Mayor sensibilidad analítica y especificidad con sondas de hidrólisis</span>
            </div>
            <div className="bg-[#f8f9ff] border border-[#6F2BCC]/15 rounded-xl p-3.5 flex items-start space-x-2.5">
              <span className="text-[#01FADA] bg-[#2B017C] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
              <span className="text-xs sm:text-sm text-[#2B017C] font-semibold">Resultados cuantitativos precisos (carga del patógeno mediante valor de Ct)</span>
            </div>
            <div className="bg-[#f8f9ff] border border-[#6F2BCC]/15 rounded-xl p-3.5 flex items-start space-x-2.5">
              <span className="text-[#01FADA] bg-[#2B017C] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
              <span className="text-xs sm:text-sm text-[#2B017C] font-semibold">Menor riesgo de contaminación cruzada (sin manipulación post-PCR)</span>
            </div>
            <div className="bg-[#f8f9ff] border border-[#6F2BCC]/15 rounded-xl p-3.5 flex items-start space-x-2.5">
              <span className="text-[#01FADA] bg-[#2B017C] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
              <span className="text-xs sm:text-sm text-[#2B017C] font-semibold">Menor tiempo de entrega de resultados clínicos</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "tubo-amarillo",
      question: "¿Puedo usar un tubo de tapa amarilla para una muestra de sangre?",
      category: "Toma de muestras",
      answer: (
        <div className="space-y-4 text-gray-700 leading-relaxed font-sans text-sm md:text-[15px]">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
            <p className="text-red-900 font-bold text-sm">
              ⛔ No. Los tubos de tapa amarilla son inadecuados para biología molecular.
            </p>
            <p className="text-red-800 text-xs sm:text-sm mt-1">
              Contienen gel separador y activador de coágulo. La coagulación degrada el ADN y ARN, y estos componentes interfieren con la reacción de qPCR e inhiben la amplificación enzimática, generando <strong>falsos negativos</strong> o resultados no válidos.
            </p>
          </div>
          <p>
            Para muestras de sangre, el tubo indicado es exclusivamente el <strong className="text-[#6F2BCC] font-bold">tubo tapa lila (con EDTA como anticoagulante)</strong>, ya que preserva de manera óptima la integridad del material genético y no interfiere con la reacción.
          </p>
        </div>
      )
    },
    {
      id: "perfil-joe",
      question: "¿Qué es el perfil Joe?",
      category: "Paneles OSD",
      answer: (
        <div className="space-y-4 text-gray-700 leading-relaxed font-sans text-sm md:text-[15px]">
          <p>
            El <strong className="text-[#2B017C] font-bold">Perfil Joe</strong> es un panel diagnóstico molecular integral desarrollado por OSD, diseñado para identificar patógenos sistémicos incluso cuando la carga en sangre periférica es baja o existe secuestro orgánico en riñón, bazo y endotelio.
          </p>
          <p className="font-semibold text-[#2B017C] text-xs uppercase tracking-wider">
            Microorganismos incluidos en el panel:
          </p>
          <div className="flex flex-wrap gap-2 pt-0.5">
            {[
              "Anaplasma spp.",
              "Ehrlichia spp.",
              "Rickettsia spp.",
              "Wolbachia spp.",
              "Mycoplasma spp.",
              "Bartonella spp.",
              "Hepatozoon spp.",
              "Babesia spp.",
              "Toxoplasma gondii",
              "Dirofilaria immitis",
              "Dirofilaria repens",
              "Dirofilaria striata",
              "Brugia pahangi"
            ].map((p, idx) => (
              <span 
                key={idx}
                className="bg-white border border-[#6F2BCC]/25 text-[#2B017C] text-xs font-semibold px-3 py-1 rounded-full italic shadow-2xs"
              >
                • {p}
              </span>
            ))}
          </div>
          <p className="pt-2">
            El perfil se indica para <strong className="text-[#2B017C]">caninos y felinos</strong>, y se solicita el envío de muestra de <strong className="text-[#6F2BCC]">sangre y orina</strong>, con el objetivo de capturar ADN de patógenos filtrado por vía renal (aprovechando que ciertos microorganismos o fragmentos de ADN se eliminan por excreción urinaria). Está pensado para casos donde la muestra de sangre periférica no logra un diagnóstico concluyente, ofreciendo una vía diagnóstica complementaria de máxima sensibilidad.
          </p>
        </div>
      )
    },
    {
      id: "como-recoleccion",
      question: "¿Cómo solicito la recolección de una muestra?",
      category: "Operación y Rutas",
      answer: (
        <div className="space-y-4 text-gray-700 leading-relaxed font-sans text-sm md:text-[15px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#f8f9ff] border border-gray-200 rounded-2xl p-5 space-y-2.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#6F2BCC] block">
                Paso 1: Si aún no eres cliente
              </span>
              <p className="text-xs sm:text-sm text-gray-600">
                Primero debes registrar tu veterinaria en nuestra base institucional:
              </p>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSeDPoSkLRQm7UiFy2f_U_2f8YE4bU85Ap5QixzMqUvQc-A4pA/viewform"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-xs font-bold text-[#6F2BCC] hover:text-[#2B017C] underline pt-1"
              >
                👉 Formulario de creación de cliente
              </a>
            </div>

            <div className="bg-[#f8f9ff] border border-gray-200 rounded-2xl p-5 space-y-2.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#2B017C] block">
                Paso 2: Si ya eres cliente
              </span>
              <p className="text-xs sm:text-sm text-gray-600">
                Diligencia directamente la solicitud para agendar la ruta logística:
              </p>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSeDPoSkLRQm7UiFy2f_U_2f8YE4bU85Ap5QixzMqUvQc-A4pA/viewform"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-xs font-bold text-[#00bda6] hover:text-[#2B017C] underline pt-1"
              >
                👉 Solicitud de recolección de muestra
              </a>
            </div>
          </div>
          <div className="bg-[#2B017C]/5 border border-[#2B017C]/15 rounded-xl p-4 text-xs sm:text-sm text-[#2B017C]">
            ⏱️ <strong>Tiempos de entrega:</strong> En <strong>Medellín y Bogotá</strong> los resultados se entregan el mismo día hábil. En otras ciudades del país, el tiempo estimado es de <strong>24 a 48 horas hábiles</strong>.
          </div>
        </div>
      )
    },
    {
      id: "resultados-24h",
      question: "¿Cómo es posible tener resultados en 24 horas?",
      category: "Tiempos y Calidad",
      answer: (
        <div className="space-y-3 text-gray-700 leading-relaxed font-sans text-sm md:text-[15px]">
          <p>
            Contamos con <strong className="text-[#2B017C] font-bold">plataformas automatizadas</strong> que aceleran los tiempos de procesamiento, así como equipos especializados de última generación para qPCR cuantitativa en tiempo real.
          </p>
          <p>
            Adicionalmente, nuestro flujo de trabajo estandarizado y validado en cada etapa analítica nos permite optimizar los tiempos de procesamiento y envío de resultados sin comprometer en ningún momento la máxima rigurosidad y precisión diagnóstica.
          </p>
          <p className="text-[#6F2BCC] font-bold text-xs sm:text-sm pt-1">
            En Medellín y Bogotá nuestra promesa es la entrega el mismo día hábil; a nivel nacional, entre 24 y 48 horas hábiles.
          </p>
        </div>
      )
    }
  ];

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const q = searchQuery.toLowerCase();
    return faqs.filter(item => 
      item.question.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  }, [searchQuery, faqs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.message.trim() !== '';

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (isSubmitting) return;

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Por favor completa los campos de tu consulta.");
      return;
    }

    if (honeypot) {
      setFormSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/publicidad@osdiagnostic.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Nombre_Veterinaria: formData.name.trim().slice(0, 100),
          Email: formData.email.trim().slice(0, 100),
          Pregunta_Consulta: formData.message.trim().slice(0, 2000),
          _honey: honeypot,
          _subject: `Nueva Consulta FAQ - ${formData.name.trim().slice(0, 60)}`
        })
      });
      
      if (response.ok) {
        setFormSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setAcceptedTerms(false);
      } else {
        alert("Hubo un error al enviar tu consulta. Por favor intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Hubo un error de red. Por favor intenta de nuevo o contáctanos por WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Structured data Schema.org for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": typeof faq.answer === 'string' ? faq.answer : faq.question
      }
    }))
  };

  return (
    <div className="w-full bg-[#fbfcfd] font-sans antialiased text-gray-800 pb-20">
      
      {/* Schema.org FAQPage structured data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} 
      />

      {/* 1. Header Section - Clean Institutional Style */}
      <section className="bg-gradient-to-b from-[#f2f4fc] to-[#fbfcfd] pt-16 pb-12 md:pt-20 md:pb-16 px-6 text-center border-b border-gray-150/70">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="inline-block bg-[#01FADA]/25 text-[#2B017C] border border-[#01FADA]/40 font-bold text-xs uppercase tracking-wider py-1.5 px-4 rounded-full">
            Centro de Ayuda y Soporte Clínico
          </span>
          <h1 className="text-3xl md:text-[42px] lg:text-[46px] font-black text-[#2B017C] font-sans tracking-tight leading-tight">
            ¿Tienes dudas sobre nuestro servicio de qPCR?
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto font-medium font-sans leading-relaxed">
            Conoce los fundamentos analíticos, requerimientos de muestras biológicas y especificaciones técnicas de nuestros paneles moleculares de diagnóstico veterinario.
          </p>

          {/* Search bar inside header */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busca por palabra clave (ej. tubo, sangre, joe, 24 horas)..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-full text-sm text-[#2B017C] font-medium outline-none shadow-sm focus:border-[#6F2BCC] focus:ring-2 focus:ring-[#6F2BCC]/15 transition-all placeholder:text-gray-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-bold text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main FAQ Accordion Container */}
      <section className="max-w-4xl mx-auto px-6 pt-10 md:pt-14 space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 text-gray-500 space-y-3">
            <p className="text-base font-semibold text-[#2B017C]">No se encontraron preguntas que coincidan con tu búsqueda.</p>
            <p className="text-sm">Intenta con otra palabra clave o pregúntale a nuestro equipo en el formulario inferior.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-[#6F2BCC] underline hover:text-[#2B017C] cursor-pointer"
            >
              Ver todas las preguntas
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div 
                key={faq.id || idx}
                className={`bg-white rounded-2xl transition-all duration-300 border ${
                  isOpen 
                    ? 'border-[#6F2BCC]/40 shadow-md ring-1 ring-[#6F2BCC]/15' 
                    : 'border-gray-200 hover:border-gray-300 shadow-2xs hover:shadow-xs'
                }`}
              >
                {/* Header Question */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none transition-colors group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="pr-4 space-y-1">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#6F2BCC]/80 block font-sans">
                      {faq.category}
                    </span>
                    <h3 className="text-base md:text-lg font-bold text-[#2B017C] group-hover:text-[#6F2BCC] transition-colors leading-snug font-sans">
                      {faq.question}
                    </h3>
                  </div>

                  {/* Plus / Minus or Arrow circle indicator matching live style */}
                  <span className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 text-sm font-bold ${
                    isOpen 
                      ? 'bg-[#2B017C] text-[#01FADA] rotate-180 shadow-xs' 
                      : 'bg-gray-100 text-gray-600 group-hover:bg-[#6F2BCC] group-hover:text-white'
                  }`}>
                    {isOpen ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    )}
                  </span>
                </button>

                {/* Animated Body Content */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen 
                      ? 'grid-rows-[1fr] opacity-100 border-t border-gray-100' 
                      : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-5 md:p-6 pt-4 bg-[#fcfdff] rounded-b-2xl">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* 3. Bottom 2-Column Section (Exact parity with live site: Illustration Left, Contact Form Right) */}
      <section className="max-w-6xl mx-auto px-6 mt-16 md:mt-24">
        <div className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-center">
          
          {/* Left Column: Official Illustration (435x687 que-es-una-pcr.svg) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative max-w-[340px] md:max-w-[380px] w-full">
              <div className="absolute inset-0 bg-[#01FADA]/20 rounded-3xl blur-2xl -z-10 transform scale-95" />
              <img 
                src="https://res.cloudinary.com/oiaig120/image/upload/v1793208042/osdiagnostic/que-es-una-pcr.png" 
                alt="PCR confiable en diagnóstico veterinario - On Site Diagnostic" 
                className="w-full h-auto object-contain select-none drop-shadow-md"
              />
            </div>
          </div>

          {/* Right Column: Contact Form Box */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-1.5">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#2B017C] font-sans tracking-tight">
                ¿Aún tienes dudas?
              </h2>
              <p className="text-lg md:text-xl font-bold text-[#6F2BCC] font-sans">
                En OSD podemos ayudarte
              </p>
              <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed font-sans font-medium pt-1">
                Si no encontraste la respuesta que buscabas, te invitamos a escribirnos. Nuestro equipo técnico está listo para orientarte.
              </p>
            </div>

            {formSubmitted ? (
              <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl p-8 text-center space-y-3">
                <div className="w-14 h-14 bg-[#22c55e] text-white rounded-full flex items-center justify-center text-2xl mx-auto font-bold shadow-sm">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-[#166534] font-sans">¡Consulta enviada con éxito!</h3>
                <p className="text-sm text-gray-700 font-sans leading-relaxed">
                  Gracias por escribirnos. Nuestro equipo científico y veterinario revisará tu pregunta y te responderá al correo indicado en breve.
                </p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="mt-2 text-xs font-bold text-[#6F2BCC] hover:underline cursor-pointer"
                >
                  Enviar otra pregunta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nombre / Veterinaria */}
                <div className="space-y-1">
                  <label htmlFor="name" className="text-xs font-bold text-[#2B017C] uppercase tracking-wider block font-sans">
                    Nombre / veterinaria
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Tu nombre o el de tu clínica veterinaria"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FFFFFFEB] focus:border-[#6F2BCC] focus:ring-2 focus:ring-[#6F2BCC]/15 outline-none transition-all text-sm font-sans font-medium text-[#2B017C]"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label htmlFor="email" className="text-xs font-bold text-[#2B017C] uppercase tracking-wider block font-sans">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="correo@ejemplo.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FFFFFFEB] focus:border-[#6F2BCC] focus:ring-2 focus:ring-[#6F2BCC]/15 outline-none transition-all text-sm font-sans font-medium text-[#2B017C]"
                  />
                </div>

                {/* Tu pregunta */}
                <div className="space-y-1">
                  <label htmlFor="message" className="text-xs font-bold text-[#2B017C] uppercase tracking-wider block font-sans">
                    Tu pregunta
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    placeholder="Escribe aquí tu duda técnica, sobre muestras o tiempos de entrega..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FFFFFFEB] focus:border-[#6F2BCC] focus:ring-2 focus:ring-[#6F2BCC]/15 outline-none transition-all text-sm font-sans font-medium text-[#2B017C] resize-none"
                  ></textarea>
                </div>

                {/* Honeypot anti-bot */}
                <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                  <input 
                    type="text" 
                    name="_honey" 
                    value={honeypot} 
                    onChange={(e) => setHoneypot(e.target.value)} 
                    tabIndex="-1" 
                    autoComplete="off" 
                  />
                </div>

                {/* Habeas Data Consent */}
                <div className="flex items-start gap-2.5 pt-0.5">
                  <input 
                    id="faqHabeasData"
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#6F2BCC] focus:ring-[#6F2BCC] cursor-pointer"
                  />
                  <label htmlFor="faqHabeasData" className="text-xs text-gray-500 leading-snug cursor-pointer select-none">
                    Acepto la <Link to="/politica-de-privacidad" className="text-[#6F2BCC] font-semibold hover:underline" target="_blank" rel="noopener noreferrer">Política de Privacidad</Link> y el tratamiento de mis datos personales para resolver mi consulta.
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-bold py-4 px-8 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 uppercase tracking-wider text-xs font-sans mt-2 cursor-pointer ${
                    isFormValid && !isSubmitting
                      ? 'bg-[#6F2BCC] hover:bg-[#2B017C] text-white shadow-lg transform hover:-translate-y-0.5'
                      : 'bg-[#6F2BCC]/80 text-white'
                  }`}
                >
                  <span>{isSubmitting ? 'Enviando...' : 'Enviar'}</span>
                  <span className="text-sm">→</span>
                </button>
              </form>
            )}

            {/* Direct WhatsApp Callout */}
            <div className="pt-2 border-t border-gray-150 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-500">
              <span>¿Necesitas respuesta inmediata?</span>
              <a 
                href="https://wa.me/573005143727"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 font-bold text-[#00bda6] hover:text-[#2B017C] transition-colors"
              >
                <span>Línea directa WhatsApp: +57 300 5143727</span>
                <span>↗</span>
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
