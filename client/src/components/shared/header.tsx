'use client';
import { useEffect, useState } from 'react';
import { UserCircle } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  const [nombre, setNombre] = useState<string>('_');//

  useEffect(() => {
  // 1. Creamos una función que extraiga el nombre
  const cargarNombre = () => {
    const userStr = localStorage.getItem('usuario');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setNombre(user.nombre || 'Usuario');
      } catch {
        setNombre('_');
      }
    } else {
      setNombre('  '); // Si no hay nada, volvemos a Invitado
    }
  };

  // 2. Ejecutamos la función al cargar el componente
  cargarNombre();

  // 3. Escuchamos el evento que creamos en el Hook
  window.addEventListener('usuario-cambiado', cargarNombre);

  // 4. Limpiamos el escuchador cuando el componente se destruye (Buena práctica)
  return () => window.removeEventListener('usuario-cambiado', cargarNombre);
}, []);

  return (
    <header className="w-full bg-[#283C2A] text-white shadow-md px-34 py-4 flex justify-between items-center">
      {/* LADO IZQUIERDO: Imagen/Logo */}
      <div className="flex items-center gap-4">
        <div className="bg-transparent p-1 rounded-lg">
           {/* Reemplaza '/logo.png' con la ruta real de tu imagen en /public */}
          <Image 
            src="/header_logo.png"
            alt="Logo en header" 
            width={350} 
            height={250} 
          //  className="invert"
          />
        </div>
        <h1 className="font-bold text-lg hidden md:block text-center">     .</h1>
      </div>

      {/* LADO DERECHO: Nombre del Usuario */}
      <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
        <div className="text-right">
          <p className="text-[10px] text-gray-400 uppercase leading-none">Usuario:</p>
          <p className="text-sm font-semibold text-[#E5E7EB]">{nombre}</p>
        </div>
        <UserCircle size={28} className="text-[#832B56]" />
      </div>
    </header>
  );
}