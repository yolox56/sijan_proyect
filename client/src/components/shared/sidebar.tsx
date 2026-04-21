'use client';
import { useState } from 'react';
import { Menu, X, Home, Users, LogIn, UserPlus, FileText, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useAutentificacion } from '@/hooks/useAutentificacion'; // Importamos tu hook refinado
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Sidebar() { // Corregido a Mayúscula (es un componente)
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAutentificacion(); // Extraemos la función de logout
  const router = useRouter();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleProtectedNavigation = (e: React.MouseEvent, href: string) => {
    const token = localStorage.getItem('token');

    if (!token) {
      e.preventDefault();
     // toast.error('Se requiere iniciar sesión', { id: 'auth-required' });
     toast.error('¡No tienes permiso para acceder a esta página!', {
        duration: 4000,
        style: {
          background: '#832B56',
          color: '#DBDACE',
          fontWeight: 'bold',
        },
      });
      router.replace('/login');
      return;
    }
    
      


    router.push(href);
  };

  return (
    <>
      <button 
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-[#283C2A] text-white rounded-lg shadow-lg hover:bg-[#6E795A] transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`fixed top-0 left-0 h-full bg-[#283C2A] text-white transition-all duration-300 z-40
        ${isOpen ? 'w-64' : 'w-0 -translate-x-full'}`}>
        
        <nav className="flex flex-col gap-4 mt-20 p-4 overflow-hidden whitespace-nowrap">
          <Link href="/" onClick={(e) => handleProtectedNavigation(e, '/')} className="flex items-center gap-3 p-3 hover:bg-[#6E795A] rounded-xl transition-all">
            <Home size={20} /> <span>Home Page</span>
          </Link>
          <Link href="/usuarios" onClick={(e) => handleProtectedNavigation(e, '/usuarios')} className="flex items-center gap-3 p-3 hover:bg-[#6E795A] rounded-xl transition-all">
            <Users size={20} /> <span>Gestión Usuarios</span>
          </Link>
          
          <div className="border-t border-white/10 my-2"></div>

         {/*
          <Link href="/login" className="flex items-center gap-3 p-3 hover:bg-[#832B56] rounded-xl transition-all">
            <LogIn size={20} /> <span>Login</span>
          </Link>*/}
          <Link href="/signup" className="flex items-center gap-3 p-3 border border-white/20 hover:bg-white/10 rounded-xl transition-all">
            <UserPlus size={20} /> <span>Sign Up</span>
          </Link>

          
          <div className="mt-4 border-t border-white/10 pt-4">
            <Link href="/docs" className="flex items-center gap-3 p-3 text-gray-300 hover:text-white">
              <FileText size={20} /> <span>Documentación PDF</span>
            </Link>
          </div>
           {/* BOTÓN DE LOGOUT */}
          <button 
            onClick={logout}
            className="flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all mt-auto"
          >
            <LogOut size={20} /> <span>Cerrar Sesión</span>
            
          </button>
        </nav>
      </aside>
    </>
  );
}