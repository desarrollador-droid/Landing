import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const [userRole, setUserRole] = useState('vet');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Detect user role state based on the current URL pathname
    if (location.pathname === '/prueba-fecal-para-mascotas' || location.pathname === '/prueba-fecal-para-mascotas/') {
      localStorage.setItem('userRole', 'owner');
      setUserRole('owner');
    } else if (location.pathname === '/veterinarios' || location.pathname === '/veterinarios/') {
      localStorage.setItem('userRole', 'vet');
      setUserRole('vet');
    } else {
      const storedRole = localStorage.getItem('userRole') || 'vet';
      setUserRole(storedRole);
    }
  }, [location.pathname]);

  const isClinica = location.pathname.startsWith('/clinica');

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar (WhatsApp & Schedule) */}
      <div className="w-full bg-osd-purple text-white py-1.5 sm:py-2 px-3 sm:px-6 text-[11px] sm:text-xs md:text-sm font-semibold relative flex items-center min-h-[36px]">
        <div className={`max-w-7xl mx-auto w-full flex ${isClinica ? 'flex-col sm:flex-row items-center justify-between lg:justify-center gap-1 sm:gap-4' : 'flex-row items-center justify-between sm:justify-center'} relative`}>
          {/* Centered text on desktop, left on tablet, top line on mobile for clinica */}
          <div className={`${isClinica ? 'lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2' : 'sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2'} tracking-wider uppercase text-center sm:text-left lg:text-center text-[10px] xs:text-[11px] sm:text-xs md:text-sm`}>
            {isClinica ? (
              <a
                href="https://docs.google.com/forms/d/1eRtxUD9p_W0UF0gQDPRhkHuuUZqWnMqhqdczEWR6vnQ/edit"
                target="_blank"
                rel="noreferrer"
                className="flex flex-wrap items-center justify-center sm:justify-start lg:justify-center gap-x-1.5 gap-y-0.5 hover:opacity-90 transition-opacity underline-offset-4 hover:underline leading-tight"
              >
                <span className="font-extrabold tracking-wide">RECOLECCIÓN GRATIS</span>
                <span className="text-[#01FADA]">·</span>
                <span className="text-[#01FADA] font-extrabold tracking-wide">
                  SERVICIO SOLO EN BOGOTÁ
                </span>
              </a>
            ) : (
              'RECOLECCIÓN GRATIS'
            )}
          </div>
          {/* Right aligned WhatsApp on tablet/desktop, nicely centered on mobile */}
          <div className="sm:ml-auto flex items-center justify-center space-x-2 relative z-10 shrink-0">
            <a href="https://wa.me/573005143727" target="_blank" rel="noreferrer" className="flex items-center hover:text-osd-cyan transition-colors text-[10.5px] sm:text-xs md:text-sm whitespace-nowrap">
              <i className="fab fa-whatsapp text-osd-cyan mr-1.5 text-xs sm:text-base"></i>
              +57 300 5143727
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto w-full px-6 py-4 flex justify-between items-center">
        {/* Logo (Always redirects to the main role selection landing page /) */}
        <Link to="/" className="logo-container flex items-center relative overflow-hidden rounded-xl px-2 py-1">
          <img 
            src="https://res.cloudinary.com/oiaig120/image/upload/osdiagnostic/laboratorio-para-veterinarias.svg" 
            alt="On Site Diagnostic Logo" 
            className="logo-3d h-12 md:h-16 object-contain"
          />
          {/* Light sweep reflection */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-logo-sheen pointer-events-none"></div>
        </Link>

        {/* Desktop Menu with animated underline on hover */}
        <nav className="hidden md:flex items-center space-x-8 font-bold text-osd-dark">
          {userRole === 'owner' ? (
            <>
              <Link to="/prueba-fecal-para-mascotas" className="relative py-1.5 group hover:text-osd-purple transition-colors">
                Inicio
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-osd-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link to="/conocenos-propietarios" className="relative py-1.5 group hover:text-osd-purple transition-colors">
                Conócenos
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-osd-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link to="/test-disbiosis-mascotas" className="relative py-1.5 group hover:text-osd-purple transition-colors">
                Test índice disbiosis
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-osd-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link to="/aprende" className="relative py-1.5 group hover:text-osd-purple transition-colors">
                Aprende con OSD
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-osd-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/veterinarios" className="relative py-1.5 group hover:text-osd-purple transition-colors">
                Inicio
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-osd-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <div className="relative py-1.5 group hover:text-osd-purple transition-colors cursor-pointer flex items-center">
                <span>Servicios</span>
                <i className="fas fa-chevron-down text-[10px] ml-1.5"></i>
                <span className="absolute bottom-0 left-0 w-[80%] h-[2px] bg-osd-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50 text-left min-w-[220px]">
                  <div className="bg-white shadow-xl py-2.5 rounded-lg border border-gray-100">
                    <Link to="/clinica" className="block px-5 py-2 text-sm text-[#2b017c] hover:bg-gray-50 hover:text-osd-purple transition-colors font-bold">
                      Laboratorio Clínico
                    </Link>
                    <Link to="/biologia-molecular" className="block px-5 py-2 text-sm text-[#2b017c] hover:bg-gray-50 hover:text-osd-purple transition-colors font-bold">
                      Biología Molecular
                    </Link>
                    <Link to="/disbiosis" className="block px-5 py-2 text-sm text-[#2b017c] hover:bg-gray-50 hover:text-osd-purple transition-colors font-bold">
                      Test índice de Disbiosis
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="relative py-1.5 group hover:text-osd-purple transition-colors cursor-pointer flex items-center">
                <span>Aprende</span>
                <i className="fas fa-chevron-down text-[10px] ml-1.5"></i>
                <span className="absolute bottom-0 left-0 w-[80%] h-[2px] bg-osd-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50 text-left min-w-[220px]">
                  <div className="bg-white shadow-xl py-2.5 rounded-lg border border-gray-100">
                    <Link to="/aprende" className="block px-5 py-2 text-sm text-[#2b017c] hover:bg-gray-50 hover:text-osd-purple transition-colors font-bold">
                      Aprende con OSD
                    </Link>
                    <Link to="/investigacion" className="block px-5 py-2 text-sm text-[#2b017c] hover:bg-gray-50 hover:text-osd-purple transition-colors font-bold">
                      Proyectos de investigación
                    </Link>
                    <Link to="/preguntas-frecuentes" className="block px-5 py-2 text-sm text-[#2b017c] hover:bg-gray-50 hover:text-osd-purple transition-colors font-bold">
                      Preguntas frecuentes
                    </Link>
                  </div>
                </div>
              </div>
              <Link to="/noticias-veterinarias" className="relative py-1.5 group hover:text-osd-purple transition-colors">
                OSD News
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-osd-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link to="/conocenos" className="relative py-1.5 group hover:text-osd-purple transition-colors">
                Conócenos
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-osd-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link to="/contacto" className="relative py-1.5 group hover:text-osd-purple transition-colors">
                Contáctanos
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-osd-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button (Hamburger) */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="md:hidden text-osd-dark text-2xl focus:outline-none"
        >
          <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3 font-bold text-osd-dark flex flex-col text-left">
          {userRole === 'owner' ? (
            <>
              <Link 
                to="/prueba-fecal-para-mascotas" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 hover:text-osd-purple transition-colors"
              >
                Inicio
              </Link>
              <Link 
                to="/conocenos-propietarios" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 hover:text-osd-purple transition-colors"
              >
                Conócenos
              </Link>
              <Link 
                to="/test-disbiosis-mascotas" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 hover:text-osd-purple transition-colors"
              >
                Test índice disbiosis
              </Link>
              <Link 
                to="/aprende" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 hover:text-osd-purple transition-colors"
              >
                Aprende con OSD
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/veterinarios" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 hover:text-osd-purple transition-colors"
              >
                Inicio
              </Link>
              <Link 
                to="/clinica" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 hover:text-osd-purple transition-colors font-bold text-[#6F2BCC]"
              >
                Laboratorio Clínico
              </Link>
              <Link 
                to="/biologia-molecular" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 hover:text-osd-purple transition-colors"
              >
                Biología Molecular
              </Link>
              <Link 
                to="/disbiosis" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 hover:text-osd-purple transition-colors"
              >
                Test índice de Disbiosis
              </Link>
              <Link 
                to="/aprende" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 hover:text-osd-purple transition-colors"
              >
                Aprende con OSD
              </Link>
              <Link 
                to="/investigacion" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 hover:text-osd-purple transition-colors"
              >
                Proyectos de investigación
              </Link>
              <Link 
                to="/noticias-veterinarias" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 hover:text-osd-purple transition-colors"
              >
                OSD News
              </Link>
              <Link 
                to="/conocenos" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 hover:text-osd-purple transition-colors"
              >
                Conócenos
              </Link>
              <Link 
                to="/contacto" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 hover:text-osd-purple transition-colors"
              >
                Contáctanos
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
