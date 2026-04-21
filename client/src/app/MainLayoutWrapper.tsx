'use client'; // 👈 Vital para que funcionen los hooks

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/shared/sidebar';
import SidebarPublica from '@/components/shared/sidebarPublica'; // Asegúrate que empiece con Mayúscula
import Header from '@/components/shared/header';

export default function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [estaLogueado, setEstaLogueado] = useState(false);

  const rutasPublicas = ['/login', '/signup', '/docs'];
  const esRutaPublica = rutasPublicas.includes(pathname);

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
      {/* Lógica de Sidebars */}
      {estaLogueado 
        ? <Sidebar /> 
        : esRutaPublica 
          ? <SidebarPublica /> 
          : null
      }

      <div className="flex-1 flex flex-col min-h-screen">
        {estaLogueado && <Header />} 

        <main className={`flex-1 transition-all duration-300 ${estaLogueado || esRutaPublica ? 'p-8' : ''}`}>
          {children}
        </main>
      </div>
    </>
  );
}