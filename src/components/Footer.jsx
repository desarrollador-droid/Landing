import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const [userRole, setUserRole] = useState('vet');

  useEffect(() => {
    if (location.pathname === '/prueba-fecal-para-mascotas' || location.pathname === '/prueba-fecal-para-mascotas/') {
      setUserRole('owner');
    } else {
      const storedRole = localStorage.getItem('userRole') || 'vet';
      setUserRole(storedRole);
    }
  }, [location.pathname]);

  if (userRole === 'owner') {
    return null;
  }

  return (
    <footer className="bg-white text-gray-800 pt-16 pb-8 px-4 sm:px-6 border-t-2 border-osd-purple/60 font-sans">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1.4fr_0.8fr_0.8fr] gap-6 md:gap-8 pb-12">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-4 text-left pr-2 sm:pr-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#555555] tracking-tight leading-none">
            Diagnóstico<br/>
            <span className="text-[#555555]">con propósito</span>
          </h2>
          <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-sm">
            Especialistas en biología molecular veterinaria con tecnología qPCR de amplio espectro.
          </p>
          <p className="text-xs md:text-sm font-bold text-gray-600 pt-2 uppercase tracking-wide">
            Laboratorios en Medellín y Bogotá | Servicio a nivel nacional
          </p>
        </div>

        {/* Columns 2 & 3: Quick Links & Legal (Divided side-by-side with purple borders on mobile, 3-col on desktop) */}
        <div className="grid grid-cols-2 gap-2 sm:gap-6 md:contents pt-2 md:pt-0">
          {/* Column 2: Quick Links */}
          <div className="space-y-3 sm:space-y-4 text-left border-l-2 border-osd-purple pl-2 sm:pl-6 md:pl-10">
            <h3 className="text-[11px] sm:text-sm md:text-base font-bold text-[#555555] uppercase tracking-wider leading-tight">
              Navegación Rápida
            </h3>
            <ul className="space-y-1.5 sm:space-y-2.5 text-[10.5px] sm:text-sm md:text-base text-gray-500 font-medium leading-snug">
              <li><Link to="/veterinarios" className="hover:text-osd-purple transition-colors">Inicio</Link></li>
              <li><a href="https://osdiagnostic.com/laboratorio-de-biologia-molecular-preguntas-frecuentes/" target="_blank" rel="noreferrer" className="hover:text-osd-purple transition-colors">Preguntas frecuentes</a></li>
              <li><Link to="/clinica" className="hover:text-osd-purple transition-colors">Servicios</Link></li>
              <li><Link to="/noticias-veterinarias" className="hover:text-osd-purple transition-colors">Newslatter</Link></li>
              <li><Link to="/investigacion" className="hover:text-osd-purple transition-colors">Proyectos de investigación</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal & Requests */}
          <div className="space-y-3 sm:space-y-4 text-left border-l-2 border-osd-purple pl-2 sm:pl-6 md:pl-10">
            <h3 className="text-[11px] sm:text-sm md:text-base font-bold text-[#555555] uppercase tracking-wider leading-tight">
              Legal | Requerimientos
            </h3>
            <ul className="space-y-1.5 sm:space-y-2.5 text-[10.5px] sm:text-sm md:text-base text-gray-500 font-medium leading-snug">
              <li><Link to="/proteccion-de-datos" className="hover:text-osd-purple transition-colors">Protección de datos</Link></li>
              <li><Link to="/politica-de-privacidad" className="hover:text-osd-purple transition-colors">Política de privacidad</Link></li>
              <li><Link to="/pqr-s" className="hover:text-osd-purple transition-colors">Reclamos / quejas (PQR'S)</Link></li>
              <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSeDPoSkLRQm7UiFy2f_U_2f8YE4bU85Ap5QixzMqUvQc-A4pA/viewform" target="_blank" rel="noreferrer" className="hover:text-osd-purple transition-colors">Formulario de recolección</a></li>
              <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSff0Q7GNlJolP0GB0gXlgCJOFMZRW8w17Ikw1HWNB7yD8IYYw/viewform" target="_blank" rel="noreferrer" className="hover:text-osd-purple transition-colors">Creación de clientes</a></li>
            </ul>
          </div>
        </div>

      </div>

      {/* Bottom section */}
      <div className="max-w-5xl mx-auto border-t-2 border-osd-purple pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left space-y-1">
          <h4 className="font-bold text-[#555555] text-sm md:text-base">Centro biotecnológico</h4>
          <p className="text-xs md:text-sm text-gray-500">
            Copyright © {new Date().getFullYear()} On Site Diagnostic. Todos los derechos reservados
          </p>
        </div>

        <div className="flex space-x-6 text-xl text-gray-600">
          <a href="https://co.linkedin.com/company/on-site-diagnostic-osd" target="_blank" rel="noreferrer" className="hover:text-osd-purple transition-colors">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://www.instagram.com/osd_lab" target="_blank" rel="noreferrer" className="hover:text-osd-purple transition-colors">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.tiktok.com/@osd_lab" target="_blank" rel="noreferrer" className="hover:text-osd-purple transition-colors">
            <i className="fab fa-tiktok"></i>
          </a>
          <a href="https://www.youtube.com/@osd_lab" target="_blank" rel="noreferrer" className="hover:text-osd-purple transition-colors">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
