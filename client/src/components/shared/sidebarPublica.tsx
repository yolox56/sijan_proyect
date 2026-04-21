'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogIn, UserPlus, FileText, LayoutDashboard } from 'lucide-react';

export default function SidebarPublica() {
  const pathname = usePathname();

  const enlaces = [
    { name: 'Iniciar Sesión', href: '/login', icon: LogIn },
    { name: 'Registrarse', href: '/signup', icon: UserPlus },
    { name: 'Documentación', href: '/docs', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-[#283C2A] border-r border-gray-200 flex flex-col h-screen sticky top-0 shadow-sm">
      <div className="p-6">
        <h2 className="text-[#283C2A] font-bold text-xl flex items-center gap-2">
          <LayoutDashboard size={24} /> SIJAN out
        </h2>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {enlaces.map((enlace) => {
          const Icono = enlace.icon;
          const activo = pathname === enlace.href;
          return (
            <Link
              key={enlace.href}
              href={enlace.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activo 
                  ? 'bg-[#283C2A] text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icono size={20} />
              <span className="font-medium">{enlace.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">v1.0.0 - Acceso Público</p>
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

