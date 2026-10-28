import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const profileTitles = {
  'perfil-joe': 'El Perfil Joe - Panel Molecular Completo',
  'rutina-felino': 'Perfil Rutina Felino - Detección Molecular de Patógenos',
  'joe-vif-vilef': 'El Perfil Joe + VIF y ViLeF - Diferenciación Inmunitaria Felina',
  'perfil-fiebre-origen-desconocido': 'Perfil Fiebre de Origen Desconocido (FOD)',
  'perfil-dermatologico': 'Perfil Dermatológico Molecular por qPCR',
  'perfil-neurologico': 'Perfil Neurológico Canino y Felino',
  'perfil-respiratorio': 'Perfil Respiratorio Canino y Felino',
  'perfil-gastrointestinal': 'Perfil Gastrointestinal Molecular',
  'perfil-renal': 'Perfil Renal Molecular',
  'perfil-reproductivo': 'Perfil Reproductivo Molecular',
  'perfil-oftalmico': 'Perfil Oftálmico Molecular',
  'perfil-sepsis': 'Perfil Sepsis Molecular'
};

const seoRoutes = {
  // 1. Home / Selección de Perfil
  '/': {
    title: 'Laboratorio de biología molecular veterinaria en Colombia',
    description: 'Detección de alta precisión sin falsos negativos. Tenemos un amplio portafolio de qPCR cuantitativa en tiempo real, entrega rápida, qPCR canino, qPCR felino'
  },

  // 2. Veterinarios
  '/veterinarios': {
    title: 'Pruebas PCR en tiempo real cuantitativo para veterinarias',
    description: 'Expertos en diagnóstico de biología molecular con tecnología de sondas de hidrólisis que garantizan mayor precisión, menos inhibiciones y sin falsos negativos.'
  },

  // 3. Propietarios - Home (Microbiota intestinal)
  '/prueba-fecal-para-mascotas': {
    title: 'Examen fecal a domicilio para mascotas en Colombia',
    description: 'Microbiota intestinal El equilibrio invisible que marca la diferencia en la salud de tu mascota'
  },
  '/test-indice-de-disbiosis': {
    title: 'Examen fecal a domicilio para mascotas en Colombia',
    description: 'Microbiota intestinal El equilibrio invisible que marca la diferencia en la salud de tu mascota'
  },

  // 4. Conócenos Propietarios
  '/conocenos-propietarios': {
    title: 'Descubre las enfermedades de tus mascotas | Laboratorio',
    description: 'Con una prueba de microbiota puedes prevenir o controlar enfermedades de tus mascotas. Colombia da un paso a la salud preventiva para perros'
  },

  // 5. Test Disbiosis Mascotas (¿Qué es el test de índice de disbiosis?)
  '/test-disbiosis-mascotas': {
    title: 'Test fecal para mascotas a domicilio en Colombia',
    description: 'La prueba microbiota permite tener control en la salud de tus mascotas. Salud preventiva que mejora el bienestar de tu mascota, servicio a nivel nacional.'
  },

  // 6. Aprende Propietarios (Colombia podrá prevenir y controlar las enfermedades de sus mascotas)
  '/prueba-microbiota-una-solucion-en-la-salud-animal': {
    title: 'Prueba microbiota: análisis fecal para mascotas en Colombia',
    description: 'A partir de hoy puedes mejorar la salud de tus mascota manteniendo en equilibrio de su salud intestinal'
  },
  '/duplicado-aprende-con-osd-2': {
    title: 'Prueba microbiota: análisis fecal para mascotas en Colombia',
    description: 'A partir de hoy puedes mejorar la salud de tus mascota manteniendo en equilibrio de su salud intestinal'
  },

  // 7. Servicios qPCR / Biología Molecular
  '/biologia-molecular': {
    title: 'PCR veterinaria : rapidez y precisión en tus diagnósticos',
    description: 'Nuestra PCR en tiempo real cuantitativo (qPCR) garantiza rapidez y precisión con menos inhibición por medicamentos, sin falsos negativos y sin falsos positivos'
  },
  '/servicios': {
    title: 'PCR veterinaria : rapidez y precisión en tus diagnósticos',
    description: 'Nuestra PCR en tiempo real cuantitativo (qPCR) garantiza rapidez y precisión con menos inhibición por medicamentos, sin falsos negativos y sin falsos positivos'
  },
  '/servicios-de-qpcr-pcr': {
    title: 'PCR veterinaria : rapidez y precisión en tus diagnósticos',
    description: 'Nuestra PCR en tiempo real cuantitativo (qPCR) garantiza rapidez y precisión con menos inhibición por medicamentos, sin falsos negativos y sin falsos positivos'
  },
  '/clinica': {
    title: 'Laboratorio Clínico Veterinario OSD | Análisis y Diagnóstico Preciso',
    description: 'Laboratorio clínico veterinario OSD: hematología, coagulación en 15 min, química sanguínea, patología y recolección gratuita de muestras para tu clínica.'
  },

  // 8. Veterinarios - Test de Disbiosis
  '/disbiosis': {
    title: 'Test de Índice de Disbiosis en Caninos y Felinos | Colombia',
    description: 'Evalúa la salud intestinal a nivel molecular en caninos y felinos para proteger su homeostasis sistémica. Resultados en 24 horas Hábiles.'
  },
  '/veterinarios-test-indice-de-disbiosis': {
    title: 'Test de Índice de Disbiosis en Caninos y Felinos | Colombia',
    description: 'Evalúa la salud intestinal a nivel molecular en caninos y felinos para proteger su homeostasis sistémica. Resultados en 24 horas Hábiles.'
  },

  // 9. Perfiles Moleculares por qPCR (Aprende)
  '/aprende': {
    title: 'Pruebas Moleculares por qPCR: Guía y Análisis Técnico',
    description: 'Descubra y aprenda el alcance de nuestros paneles por qPCR. Explicamos la detección de virus, bacterias y parásitos en médula ósea, bazo y tejidos.'
  },
  '/perfiles-moleculares-por-qpcr-guia-y-analisis-tecnico': {
    title: 'Pruebas Moleculares por qPCR: Guía y Análisis Técnico',
    description: 'Descubra y aprenda el alcance de nuestros paneles por qPCR. Explicamos la detección de virus, bacterias y parásitos en médula ósea, bazo y tejidos.'
  },

  // 10. Proyectos de Investigación
  '/investigacion': {
    title: 'Investigaciones en medicina veterinaria.',
    description: 'El Laboratorio de biología molecular en Colombia que impulsa investigaciones que favorezcan el desarrollo de una medicina veterinaria salud preventiva.'
  },
  '/proyectos-investigacion-laboratorio-biologia-molecular': {
    title: 'Investigaciones en medicina veterinaria.',
    description: 'El Laboratorio de biología molecular en Colombia que impulsa investigaciones que favorezcan el desarrollo de una medicina veterinaria salud preventiva.'
  },

  // 11. Preguntas Frecuentes
  '/preguntas-frecuentes': {
    title: 'Servicio de qPCR veterinaria en Colombia',
    description: 'Resuelve tus dudas sobre el servicio de PCR Veterinaria. Conoce tiempos, recolección, perfiles diagnósticos y cómo obtener resultados precisos.'
  },
  '/laboratorio-de-biologia-molecular-preguntas-frecuntes': {
    title: 'Servicio de qPCR veterinaria en Colombia',
    description: 'Resuelve tus dudas sobre el servicio de PCR Veterinaria. Conoce tiempos, recolección, perfiles diagnósticos y cómo obtener resultados precisos.'
  },

  // 12. Conócenos
  '/conocenos': {
    title: 'Laboratorio para veterinarias en Colombia: PCR precisa',
    description: 'Somos expertos en PCR en tiempo real cuantitativo (qPCR). Entregamos diagnósticos sin falsos negativos y positivos. Recolección gratuita y entrega rápida'
  },

  // 13. Contacto
  '/contacto': {
    title: 'PCR veterinaria de alta precisión Entrega a nivel nacional',
    description: 'Diagnósticos diferencial con técnicas moleculares Nuestra tecnología de sondas de hidrolisis entregan mayor efectividad sin falsos negativos o positivos'
  },
  '/laboratorio-molecular-medios-de-contacto': {
    title: 'PCR veterinaria de alta precisión Entrega a nivel nacional',
    description: 'Diagnósticos diferencial con técnicas moleculares Nuestra tecnología de sondas de hidrolisis entregan mayor efectividad sin falsos negativos o positivos'
  },

  // Páginas complementarias y rutas históricas indexadas por Google
  '/noticias-veterinarias': {
    title: 'Noticias Veterinarias y Actualidad Científica | On Site Diagnostic',
    description: 'Artículos, investigaciones y novedades sobre diagnóstico molecular, qPCR y avances en medicina veterinaria en Colombia.'
  },
  '/category/noticias-veterinarias': {
    title: 'Noticias Veterinarias y Actualidad Científica | On Site Diagnostic',
    description: 'Artículos, investigaciones y novedades sobre diagnóstico molecular, qPCR y avances en medicina veterinaria en Colombia.'
  },
  '/pcr-veterinaria-una-tecnica-para-diagnosticos-precisos-en-animales': {
    title: 'PCR veterinaria técnica para diagnósticos precisos | On Site Diagnostic',
    description: 'Diagnósticos de PCR veterinaria. Somos un laboratorio de biología molecular a nivel nacional que garantiza resultados precisos sin falsos negativos.'
  },
  '/espectro-de-agentes': {
    title: 'PCR veterinaria: amplio espectro de patógenos | On Site Diagnostic',
    description: 'Perfecciona tus diagnósticos con pruebas en tiempo real cuantitativo de gran espectro. Expertos en diagnóstico molecular de alta precisión.'
  },
  '/deteccion-molecular-de-hemoparasitos-en-perros-y-gatos-con-qpcr': {
    title: 'Detección molecular de hemoparásitos en perros y gatos con qPCR',
    description: 'Identifica hemoparásitos en perros y gatos mediante qPCR de alta precisión, incluso en pacientes medicados. Diagnóstico confiable para casos complejos.'
  },
  '/infecciones-persistentes-en-felinos': {
    title: 'Infecciones persistentes en felinos: qPCR de alta precisión',
    description: 'Ante infecciones persistentes en felinos, descubre si es un patógeno complejo o coinfección usando tecnología de qPCR avanzada.'
  },
  '/pcr-para-detectar-infecciones-en-felinos': {
    title: 'PCR para detectar infecciones en felinos | On Site Diagnostic',
    description: 'Detecta infecciones mediante PCR cuantitativa (qPCR). Identifica coinfecciones y daños hematológicos antes del deterioro clínico.'
  },
  '/microbiota-perros-gatos-salud-digestiva': {
    title: 'Simbiosis Multiespecie: microbiota en perros y gatos',
    description: 'Conoce cómo el equilibrio de la microbiota intestinal influye directamente en la salud digestiva e inmune de perros y gatos.'
  },
  '/bogota': {
    title: 'Laboratorio de biología molecular veterinaria en Bogotá | OSD',
    description: 'Sede y servicio de diagnóstico molecular veterinario en Bogotá con entrega rápida y recolección de muestras.'
  },
  '/posters-de-investigacion-medicina-veterinaria': {
    title: 'Posters de Investigación: Medicina Veterinaria | OSD',
    description: 'Acceda a investigaciones basadas en biología molecular aplicadas a la medicina veterinaria. Evidencia científica y reportes clínicos.'
  },
  '/investigacion-indice-de-disbiosis': {
    title: 'Investigación Índice de Disbiosis | On Site Diagnostic',
    description: 'Estudios de investigación clínica sobre la evaluación del índice de disbiosis en caninos y felinos.'
  },
  '/proteccion-de-datos': {
    title: 'Protección de Datos Personales | On Site Diagnostic',
    description: 'Política y lineamientos de protección y tratamiento de datos personales en On Site Diagnostic.'
  },
  '/politica-de-privacidad': {
    title: 'Política de Privacidad | On Site Diagnostic',
    description: 'Políticas de privacidad, seguridad y confidencialidad en On Site Diagnostic.'
  },
  '/terms': {
    title: 'Términos y Condiciones | On Site Diagnostic',
    description: 'Términos y condiciones legales de uso del sitio web y servicios de On Site Diagnostic.'
  },
  '/privacy': {
    title: 'Política de Privacidad | On Site Diagnostic',
    description: 'Políticas de privacidad, seguridad y confidencialidad en On Site Diagnostic.'
  },
  '/pqr-s': {
    title: 'PQRS - Peticiones, Quejas, Reclamos y Sugerencias | On Site Diagnostic',
    description: 'Canal oficial de atención para peticiones, quejas, reclamos y sugerencias de On Site Diagnostic.'
  },
  '/osd-reclamos-quejas': {
    title: 'PQRS - Peticiones, Quejas y Reclamos | On Site Diagnostic',
    description: 'Canal oficial de atención para peticiones, quejas y reclamos de On Site Diagnostic.'
  }
};

