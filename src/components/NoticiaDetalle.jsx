import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import articlesData from '../assets/all_articles.json';

export default function NoticiaDetalle() {
  const { articleSlug } = useParams();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState(null);

  const article = articlesData.find(art => art.name === articleSlug) || articlesData[0];

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribeStatus('success');
    setEmail('');
    setName('');
  };

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  let cleanContent = article.content;
  let leftInfo = null;

  // Split content and populate left sidebar based on article ID
  if (article.id === "6371") { // MDR1
    leftInfo = (
      <div className="space-y-4 text-xs font-semibold text-gray-500 leading-relaxed font-sans text-center w-full">
        <p className="text-[#6F2BCC] font-bold text-xs uppercase tracking-wider text-center">Por:</p>
        <p className="text-[#555555] text-center font-medium text-xs">
          María Paula Urian Ávila ¹, ² , Leidy Alejandra Giraldo ¹, Juan Esteban Lamprea¹, Luna Valentina Villarraga¹, Laura Camila Largo¹, María Helena Bonilla¹, Cesar Orlando Muñoz¹.
        </p>
        <div className="border-t border-gray-100 pt-4 space-y-2 text-gray-400 font-normal text-center">
          <p>¹. Grupo de Investigación On Site Research, On Site Diagnostic S.A.S. Medellín (Colombia)</p>
          <p>². Pregrado en Medicina Veterinaria. Facultad de Medicina Veterinaria y de Zootecnia. Universidad Nacional de Colombia. Bogotá (Colombia)</p>
        </div>
      </div>
    );
    // Remove the author block from rendering in the center body
    const cutIdx = cleanContent.indexOf('<p dir="ltr"><strong>PRIMERA CARACTERIZACIÓN');
    if (cutIdx !== -1) {
      const pIdx = cleanContent.indexOf('</p>', cutIdx);
      if (pIdx !== -1) {
        cleanContent = cleanContent.substring(pIdx + 4);
      }
    }
  } else if (article.id === "5929") { // Microbiota
    leftInfo = (
      <div className="space-y-3.5 text-[11px] leading-relaxed font-sans text-gray-500 text-center w-full">
        <p className="text-[#6F2BCC] font-bold text-xs uppercase tracking-wider text-center">Por:</p>
        <p className="text-gray-500 font-medium leading-relaxed">
          Juan Esteban Lamprea Rodríguez¹; Leidy Alejandra Giraldo Martínez¹; Farley Adriana Garavito Jaimes¹; Felipe Amador Lujan¹; María Helena Bonilla Lagos¹; Alida Carolina Valencia Gafaro¹; Juan Camilo Álvarez Díaz¹; Luz Ángela Vanegas Moreno²; Juan Carlos Builes¹; Francesc Minguell Martín³; César Orlando Muñoz Cadavid¹**
        </p>
        <div className="border-t border-gray-100 pt-3 space-y-1 text-gray-400 italic text-[10px] leading-snug">
          <p>¹Grupo de Investigación On Site Research, On Site Diagnostic SAS, Medellín, Colombia.</p>
          <p>²Nutriología veterinaria, Bogotá, Colombia.</p>
          <p>³Instituto de Acupuntura Veterinaria, Bogotá, Colombia.</p>
        </div>
      </div>
    );
  } else if (article.id === "5298") { // Donación de Sangre / VetBank
    leftInfo = (
      <div className="text-center font-sans text-xs md:text-[13.5px] leading-relaxed text-gray-500 font-medium mt-1">
        <p>Por: <span className="font-bold text-[#555555]">Camila Largo</span></p>
        <p className="text-gray-400 font-semibold">MV</p>
      </div>
    );
  } else if (article.id === "6458") { // dPCR / OSD y ANNAR
    leftInfo = (
      <div className="text-center font-sans text-xs md:text-[13.5px] leading-relaxed text-gray-500 font-medium mt-1">
        <p>Por: <span className="font-bold text-[#555555]">Alejandro Gil</span></p>
      </div>
    );
  } else {
    // Fallback dynamic extraction/split for other articles
    const authorStr = article.author || "OSD Editorial";
    leftInfo = (
      <div className="space-y-3 text-xs font-semibold text-gray-500 leading-relaxed font-sans text-center w-full">
        <p className="text-[#6F2BCC] font-bold text-xs uppercase tracking-wider">Por:</p>
        <div className="space-y-1 text-[#555555] font-medium text-xs text-center">
          {authorStr.split(';').map((auth, idx) => (
            <p key={idx}>{auth.trim()}</p>
          ))}
        </div>
      </div>
    );
    
    // Clean "Por:" prefix from the body text (expanded index threshold to 1500 to catch middle OSD logo blocks)
    const porIdx = cleanContent.indexOf('<strong>Por</strong>:');
    if (porIdx !== -1 && porIdx < 1500) {
      const endP = cleanContent.indexOf('</p>', porIdx);
      if (endP !== -1) {
        cleanContent = cleanContent.substring(endP + 4);
      }
    }
  }

  // Clean raw image tags at the beginning of the body
  if (cleanContent.startsWith('<img') || cleanContent.startsWith('<p><img')) {
    const endImg = cleanContent.indexOf('/>');
    if (endImg !== -1) {
      cleanContent = cleanContent.substring(endImg + 2);
    }
  }

  // Slice content for articles that contain a duplicate OSD logo and "Por: OSD" paragraph
  if (article.id === "5910" || article.id === "5900" || article.id === "5845" || article.id === "5298") {
    const porIdx = cleanContent.indexOf('<strong>Por</strong>: OSD');
    if (porIdx !== -1 && porIdx < 1500) {
      const endP = cleanContent.indexOf('</p>', porIdx);
      if (endP !== -1) {
        cleanContent = cleanContent.substring(endP + 4);
      }
    }
    // Also clean any Camila Largo MVP author texts if they duplicate in body
    const camilaIdx = cleanContent.indexOf('<strong>Por</strong>: Camila Largo');
    if (camilaIdx !== -1 && camilaIdx < 1500) {
      const endP = cleanContent.indexOf('</p>', camilaIdx);
      if (endP !== -1) {
        cleanContent = cleanContent.substring(endP + 4);
      }
    }
  }

  // Specific slice logic for Post 5298 to cleanly strip duplicate Camila Largo MV intro text
  if (article.id === "5298") {
    const mvIdx = cleanContent.indexOf('MV</p>');
    if (mvIdx !== -1 && mvIdx < 1500) {
      cleanContent = cleanContent.substring(mvIdx + 6);
    }
  }

  // Specific slice logic for Post 6458 to cleanly strip duplicate Alejandro Gil intro text
  if (article.id === "6458") {
    const pIdx = cleanContent.indexOf('Por: Alejandro Gil');
    if (pIdx !== -1 && pIdx < 1500) {
      const startP = cleanContent.lastIndexOf('<p', pIdx);
      const endP = cleanContent.indexOf('</p>', pIdx);
      if (startP !== -1 && endP !== -1 && startP < pIdx) {
        cleanContent = cleanContent.substring(0, startP) + cleanContent.substring(endP + 4);
      }
    }
  }

  // Specific slice logic for Post 5929 to cleanly strip duplicate microbiota metadata/header
  if (article.id === "5929") {
    const titleIdx = cleanContent.indexOf('EN CANINOS Y FELINOS</h1>');
    if (titleIdx !== -1 && titleIdx < 1800) {
      cleanContent = cleanContent.substring(titleIdx + 'EN CANINOS Y FELINOS</h1>'.length);
    }
  }

  // Specific slice logic for Post 6371 to cleanly strip duplicate title
  if (article.id === "6371") {
    const titleIdx = cleanContent.indexOf('EN RAZAS CANINAS EN COLOMBIA. </strong></p>');
    if (titleIdx !== -1 && titleIdx < 1500) {
      cleanContent = cleanContent.substring(titleIdx + 'EN RAZAS CANINAS EN COLOMBIA. </strong></p>'.length);
    }
  }

  // Specific slice logic for Post 5900 to ensure we strip the title heading duplicate
  if (article.id === "5900") {
    const titleIdx = cleanContent.indexOf('del Diplomado de Medicina Integrativa y Biorreguladora de Sistemas en Pequeños Animales.</h1>');
    if (titleIdx !== -1 && titleIdx < 1500) {
      cleanContent = cleanContent.substring(titleIdx + 'del Diplomado de Medicina Integrativa y Biorreguladora de Sistemas en Pequeños Animales.</h1>'.length);
    }
  }

  // Specific link rewrite for article 5900 to point to "/test-disbiosis-mascotas" instead of "/prueba-fecal-para-mascotas"
  if (article.id === "5900") {
    cleanContent = cleanContent
      .replace(/href="https:\/\/osdiagnostic\.com\/prueba-fecal-para-mascotas\/?"/g, 'href="/test-disbiosis-mascotas"')
      .replace(/href="\/prueba-fecal-para-mascotas\/?"/g, 'href="/test-disbiosis-mascotas"');
  }

  // Dynamically rewrite outbound WordPress links to point to the local React router path "/prueba-fecal-para-mascotas"
  cleanContent = cleanContent
    .replace(/href="https:\/\/osdiagnostic\.com\/prueba-fecal-para-mascotas\/?"/g, 'href="/prueba-fecal-para-mascotas"')
    .replace(/href="\/prueba-fecal-para-mascotas\/?"/g, 'href="/prueba-fecal-para-mascotas"');

  // Strip trailing duplicate Volver and Síguenos blocks from body HTML content
  const linkPatterns = [
    '<a href="https://osdiagnostic.com/noticias-veterinarias',
    '<a href="http://osdiagnostic.com/noticias-veterinarias',
    '<a href="/noticias-veterinarias',
    '<p>Síguenos</p>',
    'Síguenos'
  ];
  for (const pattern of linkPatterns) {
    const trailingIdx = cleanContent.indexOf(pattern);
    if (trailingIdx !== -1 && trailingIdx > cleanContent.length - 1200) {
      cleanContent = cleanContent.substring(0, trailingIdx);
      break;
    }
  }

  // Dynamic image mapping for the left column to match Elementor designs
  const leftColumnImages = {
    "5298": "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/camila_largo.png",
    "5845": "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/laboratorio-molecular-veterinario.png",
    "5900": "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/laboratorio-molecular-veterinario.png",
    "5910": "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/laboratorio-molecular-veterinario.png",
    "5920": "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/san.jpg",
    "5929": "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/laboratorio-molecular-veterinario.png",
    "6371": "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/laboratorio-molecular-veterinario.png",
    "6458": "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/laboratorio-molecular-veterinario.png"
  };

  const leftImg = leftColumnImages[article.id] || "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/laboratorio-molecular-veterinario.png";

  // Dynamic Banner Configuration mapping for specific article IDs
  const bannerConfigs = {
    "5910": {
      image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/bannernews_01.png",
      title: "Test Índice de Disbiosis en Colombia",
      subtitle: "Más allá de tratar: el arte de comprender el cuerpo como un todo"
    },
    "5845": {
      image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/bannernews_01.png",
      title: "El ADN que trasforma la medicina veterinaria",
      subtitle: "Investigación con propósito"
    },
    "5900": {
      image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/medicina_bioreguladora_colombia.png",
      title: "Colombia llevó conocimiento al escenario internacional",
      subtitle: "OSD en el Primer Diplomado de Medicina Integrativa y Biorreguladora de Sistemas"
    },
    "5298": {
      image: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/san.jpg",
      title: "La otra urgencia en la medicina veterinaria: el acceso a sangre segura",
      subtitle: ""
    }
  };

  const banner = bannerConfigs[article.id];
  const isClassMedellin = article.id === "5920";

  const isOSDLogo = leftImg.includes('laboratorio-molecular-veterinario') || leftImg.includes('laboratorio-de-biologia-molecular');

  const displayTitle = article.id === "5929"
    ? "DESARROLLO DE UN ÍNDICE DE DISBIOSIS ESTRATIFICADO POR EDAD PARA LA EVALUACIÓN DE LA MICROBIOTA INTESTINAL EN CANINOS Y FELINOS"
    : (article.id === "5298"
      ? "Colombia ante la falta de sangre para mascotas: la solución solidaria de VetBank"
      : article.title);

  return (
    <div className="w-full bg-white font-sans antialiased text-[#555555]">
      
      {/* 1. Top Header Banner - Dynamic or Medellin Class */}
      {isClassMedellin ? (
        <section 
          className="relative min-h-[380px] md:min-h-[460px] bg-cover bg-center flex items-center justify-center text-center px-6 py-20"
          style={{ backgroundImage: `url('https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/san.jpg')` }}
        >
          <div className="absolute inset-0 bg-black/45 z-0"></div>
          <h1 className="relative z-10 text-white font-black text-3xl md:text-5xl max-w-5xl leading-tight font-sans">
            Hemoleucograma e infecciones por hemotrópicos
          </h1>
        </section>
      ) : banner ? (
        <section 
          className="relative min-h-[200px] md:min-h-[340px] flex flex-col items-center justify-center text-center px-6 py-8 md:py-12 overflow-hidden"
        >
          {article.id === "5298" ? (
            /* Render looping background video for Donacion de Sangre post */
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover z-0"
            >
              <source src="https://res.cloudinary.com/oiaig120/video/upload/q_auto/osdiagnostic/donacion-de-sangre.mp4" type="video/mp4" />
            </video>
          ) : (
            /* Render background image for other banner posts */
            <div 
              className="absolute inset-0 bg-cover bg-center z-0" 
              style={{ backgroundImage: `url('${banner.image}')` }}
            />
          )}
          {/* Transparent deep color overlay to match Elementor style (disabled for mdr1) */}
          {article.id !== "6371" && (
            <div className="absolute inset-0 bg-[#2B017C]/45 z-5"></div>
          )}
          
          <div className="relative z-10 space-y-3 max-w-4xl">
            {banner.title && (
              <h1 className="text-white font-black text-2xl md:text-4xl leading-tight font-sans">
                {banner.title}
              </h1>
            )}
            {banner.subtitle && (
              <p className="text-white/90 text-sm md:text-lg font-medium font-sans">
                {banner.subtitle}
              </p>
            )}
          </div>
        </section>
      ) : null}

      {/* Main Grid / Full Width Wrapper */}
      {isClassMedellin ? (
        /* Full width structured page design for Medellin Class without columns */
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-left">
          
          <h2 className="text-xl md:text-2xl font-bold font-sans tracking-tight text-[#555555] text-center leading-snug max-w-3xl mx-auto">
            Medellín fue sede de una clase sobre hemoleucograma e infecciones por hemotrópicos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 space-y-4 text-[#555555] text-sm md:text-[14.8px] leading-relaxed font-sans font-medium">
              <p>
                <strong className="text-[#555555]">Medellín, febrero de 2025</strong> – Entre el 3 y el 8 de febrero, Medellín acogió una clase personalizada gratuita sobre la correlación del hemoleucograma e infecciones por hemotrópicos, impartida por el reconocido científico César O. Muñoz, cofundador y director científico de OSD.
              </p>
              <p>
                El evento, dirigido a profesionales del área veterinaria y de la salud, permitió profundizar en el diagnóstico preciso de enfermedades hemotrópicas mediante la interpretación del hemoleucograma. Muñoz, bacteriólogo con maestría y doctorado en biotecnología en salud, compartió su experiencia en biología molecular aplicada a la detección de patógenos.
              </p>
            </div>
            <div className="md:col-span-5">
              <img 
                src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/laboratorioparaveterinarias-1.png" 
                alt="Laboratorio de biologia molecular" 
                className="w-full rounded-2xl shadow-sm object-cover"
              />
            </div>
          </div>

          <div className="bg-[#6F2BCC] relative overflow-hidden rounded-xl w-full aspect-[3943/1250] shadow-md group">
            <img 
              src="https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/equipo_2.png" 
              alt="Equipo On Site Diagnostic" 
              className="absolute inset-0 w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-500 z-0"
            />
            <div className="absolute inset-0 bg-black/35 group-hover:bg-transparent transition-colors duration-500 z-5"></div>
            <div className="absolute inset-2 md:inset-3 border border-white/20 p-3 md:p-6 flex flex-col justify-end text-left z-10">
              <h3 className="text-xs md:text-lg font-bold font-sans text-white tracking-tight leading-tight">
                On Site Diagnostic
              </h3>
              <p className="text-white/95 text-[9px] md:text-xs mt-1.5 leading-relaxed font-sans max-w-2xl font-medium">
                On Site Diagnostic SAS es un laboratorio especializado en el desarrollo e implementación de técnicas diagnósticas de biología molecular de última generación, para garantizar diagnósticos precisos y útiles para la salud de humanos y animales.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-[#555555] text-sm md:text-[14.8px] leading-relaxed font-sans font-medium">
            <p>
              La iniciativa, organizada por OSD_LAB, fue una oportunidad única para los especialistas interesados en actualizarse en herramientas diagnósticas avanzadas.
            </p>
            <p>
              El evento generó gran interés en la comunidad científica y profesional, consolidando a OSD_LAB como un referente en educación y diagnóstico veterinario de precisión.
            </p>
            <p>
              Conoce más haciendo clic <a href="https://www.instagram.com/osd_lab?igsh=MWcxcDg5cTByMGR0YQ==" target="_blank" rel="noreferrer" className="text-[#6F2BCC] font-bold hover:underline">aquí</a>
            </p>
          </div>

          <div className="pt-8 border-t border-gray-100 mt-10 text-center space-y-2">
            <h3 className="text-xl md:text-2xl font-black font-sans text-[#555555] leading-snug">
              Nuestras qPCR para Hemotrópicos: Precisión al servicio del diagnóstico veterinario
            </h3>
          </div>

          <div className="space-y-5 text-[#555555] text-sm md:text-[14.8px] leading-relaxed font-sans font-medium">
            <p>
              En el marco de la clase sobre hemoleucograma e infecciones por hemotrópicos impartida en Medellín por el Dr. César O. Muñoz, cofundador y director científico de OSD, se destacó la importance de contar con herramientas moleculares precisas para detectar patógenos que afectan la salud hematológica en animales:
            </p>
            <p>
              En OSD contamos con un portafolio completo de pruebas qPCR (reacción en cadena de la polimerasa en tiempo real) enfocadas en agentes hemotrópicos de alta relevancia clínica. Estas pruebas están diseñadas para mejorar el valor diagnóstico, reduce los falsos negativos y apoyar al clínico en la toma de decisiones terapéuticas basadas en evidencia.
            </p>
          </div>

          <div className="space-y-6 pt-2">
            <div>
              <h4 className="font-black text-[#555555] text-base font-sans mb-1">
                qPCR Hemotrópico Completo.
              </h4>
              <p className="text-gray-500 text-xs md:text-sm font-sans italic leading-relaxed">
                Anaplasma spp, Rickettsia spp, Ehrlichia spp, Mycoplasma spp, Bartonella spp, Hepatozoon spp, Babesia spp. Dirofilaria spp. (D. immitis, D. striata, D. repens, Brugia pahangi), Trypanosoma spp, Leptospira spp, Toxoplasma gondii spp.
              </p>
            </div>

            <div>
              <h4 className="font-black text-[#555555] text-base font-sans mb-1">
                qPCR Hemotrópico Canino.
              </h4>
              <p className="text-gray-500 text-xs md:text-sm font-sans italic leading-relaxed">
                Anaplasma spp, Ehrlichia spp, Mycoplasma spp, Hepatozoon spp, Babesia spp, Toxoplasma gondii, Dirofilaria spp. con diferenciación entre especies (D. immitis, D. repens, D. striata, Brugia pahangi)
              </p>
            </div>

            <div>
              <h4 className="font-black text-[#555555] text-base font-sans mb-1">
                qPCR Hemotrópico Felino.
              </h4>
              <p className="text-gray-500 text-xs md:text-sm font-sans italic leading-relaxed">
                Anaplasma spp, Rickettsia spp, Ehrlichia spp, Mycoplasma spp, Hepatozoon spp, Toxoplasma gondii, Bartonella spp. (en felinos)
              </p>
            </div>

            <div>
              <h4 className="font-black text-[#555555] text-base font-sans mb-1">
                qPCR Sida, Leucemia y Hemotrópicos Felinos.
              </h4>
              <p className="text-gray-500 text-xs md:text-sm font-sans italic leading-relaxed">
                Virus de Inmunodeficiencia Felina (FIV y PFIV), Virus de la Leucemia Felina (FeLV y PFeLV), Anaplasma spp, Rickettsia spp, Ehrlichia spp, Mycoplasma spp, Hepatozoon spp, Toxoplasma gondii, Bartonella spp. (en felinos)
              </p>
            </div>
          </div>

          <div className="pt-6">
            <Link 
              to="/noticias-veterinarias" 
              className="inline-flex items-center space-x-2 text-[#6F2BCC] hover:text-[#2B017C] font-bold text-sm md:text-base transition-colors group"
            >
              <svg 
                className="w-5 h-5 stroke-current text-[#6F2BCC] transform group-hover:-translate-x-1 transition-transform" 
                viewBox="0 0 24 24" 
                fill="none" 
                strokeWidth="4.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <span>Volver</span>
            </Link>
          </div>

          <div className="pt-10 border-t border-gray-150 text-center space-y-6">
            <h4 className="text-2xl md:text-3xl font-black font-sans text-[#555555] uppercase tracking-wide">
              Nuestro portafolio
            </h4>
            <div className="space-y-4 max-w-2xl mx-auto text-[#555555] text-xs md:text-sm leading-relaxed font-sans font-medium">
              <p className="font-black text-[#555555] text-sm md:text-base">
                Todas nuestras pruebas qPCR utilizan tecnología de sondas de hidrólisis, lo que garantiza alta especificidad, sensibilidad y confiabilidad diagnóstica.
              </p>
              <p>
                Conoce todo nuestro portafolio de qPCR y descubre cómo podemos ayudarte a tomar decisiones clínicas más precisas y fundamentadas. Escríbenos o agenda una asesoría personalizada con nuestro equipo científico.
              </p>
            </div>
            <div className="pt-2">
              <a 
                href="https://wa.link/2js1xk"
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-[#2B017C] hover:bg-[#6F2BCC] text-white font-bold py-3 px-8 rounded text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                Haz clic aquí
              </a>
            </div>
          </div>

        </div>
      ) : (
        /* Standard Dynamic 3-Column Grid for other articles */
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 py-16">
          
          {/* Left Column: Author Card Affiliation */}
          <div className="lg:col-span-3 flex flex-col items-center space-y-6 w-full">
            {isOSDLogo ? (
              /* Render circular logo with matching purple background and contain padding to prevent text cropping */
              <div className="w-32 h-32 rounded-full bg-[#6F2BCC] overflow-hidden flex items-center justify-center mx-auto shadow-sm">
                <img 
                  src={leftImg} 
                  alt="On Site Diagnostic" 
                  className="w-full h-full object-contain p-3 rounded-full"
                />
              </div>
            ) : (
              /* Render other author photos inside the standard border container */
              <div className="w-36 h-36 overflow-hidden rounded-full border border-gray-150 shadow-sm flex items-center justify-center p-0.5 bg-white mx-auto">
                <img 
                  src={leftImg} 
                  alt="Article Author" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            )}
            {leftInfo}
          </div>

          {/* Middle Column: Title Box & Post Content Body */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="bg-white p-6 md:p-8 border border-gray-100 shadow-lg rounded-xl mb-6">
              <h1 className="text-xl md:text-2xl font-bold font-sans tracking-tight text-[#555555] leading-snug">
                {displayTitle}
              </h1>
              <p className="text-gray-400 text-xs font-semibold mt-3 uppercase tracking-wider">
                {formatDate(article.date)}
              </p>
            </div>

            <article 
              className="prose max-w-none text-[#555555] text-[15.6px] leading-[1.6] font-sans
                [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-2xl [&_img]:my-6 [&_img]:mx-auto [&_img]:block [&_img]:shadow-md
                [&_svg]:max-w-[40px] [&_svg]:h-auto [&_svg]:inline-block [&_svg]:text-[#6F2BCC]
                [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:font-sans [&_h1]:text-[#555555] [&_h1]:mt-8 [&_h1]:mb-4
                [&_h2]:text-xl [&_h2]:font-bold [&_h2]:font-sans [&_h2]:text-[#555555] [&_h2]:mt-6 [&_h2]:mb-3
                [&_h3]:text-lg [&_h3]:font-bold [&_h3]:font-sans [&_h3]:text-[#555555] [&_h3]:mt-5 [&_h3]:mb-2
                [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-[#555555]
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:text-[#555555]
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:text-[#555555]
                [&_li]:mb-1.5 [&_a]:text-[#6F2BCC] [&_a]:font-semibold [&_a]:hover:underline"
              dangerouslySetInnerHTML={{ __html: cleanContent }}
            />

            <div className="pt-8 border-t border-gray-100 mt-8 flex items-center">
              <Link 
                to="/noticias-veterinarias" 
                className="inline-flex items-center space-x-2 text-[#6F2BCC] hover:text-[#2B017C] font-bold text-base transition-colors group"
              >
                <svg 
                  className="w-5 h-5 stroke-current text-black transform group-hover:-translate-x-1 transition-transform" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  strokeWidth="4.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <span>Más artículos</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Follow / Share Buttons */}
          <div className="lg:col-span-2 text-left space-y-6 lg:pl-4">
            <div className="space-y-3">
              <h4 className="text-gray-500 font-bold text-lg font-sans">Síguenos</h4>
              <div className="flex items-center space-x-2.5">
                <a href="https://www.tiktok.com/@osd_lab" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-[#6F2BCC] hover:bg-[#2B017C] flex items-center justify-center text-white transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 448 512"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg>
                </a>
                <a href="https://co.linkedin.com/company/on-site-diagnostic-osd" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-[#6F2BCC] hover:bg-[#2B017C] flex items-center justify-center text-white transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 448 512"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/></svg>
                </a>
                <a href="https://www.instagram.com/osd_lab/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-[#6F2BCC] hover:bg-[#2B017C] flex items-center justify-center text-white transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                </a>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-gray-500 font-bold text-lg font-sans">Compartir</h4>
              <div>
                <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert('¡Enlace de artículo copiado al portapapeles!'); }} className="w-10 h-10 rounded-xl bg-[#6F2BCC] hover:bg-[#2B017C] flex items-center justify-center text-white transition-colors cursor-pointer" title="Compartir enlace">
                  <span className="text-xl font-bold font-sans">+</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
