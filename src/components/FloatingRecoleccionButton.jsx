import React, { useState } from 'react';

const FORMULARIO_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeDPoSkLRQm7UiFy2f_U_2f8YE4bU85Ap5QixzMqUvQc-A4pA/viewform';

export default function FloatingRecoleccionButton() {
  const [isMinimized, setIsMinimized] = useState(false);

  // When minimized by user: compact sleek circular FAB on the bottom right
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 animate-fadeIn">
        <button
          onClick={() => setIsMinimized(false)}
          title="Abrir Solicitud de Recolección de Muestras"
          className="group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#2B017C] text-[#01FADA] border-2 border-[#01FADA] shadow-[0_8px_25px_rgba(43,1,124,0.5),0_0_15px_rgba(1,250,218,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 p-2.5"
          aria-label="Abrir solicitud de recolección de muestras"
        >
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#01FADA] rounded-full animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#01FADA] rounded-full"></span>
          
          {/* Van / Delivery Truck Icon */}
          <svg className="w-6 h-6 fill-current transform group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
            <path d="M19 7h-3V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a3 3 0 0 0 6 0h4a3 3 0 0 0 6 0h1a2 2 0 0 0 2-2v-4.5L19 7zm-13 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm11 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1.5-6.5H16V8.5h2.5l2 3zM8 7h2v2H8V7zm0 3h2v2H8v-2z" />
          </svg>
        </button>
      </div>
    );
  }

  // Expanded aesthetic pill dock centered at the bottom
  return (
    <aside 
      aria-label="Solicitud de recolección de muestras veterinarias"
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[94vw] sm:max-w-none transition-all duration-300 select-none"
    >
      <div className="relative group flex items-center">
        {/* Main Floating Pill Button */}
        <a
          href={FORMULARIO_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 sm:gap-3.5 bg-gradient-to-r from-[#20005E] via-[#2B017C] to-[#1E0054] text-white pl-2 sm:pl-2.5 pr-4 sm:pr-5 py-2 sm:py-2.5 rounded-full border border-white/25 shadow-[0_12px_32px_rgba(43,1,124,0.48),0_0_18px_rgba(1,250,218,0.22)] hover:shadow-[0_14px_38px_rgba(1,250,218,0.35),0_0_25px_rgba(43,1,124,0.65)] hover:border-[#01FADA] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 backdrop-blur-md"
        >
          {/* Neon Icon Container */}
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#01FADA] text-[#2B017C] shadow-md shrink-0 group-hover:rotate-6 transition-transform duration-300">
            {/* Soft pulsing glow ring */}
            <span className="absolute inset-0 rounded-full bg-[#01FADA] opacity-60 animate-ping pointer-events-none duration-1000"></span>
            
            {/* Courier / Sample Collection Van SVG Icon */}
            <svg className="w-5 h-5 relative z-10 fill-current" viewBox="0 0 24 24">
              <path d="M19 7h-3V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a3 3 0 0 0 6 0h4a3 3 0 0 0 6 0h1a2 2 0 0 0 2-2v-4.5L19 7zm-13 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm11 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1.5-6.5H16V8.5h2.5l2 3zM8 7h2v2H8V7zm0 3h2v2H8v-2z" />
            </svg>
          </div>

          {/* Descriptive Text */}
          <div className="flex flex-col text-left leading-tight pr-1 sm:pr-2">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-extrabold text-[#01FADA] flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#01FADA] animate-pulse"></span>
              Recolección Gratuita · Bogotá
            </span>
            <span className="text-[12px] sm:text-sm font-bold text-white tracking-tight drop-shadow-sm whitespace-nowrap">
              Solicitud de Recolección de Muestras
            </span>
          </div>

          {/* Forward Arrow Indicator */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 group-hover:bg-[#01FADA] group-hover:text-[#2B017C] text-white flex items-center justify-center transition-all duration-300 shrink-0 ml-0.5 sm:ml-1">
            <i className="fas fa-arrow-right text-[11px] sm:text-xs group-hover:translate-x-0.5 transition-transform"></i>
          </div>
        </a>

        {/* Discrete minimize/close button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsMinimized(true);
          }}
          title="Minimizar botón"
          aria-label="Minimizar botón de recolección"
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-900/80 hover:bg-[#2B017C] text-white/80 hover:text-white border border-white/30 text-[10px] flex items-center justify-center opacity-60 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 shadow z-10"
        >
          ✕
        </button>
      </div>
    </aside>
  );
}
