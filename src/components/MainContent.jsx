import React from 'react';
import { Link } from 'react-router-dom';

export default function MainContent() {
  return (
    <div className="w-full font-sans">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[500px] flex items-center bg-gray-50 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-osd-purple rounded-l-full transform translate-x-1/3 opacity-10"></div>
        
        <div className="max-w-7xl mx-auto w-full px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="flex flex-col space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-osd-dark leading-tight">
              Precisión, <span className="text-osd-cyan">confianza</span> y calidad
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              Diagnóstico de alta precisión sin falsos negativos. Tenemos un amplio portafolio de qPCR cuantitativa en tiempo real, entrega rápida, qPCR canino, qPCR felino.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/clinica" className="bg-osd-purple hover:bg-osd-dark text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all transform hover:-translate-y-1">
                Servicios para Clínicas
              </Link>
              <a href="https://wa.link/50ceij" target="_blank" rel="noreferrer" className="bg-white border-2 border-osd-cyan text-osd-cyan hover:bg-osd-cyan hover:text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all flex items-center">
                <i className="fab fa-whatsapp mr-2"></i> Contáctanos
              </a>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-osd-cyan rounded-full opacity-20 blur-3xl transform scale-75"></div>
            <img 
              src="https://res.cloudinary.com/oiaig120/image/upload/osdiagnostic/laboratorio-para-veterinarias.svg" 
              alt="Veterinaria interactuando con perro" 
              className="relative z-10 w-full max-w-lg object-contain drop-shadow-2xl"
              // Fallback to placeholder if the SVG is not available in production server path
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800";
              }}
            />
          </div>
        </div>
      </section>

      {/* Stats / Features Section */}
      <section className="bg-osd-purple text-white py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
            <i className="fas fa-microscope text-4xl text-osd-cyan mb-4"></i>
            <h3 className="text-xl font-bold mb-2">Alta Precisión</h3>
            <p className="text-gray-200">Tecnología PCR cuantitativa avanzada para resultados exactos.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 transform md:-translate-y-4">
            <i className="fas fa-bolt text-4xl text-osd-cyan mb-4"></i>
            <h3 className="text-xl font-bold mb-2">Resultados Rápidos</h3>
            <p className="text-gray-200">Entrega de diagnósticos en tiempo récord para urgencias.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
            <i className="fas fa-user-md text-4xl text-osd-cyan mb-4"></i>
            <h3 className="text-xl font-bold mb-2">Soporte Especializado</h3>
            <p className="text-gray-200">Asesoría directa con biólogos moleculares y especialistas.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto bg-gray-50 rounded-3xl p-10 md:p-16 text-center shadow-xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-osd-cyan rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-osd-purple rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-osd-dark mb-6 relative z-10">
            ¿Listo para llevar tu diagnóstico al siguiente nivel?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto relative z-10">
            Únete a las cientos de clínicas veterinarias que ya confían en On Site Diagnostic para sus pruebas de biología molecular.
          </p>
          <Link to="/contacto" className="relative z-10 inline-block bg-osd-purple hover:bg-osd-dark text-white font-bold py-4 px-10 rounded-full shadow-lg transition-transform transform hover:scale-105">
            Solicitar Información
          </Link>
        </div>
      </section>

    </div>
  );
}
