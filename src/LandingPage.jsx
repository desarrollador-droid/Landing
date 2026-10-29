import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col justify-center items-center font-sans bg-[#2B017C]">
      {/* CSS Entry Animation (Zoom from behind with spring bounce) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes zoomInLogo {
          0% {
            transform: scale(0.2);
            opacity: 0;
          }
          75% {
            transform: scale(1.06);
            opacity: 0.9;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-logo-zoom {
          animation: zoomInLogo 1.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}} />

      {/* Background Molecular Video */}
      <video 
        className="absolute inset-0 w-full h-full object-cover z-0" 
        src="https://res.cloudinary.com/oiaig120/video/upload/q_auto/osdiagnostic/pruebas-pcr.mp4" 
        autoPlay 
        muted 
        loop 
        playsInline
      />
      
      {/* Light Purple Transparent Overlay */}
      <div className="absolute inset-0 bg-[#2B017C]/40 z-10"></div>
 
      {/* Main Content Container */}
      <div className="relative z-20 flex flex-col items-center justify-center px-6 text-center w-full">
        {/* Semantic H1 for SEO & Accessibility */}
        <h1 className="sr-only">On Site Diagnostic - Laboratorio de Biología Molecular Veterinaria</h1>

        {/* Big Central OSD Logo with Entry Animation */}
        <img 
          src="https://res.cloudinary.com/oiaig120/image/upload/osdiagnostic/laboratorio.svg" 
          alt="On Site Diagnostic - Laboratorio de Biología Molecular Veterinaria" 
          className="w-full max-w-[550px] md:max-w-[650px] h-auto mb-10 animate-logo-zoom"
        />
 
        {/* Action Buttons (Centered, slightly wider max-width) */}
        <div className="flex flex-col items-center space-y-4.5 w-full">
          <Link 
            to="/veterinarios" 
            onClick={() => localStorage.setItem('userRole', 'vet')}
            className="w-full max-w-[290px] bg-[#01FADA] hover:bg-white text-osd-dark font-bold py-2 px-4 rounded-md text-[11px] md:text-xs transition-all duration-300 shadow-md transform hover:scale-[1.02]"
          >
            Clínicas o veterinarios
          </Link>
          
          <Link 
            to="/prueba-fecal-para-mascotas" 
            onClick={() => localStorage.setItem('userRole', 'owner')}
            className="w-full max-w-[290px] bg-[#01FADA] hover:bg-white text-osd-dark font-bold py-2 px-4 rounded-md text-[11px] md:text-xs transition-all duration-300 shadow-md transform hover:scale-[1.02]"
          >
            Propietarios de mascotas
          </Link>
        </div>
      </div>
    </div>
  );
}
