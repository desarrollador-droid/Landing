import React from 'react';

export default function ProteccionDatos() {
  const pdfUrl = "https://osdiagnostic.com/wp-content/uploads/2025/02/Manual-del-tratamiento-y-proteccion-de-datos-personales.docx-1.pdf";

  return (
    <div className="w-full bg-[#f6f8fa] font-sans antialiased text-[#2B017C] py-16 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Title block */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-[40px] font-bold font-display uppercase tracking-tight text-[#2B017C]">
            Tratamiento y protección de datos personales
          </h1>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="w-full h-[600px] md:h-[800px] rounded-xl overflow-hidden border border-gray-300 shadow-sm bg-white">
          <iframe 
            src={pdfUrl} 
            className="w-full h-full"
            title="Manual de Tratamiento y Protección de Datos Personales"
          />
        </div>

        {/* Bottom Download Links (Styled exactly like the screenshot) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 pb-6 max-w-5xl mx-auto">
          <a 
            href={pdfUrl} 
            target="_blank" 
            rel="noreferrer"
            className="text-xs md:text-sm text-gray-500 hover:text-[#6F2BCC] underline font-medium font-sans transition-colors"
          >
            Manual del tratamiento y protección de datos personales.docx
          </a>
          <a 
            href={pdfUrl}
            download
            className="bg-[#222222] hover:bg-[#6F2BCC] text-white font-bold py-2.5 px-6 rounded-full text-xs uppercase tracking-wider transition-colors duration-300 shadow-sm cursor-pointer"
          >
            Descarga
          </a>
        </div>

      </div>
    </div>
  );
}
