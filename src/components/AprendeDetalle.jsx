import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function AprendeDetalle({ profileOverride }) {
  const { profileId: paramProfileId } = useParams();
  const profileId = profileOverride || paramProfileId;

  const details = {
    "perfil-joe": {
      title: "El Perfil Joe",
      subtitle: "EL PERFIL JOE",
      question: "¿Signos clínicos claros, pero múltiples enfermedades posibles?",
      questionHtml: '¿Signos clínicos claros, <span class="text-[#01FADA]">pero múltiples enfermedades posibles?</span>',
      description: "Detectamos hemoparásitos con una técnica sistémica, diseñada para escenarios donde no hay una única sospecha diagnóstica.",
      videoTitle: "Evita los falsos negativos por secuestro orgánico.",
      videoParagraphs: [
        "Muchos patógenos (Ehrlichia, Babesia) se ocultan en endotelio, riñón y bazo. El Perfil Joe analiza sedimentos urinarios para capturar el ADN que el riñón filtra, logrando diagnósticos donde la sangre periférica falla."
      ],
      youtubeId: "UY303FiYxgU",
      formLink: "https://docs.google.com/forms/d/e/1FAIpQLSeDPoSkLRQm7UiFy2f_U_2f8YE4bU85Ap5QixzMqUvQc-A4pA/viewform",
      ctaText: "SOLICITAR RECOLECCIÓN",
      species: "Caninos y Felinos",
      bulletsTitle: "Panel Molecular Completo",
      bullets: [
        "Anaplasma spp.",
        "Ehrlichia spp.",
        "Rickettsia spp.",
        "Wolbachia spp.",
        "Mycoplasma spp.",
        "Bartonella spp.",
        "Hepatozoon spp.",
        "Babesia spp.",
        "Toxoplasma gondii",
        "Filarias diferenciadas (D. immitis, D. repens, D. striata, B. pahangi)"
      ],
      comparisonBoxes: {
        traditional: {
          title: "PCR Tradicional (Solo Sangre)",
          bullets: [
            "Falla si hay carga viral baja en sangre.",
            "No detecta secuestro en órganos.",
            "Riesgo alto de Falsos Negativos"
          ]
        },
        joe: {
          title: "Perfil Joe (Sangre + Orina)",
          bullets: [
            "Detecta patógenos ocultos en tejidos.",
            "Analiza filtrado renal (ADN concentrado).",
            "Máxima sensibilidad diagnóstica."
          ]
        }
      },
      collectionStep1: "Tubo Lila (EDTA) + 1ml Orina.",
      collectionStep2: "Escríbenos y pasamos hoy mismo.",
      collectionStep3: "Resultados en tu correo"
    },
    "rutina-felino": {
      title: "Perfil Rutina Felino",
      subtitle: "DETECCIÓN MOLECULAR DE PATÓGENOS SISTÉMICOS EN FELINOS",
      question: "¿Paciente con signos inespecíficos como hiporexia, fiebres intermitentes y letargia, donde el examen físico no es concluyente y los hallazgos en el hemoleucograma no son claros?",
      description: "Esto puede ser la primera manifestación de infecciones sistémicas silenciosas que avanzan mientras el paciente aparenta estabilidad, Este perfil hace posible detectar de forma temprana agentes virales, bacterianos y parasitarios.",
      videoTitle: "Evita que las coinfecciones pasen desapercibidas.",
      videoParagraphs: [
        "Muchos agentes infecciosos felinos generan daño progresivo antes de evidenciar alteraciones claras en hemoleucograma o examen físico.",
        "¿Daños crónicos hematológicos, renales o cardiopulmonares?",
        "Las <strong>infecciones sistémicas</strong> en felinos pueden avanzar silenciosamente mientras <strong>generan daño progresivo</strong> sobre componentes hematológicos, endoteliales y órganos vitales como riñón, hígado, bazo y miocardio.",
        "Nuestro <strong>enfoque molecular integral</strong> permite detectar agentes virales, bacterianos y parasitarios en un solo paso, identificando coinfecciones ocultas que suelen pasar desapercibidas y optimizando el diagnóstico temprano, el abordaje clínico y el valor pronóstico del paciente."
      ],
      youtubeId: "ixQ7FmzNlQA",
      formLink: "https://docs.google.com/forms/d/e/1FAIpQLSeDPoSkLRQm7UiFy2f_U_2f8YE4bU85Ap5QixzMqUvQc-A4pA/viewform",
      ctaText: "SOLICITAR RECOLECCIÓN DE MUESTRA",
      species: "felino",
      bulletsTitle: "Componentes del Panel Molecular",
      categorizedBullets: [
        {
          category: "Línea Blanca y Defensas",
          items: ["Virus de la Leucemia Felina (FeLV)", "Virus de la Inmunodeficiencia Felina (FIV)"]
        },
        {
          category: "Destrucción Plaquetaria",
          items: ["Anaplasma spp.", "Ehrlichia spp.", "Rickettsia spp."]
        },
        {
          category: "Hemólisis de Eritrocitos",
          items: ["Mycoplasma haemofelis", "Candidatus Mycoplasma haemominutum", "Babesia spp."]
        },
        {
          category: "Zoonosis y Control Crítico",
          items: ["Bartonella spp.", "Toxoplasma gondii."]
        }
      ],
      table: {
        title: "¿Por qué elegir el Perfil Rutina Felino?",
        headers: ["Diagnóstico Tradicional (Pruebas Individuales)", "Perfil Rutina Felino (qPCR Integral)"],
        rows: [
          [
            "Búsqueda al azar:",
            "Sospechas sucesivas que incrementan los costos del tutor y retrasan el tratamiento definitivo.",
            "En un solo paso:",
            "Integración estratégica de virus, bacterias, protozoos y helmintos detectables simultáneamente."
          ],
          [
            "Puntos ciegos:",
            "Alto riesgo de pasar por alto coinfecciones sinérgicas que enmascaran el cuadro clínico real.",
            "Visión diagnóstica total:",
            "Evaluación de múltiples matrices biológicas (sangre, orina, hisopados o materia fecal) según el patógeno."
          ],
          [
            "Enfoque reactivo:",
            "La intervención médica ocurre cuando los daños estructurales en órganos ya son avanzados.",
            "Intención preventiva:",
            "Identificación oportuna de portadores de zoonosis críticas antes de comprometer el entorno familiar."
          ]
        ]
      },
      collectionStep1: "Recolecta las matrices necesarias según la sospecha (sangre periférica en tubo lila con EDTA, orina, hisopados o materia fecal)",
      collectionStep2: "Escríbenos y pasamos hoy mismo.",
      collectionStep3: "Recibe el resultado en el correo electrónico registrado en el formulario."
    },
    "joe-vif-vilef": {
      title: "El Perfil Joe + VIF y ViLeF",
      subtitle: "EL PERFIL JOE + VIF y ViLeF",
      questionHtml: '¿Es agente resistente o un <span class="text-[#01FADA]">paciente que no puede defenderse?</span>',
      description: "Cuando las recaídas son constantes, la pregunta clave cambia: no es solo qué patógeno está atacando, sino por qué el sistema inmune no logra contenerlo.",
      videoTitle: "La Evolución del Perfil Joe: Diferenciación inmunitaria",
      videoParagraphs: [
        "Los hemoparásitos actúan sobre un sistema inmune que puede estar severamente comprometido de forma silenciosa. Integrar VIF y Vilef cambia por completo la lectura clínica del caso, permitiendo identificar si estás frente a una cepa difícil o a un paciente incapaz de contener la carga parasitaria."
      ],
      youtubeId: "u3IsKFTDBz0",
      formLink: "https://docs.google.com/forms/d/e/1FAIpQLSeDPoSkLRQm7UiFy2f_U_2f8YE4bU85Ap5QixzMqUvQc-A4pA/viewform",
      ctaText: "SOLICITAR RECOLECCIÓN",
      species: "Caninos y Felinos",
      bulletsTitle: "Panel Molecular Completo",
      bullets: [
        "Anaplasma spp.",
        "Ehrlichia spp.",
        "Rickettsia spp.",
        "Wolbachia spp.",
        "Mycoplasma spp.",
        "Bartonella spp.",
        "Hepatozoon spp.",
        "Babesia spp.",
        "Toxoplasma gondii",
        "Filarias diferenciadas (D. immitis, D. repens, D. striata, B. pahangi)",
        "Virus de la leucemia felina (ViLeF)",
        "Virus de inmunodeficiencia felina (VIF)"
      ],
      table: {
        title: "La Evolución del Perfil Joe: Diferenciación inmunitaria",
        headers: ["Diagnóstico Tradicional (Pruebas Individuales)", "Perfil Joe + VIF y ViLeF (qPCR Integral)"],
        rows: [
          [
            "Sospecha reactiva y fragmentada:",
            "Se evalúan hemoparásitos de forma aislada, dejando el descarte de retrovirus como una opción tardía tras el fracaso terapéutico.",
            "Diagnóstico diferencial estratégico:",
            "Evaluación simultánea de virus, bacterias y protozoos para entender la inmunocompetencia real del paciente desde el primer día."
          ],
          [
            "Puntos ciegos clínicos:",
            "Alto riesgo de pasar por alto coinfecciones sinérgicas que enmascaran el cuadro clínico y cronifican los daños orgánicos.",
            "Visión diagnóstica total:",
            "Identificación de portadores crónicos y virus silenciosos antes de que generen daños estructurales irreversibles."
          ]
        ]
      },
      retrovirusCards: [
        {
          title: "Inmunosupresión Adaptativa (VIF)",
          text: "Lentivirus que destruye progresivamente los linfocitos T CD4, las células directoras de la respuesta inmune adaptativa, impidiendo el control biológico de infecciones secundarias"
        },
        {
          title: "Falla de la Línea Mieloide y Linfoide (ViLeF)",
          text: "Retrovirus oncogénico que compromete la producción de neutrófilos, macrófagos y anticuerpos. Sin esta contención, la anemia se profundiza y las recaídas se vuelven críticas"
        }
      ],
      collectionStep1: "Tubo Lila (EDTA) + 1ml Orina.",
      collectionStep2: "Escríbenos y pasamos hoy mismo.",
      collectionStep3: "Resultados en tu correo"
    },
    "microbiota-intestinal-clave-salud": {
      title: "Microbiota intestinal: clave para la salud y el bienestar de tus mascotas",
      subtitle: "Salud Animal",
      question: "¿Quieres conocer el origen real del bienestar de tu mascota?",
      description: "El equilibrio de la microbiota intestinal es fundamental para prevenir enfermedades silenciosas y optimizar la digestión de perros y gatos.",
      videoTitle: "Colombia podrá prevenir y controlar las enfermedades de sus mascotas.",
      videoParagraphs: [
        "Su equipo de investigación, liderado por el Dr Cesar Orlando Muñoz, encontró una necesidad en la salud de las mascotas. Actualmente, los diagnósticos que se suelen implementar por los veterinarios se basan en solo encontrar enfermedades y no el origen.",
        "Desconocer el origen representa un vacío en el bienestar en la salud de las mascotas porque no permite tener una visión integral para combatir las diferentes enfermedades de los pacientes de una manera más efectiva. Con el desarrollo que ha venido investigando y desarrollando el laboratorio OSD, esto dejará de ser un impedimento.",
        "El pasado 26 de marzo de 2025, el laboratorio OSD anunció la implementación de la prueba de microbiota en mascotas lo que permitirá no solo combatir las enfermedades desde la raíz, también nos dará la capacidad de prevenir de manera temprana logrando una mejora considerable el bienestar de nuestros peludos."
      ],
      youtubeId: null,
      imageSrc: "https://res.cloudinary.com/oiaig120/image/upload/f_auto,q_auto/osdiagnostic/salud-intestinal-de-mascota.webp",
      formLink: "https://docs.google.com/forms/d/e/1FAIpQLSeDPoSkLRQm7UiFy2f_U_2f8YE4bU85Ap5QixzMqUvQc-A4pA/viewform",
      species: "Caninos y Felinos",
      bulletsTitle: "¿Cómo funciona la microbiota?",
      bullets: [
        "La microbiota es el conjunto de microorganismos que habitan en el organismo de los seres vivos.",
        "Desempeña un papel esencial en la regulación del sistema inmunológico.",
        "Facilita la digestión y absorción óptima de nutrientes esenciales.",
        "Un desequilibrio (disbiosis) es la raíz de enfermedades crónicas intestinales y sistémicas."
      ],
      extraHeading: "Un paso hacia la medicina preventiva",
      extraParagraphs: [
        "Con la prueba de microbiota para mascotas, Colombia da un paso significativo hacia la medicina veterinaria preventiva. El laboratorio OSD demuestra que la tecnología y la investigación pueden transformar el cuidado de las mascotas, ofreciendo un enfoque más integral y eficaz para garantizar su bienestar."
      ]
    }
  };

  const data = details[profileId] || details["perfil-joe"];
  const isJoeVifVilef = profileId === "joe-vif-vilef";

  // Re-organize paragraphs dynamically:
  const introParagraph = data.videoParagraphs[0];
  const restOfParagraphs = data.videoParagraphs.slice(1);

  let sectionHeading = data.extraHeading || null;
  let cardParagraphs = data.extraParagraphs || [];

  if (!data.extraHeading && !data.extraParagraphs) {
    restOfParagraphs.forEach(p => {
      if (p.startsWith('¿')) {
        sectionHeading = p;
      } else {
        cardParagraphs.push(p);
      }
    });
  }

  // Table render block (Navegable horizontalmente y 100% pegada a la esencia de la marca OSD)
  const renderTableSection = () => {
    if (!data.table) return null;
    return (
      <section className="py-16 md:py-20 px-4 sm:px-6 max-w-5xl mx-auto bg-[#f8fafc]">
        <div className="space-y-8 md:space-y-10">
          
          {/* Header de la sección con tipografía Montserrat de marca */}
          <div className="text-center space-y-3">
            <h4 className="text-xl md:text-2xl lg:text-3xl font-black font-sans uppercase tracking-tight text-[#2B017C]">
              {data.table.title || "Comparativa de Abordaje Diagnóstico"}
            </h4>
            <div className="w-16 h-1 bg-[#01FADA] mx-auto rounded-full"></div>
          </div>

          {/* Guía visual sutil para navegación táctil en móviles */}
          <div className="flex md:hidden items-center justify-end gap-1.5 text-xs font-semibold text-[#6F2BCC] font-sans pr-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span>Desliza horizontalmente para comparar</span>
          </div>

          {/* Contenedor navegable con scroll horizontal responsivo */}
          <div 
            className="overflow-x-auto w-full border border-gray-200 rounded-2xl shadow-sm bg-white"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <table className="w-full min-w-[620px] border-collapse font-sans">
              <thead>
                <tr>
                  {/* Columna 1: Diagnóstico Tradicional */}
                  <th className="bg-[#EEF2F6] text-[#2B017C] p-5 text-center text-xs sm:text-sm md:text-base font-extrabold font-sans w-1/2 uppercase tracking-wide border-r border-gray-200">
                    <span className="block">{data.table.headers[0]}</span>
                  </th>

                  {/* Columna 2: Perfil OSD Integral con acento de marca #01FADA */}
                  <th className="bg-[#2B017C] text-white p-5 text-center text-xs sm:text-sm md:text-base font-extrabold font-sans w-1/2 uppercase tracking-wide relative">
                    <span className="block">{data.table.headers[1]}</span>
                    <span className="inline-block mt-1 text-[10px] sm:text-[11px] font-bold tracking-widest text-[#01FADA] uppercase">
                      Tecnología OSD
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.table.rows.map((row, idx) => (
                  <tr 
                    key={idx} 
                    className="border-b border-gray-150 last:border-0 hover:bg-slate-50/70 transition-colors"
                  >
                    {/* Celda Tradicional */}
                    <td className="p-5 sm:p-6 text-xs sm:text-sm leading-relaxed font-sans align-top border-r border-gray-200 space-y-1.5 bg-white">
                      <p className="font-bold text-[#2B017C] text-sm sm:text-[15px] font-sans tracking-tight">
                        {row[0]}
                      </p>
                      <p className="text-[#555555] font-normal text-xs sm:text-[13.5px] font-sans leading-relaxed">
                        {row[1]}
                      </p>
                    </td>

                    {/* Celda Perfil OSD qPCR con tipografía de marca y sutil tono institucional */}
                    <td className="p-5 sm:p-6 text-xs sm:text-sm leading-relaxed font-sans align-top space-y-1.5 bg-[#F8F9FE]">
                      <p className="font-extrabold text-[#6F2BCC] text-sm sm:text-[15px] font-sans tracking-tight">
                        {row[2]}
                      </p>
                      <p className="text-[#2B017C]/85 font-medium text-xs sm:text-[13.5px] font-sans leading-relaxed">
                        {row[3]}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>
    );
  };

  // Molecular panel render block
  const renderPanelSection = () => {
    return (
      <section className="bg-[#6F2BCC] text-white py-20 px-6 w-full mt-12">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold font-display uppercase tracking-tight text-white">
              {data.bulletsTitle}
            </h2>
            <p className="text-[#dbbdfb] text-xs md:text-sm font-semibold font-sans tracking-wide">
              Especies: {data.species}
            </p>
          </div>

          {data.bullets && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none pl-0 text-left">
              {data.bullets.map((bullet, idx) => (
                <li 
                  key={idx} 
                  className="bg-white/10 border border-white/10 p-4 px-6 rounded-xl flex items-start space-x-2 text-xs md:text-sm font-semibold text-white hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-0.5 cursor-default shadow-sm italic"
                >
                  <span className="text-white flex-shrink-0 mt-0.5">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}

          {data.categorizedBullets && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
              {data.categorizedBullets.map((cat, catIdx) => (
                <div 
                  key={catIdx} 
                  className="bg-white/10 border border-white/10 rounded-xl p-6 flex flex-col space-y-4 shadow-sm"
                >
                  <h4 className="font-bold text-sm md:text-base text-white border-b border-white/20 pb-2 tracking-wide font-sans">
                    {cat.category}
                  </h4>
                  <ul className="space-y-3.5 list-none pl-0">
                    {cat.items.map((item, idx) => (
                      <li 
                        key={idx} 
                        className="text-white/95 text-xs md:text-sm font-semibold leading-relaxed italic flex items-start space-x-1.5"
                      >
                        <span className="text-white flex-shrink-0 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  };

  return (
    <div className="w-full bg-[#f8fafc] font-sans antialiased text-[#2B017C]">
      
      {/* 1. Purple Header Box Banner */}
      <section className="bg-[#2B017C] text-white py-20 px-6 relative overflow-hidden text-center flex flex-col items-center justify-center space-y-6">
        <Link 
          to="/aprende" 
          className="absolute top-6 left-6 inline-flex items-center text-xs font-bold text-[#01FADA] hover:text-white transition-colors"
        >
          ← Volver a Aprende
        </Link>

        {/* Pill design */}
        <span className="bg-[#01FADA] text-[#2B017C] text-xs md:text-sm font-black py-2 px-6 rounded-full uppercase tracking-wider">
          {data.subtitle}
        </span>

        {/* Dynamic question structure */}
        {data.questionHtml ? (
          <h1 
            className="text-3xl md:text-[40px] font-black font-display uppercase tracking-tight text-white max-w-4xl leading-tight"
            dangerouslySetInnerHTML={{ __html: data.questionHtml }}
          />
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-4xl md:text-[50px] font-black font-display uppercase tracking-tight text-white max-w-4xl leading-tight">
              {data.title}
            </h1>
            <div className="border-l-4 border-white pl-6 text-left max-w-3xl mx-auto my-2">
              <p className="text-white text-base md:text-lg italic font-medium leading-relaxed">
                {data.question}
              </p>
            </div>
          </div>
        )}

        <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto font-medium font-sans leading-relaxed">
          {data.description}
        </p>

        <a 
          href={data.formLink} 
          target="_blank" 
          rel="noreferrer"
          className="inline-block bg-[#01FADA] hover:bg-[#6F2BCC] hover:text-white text-[#2B017C] font-black py-4 px-10 rounded-full text-xs uppercase tracking-wider transition-all duration-300 shadow-md"
        >
          {data.ctaText || (isJoeVifVilef ? "Solicitar Recolección" : "Solicitar Recolección de Muestra")}
        </a>
      </section>

      {/* 2. Retrovirus Description Cards Side-by-Side (ONLY for Joe + VIF & ViLeF) */}
      {isJoeVifVilef && data.retrovirusCards && (
        <section className="py-12 px-6 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.retrovirusCards.map((card, idx) => (
              <div 
                key={idx} 
                className="bg-[#f8fafc] border border-gray-150 rounded-xl p-8 shadow-sm text-left border-l-4 border-l-[#6F2BCC] flex flex-col space-y-3"
              >
                <h4 className="font-bold text-[#6F2BCC] text-sm md:text-base uppercase tracking-wider font-sans">
                  {card.title}
                </h4>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-sans font-medium">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Video + Description Layout (Block A) */}
      <section className="py-16 px-6 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {(data.youtubeId || data.imageSrc) && (
            <div className="lg:col-span-6 w-full">
              {data.youtubeId ? (
                <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-lg border border-gray-150 bg-[#2B017C]">
                  <iframe 
                    src={`https://www.youtube.com/embed/${data.youtubeId}`} 
                    title="Video cápsula" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              ) : (
                <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50">
                  <img 
                    src={data.imageSrc} 
                    alt={data.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          )}

          <div className={`${(data.youtubeId || data.imageSrc) ? 'lg:col-span-6' : 'lg:col-span-12'} text-left space-y-4`}>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-[#6F2BCC] leading-tight">
              {data.videoTitle}
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed font-sans font-medium">
              {introParagraph}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Centered Heading and Bordered Card Box (Block B - Feline / Falsos Negativos details - NOT rendered for joe-vif-vilef) */}
      {!isJoeVifVilef && (sectionHeading || cardParagraphs.length > 0) && (
        <section className="py-16 px-6 max-w-5xl mx-auto space-y-8 flex flex-col items-center bg-white rounded-3xl mt-8 shadow-sm border border-gray-100/50">
          {sectionHeading && (
            <h3 className="text-2xl md:text-3xl font-bold font-display text-[#532095] text-center max-w-2xl leading-snug">
              {sectionHeading}
            </h3>
          )}
          {cardParagraphs.length > 0 && (
            <div className="bg-[#f8fafc] border border-gray-100 rounded-xl p-8 md:p-10 shadow-sm text-left w-full max-w-4xl border-l-4 border-l-[#6F2BCC] space-y-6">
              {cardParagraphs.map((paragraph, index) => (
                <p 
                  key={index} 
                  className="text-gray-600 text-sm md:text-base leading-relaxed font-sans font-medium"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* 5. Traditional PCR vs Perfil Joe - Comparative Boxes (Red vs Green) (ONLY rendered when NOT on Joe + VIF & ViLeF) */}
      {!isJoeVifVilef && data.comparisonBoxes && (
        <section className="py-8 px-6 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#fff5f5] border border-[#ffe3e3] rounded-xl p-8 flex flex-col space-y-4 text-left shadow-sm">
              <div className="flex items-center space-x-4">
                <span className="w-10 h-10 rounded-full bg-[#fecaca] flex items-center justify-center text-[#ef4444] font-bold text-xl">
                  ✕
                </span>
                <h4 className="font-bold text-[#2B017C] text-base font-display uppercase tracking-wide">
                  {data.comparisonBoxes.traditional.title}
                </h4>
              </div>
              <ul className="space-y-3 text-xs md:text-sm text-gray-700 font-sans pl-1 list-inside font-medium list-none">
                {data.comparisonBoxes.traditional.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5">
                    <span className="text-[#ef4444] font-bold">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-xl p-8 flex flex-col space-y-4 text-left shadow-sm">
              <div className="flex items-center space-x-4">
                <span className="w-10 h-10 rounded-full bg-[#bbf7d0] flex items-center justify-center text-[#22c55e] font-bold text-xl">
                  ✓
                </span>
                <h4 className="font-bold text-[#2B017C] text-base font-display uppercase tracking-wide">
                  {data.comparisonBoxes.joe.title}
                </h4>
              </div>
              <ul className="space-y-3 text-xs md:text-sm text-gray-700 font-sans pl-1 list-inside font-medium list-none">
                {data.comparisonBoxes.joe.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5">
                    <span className="text-[#22c55e] font-bold">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 6. Dynamic Rotation: Comparison Table vs Molecular Panel Components */}
      {isJoeVifVilef ? (
        <>
          {renderTableSection()}
          {renderPanelSection()}
        </>
      ) : (
        <>
          {renderPanelSection()}
          {renderTableSection()}
        </>
      )}

      {/* 7. Proceso de Recolección */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h4 className="text-2xl md:text-3xl font-bold font-display uppercase tracking-tight text-[#2B017C]">
              Proceso de recolección de muestras
            </h4>
            <p className="text-gray-500 text-sm max-w-md mx-auto font-sans font-medium">
              Sigue estos tres sencillos pasos para enviar tus muestras diagnósticas al laboratorio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-8 border border-gray-150 shadow-sm flex flex-col justify-between items-center text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 flex items-center justify-center mx-auto">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 50.86 50.86"
                  className="w-12 h-12 mx-auto"
                >
                  <path 
                    d="m2.67,43.48l4.73,4.72c2.4,2.4,6.3,2.4,8.71,0l28.37-28.28-13.44-13.4L2.67,34.8c-2.4,2.4-2.4,6.28,0,8.68Z" 
                    fill="none" 
                    stroke="#6F2BCC" 
                    strokeWidth="1.8" 
                    strokeMiterlimit="10"
                  />
                  <path 
                    d="m50.34,21.07l-1.36,1.35c-.69.68-1.81.68-2.5,0L28.36,4.35c-.69-.68-.69-1.8,0-2.49l1.36-1.35c.69-.68,1.81-.68,2.5,0l18.13,18.07c.69.68.69,1.8,0,2.49Z" 
                    fill="#6F2BCC"
                  />
                  <path 
                    d="m13.12,24.6S-2.18,35.72,1.4,41.02c0,0,4.98,14.58,16.47,5.35,8.91-7.15,9.84-10.07,9.84-10.07l12.76-12.85-27.35,1.15Z" 
                    fill="#6F2BCC" 
                    opacity="0.85"
                  />
                </svg>
              </div>
              <h5 className="font-bold text-base text-[#2B017C] uppercase tracking-wide">
                1. Prepara las muestras
              </h5>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-sans font-medium">
                {data.collectionStep1}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl p-8 border border-gray-150 shadow-sm flex flex-col justify-between items-center text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 flex items-center justify-center mx-auto">
                <svg 
                  aria-hidden="true" 
                  viewBox="0 0 640 512" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-14 h-14 fill-[#6F2BCC] mx-auto"
                >
                  <path d="M512.9 192c-14.9-.1-29.1 2.3-42.4 6.9L437.6 144H520c13.3 0 24-10.7 24-24V88c0-13.3-10.7-24-24-24h-45.3c-6.8 0-13.3 2.9-17.8 7.9l-37.5 41.7-22.8-38C392.2 68.4 384.4 64 376 64h-80c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h66.4l19.2 32H227.9c-17.7-23.1-44.9-40-99.9-40H72.5C59 104 47.7 115 48 128.5c.2 13 10.9 23.5 24 23.5h56c24.5 0 38.7 10.9 47.8 24.8l-11.3 20.5c-13-3.9-26.9-5.7-41.3-5.2C55.9 194.5 1.6 249.6 0 317c-1.6 72.1 56.3 131 128 131 59.6 0 109.7-40.8 124-96h84.2c13.7 0 24.6-11.4 24-25.1-2.1-47.1 17.5-93.7 56.2-125l12.5 20.8c-27.6 23.7-45.1 58.9-44.8 98.2.5 69.6 57.2 126.5 126.8 127.1 71.6.7 129.8-57.5 129.2-129.1-.7-69.6-57.6-126.4-127.2-126.9zM128 400c-44.1 0-80-35.9-80-80s35.9-80 80-80c4.2 0 8.4.3 12.5 1L99 316.4c-8.8 16 2.8 35.6 21 35.6h81.3c-12.4 28.2-40.6 48-73.3 48zm463.9-75.6c-2.2 40.6-35 73.4-75.5 75.5-46.1 2.5-84.4-34.3-84.4-79.9 0-21.4 8.4-40.8 22.1-55.1l49.4 82.4c4.5 7.6 14.4 10 22 5.5l13.7-8.2c7.6-4.5 10-14.4 5.5-22l-48.6-80.9c5.2-1.1 10.5-1.6 15.9-1.6 45.6-.1 82.3 38.2 79.9 84.3z" />
                </svg>
              </div>
              <h5 className="font-bold text-base text-[#2B017C] uppercase tracking-wide">
                2. Solicitar recolección
              </h5>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-sans font-medium">
                {data.collectionStep2 || "Escríbenos y pasamos hoy mismo."}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl p-8 border border-gray-150 shadow-sm flex flex-col justify-between items-center text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 flex items-center justify-center mx-auto">
                <svg 
                  aria-hidden="true" 
                  viewBox="0 0 448 512" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-14 h-14 fill-[#6F2BCC] mx-auto"
                >
                  <path d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z" />
                </svg>
              </div>
              <h5 className="font-bold text-base text-[#2B017C] uppercase tracking-wide">
                3. Recibe resultados
              </h5>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-sans font-medium">
                {data.collectionStep3 || "Resultados en tu correo"}
              </p>
            </div>

          </div>

          <div className="pt-6 text-center">
            <a 
              href={data.formLink} 
              target="_blank" 
              rel="noreferrer"
              className="inline-block bg-[#6F2BCC] hover:bg-[#2B017C] text-white font-bold py-4 px-10 rounded-lg text-sm tracking-wide shadow-md transition-all duration-300 uppercase cursor-pointer"
            >
              AGENDAR RUTA AHORA
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
