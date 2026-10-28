import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Noticias() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isVet, setIsVet] = useState(null);
  const [optIn, setOptIn] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState(null);

  const handleSubscribe = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSubscribeStatus('success');
    setEmail('');
    setName('');
    setIsVet(null);
    setOptIn(false);
  };

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    const target = e.target;
    if (target.tagName.toLowerCase() === 'input' && target.type !== 'checkbox' && target.type !== 'radio') {
      if (name.trim() !== '' && email.trim() !== '') {
        e.preventDefault();
        handleSubscribe(e);
        return;
      }
      e.preventDefault();
      const form = e.currentTarget;
      const inputs = Array.from(form.querySelectorAll('input[type="text"], input[type="email"]'));
      const index = inputs.indexOf(target);
      if (index > -1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    }
  };

  const articles = [
    {
      id: "6458",
      title: "dPCR en Medicina Veterinaria: Proyecto de OSD y ANNAR",
      date: "Mayo 22, 2026",
      image: "https://res.cloudinary.com/oiaig120/image/upload/osdiagnostic/PCR-DIGITAL.svg",
      excerpt: "OSD y ANNAR avanzan en el desarrollo de PCR digital (dPCR) en un nuevo encuentro de trabajo colaborativo, abriendo camino hacia una medicina de precisión y preventiva para veterinarios.",
      author: "Alejandro Gil",
      link: "/noticias-veterinarias/pcr-digital"
    },
    {
      id: "6371",
      title: "Primera caracterización de la frecuencia de la mutación nt230[del4] del gen MDR1 en razas caninas en Colombia",
      date: "Mayo 6, 2026",
      image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/mariapweb-01.png",
      excerpt: "El gen MDR1 es el encargado de expresar la glicoproteína P, una proteína transportadora localizada en diversas barreras biológicas. Analizamos la frecuencia de su mutación nt230[del4] en la población canina colombiana.",
      author: "María Paula Urian Ávila; Leidy Alejandra Giraldo; Juan Esteban Lamprea; Luna Valentina Villarraga; Laura Camila Largo; María Helena Bonilla; Cesar Orlando Muñoz",
      link: "/noticias-veterinarias/caterizacion-de-mutacion-nt230del4-del-gen-mdr1"
    },
    {
      id: "5929",
      title: "Microbiota intestinal en perros y gatos según su edad",
      date: "Diciembre 1, 2025",
      image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/indice-de-Disbiosis-en-perros-y-gatos-768x432.png",
      excerpt: "Un análisis detallado sobre cómo varía la abundancia de cada grupo bacteriano a lo largo del desarrollo de caninos y felinos sanos, estableciendo valores de referencia moleculares por edad.",
      author: "Juan Esteban Lamprea Rodríguez; Leidy Alejandra Giraldo Martínez; Farley Adriana Garavito Jaimes; Felipe Amador Lujan; María Helena Bonilla Lagos; Alida Carolina Valencia Gafaro",
      link: "/noticias-veterinarias/microbiota-intestinal-en-perros-y-gatos-segun-su-edad"
    },
    {
      id: "5298",
      title: "Donación de sangre para mascotas en Colombia",
      date: "Octubre 27, 2025",
      image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/microorganismos-infecciosos-768x432.png",
      excerpt: "La otra urgencia en la medicina veterinaria: el acceso a sangre segura. Ante la falta de hemocomponentes para mascotas, exploramos la solución solidaria y logística de VetBank.",
      author: "Camila Largo",
      link: "/noticias-veterinarias/noticias-veterinarias-donacion-de-sangre-para-mascotas"
    },
    {
      id: "5845",
      title: "El ADN de OSD: investigación en busca de transformar la medicina veterinaria.",
      date: "Octubre 15, 2025",
      image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/investigacion-veterinaria-768x432.png",
      excerpt: "Investigación con propósito: El ADN que transforma la medicina veterinaria. Conozca cómo el centro biotecnológico impulsa la innovación clínica aplicada durante el año 2025.",
      author: "OSD Editorial",
      link: "/noticias-veterinarias/investigacion-veterinaria"
    },
    {
      id: "5900",
      title: "OSD llevó el conocimiento veterinario colombiano a un escenario internacional",
      date: "Agosto 8, 2025",
      image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/medicina-bioreguladora-768x435.png",
      excerpt: "Colombia estuvo presente en el Primer Diplomado de Medicina Integrativa y Biorreguladora de Sistemas. Conozca la participación estratégica y los aportes científicos de nuestro equipo.",
      author: "Mariana Martínez Aristizabal",
      link: "/noticias-veterinarias/osd-llevo-el-conocimiento-veterinario-colombiano-a-un-escenario-internacional"
    },
    {
      id: "5910",
      title: "Ahora puedes acceder al Test de Índice de Disbiosis para veterinarios en Colombia",
      date: "Julio 21, 2025",
      image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/bannernews-768x428.png",
      excerpt: "Más allá de tratar: el arte de comprender el cuerpo como un todo. El Test de ID de OSD se convierte en la primera herramienta molecular masiva para veterinarios colombianos.",
      author: "OSD Editorial",
      link: "/noticias-veterinarias/ahora-puedes-acceder-al-test-de-indice-de-disbiosis-para-veterinarios-en-colombia"
    },
    {
      id: "5920",
      title: "Clase hemoleucograma y hemotrópicos en Medellín",
      date: "Febrero 28, 2025",
      image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/san.jpg",
      excerpt: "Medellín fue sede de una clase práctica intensiva sobre hemoleucograma e infecciones por hemotrópicos caninos y felinos dictada para médicos del sector.",
      author: "OSD Editorial",
      link: "/noticias-veterinarias/clase-hemoleucograma-y-hemotropicos-en-medellin"
    }
  ];

  const featured = {
    title: "La otra urgencia en la medicina veterinaria: el acceso a sangre segura",
    date: "Medellín, febrero de 2025",
    excerpt: "En la actualidad, las clínicas y hospitales veterinarios reciben constantemente pacientes felinos y caninos en situation crítica que requieren transfusiones de sangre. Sin embargo, el acceso a unidades seguras, tipificadas y libres de agentes infecciosos sigue siendo uno de los mayores desafíos logísticos y diagnósticos del sector.",
    image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/microorganismos-infecciosos-768x432.png",
    link: "/noticias-veterinarias/noticias-veterinarias-donacion-de-sangre-para-mascotas"
  };

  return (
    <div className="w-full bg-[#f6f8fa] font-sans antialiased text-[#2B017C] py-12">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        
        {/* Page Title Header */}
        <div className="text-left border-b border-gray-200 pb-6">
          <h1 className="text-4xl md:text-5xl font-bold font-display uppercase tracking-tight mb-2">
            OSD News
          </h1>
          <p className="text-gray-500 text-sm md:text-base font-semibold font-sans">
            Actualidad, investigaciones clínicas y avances en medicina veterinaria molecular.
          </p>
        </div>

        {/* Featured Post Card (Top Hero block with the high-quality puzzle blood bag image) */}
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row items-stretch">
          
          {/* Left Column: High-quality illustration */}
          <div className="md:w-1/2 relative min-h-[260px] md:min-h-full bg-slate-50 flex items-center justify-center p-6">
            <img 
              src={featured.image} 
              alt={featured.title} 
              className="w-full h-full object-contain max-h-[350px]"
            />
          </div>

          {/* Right Column: Details */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-left space-y-4">
            <span className="text-xs font-bold text-[#6f2bcc] uppercase tracking-wider font-sans">
              {featured.date}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-display leading-tight text-[#222222]">
              {featured.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed font-sans">
              {featured.excerpt}
            </p>
            <div className="pt-2">
              <Link 
                to={featured.link}
                className="inline-flex items-center text-sm font-bold text-[#6f2bcc] hover:text-[#2b017c] group transition-colors duration-200 font-sans"
              >
                <span>Leer artículo completo</span>
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Section Content split into 2 Columns (Grid + Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Articles Grid (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-2xl font-bold font-display uppercase tracking-tight text-left mb-6">
              Últimas Publicaciones
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((art, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
                >
                  {/* Article Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-50 flex items-center justify-center p-4">
                    <img 
                      src={art.image} 
                      alt={art.title} 
                      className="w-full h-full object-contain transform group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>
                  {/* Article content info */}
                  <div className="p-6 text-left flex flex-col flex-grow space-y-3">
                    <div className="flex items-center space-x-2 text-xs text-gray-400 font-bold font-sans">
                      <span>{art.date}</span>
                      <span>•</span>
                      <span className="text-[#6f2bcc]">OSD News</span>
                    </div>
                    <h4 className="text-lg font-bold font-display leading-snug text-[#222222] line-clamp-3 group-hover:text-[#6f2bcc] transition-colors">
                      {art.title}
                    </h4>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-3 flex-grow font-sans">
                      {art.excerpt}
                    </p>
                    <div className="pt-2">
                      <Link 
                        to={art.link}
                        className="text-xs font-bold text-[#2B017C] hover:text-[#6f2bcc] transition-colors uppercase tracking-wider font-sans"
                      >
                        Leer más
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Newsletter Subscription Sidebar Card (1/3 width) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Sticky Sidebar wrapper (Same color scheme: White with purple border) */}
            <div className="sticky top-28 bg-white text-[#2B017C] rounded-3xl p-8 shadow-md text-left space-y-6 border-2 border-[#6F2BCC] font-sans">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-display tracking-tight text-[#6F2BCC]">
                  OSD+knowledge
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Suscríbete y recibe directamente en tu e-mail todas nuestras novedades, estudios científicos y guías técnicas.
                </p>
              </div>

              {subscribeStatus === 'success' ? (
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-teal-800 text-sm font-semibold">
                  ✓ ¡Gracias por suscribirte! Se ha realizado tu suscripción de manera correcta.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} onKeyDown={handleKeyDown} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#6F2BCC]/80">
                      Nombre completo
                    </label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre completo"
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#6F2BCC] focus:ring-1 focus:ring-[#6F2BCC] text-sm transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#6F2BCC]/80">
                      Tu e-mail
                    </label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@correo.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#6F2BCC] focus:ring-1 focus:ring-[#6F2BCC] text-sm transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#6F2BCC]/80 block">
                      ¿Eres médico veterinario?
                    </label>
                    <div className="flex items-center space-x-6 text-sm text-gray-700">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="isVet" 
                          checked={isVet === true}
                          onChange={() => setIsVet(true)}
                          className="text-[#6F2BCC] focus:ring-0 cursor-pointer"
                        />
                        <span>Sí</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="isVet" 
                          checked={isVet === false}
                          onChange={() => setIsVet(false)}
                          className="text-[#6F2BCC] focus:ring-0 cursor-pointer"
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start space-x-2.5 text-xs text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
                      <input 
                        type="checkbox" 
                        required
                        checked={optIn}
                        onChange={(e) => setOptIn(e.target.checked)}
                        className="mt-0.5 rounded text-[#6F2BCC] focus:ring-0 cursor-pointer"
                      />
                      <span>Acepto recibir newsletters y novedades de On Site Diagnostic.</span>
                    </label>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#6F2BCC] hover:bg-[#2B017C] text-white font-bold py-3 px-6 rounded-lg text-sm tracking-wide transition-all duration-300 uppercase shadow-md cursor-pointer font-sans"
                  >
                    Suscríbete
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
