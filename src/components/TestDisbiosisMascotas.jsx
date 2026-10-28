import React, { useEffect } from 'react';

export default function TestDisbiosisMascotas() {
  // Ensure the owner user role remains active
  useEffect(() => {
    localStorage.setItem('userRole', 'owner');
  }, []);

  return (
    <div className="w-full bg-white font-sans antialiased text-[#555555]">
      
      {/* 1. Hero Section (¿Qué es el test de índice de disbiosis? - Blue Background) */}
      <section className="bg-[#087EBA] text-white pt-16 pb-0 px-6 relative overflow-hidden flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center space-y-6 z-10 relative flex flex-col items-center">
          <h1 className="text-3xl md:text-[44px] font-bold text-white leading-tight font-sans tracking-tight">
            ¿Qué es el test de índice de disbiosis?
          </h1>
          <p className="text-white/95 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium font-sans">
            El índice de disbiosis intestinal se realiza a partir de una muestra de heces y sirve para analizar la microbiota bacteriana que se encuentra en el intestino, para así determinar si existe una disbiosis intestinal (desequilibrio de la flora de los intestinos).
          </p>
          <div className="pt-2 pb-6">
            <a 
              href="https://wa.me/573005143727" 
              target="_blank" 
              rel="noreferrer"
              className="inline-block bg-[#01FADA] hover:bg-white text-[#2B017C] font-bold py-3.5 px-10 rounded-md text-xs uppercase tracking-wider transition-all duration-300 shadow-md font-sans"
            >
              Contáctanos
            </a>
          </div>
        </div>

        {/* Peeking Dog Image aligned exactly at the bottom with negative margin */}
        <div className="w-full max-w-[480px] mt-4 z-20 relative -mb-1 flex justify-center">
          <img 
            src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/prueba-fecal-para-mascotas.png" 
            alt="Perro asomándose" 
            className="w-full h-auto object-contain select-none"
          />
        </div>
      </section>

      {/* 2. Disbiosis vs Simbiosis Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          
          {/* Column 1: Disbiosis */}
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="space-y-1">
              <h2 className="text-3xl font-extrabold text-[#2B017C] font-sans">Disbiosis</h2>
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider block font-sans">
                (Desequilibrio microbiano)
              </span>
            </div>

            {/* Red bold X icon */}
            <div className="text-[#ff3860] text-5xl font-black leading-none">
              ✕
            </div>

            <ul className="space-y-3 text-sm md:text-base text-gray-600 font-medium font-sans">
              <li>Alergias cutáneas</li>
              <li>Enfermedades crónicas</li>
              <li>Mal aliento persistente</li>
              <li>Diarreas frecuentes o heces blandas</li>
              <li>Cases o mal olor corporal</li>
            </ul>
          </div>

          {/* Column 2: Simbiosis */}
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="space-y-1">
              <h2 className="text-3xl font-extrabold text-[#2B017C] font-sans">Simbiosis</h2>
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider block font-sans">
                (equilibrio saludable)
              </span>
            </div>

            {/* Green bold Check icon */}
            <div className="text-[#00ebd2] text-5xl font-black leading-none">
              ✓
            </div>

            <ul className="space-y-3 text-sm md:text-base text-gray-600 font-medium font-sans">
              <li>Defensas fuertes (menos infecciones)</li>
              <li>Buen aliento</li>
              <li>Piel sana y pelaje brillante</li>
              <li>Buen apetito</li>
              <li>Peso estable y adecuado</li>
            </ul>
          </div>

        </div>
      </section>

      {/* 2.5. ¿Por qué es importante? (Cyan Banner Section) */}
      <section className="bg-[#00ebd2] text-[#2B017C] py-20 px-6 relative overflow-hidden flex flex-col items-center text-center">
        {/* Background image overlay with low opacity to prevent repeat seams */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.15] pointer-events-none select-none" 
          style={{ backgroundImage: `url('https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/bacterias-cyan-bg.png')` }}
        />
        
        <div className="max-w-4xl mx-auto z-10 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black font-sans leading-tight">
            ¿Por qué es importante?
          </h2>
          <p className="text-[#2B017C] text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-medium font-sans">
            El equilibrio en la microbiota es esencial porque en el cuerpo es un ecosistema en el que diferentes microorganismos conviven en armonía. Si este está en desequilibrio puede ser señal diferentes enfermedades o incluso puedo ayudarte a prevenirlas y mejorar el bienestar de tus mascotas
          </p>
        </div>
      </section>

      {/* 3. Arched Portrait Images Container (White background enclosing the pet frames fully) */}
      <div className="bg-white relative w-full px-6 pt-16 pb-0 flex justify-center">
        <div className="max-w-5xl w-full grid grid-cols-2 md:grid-cols-4 gap-6 items-end px-4">
          <div className="w-full flex items-end justify-center">
            <img src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/salud-intestinal-en-gatos.webp" alt="Gato" className="w-full h-auto object-contain" />
          </div>
          <div className="w-full flex items-end justify-center">
            <img src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/salud-intestinal-de-mascota.webp" alt="Perrito en camisa" className="w-full h-auto object-contain" />
          </div>
          <div className="w-full flex items-end justify-center">
            <img src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/equilibrio-en-microbiota.webp" alt="Gato" className="w-full h-auto object-contain" />
          </div>
          <div className="w-full flex items-end justify-center">
            <img src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/microbiota-en-mascotas.webp" alt="Bulldog" className="w-full h-auto object-contain" />
          </div>
        </div>
      </div>

      {/* 4. ¿Sabes cómo tomar la muestra? (Dark Purple Banner) */}
      <section 
        className="relative bg-[#2B017C] text-white py-16 px-6 bg-cover bg-center overflow-hidden flex justify-center z-10"
        style={{ backgroundImage: `url('https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/prueba-microbiota.webp')` }}
      >
        {/* Dark purple semi-transparent overlay */}
        <div className="absolute inset-0 bg-[#2B017C]/80 z-0"></div>

        <div className="max-w-4xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left z-10 relative">
          <div className="space-y-1.5 flex-grow">
            <h3 className="text-xl md:text-2xl font-bold font-sans">¿Sabes cómo tomar la muestra?</h3>
            <p className="text-white/90 text-sm md:text-base font-medium font-sans">
              Da clic aquí y descarga nuestra guía
            </p>
          </div>
          <div className="flex-shrink-0">
            <a 
              href="https://osdiagnostic.com/wp-content/uploads/2025/07/¿como-hacer-una-toma-de-muestra-fecal-de-mi-mascota.pdf" 
              target="_blank" 
              rel="noreferrer"
              className="inline-block bg-[#00ebd2] hover:bg-white text-[#2B017C] font-bold py-3.5 px-10 rounded-lg text-sm uppercase tracking-wider transition-colors shadow-md font-sans"
            >
              Descargar
            </a>
          </div>
        </div>
      </section>

      {/* 5. ¿Cómo se toma la prueba de microbiota? Section */}
      <section className="py-20 px-6 bg-white max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-12">
          
          {/* Left Side: Explanations */}
          <div className="flex-1 text-left flex flex-col justify-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-[#2B017C] font-sans leading-tight">
              ¿Cómo se toma la prueba de microbiota?
            </h2>
            
            <p className="text-[#087EBA] text-lg font-bold font-sans">
              ¡Mucho más fácil de lo que imaginas!
            </p>

            <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed font-sans font-medium">
              <p>
                Solo necesitas una muestra de materia fecal y nosotros nos encargamos del resto:
              </p>
              <p>
                te enviamos el kit, recogemos la muestra y hacemos el análisis completo.
              </p>
              <p>
                Si quieres saber cómo funciona paso a paso y ver lo sencillo que es...
              </p>
              <p className="font-extrabold text-[#2B017C] flex items-center space-x-2">
                <span>▶</span>
                <span>Dale play al video y descúbrelo tú mismo.</span>
              </p>
            </div>
          </div>

          {/* Right Side: Vertical Video Walkthrough */}
          <div className="flex-1 flex justify-center items-center">
            <div className="w-full max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl relative border border-gray-150 bg-slate-50 flex items-center justify-center">
              <video 
                controls 
                playsInline 
                poster="https://res.cloudinary.com/oiaig120/image/upload/osdiagnostic/toma-muestra-fecal.svg"
                className="w-full h-full object-cover"
                src="https://res.cloudinary.com/oiaig120/video/upload/q_auto/osdiagnostic/toma-de-muestra-fecal-propietarios.mp4"
              />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
