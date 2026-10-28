import React, { useState, useEffect, useRef } from 'react';

// Datos oficiales de los 14 hotspots con redacción técnica y clínica completa en Montserrat (font-sans)
const HOTSPOTS_DATA = {
  1: [
    {
      id: 1,
      num: 1,
      top: '33.0%',
      left: '9.0%',
      title: 'Información del paciente y datos clínicos',
      tag: 'Trazabilidad Diagnóstica',
      content: (
        <div className="space-y-3 font-sans">
          <p className="text-gray-700 leading-relaxed text-xs sm:text-[13px]">
            Aquí se registran los datos básicos del paciente (<strong>nombre, especie, sexo, edad, raza</strong>), del propietario, del médico veterinario tratante y de la clínica veterinaria que remite la muestra.
          </p>
          <div className="bg-purple-50/90 border-l-4 border-[#6F2BCC] p-3 rounded-r-xl text-xs text-[#2B017C] font-medium leading-relaxed">
            📌 <em>Garantiza la trazabilidad unívoca y el estricto seguimiento de la muestra a lo largo de todo el flujo analítico en el laboratorio.</em>
          </div>
        </div>
      )
    },
    {
      id: 2,
      num: 2,
      top: '48.7%',
      left: '40.0%',
      title: 'Tipo de muestra',
      tag: 'Matriz Biológica',
      content: (
        <div className="space-y-3 font-sans">
          <p className="text-gray-700 leading-relaxed text-xs sm:text-[13px]">
            Indica el tipo de muestra biológica procesada (en este caso, <strong>sangre con anticoagulante EDTA</strong>).
          </p>
          <div className="bg-purple-50/90 border-l-4 border-[#6F2BCC] p-3 rounded-r-xl text-xs text-[#2B017C] font-medium leading-relaxed">
            🧪 <em>La correcta toma y conservación con EDTA previene la degradación celular y asegura la máxima integridad del material genético.</em>
          </div>
        </div>
      )
    },
    {
      id: 3,
      num: 3,
      top: '52.5%',
      left: '9.0%',
      title: 'Análisis y método de ensayo',
      tag: 'Tecnología Molecular',
      content: (
        <div className="space-y-3 font-sans">
          <p className="text-gray-700 leading-relaxed text-xs sm:text-[13px]">
            Se detalla la tecnología utilizada: <strong>extracción automatizada del material genético</strong> y <strong>PCR en tiempo real (qPCR)</strong> con sondas de hidrólisis tipo TaqMan.
          </p>
          <div className="bg-purple-50/90 border-l-4 border-[#6F2BCC] p-3 rounded-r-xl text-xs text-[#2B017C] font-medium leading-relaxed">
            🔬 <em>Este método permite detectar la presencia de secuencias genéticas específicas con la más alta sensibilidad analítica y especificidad diagnóstica.</em>
          </div>
        </div>
      )
    },
    {
      id: 4,
      num: 4,
      top: '63.2%',
      left: '11.0%',
      title: 'Panel o perfil solicitado',
      tag: 'Panel Diagnóstico',
      content: (
        <div className="space-y-3 font-sans">
          <p className="text-gray-700 leading-relaxed text-xs sm:text-[13px]">
            Corresponde al nombre de la prueba o panel multiplex solicitado (ej. <strong>Hemotrópico Felino Básico</strong>).
          </p>
          <p className="text-gray-700 leading-relaxed text-xs sm:text-[13px]">
            Agrupa los patógenos de mayor relevancia epidemiológica y clínica para la especie, permitiendo un cribado simultáneo diferencial rápido y costo-efectivo.
          </p>
        </div>
      )
    },
    {
      id: 5,
      num: 5,
      top: '66.6%',
      left: '17.6%',
      title: 'Agente evaluado',
      tag: 'Dianas Moleculares',
      content: (
        <div className="space-y-3 font-sans">
          <p className="text-gray-700 leading-relaxed text-xs sm:text-[13px]">
            Enumera los microorganismos patógenos específicos (bacterias, parásitos o virus) incluidos en el panel de diagnóstico molecular.
          </p>
          <p className="text-gray-700 leading-relaxed text-xs sm:text-[13px]">
            Cada ensayo cuenta con cebadores (primers) y sondas fluorescentes exclusivas que garantizan cero reactividad cruzada entre especies afines.
          </p>
        </div>
      )
    },
    {
      id: 6,
      num: 6,
      top: '66.6%',
      left: '47.8%',
      title: 'Resultado de la qPCR',
      tag: 'Conclusión Cualitativa',
      content: (
        <div className="space-y-3 font-sans">
          <p className="text-gray-700 leading-relaxed text-xs sm:text-[13px]">
            Indica si se detectó o no el material genético (ADN o ARN) del patógeno evaluado en la muestra biológica remitida.
          </p>
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 rounded-r-xl text-xs sm:text-[12.5px] text-emerald-900 font-medium">
            ✅ <strong>No se detecta DNA específico:</strong> Ausencia de la secuencia diana por encima del límite de detección analítico.
          </div>
          <div className="bg-rose-50 border-l-4 border-rose-500 p-3 rounded-r-xl text-xs sm:text-[12.5px] text-rose-900 font-medium">
            ⚠️ <strong>Se detecta DNA específico:</strong> Presencia confirmada del microorganismo diana en la muestra.
          </div>
        </div>
      )
    },
    {
      id: 7,
      num: 7,
      top: '66.6%',
      left: '72.4%',
      title: 'Valor de Ct (Cycle Threshold)',
      tag: 'Cinética de Amplificación',
      content: (
        <div className="space-y-3 font-sans">
          <p className="text-gray-700 leading-relaxed text-xs sm:text-[13px]">
            Es el ciclo de amplificación en el que la señal fluorescente supera el umbral de fondo. Es <strong>inversamente proporcional a la carga patógena</strong>:
          </p>
          <div className="bg-purple-50/90 border-l-4 border-[#6F2BCC] text-[#2B017C] p-3 rounded-r-xl text-xs sm:text-[12.5px] space-y-1 font-medium">
            <p>• <strong>Ct bajo (&lt; 25):</strong> Carga alta de ADN del patógeno (infección activa abundante).</p>
            <p>• <strong>Ct medio (25 - 32):</strong> Carga moderada.</p>
            <p>• <strong>Ct alto (&gt; 32):</strong> Carga baja / fases iniciales o convalecientes.</p>
            <p>• <strong>Ct = 0:</strong> No hubo amplificación detectable (resultado negativo).</p>
          </div>
        </div>
      )
    },
    {
      id: 8,
      num: 8,
      top: '66.6%',
      left: '85.4%',
      title: 'Cq (Copias por microlitro)',
      tag: 'Cuantificación Absoluta',
      content: (
        <div className="space-y-3 font-sans">
          <p className="text-gray-700 leading-relaxed text-xs sm:text-[13px]">
            Es la cantidad de material genético expresada en <strong>copias/μL</strong>, basada en el valor de Ct y calculada mediante curvas de calibración.
          </p>
          <p className="text-gray-700 leading-relaxed text-xs sm:text-[13px]">
            Expresado en escala logarítmica (ej. <em>1.8 × 10⁶</em>), permite hacer seguimiento cuantitativo del paciente y monitorear la respuesta al tratamiento médico.
          </p>
          <div className="bg-purple-50/90 border-l-4 border-[#6F2BCC] p-3 rounded-r-xl text-xs text-[#2B017C] font-medium leading-relaxed">
            📊 <em>Aquí todos los valores son 0, es decir, no se detectaron copias del material genético del microorganismo en la muestra.</em>
          </div>
        </div>
      )
    }
  ],
  2: [
    {
      id: 9,
      num: 9,
      top: '28.2%',
      left: '9.0%',
      title: 'Observaciones y consideraciones clínicas',
      tag: 'Criterio Clínico y Legal',
      content: (
        <div className="space-y-3 font-sans">
          <p className="text-gray-700 leading-relaxed text-xs sm:text-[13px]">
            Esta sección establece las <strong>consideraciones clínicas, técnicas y de responsabilidad legal</strong> que rigen el análisis molecular emitido por el laboratorio:
          </p>
          <ul className="list-disc pl-4 space-y-2 text-xs sm:text-[12px] text-gray-700 leading-relaxed font-medium">
            <li><strong>Detección de DNA:</strong> La qPCR detecta la presencia o no de material genético de las muestras remitidas de un paciente al laboratorio; la presencia de este puede estar relacionada o no con la sintomatología presente en el paciente.</li>
            <li><strong>Validez muestral:</strong> El resultado es válido para la(s) muestra(s) remitida(s) y analizada(s), con identificación acorde a la información suministrada en el formulario de recolección.</li>
            <li><strong>Criterio médico veterinario:</strong> On Site Diagnostic NO hace interpretación de resultados. La interpretación debe ser realizada por el personal Médico Veterinario y correlacionada con la clínica del paciente.</li>
            <li><strong>Seguridad y autenticidad:</strong> On Site Diagnostic NO se hace responsable por falsificación, manipulación o enmendadura. Cualquier duda de veracidad puede consultarse al email institucional o línea telefónica directa.</li>
          </ul>
        </div>
      )
    },
    {
      id: 10,
      num: 10,
      top: '50.1%',
      left: '11.0%',
      title: 'Datos de conformidad y aseguramiento y validez del resultado',
      tag: 'Control de Calidad Analítico',
      content: (
        <div className="space-y-3 font-sans">
          <p className="text-gray-700 leading-relaxed text-xs sm:text-[13px]">
            Esta tabla certifica la <strong>validez analítica y el estricto aseguramiento de la calidad</strong> de la corrida diagnóstica de qPCR.
          </p>
          <p className="text-gray-700 leading-relaxed text-xs sm:text-[13px]">
            Evalúa la integridad del material extraído, la pureza libre de contaminantes químicos y proteicos, y el correcto funcionamiento de los controles positivo, negativo e interno.
          </p>
          <div className="bg-purple-50/90 border-l-4 border-[#6F2BCC] p-3 rounded-r-xl text-xs text-[#2B017C] font-medium leading-relaxed">
            🛡️ <em>Garantiza que el resultado emitido para cada microorganismo es 100% confiable y técnicamente válido antes de su liberación.</em>
          </div>
        </div>
      )
    },
    {
      id: 11,
      num: 11,
      top: '53.6%',
      left: '21.9%',
      title: 'Descripción de parámetros analizados',
      tag: 'Parámetros de Calidad',
      content: (
        <div className="space-y-3 font-sans">
          <p className="text-gray-700 leading-relaxed text-xs sm:text-[13px]">
            Lista los parámetros analizados para asegurar la máxima confiabilidad del proceso:
          </p>
          <ul className="list-disc pl-4 space-y-1.5 text-xs sm:text-[12.5px] text-gray-700 font-medium">
            <li><strong>Concentración de material genético:</strong> Masa total de DNA extraído en ng/μL.</li>
            <li><strong>Valor relación 260/280:</strong> Pureza frente a contaminación con proteínas.</li>
            <li><strong>Valor relación 260/230:</strong> Pureza frente a sales caotrópicas, solventes o polisacáridos.</li>
            <li><strong>Controles Positivo, Negativo e Interno:</strong> Validación de reactivos, ausencia de contaminación y descarte de inhibidores de polimerasa en la muestra.</li>
          </ul>
        </div>
      )
    },
    {
      id: 12,
      num: 12,
      top: '53.6%',
      left: '52.2%',
      title: 'Resultado del Control de Calidad',
      tag: 'Valores Obtenidos',
      content: (
        <div className="space-y-3 font-sans">
          <p className="text-gray-700 leading-relaxed text-xs sm:text-[13px]">
            Muestra los valores numéricos y cualitativos obtenidos para cada parámetro en esta muestra y corrida analítica específica.
          </p>
          <p className="text-gray-700 leading-relaxed text-xs sm:text-[13px]">
            Estos resultados se comparan contra los valores de referencia institucional para determinar si son conformes. Si están dentro del rango, la corrida es <strong>completamente válida</strong>.
          </p>
        </div>
      )
    },
    {
      id: 13,
      num: 13,
      top: '53.6%',
      left: '80.2%',
      title: 'Valor de referencia',
      tag: 'Rangos de Aceptación',
      content: (
        <div className="space-y-3 font-sans">
          <p className="text-gray-700 leading-relaxed text-xs sm:text-[13px]">
            Define los rangos y umbrales normativos aceptables establecidos por el laboratorio para cada parámetro.
          </p>
          <p className="text-gray-700 leading-relaxed text-xs sm:text-[13px]">
            Valores fuera de especificación alertan sobre posibles inhibiciones o interferencias analíticas que invalidarían el resultado médico.
          </p>
        </div>
      )
    },
    {
      id: 14,
      num: 14,
      top: '77.4%',
      left: '9.0%',
      title: 'Relación 260/230 y 260/280 (Evaluación de Pureza)',
      tag: 'Criterio de Pureza Molecular',
      content: (
        <div className="space-y-3 font-sans">
          <p className="text-gray-700 leading-relaxed text-xs sm:text-[13px]">
            Explica el impacto de los ratios espectrofotométricos en la calidad del diagnóstico:
          </p>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-xl text-xs sm:text-[12.5px] text-amber-950 space-y-1.5 leading-relaxed font-medium">
            <p><strong>Relación 260/230:</strong> Un valor inferior a 1.8 se relaciona con presencia de contaminantes en la muestra (contaminación con fenol, EDTA, tiocianato de guanidina, Triton X-100 o carbohidratos).</p>
            <p><strong>Relación 260/280:</strong> Un valor por debajo de 1.7 se relaciona con presencia de contaminantes tipo proteínas.</p>
          </div>
          <p className="text-xs sm:text-[13px] text-gray-700 leading-relaxed">
            Ambos índices garantizan que el material genético analizado esté libre de inhibidores que puedan generar falsos negativos en la prueba de qPCR.
          </p>
        </div>
      )
    }
  ]
};

