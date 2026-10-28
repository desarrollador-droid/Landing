import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PruebaMicrobiotaMascotas() {
  // Keep the owner user role active
  useEffect(() => {
    localStorage.setItem('userRole', 'owner');
  }, []);

  return (
    <div className="w-full bg-white font-sans antialiased text-gray-800 py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Back button */}
        <div className="text-left">
          <Link 
            to="/aprende" 
            className="inline-flex items-center text-xs font-bold text-[#6F2BCC] hover:text-[#2B017C] transition-colors"
          >
            ← Volver a Aprende
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl lg:text-[34px] font-extrabold text-[#2B017C] text-left leading-tight tracking-tight font-sans">
          Colombia podrá prevenir y controlar las enfermedades de sus mascotas.
        </h1>

        {/* Core grid: Left text, Right image with caption */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left side text column */}
          <div className="lg:col-span-7 space-y-6 text-left text-sm md:text-base leading-relaxed text-gray-700 font-medium font-sans">
            <p>
              La medicina veterinaria está en constante búsqueda de nuevas maneras de mejorar la salud de los mascotas. El laboratorio <Link to="/prueba-fecal-para-mascotas" className="text-[#087EBA] hover:underline font-semibold">On Site Diagnostic</Link> no es ajeno a esto, por eso está en constante investigación para encontrar nuevos avances y métodos que permitan mejorar la salud de los animales.
            </p>
            <p>
              Su equipo de investigación, liderado por el Dr Cesar Orlando Muñoz, encontró una necesidad en la salud de las mascotas. Actualmente, los diagnósticos que se suelen implementar por los veterinarios se basan en solo encontrar enfermedades y no el origen.
            </p>
          </div>

          {/* Right side image column */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full overflow-hidden rounded-lg border border-gray-100 shadow-sm">
              <img 
                src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/laboratorioparaveterinarias.png" 
                alt="Laboratorio de biología molecular" 
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-[11px] md:text-xs text-gray-400 font-semibold text-center mt-3 leading-normal max-w-sm font-sans">
              Tecnología para PCR veterinaria. Sondas de hidrolisis que permiten tener resultados de gran espectro.
            </p>
          </div>
        </div>

        {/* Underneath paragraphs */}
        <div className="space-y-6 text-left text-sm md:text-base leading-relaxed text-gray-700 font-medium pt-4 font-sans">
          <p>
            Desconocer el origen representa un vacío en el bienestar en la salud de las mascotas porque no permite tener una visión integral para combatir las diferentes enfermedades de los pacientes de una manera más efectiva. Con el desarrollo que ha venido investigando y desarrollando el laboratorio OSD, esto dejará de ser un impedimento.
          </p>
          <p>
            El pasado 26 de marzo de 2025, el laboratorio OSD anunció la implementación de prueba microbiota en mascotas lo que permitirá no solo combatir las enfermedades desde la raíz, también nos dará la capacidad de prevenir de manera temprana logrando una mejora considerable el bienestar de nuestros peludos.
          </p>

          {/* Large banner image of dog paw held by human hand */}
          <div className="w-full overflow-hidden rounded-2xl shadow-sm border border-gray-100 my-8">
            <img 
              src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/prueba-fecal-para-mascotas-paw.png" 
              alt="Salud intestinal en perros" 
              className="w-full h-auto object-cover select-none"
            />
          </div>

          {/* Heading: ¿Cómo funciona la microbiota? */}
          <div className="pt-4 space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-[#2B017C]">
              ¿Cómo funciona la microbiota?
            </h2>
            <p>
              La microbiota es el conjunto de microorganismos que habitan en el organismo de los seres vivos. En las mascotas, la microbiota desempeña un papel esencial en la regulación del sistema inmunológico, la digestión y la salud general. Un desequilibrio en la microbiota puede ser la raíz de muchas enfermedades crónicas y problemas de salud.
            </p>
            <p>
              El laboratorio On Site Diagnostic ha desarrollado una prueba avanzada que permite analizar la microbiota de las mascotas. Esta prueba identifica desequilibrios y anomalías en los microorganismos, ayudando a los veterinarios a crear tratamientos personalizados. Al abordar las enfermedades desde la raíz, no solo se mejora la salud de los animales, sino que también se abre la posibilidad de prevenir futuros problemas.
            </p>
          </div>

          {/* Two column layout: Left image, Right "Un paso hacia la medicina preventiva" */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-8 border-t border-gray-100 mt-10">
            {/* Left Bulldog Image */}
            <div className="lg:col-span-5 w-full overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
              <img 
                src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/salud-intestinal-en-perros.jpg" 
                alt="Microbiota intestinal en mascotas" 
                className="w-full h-auto object-cover select-none"
              />
            </div>

            {/* Right content column */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <h2 className="text-xl md:text-2xl font-bold text-[#2B017C]">
                Un paso hacia la medicina preventiva
              </h2>
              <p className="text-gray-700 text-sm md:text-base font-medium leading-relaxed">
                Con la prueba microbiota para mascotas, Colombia da un paso significativo hacia la medicina veterinaria preventiva. El laboratorio OSD demuestra que la tecnología y la investigación pueden transformar el cuidado de las mascotas, ofreciendo un enfoque más integral y eficaz para garantizar su bienestar.
              </p>
              <p className="text-gray-500 text-xs md:text-sm font-semibold pt-2">
                Si quieres saber más sobre la salud de la microbiota en animales, nos puedes seguir <a href="https://www.instagram.com/onsitediagnostic/" target="_blank" rel="noreferrer" className="text-[#6F2BCC] hover:underline font-bold">Instagram haciendo clic aquí</a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
