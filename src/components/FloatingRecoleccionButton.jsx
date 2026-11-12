import React, { useState } from 'react';

const FORMULARIO_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeDPoSkLRQm7UiFy2f_U_2f8YE4bU85Ap5QixzMqUvQc-A4pA/viewform';

export default function FloatingRecoleccionButton() {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <>
      {/* 1. EN PC / DESKTOP (>= md): BARRA LATERAL PERMANENTE ORIGINAL */}
      <a 
        href={FORMULARIO_URL} 
        target="_blank" 
        rel="noreferrer" 
        className="hidden md:inline-block fixed left-0 top-1/2 -translate-y-1/2 bg-osd-cyan text-osd-dark font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-r-lg z-50 shadow-lg hover:bg-white transition-all duration-300 cursor-pointer select-none"
      >
        Formulario de recolección
      </a>

      {/* 2. SOLO EN CELULARES (RESPONSIVE < md): BOTÓN FLOTANTE INFERIOR BLANCO GRISÁCEO */}
      <aside 
        aria-label="Solicitud de recolección de muestras veterinarias en móvil"
        className="block md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] w-auto transition-all duration-300 select-none"
      >
        {isMinimized ? (
          <div className="fixed bottom-4 right-4 z-40 animate-fadeIn">
            <button
              onClick={() => setIsMinimized(false)}
              title="Abrir Solicitud de Recolección de Muestras"
              className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#ECEFF2] text-[#2B017C] border-2 border-[#2B017C] shadow-[0_6px_20px_rgba(0,0,0,0.18)] hover:scale-105 active:scale-95 transition-all duration-300 p-2.5"
              aria-label="Abrir solicitud de recolección de muestras"
            >
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#01FADA] rounded-full animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#01FADA] border border-white rounded-full"></span>
              
              {/* Van / Delivery Truck Icon */}
              <svg className="w-6 h-6 fill-current transform group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M19 7h-3V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a3 3 0 0 0 6 0h4a3 3 0 0 0 6 0h1a2 2 0 0 0 2-2v-4.5L19 7zm-13 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm11 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1.5-6.5H16V8.5h2.5l2 3zM8 7h2v2H8V7zm0 3h2v2H8v-2z" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="relative group flex items-center">
            {/* Main Floating Capsule Button - Blanco Grisáceo */}
            <a
              href={FORMULARIO_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 bg-gradient-to-r from-[#FFFFFF] via-[#F4F6F8] to-[#E9ECEF] text-[#1F1F1F] pl-2 pr-3.5 py-2 rounded-full border border-gray-300/80 shadow-[0_8px_25px_rgba(0,0,0,0.14),0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.18)] active:scale-[0.98] transition-all duration-300 backdrop-blur-md"
            >
              {/* Neon Icon Container */}
              <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[#01FADA] text-[#2B017C] shadow-sm shrink-0">
                <svg className="w-4.5 h-4.5 relative z-10 fill-current" viewBox="0 0 24 24">
                  <path d="M19 7h-3V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a3 3 0 0 0 6 0h4a3 3 0 0 0 6 0h1a2 2 0 0 0 2-2v-4.5L19 7zm-13 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm11 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1.5-6.5H16V8.5h2.5l2 3zM8 7h2v2H8V7zm0 3h2v2H8v-2z" />
                </svg>
              </div>

              {/* Descriptive Text in high contrast */}
              <div className="flex flex-col text-left leading-tight pr-1">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#2B017C] flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2B017C] animate-pulse"></span>
                  Recolección Gratuita
                </span>
                <span className="text-[12px] font-bold text-[#1E1E1E] tracking-tight drop-shadow-2xs whitespace-nowrap">
                  Solicitud de Recolección de Muestras
                </span>
              </div>

              {/* Forward Arrow Indicator */}
              <div className="w-7 h-7 rounded-full bg-slate-200/90 text-gray-700 flex items-center justify-center transition-colors shrink-0 ml-0.5">
                <i className="fas fa-arrow-right text-[11px]"></i>
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
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-500/80 hover:bg-[#2B017C] text-white border border-white/60 text-[10px] flex items-center justify-center opacity-70 transition-opacity duration-200 shadow z-10"
            >
              ✕
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
