import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PreguntasFrecuentes() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "¿Cuál es la diferencia entre qPCR y PCR?",
      icon: "🧬",
      answer: (
        <div className="space-y-3">
          <p>
            La PCR convencional (PCR de punto final) amplifica el ADN blanco y el resultado solo se puede visualizar al final de la reacción, mediante electroforesis en gel de agarosa, lo que ofrece un resultado cualitativo (presencia o ausencia del patógeno).
          </p>
          <p>
            La qPCR (PCR en tiempo real o cuantitativa) permite monitorear la amplificación en cada ciclo mediante fluorescencia, lo que aporta varias ventajas: mayor sensibilidad analítica, resultados cuantitativos (carga del patógeno mediante el valor de Ct), menor riesgo de contaminación cruzada (al no requerir manipulación post-PCR para lectura en gel) y menor tiempo de entrega de resultados.
          </p>
        </div>
      )
    },
    {
      question: "¿Puedo usar un tubo de tapa amarilla para una muestra de sangre?",
      icon: "🧪",
      answer: (
        <div className="space-y-3">
          <p>
            No. Los tubos tapa amarilla contienen gel separador y activador de coágulo, estos componentes interfieren con la reacción de qPCR e inhiben la amplificación, generando falsos negativos o resultados no válidos.
          </p>
          <p>
            Para muestras de sangre, el tubo indicado es el tapa lila (con EDTA como anticoagulante), ya que preserva la integridad del ADN y no interfiere con la reacción.
          </p>
        </div>
      )
    },
    {
      question: "¿Cómo es posible tener resultados en 24 horas?",
      icon: "⏱️",
      answer: (
        <div className="space-y-3">
          <p>
            Contamos con plataformas automatizadas que mejoran los tiempos de procesamiento, así como equipos especializados para qPCR. Adicionalmente, nuestro flujo de trabajo estandarizado en cada etapa nos permite optimizar los tiempos de procesamiento y envío de resultados.
          </p>
        </div>
      )
    },
    {
      question: "¿Qué es el perfil Joe?",
      icon: "🐕",
      answer: (
        <div className="space-y-3">
          <p>
            El perfil Joe es un perfil específico que consta de los siguientes microorganismos: Anaplasma spp., Ehrlichia spp., Rickettsia spp., Wolbachia spp., Mycoplasma spp., Bartonella spp., Hepatozoon spp., Babesia spp., Toxoplasma gondii, Dirofilaria immitis, D. repens, D. striata y Brugia pahangi.
          </p>
          <p>
            El perfil se indica para caninos y felinos, y se solicita el envío de muestra de sangre y orina, con el objetivo de capturar ADN de patógenos filtrado por vía renal, es decir, aprovechar que algunos microorganismos pueden llegar al tejido renal o sus fragmentos de ADN pueden eliminarse por excreción urinaria. Está pensado para casos donde la muestra de sangre periférica no logra un diagnóstico (falsos negativos en sangre), ofreciendo una vía diagnóstica complementaria.
          </p>
        </div>
      )
    }
  ];

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    clinic: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.name.trim() !== '' &&
    formData.clinic.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.message.trim() !== '';

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (isSubmitting) return;

    if (!formData.name.trim() || !formData.clinic.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Por favor completa todos los campos de tu consulta.");
      return;
    }

    if (!acceptedTerms) {
      setAcceptedTerms(true);
    }

    // Anti-bot honeypot check
    if (honeypot) {
      console.warn("Spam blocked via honeypot.");
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
          Nombre: formData.name.trim().slice(0, 100),
          Clinica: formData.clinic.trim().slice(0, 100),
          Email: formData.email.trim().slice(0, 100),
          Mensaje: formData.message.trim().slice(0, 2000),
          _honey: honeypot,
          _subject: `Nueva Consulta FAQ OSD - ${formData.name.trim().slice(0, 60)}`
        })
      });
      
      if (response.ok) {
        setFormSubmitted(true);
        setFormData({ name: '', clinic: '', email: '', message: '' });
        setAcceptedTerms(false);
      } else {
        alert("Hubo un error al enviar tu consulta. Por favor intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Hubo un error de red. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;

    const target = e.target;
    const tagName = target.tagName.toLowerCase();

    // In textarea: Enter submits; Shift+Enter creates a new line
    if (tagName === 'textarea') {
      if (e.shiftKey) return;
      e.preventDefault();
      handleSubmit(e);
      return;
    }

    // In text inputs: if all filled, submit. If not, jump to next input field
    if (tagName === 'input') {
      if (target.type === 'checkbox') return;

      const allFilled =
        formData.name.trim() !== '' &&
        formData.clinic.trim() !== '' &&
        formData.email.trim() !== '' &&
        formData.message.trim() !== '';

      if (allFilled) {
        e.preventDefault();
        handleSubmit(e);
        return;
      }

      e.preventDefault();
      const form = e.currentTarget;
      const focusable = Array.from(
        form.querySelectorAll('input:not([type="hidden"]):not([tabindex="-1"]):not([type="checkbox"]), textarea')
      ).filter(el => !el.disabled && el.offsetParent !== null);

      const index = focusable.indexOf(target);
      if (index > -1 && index < focusable.length - 1) {
        focusable[index + 1].focus();
      }
    }
  };

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-[#fcfdfe] font-sans antialiased text-gray-800 pb-20">
      
      {/* Hero Section */}
      <section className="relative bg-[#2B017C] text-white py-16 md:py-24 px-6 overflow-hidden flex flex-col items-center text-center">
        {/* Animated veterinary background video playing like a GIF */}
        <video 
          className="absolute inset-0 w-full h-full object-cover opacity-[0.55] pointer-events-none select-none z-0" 
          src="https://res.cloudinary.com/oiaig120/video/upload/q_auto/osdiagnostic/donacion-de-sangre.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline
        />
        {/* Color overlay to blend the video with the OSD purple style */}
        <div className="absolute inset-0 bg-[#2B017C]/40 z-0"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00ebd2] rounded-full blur-[120px] opacity-20 transform translate-x-20 -translate-y-20 z-0"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#6F2BCC] rounded-full blur-[120px] opacity-20 transform -translate-x-20 translate-y-20 z-0"></div>

        <div className="max-w-4xl mx-auto z-10 space-y-4">
          <span className="bg-[#00ebd2] text-[#2B017C] font-bold text-xs uppercase tracking-wider py-1.5 px-4 rounded-full font-sans">
            Centro de Soporte Técnico
          </span>
          <h1 className="text-3xl md:text-5xl font-black font-sans leading-tight">
            Preguntas Frecuentes
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto font-medium font-sans">
            Resolvemos tus dudas sobre biología molecular, requerimientos de muestras y la interpretación de perfiles para veterinarias aliados de OSD.
          </p>
        </div>
      </section>

      {/* Main Grid Content: FAQs Left, Contact Form Right */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: FAQs Accordions (7/12 width) */}
          <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-[#2B017C] pb-2 border-b border-gray-100 font-sans">
              Preguntas clínicas y metodológicas
            </h2>
            {faqs.map((faq, idx) => {
              const isOpen = activeIndex === idx;
              return (
                <div 
                  key={idx} 
                  className={`border rounded-2xl transition-all duration-300 ${
                    isOpen 
                      ? 'border-[#6F2BCC]/30 bg-[#6F2BCC]/[0.02] shadow-sm' 
                      : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                  }`}
                >
                  {/* Header button */}
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none transition-colors group"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl select-none">{faq.icon}</span>
                      <span className="text-sm md:text-base font-extrabold text-[#2B017C] group-hover:text-[#6F2BCC] transition-colors leading-snug font-sans">
                        {faq.question}
                      </span>
                    </div>
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      isOpen 
                        ? 'bg-[#2B017C] text-white rotate-180' 
                        : 'bg-gray-100 text-gray-500 group-hover:bg-[#6F2BCC] group-hover:text-white'
                    }`}>
                      {isOpen ? "▲" : "▼"}
                    </span>
                  </button>

                  {/* Animated expandable content */}
                  <div 
                    className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 border-t border-gray-100/60' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-5 text-sm md:text-base text-gray-700 leading-relaxed font-sans font-medium space-y-4">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Aesthetic Contact Form (5/12 width) */}
          <div className="lg:col-span-5 bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 space-y-6">
            <div className="space-y-2 text-left">
              <h2 className="text-xl md:text-2xl font-bold text-[#2B017C] font-sans">
                ¿Aún tienes dudas?
              </h2>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-sans font-medium">
                Déjanos tu consulta científica, veterinaria o comercial y nuestro equipo de expertos se pondrá en contacto contigo en breve.
              </p>
            </div>

            {formSubmitted ? (
              <div className="bg-[#00ebd2]/10 border border-[#00ebd2]/30 rounded-2xl p-8 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-[#00ebd2]/20 rounded-full flex items-center justify-center text-[#2B017C] text-3xl mx-auto font-bold">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-[#2B017C] font-sans">¡Mensaje recibido!</h3>
                <p className="text-sm text-gray-600 font-sans font-medium leading-relaxed">
                  Gracias por escribirnos. Nuestro personal técnico y médico veterinario revisará tu solicitud y te responderá en el menor tiempo posible.
                </p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="mt-2 text-xs font-bold text-[#6F2BCC] hover:underline"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-4 text-left">
                {/* Name field */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-[#2B017C] uppercase tracking-wider block font-sans">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej. Dr. Carlos Mendoza"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6F2BCC] focus:ring-2 focus:ring-[#6F2BCC]/20 outline-none transition-all text-sm font-sans font-medium bg-gray-50/50"
                  />
                </div>

                {/* Clinic / Specialization field */}
                <div className="space-y-1.5">
                  <label htmlFor="clinic" className="text-xs font-bold text-[#2B017C] uppercase tracking-wider block font-sans">
                    Clínica Veterinaria / Especialidad
                  </label>
                  <input
                    type="text"
                    id="clinic"
                    name="clinic"
                    value={formData.clinic}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej. Clínica VetSalud"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6F2BCC] focus:ring-2 focus:ring-[#6F2BCC]/20 outline-none transition-all text-sm font-sans font-medium bg-gray-50/50"
                  />
                </div>

                {/* Email field */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-[#2B017C] uppercase tracking-wider block font-sans">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="carlos.mendoza@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6F2BCC] focus:ring-2 focus:ring-[#6F2BCC]/20 outline-none transition-all text-sm font-sans font-medium bg-gray-50/50"
                  />
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label htmlFor="message" className="text-xs font-bold text-[#2B017C] uppercase tracking-wider block font-sans">
                      Mensaje / Consulta
                    </label>
                    <span className="text-[11px] text-gray-400 font-sans hidden sm:inline">
                      <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-gray-500 font-mono text-[10px]">Enter</kbd> para enviar
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    placeholder="Describe aquí tus dudas sobre perfiles, requerimientos o recolección de muestras..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6F2BCC] focus:ring-2 focus:ring-[#6F2BCC]/20 outline-none transition-all text-sm font-sans font-medium bg-gray-50/50 resize-none"
                  ></textarea>
                </div>

                {/* Honeypot anti-spam hidden field */}
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

                {/* Habeas Data / Política de Privacidad Checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input 
                    id="habeasDataFaq"
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#6F2BCC] focus:ring-[#6F2BCC] cursor-pointer"
                  />
                  <label htmlFor="habeasDataFaq" className="text-xs text-gray-500 leading-snug cursor-pointer select-none">
                    Acepto la <Link to="/politica-de-privacidad" className="text-[#6F2BCC] font-semibold hover:underline" target="_blank" rel="noopener noreferrer">Política de Privacidad</Link> y el tratamiento de mis datos personales según la Ley 1581 de 2012 (Habeas Data).
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-bold py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 uppercase tracking-wider text-xs font-sans mt-2 cursor-pointer ${
                    isFormValid && !isSubmitting
                      ? 'bg-gradient-to-r from-[#6F2BCC] to-[#2B017C] hover:from-[#2B017C] hover:to-[#6F2BCC] text-white shadow-lg'
                      : 'bg-[#6F2BCC]/80 text-white'
                  }`}
                >
                  <span>{isSubmitting ? 'Enviando...' : 'Enviar consulta'}</span>
                  <span>✈</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Support footer card */}
      <section className="max-w-7xl mx-auto px-6 mt-12 text-center">
        <div className="bg-[#2B017C] text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#00ebd2] rounded-full blur-[80px] opacity-15"></div>
          <div className="relative z-10 space-y-6">
            <h3 className="text-xl md:text-2xl font-bold font-sans">¿Prefieres chatear en tiempo real?</h3>
            <p className="text-white/80 text-sm md:text-base max-w-lg mx-auto font-medium font-sans">
              Nuestro equipo científico y comercial está listo para darte soporte inmediato sobre la toma de muestras o perfiles diagnósticos.
            </p>
            <div className="pt-2">
              <a 
                href="https://wa.me/573005143727" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block bg-[#00ebd2] hover:bg-white text-[#2B017C] font-bold py-3.5 px-10 rounded-lg text-sm uppercase tracking-wider transition-colors shadow-md font-sans"
              >
                Hablémonos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
