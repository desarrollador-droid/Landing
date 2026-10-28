import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Contacto() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [clinic, setClinic] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const canvasRef = useRef(null);

  // Live Constellation Particle Network animation for the Contact Welcome Hero
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth || 1200);
    let height = (canvas.height = canvas.offsetHeight || 300);

    const particles = [];
    const particleCount = 35;
    const connectionDistance = 110;

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(1, 250, 218, 0.7)'; // Brand Cyan dots
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(1, 250, 218, ${alpha})`; // Brand Cyan lines
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isFormValid = 
    name.trim() !== '' && 
    clinic.trim() !== '' && 
    email.trim() !== '' && 
    city.trim() !== '' && 
    message.trim() !== '';

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (isSubmitting) return;

    if (!name.trim() || !clinic.trim() || !email.trim() || !city.trim() || !message.trim()) {
      alert("Por favor completa todos los campos requeridos.");
      return;
    }

    if (!acceptedTerms) {
      setAcceptedTerms(true);
    }

    // Anti-bot honeypot check: silently simulate success without calling external API
    if (honeypot) {
      console.warn("Spam submission blocked by honeypot.");
      setFormSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/coordinacioncomercialnal@osdiagnostic.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Nombre: name.trim().slice(0, 100),
          Clinica: clinic.trim().slice(0, 100),
          Email: email.trim().slice(0, 100),
          Ciudad: city.trim().slice(0, 80),
          Mensaje: message.trim().slice(0, 2000),
          _honey: honeypot,
          _subject: `Nuevo Requerimiento OSD - ${name.trim().slice(0, 60)}`
        })
      });
      
      if (response.ok) {
        setFormSubmitted(true);
        setName('');
        setClinic('');
        setEmail('');
        setCity('');
        setMessage('');
        setAcceptedTerms(false);
      } else {
        alert("Hubo un error al enviar el requerimiento. Por favor intenta de nuevo.");
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

    // In textarea: Enter or Ctrl+Enter submits; Shift+Enter creates a new line
    if (tagName === 'textarea') {
      if (e.shiftKey) return;
      e.preventDefault();
      handleSubmit(e);
      return;
    }

    // In text inputs: if all fields are filled, submit. If not, jump to the next input field
    if (tagName === 'input') {
      if (target.type === 'checkbox') return;

      const allFilled = 
        name.trim() !== '' && 
        clinic.trim() !== '' && 
        email.trim() !== '' && 
        city.trim() !== '' && 
        message.trim() !== '';

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

  const slides = [
    {
      city: "Medellín",
      location: "Colegio Mayor de Antioquia",
      image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/lab_medellin.png",
      badge: "Sede Principal"
    },
    {
      city: "Bogotá",
      location: "Sede ECCI",
      image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/lab_bogota_1.png",
      badge: "Laboratorio Bogotá"
    },
    {
      city: "Bogotá",
      location: "Sede Vetwork",
      image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/lab_bogota_2.png",
      badge: "Laboratorio Aliado"
    },
    {
      city: "Bogotá",
      location: "Universidad de Ciencias Aplicadas y Ambientales (UDCA)",
      image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/lab_bogota_3.png",
      badge: "Alianza Académica"
    }
  ];

  return (
    <div className="w-full bg-[#f6f8fa] font-sans antialiased text-[#2B017C]">
      
      {/* Hero Header Section */}
      <section className="bg-[#2B017C] text-white py-20 px-6 relative overflow-hidden text-center flex items-center justify-center min-h-[220px]">
        {/* Live Constellation Particle canvas background */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40" 
        />

        {/* Decorative ambient blur elements */}
        <div className="absolute top-[-50%] left-[-20%] w-[60%] h-[200%] bg-[#6F2BCC]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-50%] right-[-20%] w-[60%] h-[200%] bg-[#01FADA]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-bold font-display uppercase tracking-tight text-[#01FADA]">
            Medios de Contacto
          </h1>
          <p className="text-white/90 text-sm md:text-base lg:text-lg max-w-2xl mx-auto font-semibold font-sans leading-relaxed">
            Estamos listos para atender tus requerimientos de diagnóstico molecular de alta precisión a nivel nacional.
          </p>
        </div>
      </section>

      {/* Main Grid Content (Profile + Channels vs Form) */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Profile Card & Direct Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Director Científico Profile Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 md:p-8 border border-gray-100 shadow-sm text-center space-y-5">
              <div className="w-full h-52 rounded-2xl overflow-hidden border border-gray-100 bg-white flex items-center justify-center">
                <img 
                  src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/cesar_munoz.webp" 
                  alt="César Orlando Muñoz" 
                  className="w-full h-full object-contain bg-white"
                />
              </div>

              <div className="space-y-1">
                <h2 className="text-xl font-bold font-display text-[#2B017C]">
                  César Orlando Muñoz
                </h2>
                <p className="text-xs font-bold text-[#6F2BCC] uppercase tracking-wider font-sans">
                  Director Científico
                </p>
              </div>

              {/* Social Channels Row */}
              <div className="flex justify-center space-x-4">
                <a 
                  href="https://www.tiktok.com/@osd_lab?_t=ZS-8uBbEekR2Wt&_r=1" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-9 h-9 bg-slate-50 hover:bg-[#2B017C] hover:text-white rounded-lg flex items-center justify-center text-[#2B017C] border border-gray-100 transition-colors duration-300"
                  aria-label="TikTok"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path>
                  </svg>
                </a>
                <a 
                  href="https://co.linkedin.com/company/on-site-diagnostic-osd" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-9 h-9 bg-slate-50 hover:bg-[#2B017C] hover:text-white rounded-lg flex items-center justify-center text-[#2B017C] border border-gray-100 transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/osd_lab?igsh=MWcxcDg5cTByMGR0YQ==" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-9 h-9 bg-slate-50 hover:bg-[#2B017C] hover:text-white rounded-lg flex items-center justify-center text-[#2B017C] border border-gray-100 transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                  </svg>
                </a>
              </div>

              {/* Direct WhatsApp Channel */}
              <div className="pt-2 font-sans">
                <a 
                  href="https://wa.link/3jsx74" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full inline-block bg-[#01FADA] hover:bg-[#6F2BCC] hover:text-white text-[#2B017C] font-bold py-3.5 px-6 rounded-xl text-sm transition-all duration-300 uppercase tracking-wide shadow-sm"
                >
                  Escríbeme
                </a>
              </div>
            </div>

            {/* Direct Information List */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 md:p-8 border border-gray-100 shadow-sm space-y-5 sm:space-y-6 text-left font-sans overflow-hidden">
              <div className="flex items-start sm:items-center space-x-3.5 sm:space-x-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 bg-[#6F2BCC]/10 rounded-xl flex items-center justify-center text-[#6F2BCC] text-lg sm:text-xl">
                  📞
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Línea de Atención / WhatsApp
                  </p>
                  <a 
                    href="https://wa.me/573005143727" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="font-bold text-gray-800 hover:text-[#6F2BCC] transition-colors text-sm sm:text-base block truncate"
                  >
                    300 5143727
                  </a>
                </div>
              </div>

              <div className="flex items-start sm:items-center space-x-3.5 sm:space-x-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 bg-[#6F2BCC]/10 rounded-xl flex items-center justify-center text-[#6F2BCC] text-lg sm:text-xl">
                  ✉️
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Correo Electrónico
                  </p>
                  <a 
                    href="mailto:publicidad@osdiagnostic.com" 
                    className="font-bold text-gray-800 hover:text-[#6F2BCC] transition-colors block text-xs sm:text-sm md:text-base break-words break-all sm:break-normal"
                    title="publicidad@osdiagnostic.com"
                  >
                    publicidad@osdiagnostic.com
                  </a>
                </div>
              </div>

              <div className="flex items-start sm:items-center space-x-3.5 sm:space-x-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 bg-[#6F2BCC]/10 rounded-xl flex items-center justify-center text-[#6F2BCC] text-lg sm:text-xl">
                  📍
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Ubicación
                  </p>
                  <p className="font-bold text-gray-800 text-xs sm:text-sm md:text-base leading-snug">
                    Medellín y Bogotá, Colombia (Servicio Nacional)
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Contact Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-7 md:p-10 border border-gray-100 shadow-sm text-left">
            <h3 className="text-2xl font-bold font-display mb-2 text-[#2B017C]">
              Envíanos tu consulta
            </h3>
            <p className="text-gray-500 text-sm mb-8 font-sans leading-relaxed">
              Completa el formulario y nos pondremos en contacto contigo a la brevedad para coordinar despachos, solicitudes de kits o asesorías científicas.
            </p>

            {formSubmitted ? (
              <div className="bg-[#01FADA]/10 border border-[#01FADA]/30 rounded-2xl p-6 text-[#2B017C] space-y-2">
                <p className="font-bold text-lg">✓ ¡Mensaje enviado con éxito!</p>
                <p className="text-sm opacity-90 font-sans">
                  Gracias por comunicarte con nosotros. Un especialista de soporte científico se pondrá en contacto contigo en breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-5 font-sans">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Nombre completo
                    </label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre completo"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:border-[#6F2BCC] text-sm text-gray-800 placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Clínica o Veterinaria
                    </label>
                    <input 
                      type="text" 
                      value={clinic}
                      onChange={(e) => setClinic(e.target.value)}
                      placeholder="Nombre de la veterinaria"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:border-[#6F2BCC] text-sm text-gray-800 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Correo Electrónico
                    </label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@correo.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:border-[#6F2BCC] text-sm text-gray-800 placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Ciudad
                    </label>
                    <input 
                      type="text" 
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ej. Medellín, Bogotá"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:border-[#6F2BCC] text-sm text-gray-800 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Mensaje / Requerimiento
                    </label>
                    <span className="text-[11px] text-gray-400 font-sans hidden sm:inline">
                      <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-gray-500 font-mono text-[10px]">Enter</kbd> para enviar
                    </span>
                  </div>
                  <textarea 
                    rows="5" 
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe tu mensaje aquí (solicitud de kits, cotización de paneles, etc.)."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:border-[#6F2BCC] text-sm text-gray-800 placeholder-gray-400 resize-none"
                  />
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
                    id="habeasDataContacto"
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#6F2BCC] focus:ring-[#6F2BCC] cursor-pointer"
                  />
                  <label htmlFor="habeasDataContacto" className="text-xs text-gray-500 leading-snug cursor-pointer select-none">
                    Acepto la <Link to="/politica-de-privacidad" className="text-[#6F2BCC] font-semibold hover:underline" target="_blank" rel="noopener noreferrer">Política de Privacidad</Link> y el tratamiento de mis datos personales según la Ley 1581 de 2012 (Habeas Data).
                  </label>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full font-bold py-3.5 px-6 rounded-xl text-sm transition-all duration-300 uppercase tracking-wide shadow-md flex items-center justify-center space-x-2 cursor-pointer ${
                      isFormValid && !isSubmitting
                        ? 'bg-[#6F2BCC] hover:bg-[#2B017C] text-white shadow-lg' 
                        : 'bg-[#6F2BCC]/80 hover:bg-[#2B017C] text-white'
                    }`}
                  >
                    <span>{isSubmitting ? 'Enviando...' : 'Enviar Requerimiento'}</span>
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </section>

      {/* Bottom Section: Sedes y Alianzas (Universidades y Centros) */}
      <section className="bg-white py-20 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <h3 className="text-3xl font-bold font-display uppercase tracking-tight text-[#2B017C]">
              Sedes y Alianzas
            </h3>
            <p className="text-gray-500 text-sm max-w-xl mx-auto font-sans leading-relaxed">
              Contamos con instalaciones estratégicas de alta tecnología aliadas a reconocidos centros universitarios y clínicos en el país.
            </p>
          </div>

          {/* Desktop/Tablet Grid View */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
            {slides.map((slide, idx) => (
              <div 
                key={idx}
                className="bg-[#f8f9fa] rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col group hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                  <img 
                    src={slide.image} 
                    alt={slide.location} 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#2B017C] text-[#01FADA] text-[10px] font-bold py-1 px-3 rounded-full uppercase tracking-wider shadow-sm">
                    {slide.city}
                  </span>
                </div>
                <div className="p-5 text-left flex-grow flex flex-col justify-between space-y-2">
                  <span className="text-[10px] font-bold text-[#6F2BCC] uppercase tracking-wider">
                    {slide.badge}
                  </span>
                  <p className="font-bold text-sm text-[#222222] font-display leading-snug">
                    {slide.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Swipe/Slider view */}
          <div className="md:hidden space-y-6">
            <div className="bg-[#f8f9fa] rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col transition-all duration-300">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                <img 
                  src={slides[activeSlide].image} 
                  alt={slides[activeSlide].location} 
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#2B017C] text-[#01FADA] text-[10px] font-bold py-1 px-3 rounded-full uppercase tracking-wider shadow-sm">
                  {slides[activeSlide].city}
                </span>
              </div>
              <div className="p-6 text-left space-y-2">
                <span className="text-[10px] font-bold text-[#6F2BCC] uppercase tracking-wider">
                  {slides[activeSlide].badge}
                </span>
                <p className="font-bold text-base text-[#222222] font-display leading-snug">
                  {slides[activeSlide].location}
                </p>
              </div>
            </div>

            {/* Slider Dots indicators */}
            <div className="flex justify-center space-x-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeSlide === idx ? 'bg-[#6F2BCC] w-6' : 'bg-gray-300'}`}
                  aria-label={`Ir al slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