// Logotipo OSD institucional con onda idéntica para ambas páginas
function OsdReportHeader() {
  return (
    <div className="relative w-full overflow-hidden bg-white">
      <svg 
        viewBox="0 0 1000 250" 
        className="w-full h-auto block" 
        preserveAspectRatio="none"
      >
        {/* Curva institucional morada profunda #2B017C */}
        <path 
          d="M 0,0 L 1000,0 L 1000,45 C 780,20 560,110 380,180 C 220,240 80,255 0,250 Z" 
          fill="#2B017C" 
        />

        {/* Logotipo oficial OSD en cian brillante (#01FADA) centrado armónicamente dentro de la onda */}
        <g transform="translate(60, 22) scale(0.038)">
          <path fill="#01FADA" d="M1201.94,3114.24c0-63.89,52.82-115.76,117.97-115.76s117.97,51.87,117.97,115.76-52.82,115.76-117.97,115.76-117.97-51.87-117.97-115.76ZM1319.91,3190.16c40.8,0,73.7-33.84,73.7-75.91s-32.9-75.9-73.7-75.9-73.69,33.84-73.69,75.9,32.89,75.91,73.69,75.91Z"></path>
          <path fill="#01FADA" d="M1507.16,3072.81v152.14h-39.85v-221.4h39.85l116.39,152.14v-152.14h39.85v221.4h-39.85l-116.39-152.14Z"></path>
          <path fill="#01FADA" d="M1756.4,3156.62h44.28c0,18.35,19.29,34.8,49.34,34.8,21.19,0,45.54-8.54,45.54-27.2s-23.72-25.3-51.24-32.58c-37.64-9.8-82.86-26.88-82.86-68.63,0-49.02,51.55-64.52,86.03-64.52,48.7,0,87.29,31,87.29,69.26h-44.28c0-15.19-15.81-30.68-44.28-30.68-17.08,0-40.48,5.7-40.48,23.72s23.41,24.35,50.92,31.63c37.64,10.12,83.18,27.2,83.18,69.27,0,49.65-52.19,68.31-91.09,68.31-51.55,0-92.35-32.89-92.35-73.38Z"></path>
          <path fill="#01FADA" d="M1969.27,3003.55h44.28v221.4h-44.28v-221.4Z"></path>
          <path fill="#01FADA" d="M2104.95,3043.4h-70.85v-39.85h185.97v39.85h-70.85v181.55h-44.28v-181.55Z"></path>
          <path fill="#01FADA" d="M2241.28,3003.55h155.61v39.85h-111.33v50.93h102.47v39.85h-102.47v50.92h112.6v39.85h-156.88v-221.4Z"></path>
          <path fill="#01FADA" d="M2494.63,3003.55h76.86c71.48,0,117.98,49.66,117.98,110.7s-46.5,110.7-117.98,110.7h-76.86v-221.4ZM2645.18,3114.24c0-39.22-26.57-70.85-73.7-70.85h-32.58v141.69h32.58c47.13,0,73.7-31.63,73.7-70.85Z"></path>
          <path fill="#01FADA" d="M2718.89,3003.55h44.28v221.4h-44.28v-221.4Z"></path>
          <path fill="#01FADA" d="M2870.39,3003.55h39.85l87.92,221.4h-47.76l-16.76-44.28h-91.4l-16.77,44.28h-43.01l87.92-221.4ZM2919.41,3142.71l-31.63-84.13-31.32,84.13h62.94Z"></path>
          <path fill="#01FADA" d="M2997.55,3114.24c0-63.89,52.82-115.76,117.66-115.76,46.81,0,86.66,27.51,104.69,67.37h-49.34c-12.97-16.76-32.58-27.51-55.03-27.51-40.8,0-73.69,33.84-73.69,75.9s32.89,75.91,73.69,75.91c32.9,0,61.04-21.51,70.21-52.82h-72.74v-37.96h116.39c.63,4.74,1.26,9.81,1.26,14.55,0,64.2-51.87,116.07-115.76,116.07s-117.34-51.87-117.34-115.76Z"></path>
          <path fill="#01FADA" d="M3298.66,3072.81v152.14h-39.85v-221.4h39.85l116.39,152.14v-152.14h39.85v221.4h-39.85l-116.39-152.14Z"></path>
          <path fill="#01FADA" d="M3484.33,3114.24c0-63.89,52.82-115.76,117.97-115.76s117.97,51.87,117.97,115.76-52.82,115.76-117.97,115.76-117.97-51.87-117.97-115.76ZM3602.3,3190.16c40.8,0,73.7-33.84,73.7-75.91s-32.9-75.9-73.7-75.9-73.69,33.84-73.69,75.9,32.89,75.91,73.69,75.91Z"></path>
          <path fill="#01FADA" d="M3737.36,3156.62h44.28c0,18.35,19.29,34.8,49.34,34.8,21.19,0,45.54-8.54,45.54-27.2s-23.72-25.3-51.24-32.58c-37.64-9.8-82.86-26.88-82.86-68.63,0-49.02,51.55-64.52,86.03-64.52,48.7,0,87.29,31,87.29,69.26h-44.28c0-15.19-15.81-30.68-44.28-30.68-17.08,0-40.48,5.7-40.48,23.72s23.41,24.35,50.92,31.63c37.64,10.12,83.18,27.2,83.18,69.27,0,49.65-52.19,68.31-91.09,68.31-51.55,0-92.35-32.89-92.35-73.38Z"></path>
          <path fill="#01FADA" d="M4001.78,3043.4h-70.85v-39.85h185.97v39.85h-70.85v181.55h-44.28v-181.55Z"></path>
          <path fill="#01FADA" d="M4137.79,3003.55h44.28v221.4h-44.28v-221.4Z"></path>
          <path fill="#01FADA" d="M4211.49,3114.24c0-63.89,53.13-115.76,117.66-115.76,52.82,0,96.78,35.11,110.7,82.86h-44.28c-11.7-25.31-37-43.01-66.1-43.01-40.48,0-73.69,33.84-73.69,75.9s33.21,75.91,73.69,75.91c29.41,0,54.4-17.71,66.42-43.33h44.28c-14.23,48.08-58.51,83.18-111.01,83.18-64.52,0-117.66-51.87-117.66-115.76Z"></path>
          <path fill="#01FADA" d="M2915.02,2053.25c-84.59-68.13-201.71-99.09-307.65-136.77-104.5-37.18-217.03-52.75-319.96-93.19-129.55-50.8-226.32-104.69-297.1-170.94-112.28-105-159.07-241.08-167.23-445.3-14.82-21.22-30.58-41.82-47.22-61.79-182.11-219.67-461.5-360.15-776.31-360.15C443.48,785.11,0,1217.72,0,1751.94s443.48,966.9,999.56,966.9c435.19,0,802.68-268.4,939.14-643.43,83.02-20.28,175.4,16.01,254.58,111.97,43.71,53.06,76.55,115.11,114.29,173.13,114.98,176.65,328.75,244.85,523.17,166.92,217.66-87.35,267.21-327.05,84.27-474.19ZM999.56,2228.08c-243.47,0-443.48-214.39-443.48-476.13s200.01-476.07,443.48-476.07,443.54,214.39,443.54,476.07-200.01,476.13-443.54,476.13Z"></path>
          <path fill="#01FADA" d="M5201.14,0h-330.73v999.6c-138.09-134.47-316.23-214.47-519.74-214.47-286.15,0-559.46,153.91-733.31,391.45-32.55,39.71-65.17,79.26-101.59,114.94-127.71,125.16-234.82,123.18-357.18-6.75-67.98-72.18-125.73-154.16-194.2-225.92-142.87-149.79-365.09-175.83-537.79-67.98-159.84,99.78-183.41,308.4-37.08,427.63,67.23,54.87,156.05,88.9,240.34,115.68,105.63,33.62,219,42.68,325.04,75.31,227.08,70.03,411.47,189.34,509.03,404.96,115.52,406.61,488.68,704.39,886.72,704.39,236.22,0,439.74-105.38,581.53-279.89,0,122.46,99.27,221.72,221.72,221.72h268.93V221.72c0-122.46-99.27-221.72-221.72-221.72ZM4426.96,2228.09c-243.56,0-443.44-214.39-443.44-476.15s199.89-476.07,443.44-476.07,443.44,214.39,443.44,476.07-199.89,476.15-443.44,476.15Z"></path>
          <path fill="#01FADA" d="M1333.83,1710.06c0,44.96-36.42,81.39-81.39,81.39-31.78,0-59.28-18.21-72.66-44.77l-124.65,38.62c.5,3.52.75,7.16.75,10.86,0,45.03-36.42,81.45-81.39,81.45-22.61,0-43.14-9.23-57.9-24.18l-72.85,51.24c6.53,11.74,10.3,25.18,10.3,39.56,0,44.96-36.49,81.45-81.45,81.45s-81.45-36.49-81.45-81.45,36.49-81.45,81.45-81.45c20.85,0,39.88,7.91,54.26,20.85l74.23-52.18v-.06c-5.15-10.61-8.04-22.61-8.04-35.23,0-25.62,11.81-48.42,30.33-63.36l-60.6-107.76c-8.6,3.14-17.9,4.9-27.63,4.9-44.96,0-81.39-36.42-81.39-81.39s36.42-81.45,81.39-81.45,81.45,36.49,81.45,81.45c0,25.62-11.87,48.42-30.33,63.36l60.6,107.7c8.67-3.14,17.96-4.84,27.63-4.84,31.78,0,59.28,18.21,72.66,44.77l124.65-38.62c-.5-3.58-.82-7.16-.82-10.86,0-44.96,36.49-81.45,81.45-81.45s81.39,36.48,81.39,81.45Z"></path>
        </g>
      </svg>
    </div>
  );
}

