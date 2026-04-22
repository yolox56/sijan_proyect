/*'use client';
import { useState } from 'react';
import { Menu, X, Home, Users, LogIn, UserPlus, FileText, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useAutentificacion } from '@/hooks/useAutentificacion'; // Importamos tu hook refinado
import { useRouter } from 'next/navigation';
//import toast from 'react-hot-toast';

export default function Sidebar() { 
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAutentificacion(); // Extraemos la función de logout
  const router = useRouter();

  const toggleSidebar = () => setIsOpen(!isOpen);

  /*const handleProtectedNavigation = (e: React.MouseEvent, href: string) => {
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
  };*/
'use client';
import { useState } from 'react';
import { 
  Menu, X, Home, Users, UserPlus, FileText, LogOut, 
  ChevronDown, ClipboardList, Calendar, BarChart3, CalendarClock, 
  FileSliders, CalendarCog, CalendarCheck, Computer, UsersRound, 
  UserRoundCheck, FileMinusCorner, UserCheck
} from 'lucide-react';
import Link from 'next/link';
import { useAutentificacion } from '@/hooks/useAutentificacion'; 
import { useRouter } from 'next/navigation';

// 1. DEFINIMOS QUÉ DATOS RECIBE EL SIDEBAR
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) { 
  // Los estados de los desplegables se quedan aquí porque son internos del menú
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCitasOpen, setIsCitasOpen] = useState(false);
  const [isGestionOpen, setIsGestionOpen] = useState(false);    
  
  const { logout } = useAutentificacion(); 
  const router = useRouter();

  // Funciones para los desplegables
  const toggleAdmin = () => setIsAdminOpen(!isAdminOpen);
  const toggleCitas = () => setIsCitasOpen(!isCitasOpen);
  const toggleGestion = () => setIsGestionOpen(!isGestionOpen);

  return (
    <>
      {/* 2. BOTÓN HAMBURGUESA (Usa toggleSidebar de las props) */}
      <button 
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-[#283C2A] text-white rounded-lg shadow-lg hover:bg-[#6E795A] transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 3. ASIDE (Usa isOpen de las props) */}
      <aside className={`fixed top-0 left-0 h-full bg-[#283C2A] text-white transition-all duration-300 z-40 flex flex-col
        ${isOpen ? 'w-64' : 'w-0 -translate-x-full'}`}>
        
        {/* Navegación con nuestra clase de scroll estética */}
       <nav className={`flex-1 flex flex-col gap-2 mt-20 p-4 whitespace-nowrap transition-all
    ${isOpen 
      ? 'overflow-y-auto custom-scrollbar opacity-100' 
      : 'overflow-hidden opacity-0 pointer-events-none'
    }`} > {/* Si el menú no está abierto, ocultamos el scroll y evitamos interacciones */} 
    
          <Link href="/" className="flex items-center gap-3 p-3 hover:bg-[#6E795A] rounded-xl transition-all">
            <Home size={20} />
            <span>Home Page</span>
          </Link>

          <Link href="/docs" className="flex items-center gap-3 p-3 text-gray-300 hover:text-white hover:bg-[#6E795A] rounded-xl transition-all">
            <FileText size={20} /> <span>Documentación PDF</span>
          </Link>

          <div className="border-t border-white/10 my-2"></div>

          {/* --- SECCIÓN DESPLEGABLE: ADMINISTRAR --- */}
          <div className="flex flex-col">
            <button 
              onClick={toggleAdmin}
              className="flex items-center justify-between gap-3 p-4 hover:bg-[#6E795A] rounded-xl transition-all w-full text-left">
              <div className="flex items-center gap-3">
                <FileSliders size={20} />
                <span>Administrar</span>
              </div>
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-300 ${isAdminOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            <div className={`overflow-hidden transition-all duration-300 bg-black/10 rounded-lg mt-1 
              ${isAdminOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
              
              <Link href="/bitacora" className="flex items-center gap-3 p-2 pl-10 hover:text-white text-gray-300 hover:bg-[#6E795A]/50 transition-all">
                <ClipboardList size={18} />
                <span className="text-sm">Bitácora</span>
              </Link>

              <Link href="/ciclo-escolar" className="flex items-center gap-3 p-2 pl-10 hover:text-white text-gray-300 hover:bg-[#6E795A]/50 transition-all">
                <Calendar size={18} />
                <span className="text-sm">Ciclo Escolar</span>
              </Link>

              <Link href="/reporte-general" className="flex items-center gap-3 p-2 pl-10 hover:text-white text-gray-300 hover:bg-[#6E795A]/50 transition-all">
                <BarChart3 size={18} />
                <span className="text-sm">Reporte General</span>
              </Link>
            </div>
          </div>

          <div className="border-t border-white/10 my-2"></div>

          {/* --- SECCIÓN DESPLEGABLE: CITAS --- */}
          <div className="flex flex-col">
            <button 
              onClick={toggleCitas}
              className="flex items-center justify-between gap-3 p-4 hover:bg-[#6E795A] rounded-xl transition-all w-full text-left">
              <div className="flex items-center gap-3">
                <CalendarClock size={20} />
                <span>Citas</span>
              </div>
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-300 ${isCitasOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            <div className={`overflow-hidden transition-all duration-300 bg-black/10 rounded-lg mt-1 
              ${isCitasOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
              
              <Link href="/bitacora" className="flex items-center gap-3 p-2 pl-10 hover:text-white text-gray-300 hover:bg-[#6E795A]/50 transition-all">
                <CalendarCheck size={18} />
                <span className="text-sm">Citas Programadas</span>
              </Link>

              <Link href="/ciclo-escolar" className="flex items-center gap-3 p-2 pl-10 hover:text-white text-gray-300 hover:bg-[#6E795A]/50 transition-all">
                <CalendarCog size={18} /> 
                <span className="text-sm">Configuracion Citas</span>
              </Link>
            </div>
          </div>

          <div className="border-t border-white/10 my-2"></div>

          {/* --- SECCIÓN DESPLEGABLE: GESTIÓN --- */}
          <div className="flex flex-col">
            <button 
              onClick={toggleGestion}
              className="flex items-center justify-between gap-3 p-4 hover:bg-[#6E795A] rounded-xl transition-all w-full text-left">
              <div className="flex items-center gap-3">
                <Computer size={20} />
                <span>Gestión</span>
              </div>
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-300 ${isGestionOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            <div className={`overflow-hidden transition-all duration-300 bg-black/10 rounded-lg mt-1 
              ${isGestionOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
              
              <Link href="/bitacora" className="flex items-center gap-3 p-2 pl-10 hover:text-white text-gray-300 hover:bg-[#6E795A]/50 transition-all">
                <UsersRound size={18} />
                <span className="text-sm">Alumnos</span>
              </Link>

              <Link href="/usuarios" className="flex items-center gap-3 p-2 pl-10 hover:text-white text-gray-300 hover:bg-[#6E795A]/50 transition-all">
                <UserRoundCheck size={18} />
                <span className="text-sm">Beneficiarios</span>
              </Link>

              <Link href="/ciclo-escolar" className="flex items-center gap-3 p-2 pl-10 hover:text-white text-gray-300 hover:bg-[#6E795A]/50 transition-all">
                <UserCheck size={18} />
                <span className="text-sm">Autorizados</span>
              </Link>

              <Link href="/ciclo-escolar" className="flex items-center gap-3 p-2 pl-10 hover:text-white text-gray-300 hover:bg-[#6E795A]/50 transition-all">
                <FileMinusCorner size={18} />
                <span className="text-sm">Solicitudes</span>
              </Link>
            </div>
          </div>

          <div className="border-t border-white/10 my-2"></div>

          <Link href="/usuarios" className="flex items-center gap-3 p-3 hover:bg-[#6E795A] rounded-xl transition-all">
            <Users size={20} /> <span>Mis Solicitudes</span>
          </Link>

          <div className="border-t border-white/10 my-2"></div>

          <Link href="/signup" className="flex items-center gap-3 p-4 hover:bg-white/10 rounded-xl transition-all">
            <UserPlus size={20} /> <span>Registro</span> {/* Corregido: "Registrop" a "Registro" */}
          </Link>

          <div className="border-t border-white/10 my-2"></div>

          {/* BOTÓN DE LOGOUT */}
          <button
            onClick={logout}
            className="flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all mt-auto mb-4">
            <LogOut size={20} /> <span>Cerrar Sesión</span>
          </button>
        </nav>
      </aside>
    </>
  );
}