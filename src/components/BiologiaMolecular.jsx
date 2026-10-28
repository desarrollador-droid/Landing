import React, { useState, useMemo, useEffect } from 'react';
import biologiaData from '../assets/biologia_molecular_data.json';
import ComoLeerResultados from './ComoLeerResultados';

const normalizeText = (text) => {
  return (text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
};

export default function BiologiaMolecular() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const FORMULARIO_RECOLECCION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeDPoSkLRQm7UiFy2f_U_2f8YE4bU85Ap5QixzMqUvQc-A4pA/viewform';

  // Responsive items count per view
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsPerPage = windowWidth >= 1024 ? 4 : windowWidth >= 640 ? 2 : 1;

  // Flatten and unify all items with category metadata.
  // Note: Only Individuales and IFA get a badge/cartelito so standard profiles have clean, uncrowded cards.
  const allUnifiedItems = useMemo(() => {
    const list = [];
    biologiaData.sections.forEach(sec => {
      sec.items.forEach(item => {
        let badge = null;
        let badgeStyle = '';
        if (sec.id === 'individuales') {
          badge = 'Individual';
          badgeStyle = 'bg-[#6F2BCC]/10 text-[#6F2BCC] border-[#6F2BCC]/30';
        } else if (sec.id === 'ifa') {
          badge = 'IFA';
          badgeStyle = 'bg-[#01FADA]/25 text-[#2B017C] border-[#01FADA]';
        }
        list.push({
          ...item,
          categoryId: sec.id,
          categoryName: sec.title,
          badge,
          badgeStyle
        });
      });
    });
    return list;
  }, []);

  // Filtered list based on category and search input, sorted so the searched profile appears FIRST
  const filteredList = useMemo(() => {
    const rawTerm = searchTerm.trim();
    if (!rawTerm) {
      return allUnifiedItems.filter(item => {
        return selectedCategory === 'all' || item.categoryId === selectedCategory;
      });
    }

    const normTerm = normalizeText(rawTerm);
    const terms = normTerm.split(/\s+/).filter(Boolean);

    // Search across catalog: matching title or description
    const matches = allUnifiedItems.filter(item => {
      const title = normalizeText(item.frente);
      const desc = normalizeText(item.dorso);
      const fullMatch = title.includes(normTerm) || desc.includes(normTerm);
      const wordsMatch = terms.every(t => title.includes(t) || desc.includes(t));
      const catMatch = selectedCategory === 'all' || item.categoryId === selectedCategory;
      return catMatch && (fullMatch || wordsMatch);
    });

    // If current category filter has 0 matches, search across ALL categories so the user never misses their test!
    const effectiveMatches = matches.length > 0 ? matches : allUnifiedItems.filter(item => {
      const title = normalizeText(item.frente);
      const desc = normalizeText(item.dorso);
      return title.includes(normTerm) || desc.includes(normTerm) || terms.every(t => title.includes(t) || desc.includes(t));
    });

    // Relevancy sort: "ese perfil en especifico" comes FIRST (index 0) in the carousel
    return [...effectiveMatches].sort((a, b) => {
      const aTitle = normalizeText(a.frente);
      const bTitle = normalizeText(b.frente);
      const aDesc = normalizeText(a.dorso);
      const bDesc = normalizeText(b.dorso);

      // 1. Exact match in title (e.g. "qpcr cardiaco" matches "qPCR Cardíaco")
      if (aTitle === normTerm && bTitle !== normTerm) return -1;
      if (bTitle === normTerm && aTitle !== normTerm) return 1;

      // 2. Title starts with search term
      if (aTitle.startsWith(normTerm) && !bTitle.startsWith(normTerm)) return -1;
      if (bTitle.startsWith(normTerm) && !aTitle.startsWith(normTerm)) return 1;

      // 3. Full term in title
      const aFullInTitle = aTitle.includes(normTerm);
      const bFullInTitle = bTitle.includes(normTerm);
      if (aFullInTitle && !bFullInTitle) return -1;
      if (bFullInTitle && !aFullInTitle) return 1;

      // 4. All search words in title
      const aWordsInTitle = terms.every(t => aTitle.includes(t));
      const bWordsInTitle = terms.every(t => bTitle.includes(t));
      if (aWordsInTitle && !bWordsInTitle) return -1;
      if (bWordsInTitle && !aWordsInTitle) return 1;

      // 5. Shorter title (more specific match)
      if (aWordsInTitle && bWordsInTitle) {
        const diff = aTitle.length - bTitle.length;
        if (diff !== 0) return diff;
      }

      // 6. Description contains search term
      const aInDesc = aDesc.includes(normTerm);
      const bInDesc = bDesc.includes(normTerm);
      if (aInDesc && !bInDesc) return -1;
      if (bInDesc && !aInDesc) return 1;

      return 0;
    });
  }, [allUnifiedItems, selectedCategory, searchTerm]);

  // Reset page index to 0 whenever search or category changes so results start at the very first card
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory, searchTerm]);

  // Carousel navigation logic
  const totalPages = Math.ceil(filteredList.length / itemsPerPage) || 1;
  const currentPage = Math.floor(currentIndex / itemsPerPage) + 1;

  const handleNext = () => {
    if (filteredList.length <= itemsPerPage) return;
    setCurrentIndex(prev => {
      const next = prev + itemsPerPage;
      return next >= filteredList.length ? 0 : next;
    });
  };

  const handlePrev = () => {
    if (filteredList.length <= itemsPerPage) return;
    setCurrentIndex(prev => {
      const prevIdx = prev - itemsPerPage;
      if (prevIdx < 0) {
        return Math.max(0, Math.floor((filteredList.length - 1) / itemsPerPage) * itemsPerPage);
      }
      return prevIdx;
    });
  };

  // Sliced items for current carousel view
  const visibleItems = useMemo(() => {
    return filteredList.slice(currentIndex, currentIndex + itemsPerPage);
  }, [filteredList, currentIndex, itemsPerPage]);

  const scrollToPerfiles = () => {
    const el = document.getElementById('perfiles-carousel-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white font-sans antialiased text-gray-800 relative">
      
      {/* 1. Buscador (FIRST at the very top, before the "Detectamos más de 500 especies" panel) */}
      <section className="w-full bg-white pt-12 pb-8 px-6 relative overflow-hidden">
        {/* Subtle Molecular Network Background Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none bg-repeat bg-center"
          style={{ 
            backgroundImage: `url('https://res.cloudinary.com/oiaig120/image/upload/osdiagnostic/microorganismos.svg')`,
            backgroundSize: '800px'
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10 space-y-4 text-left">
          <h1 className="text-3xl sm:text-4xl md:text-[40px] font-bold text-[#2B017C] tracking-tight">
            Buscar prueba biología molecular
          </h1>
          
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Escriba el nombre del perfil qPCR"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  scrollToPerfiles();
                }
              }}
              className="w-full px-6 py-4 rounded-[18px] md:rounded-[22px] border-2 border-[#6F2BCC] text-gray-800 text-base md:text-lg font-medium placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-4 focus:ring-[#6F2BCC]/15 shadow-sm transition-all bg-white"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1.5 transition-colors cursor-pointer"
                title="Borrar búsqueda"
              >
                <i className="fas fa-times text-base"></i>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. Unified Carousel: Perfiles qPCR */}
      <section id="perfiles-carousel-section" className="w-full py-8 md:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
        {/* Subtle background decoration */}
        <div 
          className="absolute inset-0 opacity-[0.025] pointer-events-none bg-repeat bg-center"
          style={{ 
            backgroundImage: `url('https://res.cloudinary.com/oiaig120/image/upload/osdiagnostic/microorganismos.svg')`,
            backgroundSize: '800px'
          }}
        />

        <div className="max-w-[1440px] mx-auto relative z-10">
          
          {/* Section Header: Title "Perfiles qPCR" and Cartelitos / Filter Pills on the side */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold text-[#2B017C] tracking-tight">
                Perfiles qPCR
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                {filteredList.length} pruebas disponibles • Mostrando {currentIndex + 1} a {Math.min(currentIndex + itemsPerPage, filteredList.length)}
              </p>
            </div>

            {/* Cartelitos a un lado para que el filtro siga funcionando */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#2B017C] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todos ({allUnifiedItems.length})
              </button>
              
              <button
                type="button"
                onClick={() => setSelectedCategory('perfiles-qpcr')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === 'perfiles-qpcr'
                    ? 'bg-[#2B017C] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Perfiles qPCR ({allUnifiedItems.filter(i => i.categoryId === 'perfiles-qpcr').length})
              </button>
              
              <button
                type="button"
                onClick={() => setSelectedCategory('individuales')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === 'individuales'
                    ? 'bg-[#6F2BCC] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Individuales ({allUnifiedItems.filter(i => i.categoryId === 'individuales').length})
              </button>
              
              <button
                type="button"
                onClick={() => setSelectedCategory('ifa')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === 'ifa'
                    ? 'bg-[#01FADA] text-[#2B017C] shadow-md font-extrabold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                IFA ({allUnifiedItems.filter(i => i.categoryId === 'ifa').length})
              </button>
            </div>
          </div>

          {/* Carousel Layout: Left Arrow + 4 Wider Cards Grid + Right Arrow */}
          {filteredList.length === 0 ? (
            <div className="py-16 text-center text-gray-500 bg-gray-50 rounded-3xl border border-gray-100">
              <i className="fas fa-search text-3xl text-gray-300 mb-2 block"></i>
              <p className="text-base font-semibold">No se encontraron pruebas para "{searchTerm}".</p>
              <button 
                type="button"
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                className="mt-3 text-[#6F2BCC] font-bold text-xs hover:underline cursor-pointer"
              >
                Limpiar búsqueda y ver todas las pruebas
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-3 md:gap-4">
              
              {/* Left Arrow Button with Circle Outline matching reference */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Ver pruebas anteriores"
                disabled={filteredList.length <= itemsPerPage}
                className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 border-[#2B017C] flex items-center justify-center text-[#2B017C] hover:bg-[#2B017C] hover:text-white active:scale-95 transition-all shrink-0 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed shadow-sm"
                title="Anterior"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>

              {/* Grid of 4 Cards (Wider proportion, generous breathing room) */}
              <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 transition-all duration-500">
                {visibleItems.map((item, idx) => (
                  <div 
                    key={`${item.frente}-${idx}`}
                    className="bg-white rounded-[20px] sm:rounded-[24px] border-[1.5px] border-[#6F2BCC] p-4 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#2B017C] transition-all duration-300 min-h-[300px] sm:min-h-[350px] group"
                  >
                    {/* Card Top: Cartelito (only for Individuales / IFA) and Title */}
                    <div className="space-y-2.5">
                      {item.badge && (
                        <div className="text-left">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider inline-block ${item.badgeStyle}`}>
                            {item.badge}
                          </span>
                        </div>
                      )}
                      
                      <h3 className="text-lg sm:text-xl lg:text-[21px] font-bold text-[#222222] leading-snug text-left group-hover:text-[#2B017C] transition-colors">
                        {item.frente}
                      </h3>
                      
                      <p className="italic text-xs sm:text-[12.5px] leading-relaxed text-[#4A4A4A] font-normal text-left pt-1">
                        {item.dorso}
                      </p>
                    </div>

                    {/* Card Bottom: Solicitar Button (Opens Formulario de Recolección) */}
                    <div className="pt-6 text-left">
                      <a
                        href={FORMULARIO_RECOLECCION_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block bg-[#6F2BCC] hover:bg-[#2B017C] text-white font-semibold text-xs sm:text-sm py-2 px-6 rounded-lg transition-colors shadow-sm"
                      >
                        Solicitar
                      </a>
                    </div>
                  </div>
                ))}

                {/* If on the last page and fewer than itemsPerPage, show empty placeholder cards to maintain 4-card balance only when not searching */}
                {!searchTerm.trim() && visibleItems.length < itemsPerPage && Array.from({ length: itemsPerPage - visibleItems.length }).map((_, i) => (
                  <div 
                    key={`empty-${i}`}
                    className="bg-gray-50/50 rounded-[24px] border border-dashed border-gray-200 p-6 hidden lg:flex flex-col items-center justify-center text-center text-gray-300"
                  >
                    <i className="fas fa-dna text-3xl mb-2 opacity-40"></i>
                    <span className="text-xs font-semibold text-gray-400">On Site Diagnostic</span>
                  </div>
                ))}
              </div>

              {/* Right Arrow Button with Circle Outline matching reference */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Ver siguientes pruebas"
                disabled={filteredList.length <= itemsPerPage}
                className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 border-[#2B017C] flex items-center justify-center text-[#2B017C] hover:bg-[#2B017C] hover:text-white active:scale-95 transition-all shrink-0 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed shadow-sm"
                title="Siguiente"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          )}

          {/* Carousel Pagination Dots / Indicators */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 pt-8">
              {Array.from({ length: Math.min(totalPages, 12) }).map((_, pageIdx) => {
                const isActive = currentPage === pageIdx + 1;
                return (
                  <button
                    key={pageIdx}
                    type="button"
                    onClick={() => setCurrentIndex(pageIdx * itemsPerPage)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      isActive ? 'w-8 bg-[#6F2BCC]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    title={`Página ${pageIdx + 1}`}
                  />
                );
              })}
              {totalPages > 12 && (
                <span className="text-xs text-gray-400 font-bold ml-1">
                  ... {totalPages} páginas
                </span>
              )}
            </div>
          )}

        </div>
      </section>

      {/* 3. Panel: Detectamos más de 500 especies (Placed DEBAJO del carrusel de los perfiles) */}
      <section 
        className="relative w-full min-h-[380px] md:min-h-[440px] flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{ 
          backgroundImage: `url('${biologiaData.hero.bgImage}')` 
        }}
      >
        {/* Purple Overlay */}
        <div className="absolute inset-0 bg-[#6F2BCC] opacity-[0.72]"></div>
        
        {/* Decorative Grid Overlay for Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-14 text-center flex flex-col items-center justify-center space-y-4">
          <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-[28px] font-medium tracking-wide uppercase">
            {biologiaData.hero.tagline1}
          </p>
          
          <h2 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold tracking-tight drop-shadow-md leading-none">
            {biologiaData.hero.highlight}
          </h2>
          
          <h3 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-semibold tracking-wide">
            {biologiaData.hero.tagline2}
          </h3>
          
          <p className="text-white/90 text-xs sm:text-sm md:text-[15px] font-normal tracking-wider uppercase max-w-2xl pt-1">
            {biologiaData.hero.subtitle}
          </p>
        </div>
      </section>

      {/* 4. Sección "Cómo leer los resultados paso a paso" (Diseño Nativo en Código, Interactivo y Proporcional) */}
      <section className="w-full bg-[#FAFBFD] py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header Banner */}
          <div 
            className="w-full py-5 px-6 text-center rounded-2xl shadow-md"
            style={{ 
              backgroundColor: biologiaData.genially?.bannerBg || '#2B017C',
              color: biologiaData.genially?.bannerTextColor || '#FFFFFF'
            }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-[34px] font-semibold tracking-tight">
              {biologiaData.genially?.title || 'Cómo leer los resultados paso a paso'}
            </h2>
            <p className="text-white/80 text-xs sm:text-sm mt-1 font-medium">
              Guía interactiva para la interpretación clínica y técnica de tu reporte qPCR
            </p>
          </div>

          {/* Componente Nativo React */}
          <ComoLeerResultados />
        </div>
      </section>

    </div>
  );
}
