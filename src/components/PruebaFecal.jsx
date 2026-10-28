import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PruebaFecal() {
  // Keep the owner user role active in localStorage
  useEffect(() => {
    localStorage.setItem('userRole', 'owner');
  }, []);

  return (
    <div className="w-full bg-white font-sans antialiased text-[#555555]">
      
      {/* 1. Hero Section (Microbiota intestinal - Cyan Background) */}
      <section className="bg-[#00ebd2] text-[#2B017C] py-20 px-6 relative overflow-hidden flex flex-col items-center text-center">
        {/* Microorganisms pattern */}
        <div 
          className="absolute inset-0 opacity-[0.08] pointer-events-none bg-repeat bg-center" 
          style={{ 
            backgroundImage: `url('https://res.cloudinary.com/oiaig120/image/upload/osdiagnostic/microorganismos.svg')`,
            backgroundSize: '800px'
          }}
        />
        <div className="max-w-4xl mx-auto space-y-6 z-10 relative flex flex-col items-center">
          <h1 className="text-3xl md:text-[44px] font-black leading-tight tracking-tight">
            Microbiota intestinal
          </h1>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight max-w-3xl">
            El equilibrio invisible que marca la diferencia en la salud de tu mascota
          </h2>
          <p className="text-[#2B017C] text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium font-sans">
            Dentro del intestino de tu peludo vive un universo de microorganismos que influye directamente en su bienestar. Cuando está en equilibrio, ayuda a digerir mejor los alimentos, fortalece su sistema inmune y lo protege de enfermedades. Pero cuando se altera, pueden aparecer síntomas como diarreas, alergias, mal aliento o cambios de ánimo.
          </p>
          <div className="pt-4">
            <Link 
              to="/test-disbiosis-mascotas"
              className="inline-block bg-[#2B017C] hover:bg-white text-white hover:text-[#2B017C] font-bold py-3 px-10 rounded-md text-xs uppercase tracking-wider transition-all duration-300 shadow-md font-sans"
            >
              Ver más
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Somos Section (Purple Background with Paws) */}
      <section className="bg-[#2B017C] text-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-6 md:gap-12 relative z-10">
          
          {/* Left paw decoration */}
          <div className="hidden md:flex flex-col space-y-6 text-white/40 text-6xl select-none">
            <i className="fas fa-paw transform -rotate-12 translate-x-2"></i>
            <i className="fas fa-paw transform rotate-45 scale-125"></i>
            <i className="fas fa-paw transform -rotate-45 -translate-x-3"></i>
          </div>

          {/* Core content */}
          <div className="flex-1 text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold font-sans">Somos</h2>
            <p className="text-white/95 text-sm md:text-base leading-relaxed font-sans font-medium">
              Expertos en diagnósticos moleculares en mascotas. Nuestro experimentado equipo científico garantiza precisión y confiabilidad en cada análisis. Contamos con qPCR en tiempo real cuantitativo con sondas de hidrólisis. ¡Confíe en nosotros para resultados fiables y atención de primera categoría!
            </p>
            <p className="text-white/90 text-xs md:text-sm font-bold uppercase tracking-wider">
              Contamos con sedes en Medellín - Bogotá
            </p>
          </div>

          {/* Right paw decoration */}
          <div className="hidden md:flex flex-col space-y-6 text-white/40 text-6xl select-none">
            <i className="fas fa-paw transform rotate-12 -translate-x-2"></i>
            <i className="fas fa-paw transform -rotate-45 scale-125"></i>
            <i className="fas fa-paw transform rotate-45 translate-x-3"></i>
          </div>

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

      {/* 5. Ventajas del equilibrio intestinal Section */}
      <section className="py-20 px-6 bg-white max-w-5xl mx-auto text-center space-y-10">
        <h2 className="text-3xl font-extrabold text-[#2B017C] font-sans">
          Ventajas del equilibrio intestinal
        </h2>
        
        {/* Dark purple card wrapper */}
        <div className="bg-[#1A004D] text-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 justify-items-center items-start">
            
            {/* Item 1 */}
            <div className="flex flex-col items-center space-y-3.5 text-center max-w-[150px]">
              <div className="text-[#01FADA] text-4xl">
                <i className="fas fa-award"></i>
              </div>
              <span className="text-xs md:text-sm font-semibold leading-snug font-sans">
                Mejora la calidad de vida de tu mascota
              </span>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col items-center space-y-3.5 text-center max-w-[150px]">
              <div className="text-[#01FADA] text-4xl">
                <i className="fas fa-heartbeat"></i>
              </div>
              <span className="text-xs md:text-sm font-semibold leading-snug font-sans">
                Salud preventiva
              </span>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col items-center space-y-3.5 text-center max-w-[150px]">
              <div className="text-[#01FADA] text-4xl">
                <i className="fas fa-shield-alt"></i>
              </div>
              <span className="text-xs md:text-sm font-semibold leading-snug font-sans">
                Apoya el sistema inmunológico
              </span>
            </div>

            {/* Item 4 */}
            <div className="flex flex-col items-center space-y-3.5 text-center max-w-[150px]">
              <div className="text-[#01FADA] text-4xl">
                <i className="fas fa-smile-beam"></i>
              </div>
              <span className="text-xs md:text-sm font-semibold leading-snug font-sans">
                Mejora su digestión y ánimo
              </span>
            </div>

            {/* Item 5 */}
            <div className="flex flex-col items-center space-y-3.5 text-center max-w-[150px] col-span-2 md:col-span-1">
              <div className="text-[#01FADA] text-4xl">
                <i className="fas fa-sparkles"></i>
              </div>
              <span className="text-xs md:text-sm font-semibold leading-snug font-sans">
                Piel y pelo saludables
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 6. ¿Por qué es importante el equilibrio intestinal? Section */}
      <section id="por-que-es-importante" className="py-16 px-6 bg-[#fcfdfe] border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Column: Dachshund Image */}
          <div className="flex-1 max-w-sm w-full">
            <img 
              src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/perro-feliz-osd.png" 
              alt="Perro feliz salchicha" 
              className="w-full h-auto rounded-3xl shadow-lg object-cover aspect-square"
            />
          </div>

          {/* Right Column: Text content */}
          <div className="flex-1 text-left space-y-6">
            <h2 className="text-3xl font-extrabold text-[#2B017C] font-sans leading-tight">
              ¿Por qué es importante el equilibrio intestinal ?
            </h2>
            <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed font-sans font-medium">
              <p>
                La microbiota es la comunidad de microorganismos que viven en el cuerpo de nuestras mascotas, como el intestino y la piel. Realizar un análisis de microbiota puede ser crucial para su salud.
              </p>
              <p>
                Ayuda a detectar desequilibrios en la flora intestinal, que pueden causar problemas digestivos como diarrea crónica.
              </p>
              <p>
                Un análisis también puede prevenir enfermedades, detectando cambios tempranos en la composición de la microbiota antes de que se manifiesten síntomas graves.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. ¿Quieres más información? Footer Banner */}
      <section className="bg-[#00ebd2] text-[#2B017C] py-14 px-6 text-center flex flex-col items-center space-y-4">
        <div className="space-y-1">
          <h3 className="text-2xl md:text-3xl font-black">¿Quieres más información?</h3>
          <p className="text-sm md:text-base font-bold">Nuestros expertos te pueden asesorar</p>
        </div>
        <div>
          <a 
            href="https://wa.me/573005143727" 
            target="_blank" 
            rel="noreferrer"
            className="inline-block bg-[#2B017C] hover:bg-white text-white hover:text-[#2B017C] font-bold py-3 px-10 rounded-md text-xs uppercase tracking-wider transition-colors shadow-md font-sans"
          >
            Contáctanos
          </a>
        </div>
      </section>

    </div>
  );
}
