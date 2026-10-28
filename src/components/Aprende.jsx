import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Aprende() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Scroll listener to quickly transition background from purple to white
  useEffect(() => {
    const handleScroll = () => {
      // Fast transition over the first 250px of scroll
      const progress = Math.min(1, window.scrollY / 250);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live Constellation Particle Network animation (the interactive "gif" background)
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);

    const particles = [];
    const particleCount = 45;
    const connectionDistance = 110;

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce boundaries
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw particles & connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        // Connect particles to each other
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Quick mouse hover shifting effect for the entire animated canvas (parallax)
  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    
    // Calculate distance from center of screen/container
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Shift opposite to mouse position with rapid but smooth spring interpolation
    const shiftX = (mouseX - centerX) * -0.06;
    const shiftY = (mouseY - centerY) * -0.06;
    setMouseOffset({ x: shiftX, y: shiftY });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const [userRole, setUserRole] = useState('vet');

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole') || 'vet';
    setUserRole(storedRole);
  }, []);

  const profiles = userRole === 'owner' ? [
    {
      title: "Microbiota intestinal: clave para la salud y el bienestar de tus mascotas",
      image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/salud-intestinal-de-mascota.webp",
      description: "La medicina veterinaria está en constante búsqueda de nuevas maneras de mejorar la salud de los mascotas. El laboratorio On Site Diagnostic no es ajeno a esto, por eso está en constante investigación para encontrar nuevos avances y métodos que permitan mejorar la salud de los animales...",
      link: "/aprende/microbiota-intestinal-clave-salud"
    }
  ] : [
    {
      title: "Perfil Joe",
      image: "https://res.cloudinary.com/oiaig120/image/upload/osdiagnostic/deteccion-de-hemoparasitos.svg",
      description: "Panel de alta sensibilidad diseñado para contrarrestar el secuestro tisular de patógenos. Su tecnología qPCR mitiga el riesgo de falsos negativos inherentes a la sangre periférica, permitiendo el análisis directo y la detección cuantitativa en muestras de médula ósea, bazo, hígado y endotelio vascular.",
      link: "/aprende/perfil-joe"
    },
    {
      title: "Perfil Rutina Felino",
      image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/Deteccion-de-infecciones-para-felinos-300x300.png",
      description: "Panel molecular diseñado para la detección temprana de infecciones sistémicas asociadas a daño hematológico, renal y cardiopulmonar en felinos. Su enfoque qPCR permite identificar coinfecciones silenciosas que frecuentemente pasan desapercibidas inicialmente.",
      link: "/aprende/rutina-felino"
    },
    {
      title: "Perfil Joe + Vif y ViLeF",
      image: "https://res.cloudinary.com/oiaig120/image/upload/osdiagnostic/VIF-o-Vilef.svg",
      description: "Evaluación conjunta de patógenos sistémicos y el estado inmunitario del paciente. Su enfoque qPCR integra la detección cuantitativa de hemoparásitos con el análisis de los retrovirus VIF y ViLeF, identificando coinfecciones y escenarios de inmunosupresión crónica en un solo paso.",
      link: "/aprende/joe-vif-vilef"
    }
  ];

  if (userRole === 'owner') {
    return (
      <div className="w-full min-h-[calc(100vh-92px)] bg-[#f8f9ff] py-16 px-6 flex items-center justify-center">
        <div className="max-w-6xl w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center gap-10 text-left">
          {/* Left Column: Image */}
          <div className="flex-1 w-full overflow-hidden rounded-xl">
            <img 
              src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/salud-intestinal-en-perros.jpg" 
              alt="Microbiota intestinal en mascotas" 
              className="w-full h-auto object-cover select-none"
            />
          </div>

          {/* Right Column: Text content */}
          <div className="flex-1 space-y-6 flex flex-col justify-center">
            <h1 className="text-2xl md:text-3xl lg:text-[34px] font-black text-[#6F2BCC] leading-tight font-sans">
              Microbiota intestinal: clave para la salud y el bienestar de tus mascotas
            </h1>
            <p className="text-[#555555] text-sm md:text-base leading-relaxed font-medium font-sans">
              La medicina veterinaria está en constante búsqueda de nuevas maneras de mejorar la salud de los mascotas. El laboratorio On Site Diagnostic no es ajeno a esto, por eso está en constante investigación para encontrar nuevos avances y métodos que permitan mejorar la salud de los animales...
            </p>
            <div className="pt-2">
              <Link 
                to="/prueba-microbiota-una-solucion-en-la-salud-animal"
                className="inline-block bg-[#6F2BCC] hover:bg-[#2B017C] text-white font-bold py-3.5 px-8 rounded-lg text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                Leer más
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white font-sans antialiased text-gray-800">
      
      {/* Hero Section (Fills remaining height, transitions to white background on scroll) */}
      <section 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full min-h-[calc(100vh-92px)] bg-white flex flex-col items-center justify-center text-center overflow-hidden"
      >
        {/* Purple Background Layer - fades out completely on scroll */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-100 ease-out"
          style={{
            backgroundColor: '#6F2BCC',
            opacity: 1 - scrollProgress
          }}
        />

        {/* Dynamic Constellation Canvas (our custom interactive "gif" background) - shifts as a single layer */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-transform duration-200 ease-out" 
          style={{
            transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px) scale(1.06)`,
            opacity: 0.75 * (1 - scrollProgress)
          }}
        />

        {/* Content wrapper */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-bold font-display text-[#01FADA] uppercase tracking-tight leading-none text-shadow-lg">
            El contexto detrás de las pruebas
          </h1>
          <p 
            className="text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed font-semibold font-sans transition-colors duration-200"
            style={{
              color: scrollProgress > 0.45 ? '#2B017C' : '#ffffff'
            }}
          >
            Video cápsulas para veterinarios que quieren comprender cómo el diagnóstico diferencial potencia la práctica clínica, entregando información precisa y rápida que invita a razonar con claridad y mejorar el bienestar de sus pacientes.
          </p>
        </div>
      </section>

      {/* Profile Cards Grid Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {profiles.map((profile, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:scale-[1.03] flex flex-col items-center text-center group"
            >
              {/* Illustration Icon (Natural square proportions, removed circle boundary frame) */}
              <div className="w-full h-[180px] mb-6 flex items-center justify-center overflow-hidden bg-transparent">
                <img 
                  src={profile.image} 
                  alt={profile.title} 
                  className="max-w-full max-h-full object-contain transform group-hover:scale-105 transition-transform duration-500" 
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#2B017C] mb-4">
                {profile.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-8 text-justify flex-grow">
                {profile.description}
              </p>

              {/* Action Button */}
              <Link 
                to={profile.link}
                className="w-full inline-block border-2 border-[#2B017C] hover:bg-[#2B017C] text-[#2B017C] hover:text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-all duration-300 cursor-pointer"
              >
                Saber más
              </Link>
            </div>
          ))}

        </div>
      </section>

    </div>
  );
}
