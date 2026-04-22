'use client';
import { useState } from 'react'; // Necesario para el estado
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogIn, UserPlus, FileText, LayoutDashboard, ChevronLeft, ChevronRight } from 'lucide-react';

export default function SidebarPublica() {
  const pathname = usePathname();
  const [isOpen, setIsOpen ] = useState(true); // Estado para controlar el ancho

  const enlaces = [
    { name: 'Iniciar Sesión', href: '/login', icon: LogIn },
    { name: 'Registrarse', href: '/signup', icon: UserPlus },
    { name: 'Documentación', href: '/docs', icon: FileText },
  ];

  return (
    <aside 
      className={`bg-[#283C2A] border-r border-transparent flex flex-col h-screen sticky top-0 shadow-sm transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Botón para colapsar/expandir */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-6 bg-[#6E795A] text-white rounded-full p-1  hover:scale-110 transition-transform"
      >
        { isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      <div className="p-4 py-18 overflow-hidden">
        <h2 className="text-[#DBDACE] font-bold text-xl flex items-center gap-2 whitespace-nowrap">
          <LayoutDashboard size={24} className="min-w-[24px]" /> 
          { isOpen && <span>SIJAN otro</span>}
        </h2>
      </div>
      {/* Lógica de navegación protegida (ejemplo) */}

      <nav className="flex-1 px-4 space-y-20 overflow-hidden">
        {enlaces.map((enlace) => {
          const Icono = enlace.icon;
          const activo = pathname === enlace.href;
          return (
            <Link
              key={enlace.href}
              href={enlace.href}
              title={!isOpen ? enlace.name : ''} // Tooltip cuando está colapsada
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activo 
                  ? 'bg-[#6E795A] text-white shadow-md' 
                  : 'text-gray-300 hover:bg-[#6E795A]/20 hover:text-white'
              }`}
            >
              <Icono size={20} className="min-w-[20px]" />
              { isOpen && <span className="font-medium whitespace-nowrap">{enlace.name}</span>}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-[#6E795A]/30 text-center overflow-hidden">
        {isOpen ? (
          <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">v1.0.0 - Público</p>
        ) : (
          <span className="text-[10px] text-gray-400">v1</span>
        )}
      </div>
    </aside>
  );
}



/*LAYOUT
'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/shared/sidebar'; // Tu sidebar privada
import SidebarPublica from '@/components/shared/sidebarPublica'; // La nueva
import Header from '@/components/shared/header';
import { Toaster } from 'react-hot-toast';
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [estaLogueado, setEstaLogueado] = useState(false);

  // Rutas que usarán la Sidebar Pública
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
    <html lang="es" className="h-full">
      <body className="min-h-screen flex bg-gray-50 text-gray-900 overflow-x-hidden">
        <Toaster position="top-right" />
        
        {/* LÓGICA DE SIDEBARS *
        {estaLogueado && !esRutaPublica ? (
          <Sidebar /> // Sidebar Privada (Dashboard)
        ) : esRutaPublica ? (
          <SidebarPublica /> // Sidebar Pública (Login/Signup/Docs)
        ) : null}

        <div className="flex-1 flex flex-col min-h-screen relative">
          {/* Solo mostramos el Header si está logueado y no es ruta pública *
          {estaLogueado && !esRutaPublica && <Header />} 

          <main className={`flex-1 transition-all duration-300 ${esRutaPublica || estaLogueado ? 'p-8' : ''}`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

*/




//CODIGO DICEBAR PRIVADA, SE DEJO PARA FUTURAS IMPLEMENTACIONES

