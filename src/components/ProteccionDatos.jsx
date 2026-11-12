import React from 'react';

export default function ProteccionDatos() {
  const pdfUrl = "/Manual-del-tratamiento-y-proteccion-de-datos-personales.pdf";

  return (
    <div className="w-full bg-[#f6f8fa] font-sans antialiased text-[#2B017C] py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
        
        {/* Title block */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6F2BCC]/10 text-[#6F2BCC] text-xs font-bold uppercase tracking-wider">
            <span>On Site Diagnostic S.A.S</span>
            <span>•</span>
            <span>Código GG-MN-01</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-[40px] font-bold font-display uppercase tracking-tight text-[#2B017C]">
            Tratamiento y protección de datos personales
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Consulte o descargue a continuación el manual oficial para el tratamiento y protección de datos personales.
          </p>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="w-full h-[550px] md:h-[820px] rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-white flex flex-col">
          <iframe 
            src={`${pdfUrl}#toolbar=1&navpanes=0`}
            className="w-full flex-grow border-0"
            title="Manual de Tratamiento y Protección de Datos Personales - On Site Diagnostic"
          />
        </div>

        {/* Bottom Download and Action Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 pb-6 max-w-5xl mx-auto bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#6F2BCC]">
              <i className="fas fa-file-pdf text-xl"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-[#1E1E1E]">
                Manual del tratamiento y protección de datos personales
              </span>
              <span className="text-xs text-gray-500">
                Formato PDF oficial (11 páginas) • Versión 01
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a 
              href={pdfUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex-1 sm:flex-none text-center border border-gray-300 hover:border-[#6F2BCC] hover:text-[#6F2BCC] text-gray-700 font-semibold py-2.5 px-5 rounded-full text-xs uppercase tracking-wider transition-colors duration-200"
            >
              Abrir en pestaña
            </a>
            <a 
              href={pdfUrl}
              download="Manual-del-tratamiento-y-proteccion-de-datos-personales-OSD.pdf"
              className="flex-1 sm:flex-none text-center bg-[#2B017C] hover:bg-[#6F2BCC] text-white font-bold py-2.5 px-6 rounded-full text-xs uppercase tracking-wider transition-colors duration-300 shadow-sm cursor-pointer"
            >
              Descargar PDF
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
