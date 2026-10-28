import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Pqrs() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [clinic, setClinic] = useState('');
  const [email, setEmail] = useState('');
  const [complaint, setComplaint] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Validate that all required fields are filled out
  const isFormValid = 
    clinic.trim() !== '' && 
    email.trim() !== '' && 
    complaint.trim() !== '';

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (isSubmitting) return;

    if (!clinic.trim() || !email.trim() || !complaint.trim()) {
      alert("Por favor completa todos los campos del reclamo.");
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
      const response = await fetch("https://formsubmit.co/ajax/gestionhumana@osdiagnostic.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Clinica_o_Veterinario: clinic.trim().slice(0, 120),
          Email_de_Contacto: email.trim().slice(0, 100),
          Reclamo_Queja: complaint.trim().slice(0, 3000),
          _honey: honeypot,
          _subject: `Nuevo PQR'S registrado - ${clinic.trim().slice(0, 60)}`
        })
      });

      if (response.ok) {
        setFormSubmitted(true);
        setClinic('');
        setEmail('');
        setComplaint('');
        setAcceptedTerms(false);
      } else {
        alert("Hubo un error al registrar tu queja. Por favor intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error submitting PQR'S:", error);
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

    // In text inputs: if all filled, submit. If not, jump to the next input field
    if (tagName === 'input') {
      if (target.type === 'checkbox') return;

      const allFilled = clinic.trim() !== '' && email.trim() !== '' && complaint.trim() !== '';

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

  return (
    <div className="w-full bg-[#f6f8fa] font-sans antialiased text-[#2B017C] py-16 px-6">
      <div className="max-w-2xl mx-auto space-y-8 text-center flex flex-col items-center">
        
        {/* Mascot Header Illustration */}
        <div className="w-52 h-52 overflow-hidden rounded-2xl border border-gray-100 bg-white flex items-center justify-center shadow-sm">
          <img 
            src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/maspeque.jpg" 
            alt="On Site Diagnostic Mascot" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Block */}
        <div className="space-y-4 text-justify md:text-center max-w-xl mx-auto">
          <p className="text-base md:text-lg text-[#2B017C] font-semibold text-center leading-relaxed">
            <strong>Lamentamos que algo no haya salido como esperabas.</strong>
            <br />
            Tu experiencia nos importa profundamente, y queremos ayudarte a resolverlo de forma rápida, clara y humana.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed font-sans">
            Sabemos que cuando algo falla, lo que más se necesita es ser escuchado. Por eso, este espacio está pensado para que puedas contarnos lo que ocurrió. Cada reclamo que recibimos es una oportunidad para mejorar, para reparar, y sobre todo, para demostrarte que estamos aquí no solo como empresa, sino como personas que se preocupan por ti.
          </p>
          <p className="text-base md:text-lg text-[#2B017C] font-semibold text-center leading-relaxed">
            <strong>Tu voz tiene valor. Tu tiempo también.</strong>
            <br />
            Déjanos tu caso y nos comprometemos a darte una respuesta dentro de las próximas 48 horas hábiles.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-150 shadow-sm text-left w-full max-w-xl">
          
          {formSubmitted ? (
            <div className="bg-[#01FADA]/10 border border-[#01FADA]/30 rounded-2xl p-6 text-[#2B017C] space-y-2">
              <p className="font-bold text-base">✓ ¡Caso registrado con éxito!</p>
              <p className="text-xs md:text-sm text-gray-700 font-sans leading-relaxed">
                Tu solicitud ha sido transmitida al departamento de auditoría clínica de OSD. Un especialista se pondrá en contacto contigo en las próximas 48 horas hábiles.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-5 font-sans">
              
              <div className="space-y-1.5">
                <label htmlFor="form-field-name" className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Clínica veterinaria /Médico Veterinario
                </label>
                <input 
                  type="text" 
                  id="form-field-name"
                  required
                  value={clinic}
                  onChange={(e) => setClinic(e.target.value)}
                  placeholder="Nombre de la veterinaria o especialista"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:border-[#6F2BCC] text-sm text-gray-800 placeholder-gray-400"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="form-field-email" className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Email
                </label>
                <input 
                  type="email" 
                  id="form-field-email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:border-[#6F2BCC] text-sm text-gray-800 placeholder-gray-400"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="form-field-message" className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Reclamo / queja
                  </label>
                  <span className="text-[11px] text-gray-400 font-sans hidden sm:inline">
                    <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-gray-500 font-mono text-[10px]">Enter</kbd> para enviar
                  </span>
                </div>
                <textarea 
                  id="form-field-message"
                  rows="7" 
                  required
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                  placeholder="Descripción del motivo de tu queja"
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
                  id="habeasDataPqrs"
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#6F2BCC] focus:ring-[#6F2BCC] cursor-pointer"
                />
                <label htmlFor="habeasDataPqrs" className="text-xs text-gray-500 leading-snug cursor-pointer select-none">
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
                  <span>{isSubmitting ? 'Enviando...' : 'Enviar'}</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