export default function SEOManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Clean trailing slash (unless root path "/")
    const cleanPath = pathname.length > 1 && pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname;

    let targetTitle = '';
    let targetDescription = '';

    const currentRole = localStorage.getItem('userRole');

    // If user is on /conocenos in owner mode, prioritize the owner metadata
    const applyMetaTags = (title, description) => {
      const finalTitle = title || 'Laboratorio de biología molecular veterinaria en Colombia';
      const finalDesc = description || 'Detección de alta precisión sin falsos negativos. Tenemos un amplio portafolio de qPCR cuantitativa en tiempo real, entrega rápida, qPCR canino, qPCR felino';

      // 1. Update <title>
      document.title = finalTitle;

      // 2. Update <meta name="description">
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', finalDesc);

      // 3. Update or create Open Graph tags for richer social/search previews
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', finalTitle);

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
      }
      ogDesc.setAttribute('content', finalDesc);

      // 4. Update or create Canonical URL tag (Consolida la autoridad de dominio en Google)
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      const canonicalUrl = `https://osdiagnostic.com${cleanPath === '/' ? '/' : cleanPath + '/'}`;
      canonicalTag.setAttribute('href', canonicalUrl);
    };

    if (cleanPath === '/conocenos' && currentRole === 'owner') {
      targetTitle = seoRoutes['/conocenos-propietarios'].title;
      targetDescription = seoRoutes['/conocenos-propietarios'].description;
      applyMetaTags(targetTitle, targetDescription);
    } else if (seoRoutes[cleanPath]) {
      targetTitle = seoRoutes[cleanPath].title;
      targetDescription = seoRoutes[cleanPath].description;
      applyMetaTags(targetTitle, targetDescription);
    } else if (cleanPath.startsWith('/noticias-veterinarias/')) {
      const slug = cleanPath.replace('/noticias-veterinarias/', '');
      import('../assets/all_articles.json').then((mod) => {
        const articlesData = mod.default || mod;
        const article = articlesData.find(a => a.name === slug);
        if (article) {
          targetTitle = `${article.title} | On Site Diagnostic`;
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = article.content || '';
          const plainText = (tempDiv.textContent || tempDiv.innerText || '').replace(/\s+/g, ' ').trim();
          targetDescription = plainText.slice(0, 160);
        }
        applyMetaTags(targetTitle, targetDescription);
      });
    } else if (cleanPath.startsWith('/aprende/')) {
      const profileId = cleanPath.replace('/aprende/', '');
      const profileName = profileTitles[profileId] || profileId
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      targetTitle = `${profileName} | On Site Diagnostic`;
      targetDescription = 'Conozca en detalle el alcance diagnóstico y metodológico de nuestros paneles moleculares por qPCR en On Site Diagnostic.';
      applyMetaTags(targetTitle, targetDescription);
    } else {
      applyMetaTags(targetTitle, targetDescription);
    }

  }, [pathname]);

  return null;
}
