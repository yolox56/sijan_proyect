'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/shared/sidebar';
import SidebarPublica from '@/components/shared/sidebarPublica';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';

export default function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // --- ESTADOS ---
  const [estaLogueado, setEstaLogueado] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // 👈 Nuevo: Controla si el Sidebar está abierto

  const rutasPublicas = ['/login', '/signup', '/docs'];
  const esRutaPublica = rutasPublicas.includes(pathname);

  // --- LÓGICA DE SESIÓN ---
  useEffect(() => {
    const revisarSesion = () => {
      setEstaLogueado(!!localStorage.getItem('token'));
    };
    
    revisarSesion();
    window.addEventListener('usuario-cambiado', revisarSesion);
    return () => window.removeEventListener('usuario-cambiado', revisarSesion);
  }, []);

  return (
    <>
      {/* 1. LÓGICA DE SIDEBARS */}
      {estaLogueado ? (
        /* Pasamos el estado y la función para cambiarlo al Sidebar */
        <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
      ) : esRutaPublica ? (
        <SidebarPublica />
      ) : null}

      {/* 2. CONTENEDOR PRINCIPAL */}
      {/* Añadimos transition-all para que el movimiento sea suave y ml-64 cuando esté abierto */}
      <div 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 
          ${estaLogueado && isOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Header />

        <main className={`flex-1 transition-all duration-300 ${estaLogueado || esRutaPublica ? 'p-8' : ''}`}>
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
}