export default function ComoLeerResultados() {
  const [activePage, setActivePage] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('page');
      if (p === '2') return 2;
    }
    return 1;
  });
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [viewMode, setViewMode] = useState('fit'); // 'fit' (ajustado a pantalla) | 'zoom' (modo libre / acercar)
  const [zoomLevel, setZoomLevel] = useState(1);
  const [containerWidth, setContainerWidth] = useState(850);
  const [reportHeight, setReportHeight] = useState(1350);

  const wrapperRef = useRef(null);
  const reportRef = useRef(null);

  // Dimensiones automáticas del contenedor para escalado responsivo fluido
  useEffect(() => {
    const updateDimensions = () => {
      if (wrapperRef.current) {
        const width = wrapperRef.current.clientWidth;
        setContainerWidth(width);
        if (width >= 850 && viewMode === 'zoom') {
          setViewMode('fit');
          setZoomLevel(1);
        }
      }
      if (reportRef.current) {
        setReportHeight(reportRef.current.offsetHeight);
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    const t1 = setTimeout(updateDimensions, 100);
    const t2 = setTimeout(updateDimensions, 350);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activePage, viewMode, zoomLevel]);

  // Escala matemática proporcional adaptativa
  const fitScale = Math.min(1, Math.max(0.32, (containerWidth - 8) / 850));
  const currentScale = viewMode === 'fit' ? fitScale : zoomLevel;

  // Acciones de Zoom interactivo ("Acercar" / "Alejar")
  const handleZoomIn = () => {
    if (viewMode === 'fit') {
      setViewMode('zoom');
      setZoomLevel(1);
    } else {
      setZoomLevel(prev => Math.min(2.0, Number((prev + 0.25).toFixed(2))));
    }
  };

  const handleZoomOut = () => {
    if (viewMode === 'zoom') {
      if (zoomLevel <= 1) {
        setViewMode('fit');
        setZoomLevel(1);
      } else {
        setZoomLevel(prev => Math.max(1.0, Number((prev - 0.25).toFixed(2))));
      }
    }
  };

  const handleToggleFit = () => {
    if (viewMode === 'fit') {
      setViewMode('zoom');
      setZoomLevel(1);
    } else {
      setViewMode('fit');
      setZoomLevel(1);
    }
  };

  // Al activar el modo zoom, iniciar siempre desde el extremo izquierdo (x = 0) para visibilidad total
  useEffect(() => {
    if (viewMode === 'zoom' && wrapperRef.current) {
      wrapperRef.current.scrollLeft = 0;
    }
  }, [viewMode]);

  // Cerrar popup al presionar tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedHotspot(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNextHotspot = () => {
    if (!selectedHotspot) return;
    const all = [...HOTSPOTS_DATA[1], ...HOTSPOTS_DATA[2]];
    const currentIndex = all.findIndex(h => h.id === selectedHotspot.id);
    const nextIndex = (currentIndex + 1) % all.length;
    const next = all[nextIndex];
    if (next.id > 8 && activePage === 1) setActivePage(2);
    if (next.id <= 8 && activePage === 2) setActivePage(1);
    setSelectedHotspot(next);
  };

  const handlePrevHotspot = () => {
    if (!selectedHotspot) return;
    const all = [...HOTSPOTS_DATA[1], ...HOTSPOTS_DATA[2]];
    const currentIndex = all.findIndex(h => h.id === selectedHotspot.id);
    const prevIndex = (currentIndex - 1 + all.length) % all.length;
    const prev = all[prevIndex];
    if (prev.id > 8 && activePage === 1) setActivePage(2);
    if (prev.id <= 8 && activePage === 2) setActivePage(1);
    setSelectedHotspot(prev);
  };

  // Botón interactivo integrado sin solapamiento sobre el texto
  const HotspotButton = ({ id, num, className = '' }) => {
    const h = HOTSPOTS_DATA[1].find(item => item.id === id || item.num === num) || 
              HOTSPOTS_DATA[2].find(item => item.id === id || item.num === num);
    if (!h) return null;
    const isSelected = selectedHotspot?.id === h.id;

    return (
      <button
        type="button"
        onClick={() => setSelectedHotspot(h)}
        className={`relative group cursor-pointer focus:outline-none flex-shrink-0 inline-flex items-center justify-center ${className}`}
        title={`Ver explicación: ${h.title}`}
      >
        <span className="absolute inset-0 rounded-full bg-[#6F2BCC] opacity-40 animate-ping pointer-events-none"></span>
        <span className={`relative w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold text-xs sm:text-[12px] text-white shadow-md border-2 border-white transition-all duration-200 group-hover:scale-110 font-sans ${
          isSelected ? 'bg-[#01FADA] text-[#2B017C] ring-2 ring-[#6F2BCC]' : 'bg-[#6F2BCC] hover:bg-[#2B017C]'
        }`}>
          {h.num}
        </span>
      </button>
    );
  };

  return (
    <div className="w-full flex flex-col items-center font-sans">

      {/* Selector de Páginas (Página 1: Resultados qPCR | Página 2: Control de Calidad) */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 w-full max-w-[850px] px-2">
        <button
          type="button"
          onClick={() => {
            setActivePage(1);
            if (selectedHotspot && selectedHotspot.id > 8) setSelectedHotspot(null);
          }}
          className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
            activePage === 1
              ? 'bg-[#2B017C] text-white shadow-lg shadow-[#2B017C]/25 scale-[1.02]'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          <span>Página 1:</span>
          <span className={activePage === 1 ? 'text-[#01FADA]' : ''}>Reporte de Resultados qPCR</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActivePage(2);
            if (selectedHotspot && selectedHotspot.id <= 8) setSelectedHotspot(null);
          }}
          className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
            activePage === 2
              ? 'bg-[#2B017C] text-white shadow-lg shadow-[#2B017C]/25 scale-[1.02]'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          <span>Página 2:</span>
          <span className={activePage === 2 ? 'text-[#01FADA]' : ''}>Control de Calidad</span>
        </button>
      </div>

      {/* Controles de Zoom ("Ampliar reporte") - VISIBLE ÚNICAMENTE EN CELULARES / PANTALLAS MÓVILES */}
      <div className="flex md:hidden items-center justify-center w-full max-w-[850px] mb-3 px-2">
        <div className="flex items-center gap-1.5 bg-purple-50/95 border border-[#6F2BCC]/30 rounded-xl p-1.5 shadow-sm">
          <span className="text-[11px] font-bold text-[#2B017C] pl-1.5 pr-0.5 flex items-center gap-1 select-none">
            🔍 Ampliar:
          </span>

          <button
            type="button"
            onClick={handleZoomOut}
            className="w-7 h-7 rounded-lg bg-white hover:bg-purple-100 text-[#2B017C] font-black text-sm flex items-center justify-center transition-colors shadow-sm cursor-pointer"
            title="Alejar reporte (−)"
            aria-label="Alejar reporte"
          >
            −
          </button>

          <button
            type="button"
            onClick={handleToggleFit}
            className="px-2.5 h-7 rounded-lg bg-white hover:bg-purple-100 text-[#2B017C] font-bold text-[11px] flex items-center gap-1 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            title="Alternar entre pantalla ajustada o zoom real"
          >
            {viewMode === 'fit' ? (
              <>
                <span>📱 Ajustado</span>
                <span className="text-[10px] text-gray-400">({Math.round(fitScale * 100)}%)</span>
              </>
            ) : (
              <>
                <span>🔍 {Math.round(zoomLevel * 100)}%</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleZoomIn}
            className="w-7 h-7 rounded-lg bg-white hover:bg-purple-100 text-[#2B017C] font-black text-sm flex items-center justify-center transition-colors shadow-sm cursor-pointer"
            title="Acercar reporte (+)"
            aria-label="Acercar reporte"
          >
            +
          </button>
        </div>
      </div>

      {/* Indicador de ayuda al usuario */}
      <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs font-semibold text-gray-500 mb-3 font-sans px-2 text-center">
        <span className="w-2 h-2 rounded-full bg-[#6F2BCC] animate-pulse flex-shrink-0"></span>
        <span>
          {viewMode === 'zoom'
            ? 'Puedes acercar (+) y deslizarte libremente para leer el reporte. Toca los números para ver su explicación.'
            : 'Haz clic o toca los números sobre el reporte para ver la explicación detallada de cada sección.'}
        </span>
      </div>

      {/* CONTENEDOR PRINCIPAL DE LA HOJA DE REPORTE CON ZOOM Y ESCALADO PROPORCIONAL */}
      <div 
        ref={wrapperRef}
        id="report-scroll-container"
        className={`relative w-full max-w-[850px] ${
          viewMode === 'zoom' 
            ? 'overflow-x-auto pb-6 scrollbar-thin' 
            : 'overflow-hidden flex justify-center'
        }`}
        style={{
          height: viewMode === 'fit' && fitScale < 1 && reportHeight 
            ? `${Math.ceil(reportHeight * fitScale) + 16}px` 
            : 'auto',
          WebkitOverflowScrolling: 'touch',
          transition: 'height 0.2s ease-out'
        }}
      >
        {/* Contenedor sizer: en modo zoom define el ancho y alto real scrollable para permitir desplazamiento completo de izquierda a derecha */}
        <div 
          style={{
            width: viewMode === 'zoom' ? `${Math.round(850 * zoomLevel)}px` : '850px',
            minWidth: viewMode === 'zoom' ? `${Math.round(850 * zoomLevel)}px` : '850px',
            height: viewMode === 'zoom' ? `${Math.round(reportHeight * zoomLevel)}px` : 'auto',
            margin: (viewMode === 'zoom' && (850 * zoomLevel < containerWidth)) ? '0 auto' : '0',
            ...(viewMode === 'fit' && fitScale < 1 ? {
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: `translateX(-50%) scale(${fitScale})`,
              transformOrigin: 'top center'
            } : {})
          }}
        >
          <div 
            ref={reportRef}
            style={{
              width: '850px',
              minWidth: '850px',
              transform: viewMode === 'zoom' && zoomLevel !== 1 ? `scale(${zoomLevel})` : 'none',
              transformOrigin: 'top left',
            }}
            className="bg-white shadow-2xl rounded-2xl border border-gray-200 overflow-hidden select-none font-sans relative transition-transform duration-150"
          >

          {/* Flecha flotante lateral para alternar entre páginas (estilo Genially) */}
          <button
            type="button"
            onClick={() => setActivePage(prev => prev === 1 ? 2 : 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-[#2B017C] text-white p-2.5 sm:p-3 rounded-l-xl transition-all duration-200 cursor-pointer shadow-xl group focus:outline-none backdrop-blur-sm"
            title={activePage === 1 ? "Ir a Página 2: Control de Calidad" : "Regresar a Página 1: Resultados qPCR"}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={activePage === 1 ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
            </svg>
          </button>

        {/* =================================================================== */}
        {/* PÁGINA 1: REPORTE DE RESULTADOS qPCR */}
        {/* =================================================================== */}
        {activePage === 1 && (
          <div className="relative w-full pb-0 text-gray-900 font-sans text-[11.5px] sm:text-[13px] bg-white">
            
            {/* Encabezado OSD oficial idéntico */}
            <OsdReportHeader />

            {/* Marca de agua de fondo CONFIDENCIAL / ON SITE DIAGNOSTIC */}
            <div className="absolute inset-0 top-36 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.14] z-0">
              <div className="text-center transform -rotate-12 select-none">
                <span className="text-6xl sm:text-8xl md:text-9xl font-black tracking-widest text-[#01FADA] block uppercase">
                  CONFIDENCIAL
                </span>
                <span className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#01FADA] block mt-2">
                  ON SITE DIAGNOSTIC
                </span>
              </div>
            </div>

            {/* Cuerpo del Reporte */}
            <div className="px-6 sm:px-12 md:px-14 pt-2 relative z-10">

              {/* Título del reporte y No. OSD */}
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-2 mb-4">
                <div className="w-1/4"></div>
                <h3 className="text-base sm:text-lg md:text-[20px] font-normal text-gray-800 tracking-normal text-center flex-1 font-sans">
                  Reporte de resultados qPCR
                </h3>
                <div className="w-1/4 text-right">
                  <span className="text-sm sm:text-base md:text-[17px] font-semibold text-[#6F2BCC] tracking-wide font-sans">
                    No.  OSD
                  </span>
                </div>
              </div>

              {/* Fechas */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-[13px] mb-5 font-sans">
                <div>
                  <strong className="block text-gray-950 font-bold">Fecha de toma:</strong>
                  <span className="text-gray-900 font-normal">03/05/2025</span>
                </div>
                <div>
                  <strong className="block text-gray-950 font-bold">Fecha de ingreso:</strong>
                  <span className="text-gray-900 font-normal">05/05/2025</span>
                </div>
                <div>
                  <strong className="block text-gray-950 font-bold">Fecha de reporte:</strong>
                  <span className="text-gray-900 font-normal">05/05/2025</span>
                </div>
              </div>

              {/* 1. SECCIÓN: Datos del Paciente (Hotspot 1 sin tapar texto) */}
              <div className="flex items-start gap-3 sm:gap-4 mb-4">
                <div className="pt-0.5">
                  <HotspotButton id={1} />
                </div>
                <div className="flex-1 grid grid-cols-3 gap-y-2.5 gap-x-4 text-xs sm:text-[13px] font-sans">
                  <div>
                    <strong className="block text-gray-950 font-bold">Nombre del paciente:</strong>
                    <span className="text-gray-400 block h-4"></span>
                  </div>
                  <div>
                    <strong className="block text-gray-950 font-bold">Especie:</strong>
                    <span className="text-gray-900 uppercase font-semibold">FELINO</span>
                  </div>
                  <div>
                    <strong className="block text-gray-950 font-bold">Edad:</strong>
                    <span className="text-gray-900 font-semibold">8 AÑOS</span>
                  </div>

                  <div>
                    <strong className="block text-gray-950 font-bold">Sexo:</strong>
                    <span className="text-gray-900 uppercase font-semibold">MACHO</span>
                  </div>
                  <div>
                    <strong className="block text-gray-950 font-bold">Raza:</strong>
                    <span className="text-gray-900 uppercase font-semibold">CRIOLLO</span>
                  </div>
                  <div>
                    <strong className="block text-gray-950 font-bold">Nombre del propietario:</strong>
                    <span className="text-gray-400 block h-4"></span>
                  </div>

                  <div>
                    <strong className="block text-gray-950 font-bold">Empresa:</strong>
                    <span className="text-gray-400 block h-4"></span>
                  </div>
                  <div>
                    <strong className="block text-gray-950 font-bold">Médico veterinario y TP:</strong>
                    <span className="text-gray-400 block h-4"></span>
                  </div>
                  <div>
                    <strong className="block text-gray-950 font-bold">Teléfono:</strong>
                    <span className="text-gray-400 block h-4"></span>
                  </div>
                </div>
              </div>

              {/* 2 & 3. SECCIÓN: Tipo de Muestra y Análisis y método de ensayo (Sin tapar texto) */}
              <div className="py-2 mb-4 space-y-3">
                {/* Tipo de muestra centrado (Hotspot 2) */}
                <div className="flex items-center justify-center gap-2.5 pb-1">
                  <HotspotButton id={2} />
                  <div className="text-left flex items-baseline gap-2">
                    <strong className="text-gray-950 font-bold text-xs sm:text-sm font-sans">
                      Tipo de muestra:
                    </strong>
                    <span className="italic text-gray-800 text-xs sm:text-[13px] font-sans">
                      Sangre EDTA
                    </span>
                  </div>
                </div>

                {/* Análisis y método de ensayo (Hotspot 3) */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="pt-0.5">
                    <HotspotButton id={3} />
                  </div>
                  <div className="flex-1">
                    <strong className="block text-gray-950 font-bold text-[11px] sm:text-[12px] mb-1 font-sans">
                      Análisis y método de ensayo
                    </strong>
                    <div className="text-[9.5px] sm:text-[10.5px] text-gray-700 leading-tight space-y-0.5 font-normal font-sans">
                      <p>1.Extracción de material genético automatizada (MAGCORE® PLUS II VERSIÓN LITE - MagCore Genomic DNA Whole Blood Kit).</p>
                      <p>2.Reacción en cadena de la polimerasa en tiempo real con sonda Taqman (CFX96™-Real Time System BIO - RAD).</p>
                      <p className="text-gray-600">On Site Diagnostic garantiza a través de las verificaciones y calibraciones periódicas de sus equipos en laboratorios acreditados la trazabilidad de sus mediciones.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4, 5, 6, 7, 8. TABLA ORGANIZADA: HEMOTRÓPICO FELINO BÁSICO (Con números integrados sin solapar) */}
              <div className="relative border-2 border-[#2B017C] rounded-none overflow-hidden shadow-none mt-2 mb-6">
                <table className="w-full border-collapse text-xs sm:text-[12.5px] font-sans">
                  <thead>
                    {/* Fila Morada: Perfil Solicitado (Hotspot 4) */}
                    <tr className="bg-[#2B017C] text-white" style={{ height: '38px' }}>
                      <th colSpan={4} className="text-center font-bold text-xs sm:text-sm tracking-wider uppercase font-sans border-b-2 border-[#2B017C] py-2 px-3">
                        <div className="flex items-center justify-center gap-2.5">
                          <HotspotButton id={4} />
                          <span>HEMOTRÓPICO FELINO BÁSICO</span>
                        </div>
                      </th>
                    </tr>
                    {/* Fila Cian (#01FADA): Cabeceras de Columnas (Hotspots 5, 6, 7, 8) */}
                    <tr className="bg-[#01FADA] text-[#2B017C] font-bold text-[11px] sm:text-[12px] text-center border-b-2 border-[#2B017C]" style={{ height: '38px' }}>
                      <th className="w-[25%] border-r-2 border-[#2B017C] font-sans font-bold py-1.5 px-1">
                        <div className="flex items-center justify-center gap-1.5">
                          <HotspotButton id={5} />
                          <span>Agente</span>
                        </div>
                      </th>
                      <th className="w-[45%] border-r-2 border-[#2B017C] font-sans font-bold py-1.5 px-1">
                        <div className="flex items-center justify-center gap-2">
                          <HotspotButton id={6} />
                          <span>Resultado</span>
                        </div>
                      </th>
                      <th className="w-[13%] border-r-2 border-[#2B017C] font-sans font-bold py-1.5 px-1">
                        <div className="flex items-center justify-center gap-1.5">
                          <HotspotButton id={7} />
                          <span>Ct</span>
                        </div>
                      </th>
                      <th className="w-[17%] font-sans font-bold py-1.5 px-1">
                        <div className="flex items-center justify-center gap-1.5">
                          <HotspotButton id={8} />
                          <span className="text-[10px] sm:text-[11.5px] leading-tight">Cq (copias/μL)</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-[#2B017C] bg-white text-center">
                    {[
                      { agente: 'Anaplasma spp.', res: 'No se detecta DNA especifico de Anaplasma spp', ct: '0', cq: '0' },
                      { agente: 'Ehrlichia spp.', res: 'No se detecta DNA especifico de Ehrlichia spp', ct: '0', cq: '0' },
                      { agente: 'Rickettsia spp.', res: 'No se detecta DNA especifico de Rickettsia spp', ct: '0', cq: '0' },
                      { agente: 'Mycoplasma spp.', res: 'No se detecta DNA especifico de Mycoplasma spp', ct: '0', cq: '0' },
                      { agente: 'Bartonella spp.', res: 'No se detecta DNA especifico de Bartonella spp', ct: '0', cq: '0' },
                      { agente: 'Hepatozoon spp.', res: 'No se detecta DNA especifico de Hepatozoon spp.', ct: '0', cq: '0' },
                      { agente: 'Toxoplasma gondii.', res: 'No se detecta DNA especifico de T. gondii', ct: '0', cq: '0' },
                    ].map((row) => (
                      <tr key={row.agente} className="bg-white">
                        <td className="italic font-bold text-gray-950 border-r-2 border-[#2B017C] font-sans py-2 px-2" style={{ verticalAlign: 'middle' }}>
                          {row.agente}
                        </td>
                        <td className="italic font-bold text-gray-950 border-r-2 border-[#2B017C] font-sans py-2 px-2 text-[10.5px] sm:text-[12px]" style={{ verticalAlign: 'middle' }}>
                          {row.res}
                        </td>
                        <td className="font-bold text-gray-900 border-r-2 border-[#2B017C] font-sans py-2 px-1" style={{ verticalAlign: 'middle' }}>
                          {row.ct}
                        </td>
                        <td className="font-bold text-gray-900 font-sans py-2 px-1" style={{ verticalAlign: 'middle' }}>
                          {row.cq}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

            {/* Barra de pie de página institucional del reporte */}
            <div className="w-full bg-[#2B017C] text-white py-2.5 px-6 text-center text-[10px] sm:text-[11px] font-medium tracking-wide font-sans">
              On Site Diagnostic S.A.S. - Cra. 79 # 35 - 45 - +57 (604) 4434256
            </div>

          </div>
        )}

        {/* =================================================================== */}
        {/* PÁGINA 2: CONTROL DE CALIDAD Y VALIDEZ TÉCNICA (ORGANIZADA Y AUTÉNTICA) */}
        {/* =================================================================== */}
        {activePage === 2 && (
          <div className="relative w-full pb-0 text-gray-900 font-sans text-[11.5px] sm:text-[13px] bg-white">
            
            {/* Encabezado OSD oficial con onda y logo idéntico a la página 1 */}
            <OsdReportHeader />

            {/* Marca de agua de fondo CONFIDENCIAL / ON SITE DIAGNOSTIC */}
            <div className="absolute inset-0 top-36 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.14] z-0">
              <div className="text-center transform -rotate-12 select-none">
                <span className="text-6xl sm:text-8xl md:text-9xl font-black tracking-widest text-[#01FADA] block uppercase">
                  CONFIDENCIAL
                </span>
                <span className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#01FADA] block mt-2">
                  ON SITE DIAGNOSTIC
                </span>
              </div>
            </div>

            {/* Contenido Página 2 */}
            <div className="px-6 sm:px-12 md:px-14 pt-2 relative z-10">
              
              {/* Título de la página 2 */}
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-2 mb-4">
                <div className="w-1/4 text-left">
                  <span className="text-[11px] sm:text-xs font-bold text-[#6F2BCC] tracking-wider uppercase font-sans">
                    HOJA 2 DE 2
                  </span>
                </div>
                <h3 className="text-base sm:text-lg md:text-[20px] font-normal text-gray-800 tracking-normal text-center flex-1 font-sans">
                  Reporte de resultados qPCR
                </h3>
                <div className="w-1/4 text-right">
                  <span className="text-sm sm:text-base md:text-[17px] font-semibold text-[#6F2BCC] tracking-wide font-sans">
                    No.  OSD-M-
                  </span>
                </div>
              </div>

              {/* 9. SECCIÓN OBSERVACIONES (Arriba de la tabla, con Hotspot 9 sin tapar texto) */}
              <div className="flex items-start gap-3 sm:gap-4 mb-5 text-left font-sans">
                <div className="pt-0.5">
                  <HotspotButton id={9} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-xs sm:text-sm text-gray-950 font-sans mb-1.5 uppercase tracking-wide">
                    Observaciones
                  </h4>
                  <div className="text-[9.6px] sm:text-[10.5px] text-gray-800 font-medium font-sans leading-relaxed space-y-1">
                    <p>1.La qPCR detecta la presencia o no de material genético de las muestras remitidas de un paciente al laboratorio, la presencia de esté puede estar relacionada o no con la sintomatología presente en el paciente.</p>
                    <p>2.El resultado es válido para la(s) muestras (s) remitida(s) y analizada(s), la identificación de la muestra(s) va acorde a la información suministrada en el formulario de recolección.</p>
                    <p>3.On Site Diagnostic NO hace interpretación de resultados. La interpretación de los resultados debe ser realizada por el personal Médico Veterinario y deberá ser correlacionada con la clínica del paciente.</p>
                    <p>4.On Site Diagnostic NO se hace responsable por falsificación, manipulación o enmendadura realizada a este examen. Si tiene alguna duda sobre la veracidad del resultado puede comunicarse al email osdlaboratorio1@gmail.com número telefónico 3005143626.</p>
                  </div>
                </div>
              </div>

              {/* 10, 11, 12, 13. TABLA: DATOS DE CONFORMIDAD Y ASEGURAMIENTO Y VALIDEZ DEL RESULTADO (Con números integrados sin tapar texto) */}
              <div className="relative border-2 border-[#2B017C] rounded-none overflow-hidden shadow-none mb-3">
                <table className="w-full border-collapse text-xs sm:text-[12px] font-sans">
                  <thead>
                    {/* Cabecera Morada (Hotspot 10) */}
                    <tr className="bg-[#2B017C] text-white" style={{ height: '38px' }}>
                      <th colSpan={3} className="text-center font-bold text-xs sm:text-[13px] tracking-wide uppercase font-sans border-b-2 border-[#2B017C] py-2 px-3">
                        <div className="flex items-center justify-center gap-2.5">
                          <HotspotButton id={10} />
                          <span>DATOS DE CONFORMIDAD Y ASEGURAMIENTO Y VALIDEZ DEL RESULTADO</span>
                        </div>
                      </th>
                    </tr>
                    {/* Cabecera Cian (#01FADA) (Hotspots 11, 12, 13) */}
                    <tr className="bg-[#01FADA] text-[#2B017C] font-bold text-[11px] sm:text-[12px] text-center border-b-2 border-[#2B017C]" style={{ height: '38px' }}>
                      <th className="w-[35%] border-r-2 border-[#2B017C] font-sans font-bold py-1.5 px-2">
                        <div className="flex items-center justify-center gap-2">
                          <HotspotButton id={11} />
                          <span>Descripción</span>
                        </div>
                      </th>
                      <th className="w-[35%] border-r-2 border-[#2B017C] font-sans font-bold py-1.5 px-2">
                        <div className="flex items-center justify-center gap-2">
                          <HotspotButton id={12} />
                          <span>Resultado</span>
                        </div>
                      </th>
                      <th className="w-[30%] font-sans font-bold py-1.5 px-2">
                        <div className="flex items-center justify-center gap-2">
                          <HotspotButton id={13} />
                          <span>Valor de referencia</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-[#2B017C] bg-white text-center">
                    <tr className="bg-white">
                      <td className="italic font-bold text-gray-950 border-r-2 border-[#2B017C] font-sans py-2 px-2 text-left sm:text-center">Concentración de material genético</td>
                      <td className="font-normal text-gray-900 border-r-2 border-[#2B017C] font-sans py-2 px-2">28.8 ng/µL</td>
                      <td className="font-normal text-gray-900 font-sans py-2 px-2">10 ng/µL</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="italic font-bold text-gray-950 border-r-2 border-[#2B017C] font-sans py-2 px-2 text-left sm:text-center">Valor relación 260/280</td>
                      <td className="font-normal text-gray-900 border-r-2 border-[#2B017C] font-sans py-2 px-2">1.74</td>
                      <td className="font-normal text-gray-900 font-sans py-2 px-2">1,7 - 2,1</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="italic font-bold text-gray-950 border-r-2 border-[#2B017C] font-sans py-2 px-2 text-left sm:text-center">Valor relación 260/230</td>
                      <td className="font-normal text-gray-900 border-r-2 border-[#2B017C] font-sans py-2 px-2">1.8</td>
                      <td className="font-normal text-gray-900 font-sans py-2 px-2">1,8 - 2,2</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="italic font-bold text-gray-950 border-r-2 border-[#2B017C] font-sans py-2 px-2 text-left sm:text-center">Control positivo</td>
                      <td className="font-normal text-gray-900 border-r-2 border-[#2B017C] font-sans py-2 px-2">13 / 1.8 X 10(8) Ct/Cq</td>
                      <td className="font-normal text-gray-900 font-sans py-2 px-2">30/ 100 (Ct/Cq)</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="italic font-bold text-gray-950 border-r-2 border-[#2B017C] font-sans py-2 px-2 text-left sm:text-center">Control negativo</td>
                      <td className="font-normal text-gray-900 border-r-2 border-[#2B017C] font-sans py-2 px-2">0/0 Ct/Cq</td>
                      <td className="font-normal text-gray-900 font-sans py-2 px-2">0 (Ct/Cq)</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="italic font-bold text-gray-950 border-r-2 border-[#2B017C] font-sans py-2 px-2 text-left sm:text-center">Control Interno</td>
                      <td className="font-normal text-gray-900 border-r-2 border-[#2B017C] font-sans py-2 px-2">22.48 / 1.8 X 10(6) Ct/Cq</td>
                      <td className="font-normal text-gray-900 bg-[#CBF7F4] font-sans py-2 px-2">30/ 1000 (Ct/Cq)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 14. NOTAS AL PIE DE LA TABLA (Pureza espectrofotométrica con Hotspot 14 sin tapar texto) */}
              <div className="flex items-start gap-3 sm:gap-4 mb-4 text-[9px] sm:text-[10px] text-gray-800 leading-snug font-sans">
                <div className="pt-0.5">
                  <HotspotButton id={14} />
                </div>
                <div className="flex-1">
                  <p>
                    <strong className="text-gray-950 font-bold">Relación 260/230:</strong> Valor por debajo de 1.8 se relaciona con presencia de contaminantes en la muestra (contaminación con fenol, EDTA, tiocianato de guanidina, Triton X-100 o carbohidratos). <strong className="text-gray-950 font-bold">Relación 260/280:</strong> Valor por debajo de 1.7 se relaciona con presencia de contaminantes tipo proteínas.
                  </p>
                </div>
              </div>

              {/* BLOQUE DE FIRMAS Y RESPONSABLES TÉCNICOS (Firmas tapadas como se solicitó) */}
              <div className="relative pt-1 pb-4 px-2 mb-2">
                {/* Watermark molecular al fondo derecho */}
                <svg className="absolute pointer-events-none opacity-20 z-0 right-0 bottom-0 w-60 sm:w-72 h-36 sm:h-44" viewBox="0 0 300 200">
                  <line x1="80" y1="30" x2="140" y2="70" stroke="#01FADA" strokeWidth="6" />
                  <line x1="140" y1="70" x2="140" y2="140" stroke="#01FADA" strokeWidth="6" />
                  <line x1="140" y1="140" x2="200" y2="170" stroke="#01FADA" strokeWidth="6" />
                  <line x1="140" y1="70" x2="210" y2="40" stroke="#01FADA" strokeWidth="6" />
                  <line x1="210" y1="40" x2="260" y2="80" stroke="#01FADA" strokeWidth="6" />
                  <circle cx="80" cy="30" r="14" fill="#01FADA" />
                  <circle cx="140" cy="70" r="16" fill="#01FADA" />
                  <circle cx="140" cy="140" r="14" fill="#01FADA" />
                  <circle cx="200" cy="170" r="18" fill="#01FADA" />
                  <circle cx="210" cy="40" r="14" fill="#01FADA" />
                  <circle cx="260" cy="80" r="20" fill="#01FADA" />
                </svg>

                {/* Cabeceras de firma */}
                <div className="relative z-10 flex mb-1.5">
                  <div className="w-[38%] pl-2">
                    <span className="text-[12px] sm:text-[13px] font-bold text-gray-950 font-sans">Analizado por:</span>
                  </div>
                  <div className="w-[62%]">
                    <span className="text-[12px] sm:text-[13px] font-bold text-gray-950 font-sans">Validado por:</span>
                  </div>
                </div>

                {/* 3 Columnas de firmantes con firmas tapadas (espacio generoso) */}
                <div className="grid grid-cols-12 items-end relative z-10 gap-2">
                  {/* Ángela Sánchez */}
                  <div className="col-span-4 text-center">
                    <div className="h-8 sm:h-10 flex items-center justify-center mb-1"></div>
                    <p className="font-bold text-[11px] sm:text-[12px] text-gray-950 leading-tight font-sans">ÁNGELA SÁNCHEZ</p>
                    <p className="text-[9.5px] sm:text-[10px] text-gray-700 font-medium leading-tight font-sans mt-0.5">Analista de Laboratorio</p>
                  </div>

                  {/* Alida Carolina Valencia */}
                  <div className="col-span-4 text-center">
                    <div className="h-8 sm:h-10 flex items-center justify-center mb-1"></div>
                    <p className="font-bold text-[11px] sm:text-[12px] text-gray-950 leading-tight font-sans">ALIDA CAROLINA VALENCIA</p>
                    <p className="text-[9.5px] sm:text-[10px] text-gray-700 font-medium leading-tight font-sans mt-0.5">Analista de Laboratorio Senior</p>
                  </div>

                  {/* César Orlando Muñoz */}
                  <div className="col-span-4 text-center">
                    <div className="h-8 sm:h-10 flex items-center justify-center mb-1"></div>
                    <p className="font-bold text-[11px] sm:text-[12px] text-gray-950 leading-tight font-sans">CESAR ORLANDO MUÑOZ</p>
                    <p className="text-[9.5px] sm:text-[10px] text-gray-700 font-medium leading-tight font-sans mt-0.5">Dir. Técnica y Científica</p>
                    <p className="text-[9.5px] sm:text-[10px] text-gray-700 font-medium leading-tight font-sans mt-0.5">Tel: 300 5143626</p>
                  </div>
                </div>

                {/* Puntos decorativos en la esquina inferior izquierda */}
                <svg width="35" height="35" viewBox="0 0 50 50" className="absolute pointer-events-none -bottom-2 -left-2 opacity-70">
                  <circle cx="5" cy="5" r="2.5" fill="#01FADA" />
                  <circle cx="5" cy="15" r="2.5" fill="#01FADA" />
                  <circle cx="15" cy="15" r="2.5" fill="#01FADA" />
                  <circle cx="5" cy="25" r="2.5" fill="#01FADA" />
                  <circle cx="15" cy="25" r="2.5" fill="#01FADA" />
                  <circle cx="25" cy="25" r="2.5" fill="#01FADA" />
                  <circle cx="5" cy="35" r="2.5" fill="#01FADA" />
                  <circle cx="15" cy="35" r="2.5" fill="#6F2BCC" />
                  <circle cx="25" cy="35" r="2.5" fill="#01FADA" />
                  <circle cx="35" cy="35" r="2.5" fill="#01FADA" />
                  <circle cx="5" cy="45" r="2.5" fill="#6F2BCC" />
                  <circle cx="15" cy="45" r="2.5" fill="#6F2BCC" />
                  <circle cx="25" cy="45" r="2.5" fill="#6F2BCC" />
                  <circle cx="35" cy="45" r="2.5" fill="#6F2BCC" />
                </svg>
              </div>

            </div>

            {/* Barra de pie de página institucional del reporte */}
            <div className="w-full bg-[#2B017C] text-white py-2.5 px-6 text-center text-[10px] sm:text-[11px] font-medium tracking-wide font-sans">
              On Site Diagnostic S.A.S. - Cra. 79 # 35 - 45 - +57 (604) 4434256
            </div>

          </div>
        )}

          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* MODAL / POPUP DE EXPLICACIÓN (Viewport fijo para no verse afectado por zoom ni recortes) */}
      {/* =================================================================== */}
      {selectedHotspot && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-4 sm:p-6 animate-fadeIn font-sans"
          onClick={() => setSelectedHotspot(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-lg w-full p-6 sm:p-7 relative overflow-hidden transition-all duration-300 animate-scaleUp font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Barra superior de acento OSD */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2B017C] via-[#6F2BCC] to-[#01FADA]"></div>

            {/* Botón cerrar X */}
            <button
              type="button"
              onClick={() => setSelectedHotspot(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer text-sm font-bold font-sans"
              title="Cerrar ventana"
            >
              ✕
            </button>

            {/* Encabezado del Popover */}
            <div className="flex items-center gap-3 mb-3.5 pt-1 font-sans">
              <span className="w-8 h-8 rounded-full bg-[#6F2BCC] text-[#01FADA] font-extrabold flex items-center justify-center text-sm shadow-md flex-shrink-0 font-sans">
                {selectedHotspot.num}
              </span>
              <div>
                <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#6F2BCC] block font-sans">
                  {selectedHotspot.tag}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-[#2B017C] leading-snug font-sans">
                  {selectedHotspot.title}
                </h4>
              </div>
            </div>

            {/* Contenido Explicativo */}
            <div className="text-xs sm:text-[13px] text-gray-700 leading-relaxed max-h-[60vh] overflow-y-auto pr-1 font-sans">
              {selectedHotspot.content}
            </div>

            {/* Navegación Anterior / Siguiente dentro del popup */}
            <div className="mt-6 pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-700 font-sans">
              <button
                type="button"
                onClick={handlePrevHotspot}
                className="hover:text-[#6F2BCC] flex items-center gap-1.5 cursor-pointer transition-colors font-sans"
              >
                ← Anterior
              </button>

              <span className="text-[11.5px] text-gray-400 font-semibold font-sans">
                Punto {selectedHotspot.num} de 14
              </span>

              <button
                type="button"
                onClick={handleNextHotspot}
                className="hover:text-[#2B017C] flex items-center gap-1.5 cursor-pointer transition-colors text-[#6F2BCC] font-sans"
              >
                Siguiente →
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
