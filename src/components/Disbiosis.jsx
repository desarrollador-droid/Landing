import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Disbiosis() {
  // Reference limits database for Canines (perro) and Felines (gato) from tables
  const referenceRanges = {
    perro: {
      cachorro: {
        bacteroides: { min: 3.80, max: 6.57 },
        bifido: { min: 0.37, max: 3.48 },
        blautia: { min: 0.06, max: 3.23 },
        ecoli: { min: 3.11, max: 7.41 },
        faecali: { min: 1.10, max: 5.27 },
        fuso: { min: 4.18, max: 6.77 },
        chiranonis: { min: 0.97, max: 4.52 },
        strepto: { min: -0.13, max: 2.94 },
        turi: { min: 0.20, max: 2.67 }
      },
      adulto: {
        bacteroides: { min: 6.15, max: 7.68 },
        bifido: { min: -0.61, max: 1.93 },
        blautia: { min: 2.80, max: 5.04 },
        ecoli: { min: 0.81, max: 4.09 },
        faecali: { min: 4.23, max: 6.07 },
        fuso: { min: 5.87, max: 7.44 },
        chiranonis: { min: 3.47, max: 5.89 },
        strepto: { min: -0.02, max: 2.97 },
        turi: { min: 2.82, max: 5.41 }
      },
      geronte: {
        bacteroides: { min: 6.14, max: 7.19 },
        bifido: { min: -0.07, max: 2.14 },
        blautia: { min: 3.09, max: 4.51 },
        ecoli: { min: 2.34, max: 4.56 },
        faecali: { min: 4.22, max: 6.64 },
        fuso: { min: 5.89, max: 7.35 },
        chiranonis: { min: 4.17, max: 5.33 },
        strepto: { min: 0.34, max: 3.39 },
        turi: { min: 2.55, max: 5.08 }
      }
    },
    gato: {
      cachorro: {
        bacteroides: { min: 5.82, max: 6.81 },
        bifido: { min: 2.36, max: 4.08 },
        blautia: { min: 2.23, max: 3.52 },
        ecoli: { min: -1.33, max: 2.60 },
        faecali: { min: 4.69, max: 5.97 },
        fuso: { min: 1.66, max: 5.27 },
        chiranonis: { min: 2.46, max: 4.44 },
        strepto: { min: -0.20, max: 1.60 },
        turi: { min: 0.18, max: 4.34 }
      },
      adulto: {
        bacteroides: { min: 5.96, max: 6.95 },
        bifido: { min: 2.42, max: 5.11 },
        blautia: { min: 2.34, max: 4.41 },
        ecoli: { min: -0.24, max: 2.53 },
        faecali: { min: 4.16, max: 6.08 },
        fuso: { min: 2.58, max: 5.65 },
        chiranonis: { min: 3.25, max: 4.31 },
        strepto: { min: -0.49, max: 0.69 },
        turi: { min: 1.65, max: 4.67 }
      },
      geronte: {
        bacteroides: { min: 5.66, max: 6.59 },
        bifido: { min: 2.69, max: 5.40 },
        blautia: { min: 2.95, max: 3.60 },
        ecoli: { min: -0.50, max: 3.03 },
        faecali: { min: 3.13, max: 5.54 },
        fuso: { min: 1.69, max: 3.68 },
        chiranonis: { min: 2.48, max: 4.27 },
        strepto: { min: 0.18, max: 1.66 },
        turi: { min: 1.10, max: 4.86 }
      }
    }
  };

  // Simulator values set to typical normal values in log DNA
  const [vals, setVals] = useState({
    chiranonis: 4.75,
    faecali: 4.50,
    blautia: 4.76,
    bifido: 2.38,
    ecoli: 4.50,
    strepto: 2.67,
    bacteroides: 6.71,
    fuso: 7.09,
    turi: 3.34
  });

  const [especie, setEspecie] = useState('perro');
  const [edad, setEdad] = useState('adulto');
  const [codigo, setCodigo] = useState('');

  // React to Especie or Edad change: set values to the middle of their new reference ranges
  useEffect(() => {
    const currentLimits = referenceRanges[especie][edad];
    setVals({
      chiranonis: parseFloat(((currentLimits.chiranonis.min + currentLimits.chiranonis.max) / 2).toFixed(2)),
      faecali: parseFloat(((currentLimits.faecali.min + currentLimits.faecali.max) / 2).toFixed(2)),
      blautia: parseFloat(((currentLimits.blautia.min + currentLimits.blautia.max) / 2).toFixed(2)),
      bifido: parseFloat(((currentLimits.bifido.min + currentLimits.bifido.max) / 2).toFixed(2)),
      ecoli: parseFloat(((currentLimits.ecoli.min + currentLimits.ecoli.max) / 2).toFixed(2)),
      strepto: parseFloat(((currentLimits.strepto.min + currentLimits.strepto.max) / 2).toFixed(2)),
      bacteroides: parseFloat(((currentLimits.bacteroides.min + currentLimits.bacteroides.max) / 2).toFixed(2)),
      fuso: parseFloat(((currentLimits.fuso.min + currentLimits.fuso.max) / 2).toFixed(2)),
      turi: parseFloat(((currentLimits.turi.min + currentLimits.turi.max) / 2).toFixed(2))
    });
  }, [especie, edad]);

  const bacterialGroups = [
    { key: 'bacteroides', name: 'Bacteroides', fullWidth: false },
    { key: 'bifido', name: 'Bifidobacterium', fullWidth: false },
    { key: 'blautia', name: 'Blautia', fullWidth: false },
    { key: 'ecoli', name: 'E._coli', fullWidth: false },
    { key: 'faecali', name: 'Faecalibacterium', fullWidth: false },
    { key: 'fuso', name: 'Fusobacterium', fullWidth: false },
    { key: 'chiranonis', name: 'P._hiranonis', fullWidth: false },
    { key: 'strepto', name: 'Streptococcus', fullWidth: false },
    { key: 'turi', name: 'Turicibacter', fullWidth: true }
  ];

  const handleSliderChange = (key, value) => {
    let parsed = parseFloat(value);
    if (isNaN(parsed)) {
      setVals(prev => ({
        ...prev,
        [key]: 0.00
      }));
      return;
    }
    const clamped = Math.max(-2.0, Math.min(10.0, parsed));
    setVals(prev => ({
      ...prev,
      [key]: parseFloat(clamped.toFixed(2))
    }));
  };

  // Calculate Dysbiosis Score dynamically based on current species/age limits
  const scoreResult = useMemo(() => {
    if (especie === 'gato' || especie === 'perro') {
      const centroids = especie === 'gato' ? {
        cachorro: {
          sano: { bacteroides: 6.31, bifido: 3.22, blautia: 2.88, ecoli: 0.63, faecali: 5.33, fuso: 3.47, chiranonis: 3.45, strepto: 0.70, turi: 2.26 },
          enfermo: { bacteroides: 6.16, bifido: 4.11, blautia: 3.21, ecoli: 1.93, faecali: 4.03, fuso: 3.02, chiranonis: 3.02, strepto: 0.70, turi: 1.14 },
          umbral: -0.05
        },
        adulto: {
          sano: { bacteroides: 6.46, bifido: 3.77, blautia: 3.37, ecoli: 1.15, faecali: 5.12, fuso: 4.11, chiranonis: 3.78, strepto: 0.10, turi: 3.16 },
          enfermo: { bacteroides: 6.20, bifido: 3.71, blautia: 3.29, ecoli: 1.61, faecali: 4.01, fuso: 2.41, chiranonis: 2.92, strepto: 0.66, turi: 0.99 },
          umbral: -0.40
        },
        geronte: {
          sano: { bacteroides: 6.12, bifido: 4.04, blautia: 3.28, ecoli: 1.27, faecali: 4.33, fuso: 2.69, chiranonis: 3.38, strepto: 0.92, turi: 2.98 },
          enfermo: { bacteroides: 6.40, bifido: 4.83, blautia: 3.16, ecoli: 2.37, faecali: 3.86, fuso: 3.21, chiranonis: 3.25, strepto: 0.62, turi: 1.29 },
          umbral: 0.10
        }
      } : {
        cachorro: {
          sano: { bacteroides: 5.18, bifido: 1.93, blautia: 1.65, ecoli: 5.26, faecali: 3.18, fuso: 5.48, chiranonis: 2.74, strepto: 1.40, turi: 1.44 },
          enfermo: { bacteroides: 5.48, bifido: 0.86, blautia: 3.38, ecoli: 3.24, faecali: 3.84, fuso: 5.21, chiranonis: 2.48, strepto: 1.44, turi: 2.17 },
          umbral: 0.60
        },
        adulto: {
          sano: { bacteroides: 6.93, bifido: 0.62, blautia: 3.83, ecoli: 2.26, faecali: 5.08, fuso: 6.66, chiranonis: 4.69, strepto: 1.37, turi: 4.02 },
          enfermo: { bacteroides: 5.41, bifido: 1.01, blautia: 3.52, ecoli: 3.17, faecali: 3.53, fuso: 5.22, chiranonis: 2.75, strepto: 1.98, turi: 2.09 },
          umbral: -0.50
        },
        geronte: {
          sano: { bacteroides: 6.58, bifido: 0.82, blautia: 3.75, ecoli: 3.54, faecali: 5.30, fuso: 6.58, chiranonis: 4.69, strepto: 2.08, turi: 4.05 },
          enfermo: { bacteroides: 5.18, bifido: 0.48, blautia: 3.12, ecoli: 3.46, faecali: 3.90, fuso: 4.87, chiranonis: 1.52, strepto: 0.67, turi: 1.98 },
          umbral: -0.50
        }
      };

      const model = centroids[edad];
      let sumSano = 0;
      let sumEnfermo = 0;
      bacterialGroups.forEach(group => {
        const key = group.key;
        const val = vals[key] !== undefined ? vals[key] : 0;
        const cSano = model.sano[key] || 0;
        const cEnfermo = model.enfermo[key] || 0;
        sumSano += Math.pow(val - cSano, 2);
        sumEnfermo += Math.pow(val - cEnfermo, 2);
      });

      const distSano = Math.sqrt(sumSano);
      const distEnfermo = Math.sqrt(sumEnfermo);
      const di = distSano - distEnfermo;

      // Clamp score to visual range [-5.0, 5.0]
      const clampedScore = Math.min(Math.max(di, -5.0), 5.0).toFixed(2);
      const numericScore = parseFloat(clampedScore);
      const umbral = model.umbral;

      let statusText = "EQUILIBRIO PERFECTO";
      let statusClass = "text-[#01FADA]";
      let borderColorClass = "border-[#01FADA]/30";
      let reportHTML = "El ecosistema se encuentra en un estado de equilibrio metabólico absoluto.";

      if (numericScore > umbral) {
        statusClass = "text-[#FF0000]";
        if (numericScore - umbral <= 1.5) {
          statusText = "ALTERACIÓN FUNCIONAL LEVE";
          borderColorClass = "border-[#FF0000]/40";
          reportHTML = "Se observa una desviación inicial en los patrones dietéticos y metabólicos basales del paciente.";
        } else {
          statusText = "DESEQUILIBRIO MOLECULAR SEVERO";
          borderColorClass = "border-[#FF0000]/45";
          reportHTML = "Se detecta un desequilibrio establecido con un alto riesgo de progresión clínica.";
        }
      }

      return {
        score: numericScore > 0 ? '+' + clampedScore : clampedScore,
        statusText,
        statusClass,
        borderColorClass,
        reportHTML,
        umbral
      };
    }

    // Fallback if no matching species is found
    return {
      score: "0.00",
      statusText: "EQUILIBRIO PERFECTO",
      statusClass: "text-[#01FADA]",
      borderColorClass: "border-[#01FADA]/30",
      reportHTML: "El ecosistema se encuentra en un estado de equilibrio metabólico absoluto.",
      umbral: -0.52
    };
  }, [vals, especie, edad]);

  // Local recommendations for beneficial groups found below range (confidential placeholders)
  const localRecommendations = {
    chiranonis: {
      title: "P._hiranonis",
      desc: "Se detecta deficiencia de P. hiranonis. Esto puede comprometer el metabolismo de ácidos biliares secundarios y favorecer malabsorción. Se sugiere considerar dieta de proteína hidrolizada y soporte probiótico adaptado."
    },
    faecali: {
      title: "Faecalibacterium",
      desc: "Deficiencia de Faecalibacterium. Este grupo es clave para la síntesis de butirato y el sustento energético de la mucosa del colon. Se sugiere evaluar soporte con prebióticos solubles."
    },
    blautia: {
      title: "Blautia",
      desc: "Niveles reducidos de Blautia spp. Asociado con menor capacidad de fermentación y disbiosis temprana. Considere fibras funcionales moderadas en la dieta."
    },
    bifido: {
      title: "Bifidobacterium",
      desc: "Bifidobacterium por debajo del límite ideal. Afecta la modulación inmunológica local. Se sugiere considerar adición de simbióticos específicos."
    },
    bacteroides: {
      title: "Bacteroides",
      desc: "Bacteroides por debajo del nivel de referencia. Impacta la fermentación primaria de carbohidratos complejos y polisacáridos. Evaluar balance de fibra dietética."
    }
  };

  // Evaluate which comensal bacterial groups are low
  const activeRecommendations = useMemo(() => {
    const limits = referenceRanges[especie][edad];
    const recs = [];
    
    const checkKeys = ['chiranonis', 'faecali', 'blautia', 'bifido', 'bacteroides'];
    checkKeys.forEach(key => {
      if (vals[key] < limits[key].min) {
        recs.push({
          key,
          name: key === 'chiranonis' ? 'P._hiranonis' : key === 'bifido' ? 'Bifidobacterium' : key === 'faecali' ? 'Faecalibacterium' : key === 'blautia' ? 'Blautia' : 'Bacteroides',
          title: localRecommendations[key].title,
          desc: localRecommendations[key].desc
        });
      }
    });
    
    return recs;
  }, [vals, especie, edad]);

  return (
    <div className="w-full bg-[#f6f8fa] font-sans antialiased text-gray-800 relative">
      
      {/* Hero Section (Translucent White Background with Moving Bacteria Background) */}
      <section className="relative w-full pt-16 pb-28 bg-white/30 backdrop-blur-[2px] text-gray-800 overflow-hidden flex flex-col items-center">
        
        {/* Style for custom balance, drifting background animations, and custom combined slider */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes balanceRotation {
            0% { transform: rotate(-5deg); }
            100% { transform: rotate(5deg); }
          }
          .osd-balance-arm {
            transform-origin: 50% 9%;
            animation: balanceRotation 4s ease-in-out infinite alternate;
          }
          @keyframes driftBackground {
            0% { background-position: 0% 0%; }
            50% { background-position: 8% 4%; }
            100% { background-position: 0% 0%; }
          }
          .osd-bacteria-bg {
            animation: driftBackground 24s ease-in-out infinite;
          }
          .osd-custom-range::-webkit-slider-runnable-track {
            background: transparent !important;
            border: none !important;
          }
          .osd-custom-range::-webkit-slider-thumb {
            -webkit-appearance: none !important;
            appearance: none !important;
            width: 16px !important;
            height: 16px !important;
            border-radius: 9999px !important;
            background-color: #ffffff !important;
            border: 2px solid #6F2BCC !important;
            cursor: pointer !important;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
            position: relative !important;
            z-index: 30 !important;
          }
          .osd-custom-range::-moz-range-track {
            background: transparent !important;
            border: none !important;
          }
          .osd-custom-range::-moz-range-thumb {
            width: 16px !important;
            height: 16px !important;
            border-radius: 9999px !important;
            background-color: #ffffff !important;
            border: 2px solid #6F2BCC !important;
            cursor: pointer !important;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
            position: relative !important;
            z-index: 30 !important;
          }
        `}} />

        {/* Faint violet microorganisms drifting background pattern */}
        <div className="absolute inset-0 bg-repeat opacity-[0.6] pointer-events-none osd-bacteria-bg" 
             style={{ 
               backgroundImage: `url('https://res.cloudinary.com/oiaig120/image/upload/osdiagnostic/microorganismos.svg')`,
               backgroundSize: '800px'
             }}></div>

        {/* Content Wrapper (Text on left, Balance on right) */}
        <div className="relative z-10 max-w-6xl mx-auto w-full px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Column: Title and Details (Restored to larger size as in reference screenshot) */}
          <div className="flex-1 text-left space-y-6 max-w-xl">
            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-gray-800 leading-[1.2]">
              Anticípese al signo clínico. <br/>
              <span className="text-osd-purple">Evalúe el equilibrio intestinal a nivel molecular.</span>
            </h1>
            <p className="text-[#555555] text-sm md:text-base leading-relaxed">
              Un paciente canino o felino es un todo integrado, donde la salud intestinal es el eje central de la homeostasis sistémica. El Test de Índice de Disbiosis de OSD te ofrece una herramienta cuantitativa avanzada para la detección de alteraciones biológicas silenciosas, antes de que se manifiesten en la consulta.
            </p>
            <div className="pt-2">
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSdW3-sVFSQNfT7jwjOy_zOewuEZ13xsS8ihWfAV-H83-l71WQ/viewform" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block bg-[#6F2BCC] hover:bg-[#2B017C] text-white font-bold py-3.5 px-8 rounded-lg text-sm tracking-wide shadow-md transition-all duration-300 transform hover:scale-[1.02]"
              >
                Solicitar kit
              </a>
            </div>
          </div>

          {/* Right Column: Balancing Scale Animation (Enlarged to max-w-[580px]) */}
          <div className="relative w-full max-w-[580px] aspect-[4/3] flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Arm/Plate (Balances) */}
              <img 
                src="https://res.cloudinary.com/oiaig120/image/upload/osdiagnostic/balance-intestinal.svg" 
                alt="Cuerpo Balanza" 
                className="absolute inset-0 w-full h-auto z-10 osd-balance-arm"
              />
              {/* Stand/Base (Static) */}
              <img 
                src="https://res.cloudinary.com/oiaig120/image/upload/osdiagnostic/equilibrio-intestinal.svg" 
                alt="Eje Fijo" 
                className="absolute inset-0 w-full h-auto z-20 pointer-events-none"
              />
            </div>
          </div>

        </div>

        {/* Wave Divider at the bottom of hero transition */}
        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20">
          <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="relative block w-full h-[50px] md:h-[80px]">
            <path d="M0,0 C150,90 350,90 500,40 C650,-10 850,-10 1000,40 L1000,120 L0,120 Z" fill="#6F2BCC"></path>
          </svg>
        </div>
      </section>

      {/* Steps process with wavy neon line */}
      <section className="bg-[#6F2BCC] text-white pt-16 pb-28 px-6 relative overflow-hidden">
        
        {/* Style for wavy timeline animation */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes osdPathFlow {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -16; }
          }
          @keyframes osdWaveFloating {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }
          .osd-wave-stream {
            animation: osdWaveFloating 6s ease-in-out infinite;
          }
          .osd-wavy-path {
            fill: none;
            stroke: rgba(1, 250, 218, 0.4);
            stroke-width: 3;
            stroke-dasharray: 8, 8;
            animation: osdPathFlow 1.5s linear infinite;
          }
        `}} />

        <div className="max-w-5xl mx-auto text-center space-y-3 mb-14">
          <h2 className="text-2xl md:text-3xl font-black">Información accionable para tu paciente, en 24 horas hábiles</h2>
          <p className="text-xs md:text-sm text-white/80">Sigue estos cuatro pasos para solicitar el kit, enviar la muestra y recibir el resultado de tu paciente</p>
        </div>

        {/* Timeline Wavy Line Container */}
        <div className="max-w-5xl mx-auto relative px-4">
          
          {/* Horizontal Wave (Hidden on Mobile) */}
          <div className="absolute top-[35px] left-0 w-full h-[100px] z-10 pointer-events-none hidden md:block">
            <svg className="w-full h-full osd-wave-stream" viewBox="0 0 1000 160" preserveAspectRatio="none">
              <path className="osd-wavy-path" d="M 125 80 C 187.5 20, 312.5 140, 375 80 C 437.5 20, 562.5 140, 625 80 C 687.5 20, 812.5 140, 875 80" />
            </svg>
          </div>

          {/* Steps Grid (With Scale hover effect) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-20">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-4 group transform hover:scale-[1.05] transition-all duration-300 cursor-pointer">
              <div className="w-[70px] h-[70px] rounded-full border-2 border-white bg-[#6F2BCC] flex items-center justify-center text-2xl font-bold relative shadow-lg group-hover:border-[#01FADA] group-hover:text-[#01FADA] transition-all duration-300">
                <span className="absolute top-0 right-0 w-5 h-5 bg-[#01FADA] text-osd-dark rounded-full text-xs flex items-center justify-center font-bold">1</span>
                <i className="fa-solid fa-box-open"></i>
              </div>
              <h3 className="font-bold text-sm md:text-base group-hover:text-[#01FADA] transition-colors">Solicita tu kit de toma de muestra</h3>
              <p className="text-xs text-white/85 leading-relaxed">Recibe todo lo necesario para la recolección, junto con instrucciones claras para realizar el procedimiento correctamente.</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-4 group transform hover:scale-[1.05] transition-all duration-300 cursor-pointer">
              <div className="w-[70px] h-[70px] rounded-full border-2 border-white bg-[#6F2BCC] flex items-center justify-center text-2xl font-bold relative shadow-lg group-hover:border-[#01FADA] group-hover:text-[#01FADA] transition-all duration-300">
                <span className="absolute top-0 right-0 w-5 h-5 bg-[#01FADA] text-osd-dark rounded-full text-xs flex items-center justify-center font-bold">2</span>
                <i className="fa-solid fa-vial"></i>
              </div>
              <h3 className="font-bold text-sm md:text-base group-hover:text-[#01FADA] transition-colors">Toma la muestra</h3>
              <p className="text-xs text-white/85 leading-relaxed">Realiza la toma siguiendo las instrucciones incluidas en el kit de manera sencilla y segura.</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-4 group transform hover:scale-[1.05] transition-all duration-300 cursor-pointer">
              <div className="w-[70px] h-[70px] rounded-full border-2 border-white bg-[#6F2BCC] flex items-center justify-center text-2xl font-bold relative shadow-lg group-hover:border-[#01FADA] group-hover:text-[#01FADA] transition-all duration-300">
                <span className="absolute top-0 right-0 w-5 h-5 bg-[#01FADA] text-osd-dark rounded-full text-xs flex items-center justify-center font-bold">3</span>
                <i className="fa-solid fa-truck-ramp-box"></i>
              </div>
              <h3 className="font-bold text-sm md:text-base group-hover:text-[#01FADA] transition-colors">Solicita la recolección</h3>
              <p className="text-xs text-white/85 leading-relaxed">Una vez tomada la muestra, agenda la recolección para su envío al laboratorio.</p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center space-y-4 group transform hover:scale-[1.05] transition-all duration-300 cursor-pointer">
              <div className="w-[70px] h-[70px] rounded-full border-2 border-white bg-[#6F2BCC] flex items-center justify-center text-2xl font-bold relative shadow-lg group-hover:border-[#01FADA] group-hover:text-[#01FADA] transition-all duration-300">
                <span className="absolute top-0 right-0 w-5 h-5 bg-[#01FADA] text-osd-dark rounded-full text-xs flex items-center justify-center font-bold">4</span>
                <i className="fa-solid fa-envelope-open-text"></i>
              </div>
              <h3 className="font-bold text-sm md:text-base group-hover:text-[#01FADA] transition-colors">Recibe tus resultados</h3>
              <p className="text-xs text-white/85 leading-relaxed">Los resultados serán enviados al correo electrónico registrado en el formulario de solicitud.</p>
            </div>

          </div>
        </div>

        {/* White Wave Divider at the bottom of the purple steps section transition to white content */}
        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20">
          <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="relative block w-full h-[50px] md:h-[80px]">
            <path d="M0,0 C150,90 350,90 500,40 C650,-10 850,-10 1000,40 L1000,120 L0,120 Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      {/* Más allá de identificar bacterias... (Bacteria Identifier Image ENLARGED) */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Image (Enlarged to max-w-[500px]) */}
          <div className="flex-1 max-w-[500px] w-full">
            <img 
              src="https://res.cloudinary.com/oiaig120/image/upload/osdiagnostic/toma-de-muestra-fecal.svg" 
              alt="Kit de toma de muestra para microbiota intestinal" 
              className="w-full h-auto object-contain transform hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
          {/* Text content */}
          <div className="flex-1 space-y-6 text-left">
            <h2 className="text-2xl md:text-3xl lg:text-[34px] font-extrabold text-osd-purple leading-tight">
              Más allá de identificar bacterias, comprender el equilibrio intestinal.
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              El objetivo no es detectar microorganismos aislados, sino evaluar cómo interactúan grupos bacterianos clave dentro de la microbiota intestinal. Cuando este equilibrio se altera, puede desarrollarse un estado de disbiosis capaz de generar cambios biológicos que impacten el bienestar del paciente.
            </p>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              El Índice de Disbiosis permite medir ese balance de forma cuantitativa y transformarlo en información útil para el seguimiento y la toma de decisiones clínicas.
            </p>
            <ul className="space-y-3.5 text-xs md:text-sm font-semibold text-gray-700">
              <li className="flex items-center space-x-3">
                <span className="w-2 h-2 rounded-full bg-osd-purple flex-shrink-0"></span>
                <span>Evalúa el equilibrio de grupos bacterianos clave.</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-2 h-2 rounded-full bg-osd-purple flex-shrink-0"></span>
                <span>Cuantifica el estado de la microbiota intestinal mediante PCR en tiempo real.</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-2 h-2 rounded-full bg-osd-purple flex-shrink-0"></span>
                <span>Genera información objetiva para el seguimiento clínico del paciente.</span>
              </li>
            </ul>
            <div className="pt-2">
              <a 
                href="https://wa.link/yi30l5" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block bg-osd-purple hover:bg-osd-dark text-white font-bold py-3 px-8 rounded-lg text-xs shadow-md transition-all"
              >
                Solicitar asesoría
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Age Stratified Analysis (Enlarged Section Typo & Nodes) */}
      <section className="py-20 px-6 bg-[#F8F9FE] text-center">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes popNode {
            to { transform: scale(1); }
          }
          @keyframes fadeInLabel {
            to { opacity: 1; transform: translateY(0); }
          }
          .osd-node-pop {
            transform: scale(0);
            animation: popNode 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .osd-label-fade {
            opacity: 0;
            transform: translateY(10px);
            animation: fadeInLabel 0.4s ease-out forwards;
          }
        `}} />
        
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#2B017C]">Análisis estratificado por edad</h2>
          <p className="text-gray-600 text-base md:text-[17px] leading-relaxed max-w-3xl mx-auto">
            En OSD, entendemos que la microbiota intestinal no es estática. El perfil molecular de un cachorro es radicalmente distinto al de un paciente adulto o geronte. Para maximizar la sensibilidad y la especificidad clínica, nuestro <strong>Test de Índice de Disbiosis</strong> no aplica un rango único. Cada muestra es analizada bajo los umbrales de cuantificación molecular según la <strong>edad y especie</strong>, proporcionando una detección de alta precisión adaptada a cada etapa biológica.
          </p>

          {/* Interactive Timeline Line (Enlarged) */}
          <div className="relative w-full max-w-[750px] mx-auto mt-12 px-6">
            
            {/* Desktop Horizontal Line Background */}
            <div className="absolute top-[29px] left-0 w-full h-[8px] bg-slate-200 rounded-full z-0 hidden sm:block"></div>
            {/* Desktop Horizontal Line Progress */}
            <div className="absolute top-[29px] left-0 h-[8px] bg-[#2B017C] rounded-full z-10 hidden sm:block" style={{ width: '100%', transition: 'width 2s' }}></div>

            {/* Nodes Container (Centrado en móvil con línea vertical conectora y distribuido horizontalmente en escritorio) */}
            <div className="relative w-fit sm:w-full mx-auto flex flex-col sm:flex-row justify-between z-20 space-y-8 sm:space-y-0">
              
              {/* Mobile Vertical Line Background (Conector vertical en responsive) */}
              <div className="absolute top-[29px] bottom-[29px] left-[25px] w-[8px] bg-slate-200 rounded-full z-0 sm:hidden"></div>
              {/* Mobile Vertical Line Progress (Conector vertical púrpura) */}
              <div 
                className="absolute top-[29px] left-[25px] w-[8px] bg-[#2B017C] rounded-full z-10 sm:hidden"
                style={{
                  height: 'calc(100% - 58px)',
                  transition: 'height 2s'
                }}
              ></div>

              {/* Cachorro */}
              <div className="flex sm:flex-col items-center gap-4 sm:gap-0 relative z-20">
                <div className="w-[58px] h-[58px] rounded-full bg-[#2B017C] flex items-center justify-center shadow-lg osd-node-pop flex-shrink-0" style={{ animationDelay: '0.5s' }}>
                  <div className="w-[24px] h-[24px] rounded-full bg-[#01FADA]"></div>
                </div>
                <span className="font-extrabold text-[#2B017C] text-sm md:text-[15px] sm:mt-5 tracking-wide osd-label-fade text-left sm:text-center" style={{ animationDelay: '0.7s' }}>CACHORRO</span>
              </div>

              {/* Adulto */}
              <div className="flex sm:flex-col items-center gap-4 sm:gap-0 relative z-20">
                <div className="w-[58px] h-[58px] rounded-full bg-[#2B017C] flex items-center justify-center shadow-lg osd-node-pop flex-shrink-0" style={{ animationDelay: '1.2s' }}>
                  <div className="w-[24px] h-[24px] rounded-full bg-[#01FADA]"></div>
                </div>
                <span className="font-extrabold text-[#2B017C] text-sm md:text-[15px] sm:mt-5 tracking-wide osd-label-fade text-left sm:text-center" style={{ animationDelay: '1.4s' }}>ADULTO</span>
              </div>

              {/* Geronte */}
              <div className="flex sm:flex-col items-center gap-4 sm:gap-0 relative z-20">
                <div className="w-[58px] h-[58px] rounded-full bg-[#2B017C] flex items-center justify-center shadow-lg osd-node-pop flex-shrink-0" style={{ animationDelay: '1.9s' }}>
                  <div className="w-[24px] h-[24px] rounded-full bg-[#01FADA]"></div>
                </div>
                <span className="font-extrabold text-[#2B017C] text-sm md:text-[15px] sm:mt-5 tracking-wide osd-label-fade text-left sm:text-center" style={{ animationDelay: '2.1s' }}>GERONTE</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 9 Grupos Bacterianos Section (Text ENLARGED) */}
      <section className="py-16 px-6 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1 text-left md:text-right">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#2B017C] uppercase leading-[0.95] tracking-tighter">
              9 Grupos<br/>Bacterianos
            </h2>
          </div>
          <div className="flex-1 text-left">
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              La evaluación del equilibrio intestinal se basa en la cuantificación de nueve grupos bacterianos asociados a diferentes funciones dentro de la microbiota. La interpretación conjunta de estos marcadores permite obtener una visión integral del estado de la microbiota intestinal.
            </p>
          </div>
        </div>
      </section>

      {/* Simulator Calculator Section */}
      <section className="py-16 px-4 bg-[#6F2BCC] text-white">
        <div className="max-w-5xl mx-auto space-y-10">
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-center leading-tight">
            Tablero de Control del <span className="text-[#01FADA]">Ecosistema Intestinal</span>
          </h2>

          <p className="text-center text-xs md:text-sm text-white/80 max-w-2xl mx-auto -mt-6 font-sans">
            Esta información proporcionada está avalada por nuestras investigaciones realizadas por nuestros analistas.{" "}
            <Link to="/noticias-veterinarias/microbiota-intestinal-en-perros-y-gatos-segun-su-edad" className="text-[#01FADA] underline hover:text-white font-bold transition-colors">
              Saber más
            </Link>
          </p>

          {/* Simulator Box Grid (Light Background) */}
          <div className="bg-[#F8F9FF] border border-gray-200/60 rounded-3xl p-6 md:p-10 shadow-xl flex flex-col gap-6">
            
            {/* Header: Title and Filters (Full Width, above the grid) */}
            <div className="space-y-4">
              <h3 className="text-lg font-display font-bold text-[#6F2BCC] pb-2 border-b border-gray-200/60 text-left">
                Ajuste los Niveles de los 9 Grupos Bacterianos
              </h3>

              {/* Species, Age and Code Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-gray-200/60 text-left">
                <div className="space-y-2">
                  <label htmlFor="especie-select" className="text-xs font-sans font-bold text-[#6F2BCC]/70 uppercase tracking-wider block">
                    Especie
                  </label>
                  <select
                    id="especie-select"
                    value={especie}
                    onChange={(e) => setEspecie(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border-2 border-[#6F2BCC] rounded-xl outline-none text-sm text-[#2B017C] font-sans font-bold cursor-pointer transition-all focus:border-[#6F2BCC]"
                  >
                    <option value="perro" className="bg-white text-gray-800 font-sans font-medium">Perro</option>
                    <option value="gato" className="bg-white text-gray-800 font-sans font-medium">Gato</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="edad-select" className="text-xs font-sans font-bold text-[#6F2BCC]/70 uppercase tracking-wider block">
                    Edad
                  </label>
                  <select
                    id="edad-select"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border-2 border-[#6F2BCC] rounded-xl outline-none text-sm text-[#2B017C] font-sans font-bold cursor-pointer transition-all focus:border-[#6F2BCC]"
                  >
                    <option value="cachorro" className="bg-white text-gray-800 font-sans font-medium">Cachorro</option>
                    <option value="adulto" className="bg-white text-gray-800 font-sans font-medium">Adulto</option>
                    <option value="geronte" className="bg-white text-gray-800 font-sans font-medium">Geronte</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="codigo-input" className="text-xs font-sans font-bold text-[#6F2BCC]/70 uppercase tracking-wider block">
                    Código de Examen
                  </label>
                  <input
                    id="codigo-input"
                    type="text"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    placeholder="Ej. OSD-7842"
                    className="w-full px-4 py-2.5 bg-white border-2 border-[#6F2BCC] rounded-xl outline-none text-sm text-[#2B017C] font-sans font-bold transition-all focus:border-[#6F2BCC] placeholder:text-[#6F2BCC]/35"
                  />
                </div>
              </div>
            </div>

            {/* Grid for Sliders and Output (Tops perfectly aligned) */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
              
              {/* Sliders Column (Only the sliders) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bacterialGroups.map((group) => {
                  const val = vals[group.key];
                  const limits = referenceRanges[especie][edad];
                  const groupLimit = limits[group.key];

                  // Slider range: min=-2.0, max=10.0. Scale width = 12
                  const sliderMin = -2.0;
                  const sliderMax = 10.0;
                  const scaleWidth = sliderMax - sliderMin;

                  // Calculate left and width percentages for cyan bar (reference range)
                  const leftPercent = ((groupLimit.min - sliderMin) / scaleWidth) * 100;
                  const widthPercent = ((groupLimit.max - groupLimit.min) / scaleWidth) * 100;

                  const isBajo = val < groupLimit.min;
                  const isAlto = val > groupLimit.max;
                  const isOutOfRange = isBajo || isAlto;

                  return (
                    <div 
                      key={group.key} 
                      className={`bg-white p-3 rounded-xl border-2 transition-colors duration-300 text-left flex flex-col justify-between ${
                        isOutOfRange ? 'border-[#FF0000] bg-red-50/10' : 'border-[#6F2BCC]'
                      } ${group.fullWidth ? 'sm:col-span-2' : ''}`}
                    >
                      <div className="flex justify-between items-center text-[11px] font-sans font-bold mb-0.5">
                        <span className={isOutOfRange ? 'text-[#FF0000]' : 'text-[#2B017C]'}>{group.name}</span>
                        <div className="space-x-1.5 flex items-center">
                          {isBajo && <span className="text-[#FF0000] font-extrabold text-[9px] uppercase tracking-wide animate-pulse">BAJO</span>}
                          {isAlto && <span className="text-[#FF0000] font-extrabold text-[9px] uppercase tracking-wide animate-pulse">ALTO</span>}
                          <span className="text-gray-500 font-sans text-[9px]">({groupLimit.min.toFixed(2)} - {groupLimit.max.toFixed(2)})</span>
                          <input
                            type="number"
                            step="0.01"
                            min={sliderMin}
                            max={sliderMax}
                            value={val}
                            onChange={(e) => handleSliderChange(group.key, e.target.value)}
                            className={`w-14 px-1 py-0.5 text-right text-[10px] font-extrabold border rounded outline-none bg-white font-sans transition-colors ${
                              isOutOfRange ? 'border-[#FF0000] text-[#FF0000] focus:border-[#FF0000]' : 'border-[#6F2BCC]/25 text-[#6F2BCC] focus:border-[#6F2BCC]'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Combined Interactive Reference Range Bar */}
                      <div className="relative w-full h-6 flex items-center overflow-visible">
                        {/* Background track */}
                        <div className="absolute left-0 right-0 h-2 bg-gray-200 rounded-full z-0"></div>

                        {/* Cyan Reference Range (turns red if out of range) */}
                        <div 
                          className={`absolute h-2 opacity-75 rounded-md z-10 transition-colors duration-300 ${
                            isOutOfRange ? 'bg-[#FF0000]' : 'bg-[#01FADA]'
                          }`}
                          style={{
                            left: `${leftPercent}%`,
                            width: `${widthPercent}%`
                          }}
                        ></div>

                        {/* Native slider overlaid transparently on top */}
                        <input 
                          type="range" 
                          min={sliderMin}
                          max={sliderMax}
                          step="0.01"
                          value={val}
                          onChange={(e) => handleSliderChange(group.key, e.target.value)}
                          className="osd-custom-range absolute inset-0 w-full h-full appearance-none bg-transparent cursor-pointer z-20 focus:outline-none"
                        />
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Diagnostic Report Output Column (White Box, Purple Border, Aligned, No Scroll) */}
              <div className="bg-white border-2 border-[#6F2BCC] rounded-2xl p-8 flex flex-col justify-start items-center text-center transition-all duration-300">
                <div className={`text-xs md:text-sm font-sans font-bold tracking-widest mb-3 ${scoreResult.statusClass} transition-colors duration-300`}>
                  {scoreResult.statusText}
                </div>
                <div className={`text-5xl md:text-6xl font-display font-black mb-5 tracking-tight ${scoreResult.statusClass} drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.15)] transition-colors duration-300`}>
                  {scoreResult.score}
                </div>

                {/* Visual Dysbiosis Index (DI) Bar */}
                <div className="w-full my-6 bg-gray-100 p-4 rounded-xl border border-[#6F2BCC]/10 space-y-3 font-sans">
                  <div className="flex justify-between text-[10px] md:text-[11px] font-sans font-bold tracking-wider text-[#2B017C]/80">
                    <span className="uppercase">Normobiosis</span>
                    <span className="text-[#FF0000] uppercase font-sans">Umbral: {scoreResult.umbral !== undefined ? scoreResult.umbral.toFixed(2) : '-0.52'}</span>
                    <span className="uppercase">Disbiosis</span>
                  </div>
                  
                  {/* Horizontal Bar */}
                  <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-visible">
                    {/* Cyan Normal Range (dynamic width based on threshold) */}
                    <div 
                      className="absolute left-0 top-0 h-full bg-[#01FADA] rounded-l-full"
                      style={{ width: `${Math.min(Math.max((( (scoreResult.umbral !== undefined ? scoreResult.umbral : -0.52) - (-5.0)) / (5.0 - (-5.0))) * 100, 0), 100)}%` }}
                    ></div>
                    
                    {/* Red Dashed Threshold Line */}
                    <div 
                      className="absolute top-[-4px] h-[20px] border-l-2 border-dashed border-[#FF0000] z-10"
                      style={{ left: `${Math.min(Math.max((( (scoreResult.umbral !== undefined ? scoreResult.umbral : -0.52) - (-5.0)) / (5.0 - (-5.0))) * 100, 0), 100)}%` }}
                    ></div>
                    
                    {/* Dynamic Patient Dot */}
                    <div 
                      className="absolute top-[-3px] w-4.5 h-4.5 bg-white border-2 border-black rounded-full shadow-lg transition-all duration-500 ease-out z-20"
                      style={{ 
                        left: `${Math.min(Math.max(((parseFloat(scoreResult.score) - (-5.0)) / (5.0 - (-5.0))) * 100, 0), 100)}%`,
                        transform: 'translateX(-50%)'
                      }}
                    ></div>
                  </div>

                  {/* Scale Axis Labels */}
                  <div className="flex justify-between text-[9px] md:text-[10px] text-gray-400 font-bold font-sans px-0.5">
                    <span>-5.0</span>
                    <span className="mr-8">0</span>
                    <span>5.0</span>
                  </div>
                </div>

                <div className="w-[85%] h-[1px] bg-gray-200 mb-4"></div>
                
                <div className="text-xs text-gray-600 font-sans font-medium mb-4">
                  {scoreResult.reportHTML}
                </div>
              </div>

            </div>

            {/* Recommendations Section (Placed at the bottom of the entire Bone-White card) */}
            <div className="w-full border-t border-gray-200/60 pt-6 mt-2 text-left space-y-4">
              <p className="text-xs font-sans font-bold text-[#6F2BCC] uppercase tracking-wider">
                Recomendaciones Clínicas de Ecosistema:
              </p>
              {activeRecommendations.length === 0 ? (
                <div className="bg-[#00ebd2]/10 border border-[#00ebd2]/30 rounded-xl p-4 text-xs text-[#6F2BCC] font-sans font-semibold">
                  ✓ Ecosistema homeostático en equilibrio. No se detecta ningún grupo bacteriano homeostático por debajo de su límite de referencia. Se sugiere continuar con la dieta habitual equilibrada del paciente, evitar cambios nutricionales abruptos y realizar monitoreo periódico preventivo.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeRecommendations.map((rec) => (
                    <div key={rec.key} className="bg-red-50/50 border border-red-200/60 rounded-xl p-4 space-y-1 text-left">
                      <p className="text-xs font-sans font-bold text-red-600 uppercase tracking-wide">
                        ! Grupo {rec.name} Deficiente
                      </p>
                      <p className="text-[11px] text-[#6F2BCC] leading-normal font-sans font-medium">
                        {rec.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
