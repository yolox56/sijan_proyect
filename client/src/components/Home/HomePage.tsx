'use client';
import { useRouter } from 'next/navigation';
import { Users, Activity, ShieldCheck } from 'lucide-react';// Íconos de lucide-react para el dashboard
import { useRequireAuth } from '@/hooks/useRequireAuth';

export default function HomePage() {
  const router = useRouter();
  const isAuthorized = useRequireAuth();

  if (!isAuthorized) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-[#283C2A]">Panel de Resumen SIJAN</h1>
        <p className="text-gray-500">Bienvenido de nuevo al sistema de gestión .</p>
      </header>

      {/* Grid de Tarjetas Profesionales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#283C2A] flex items-center gap-4">
          <div className="bg-[#283C2A]/10 p-3 rounded-full text-[#283C2A]"><Users /></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Usuarios Activos</p>
            <p className="text-2xl font-bold text-gray-800">1,284</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#832B56] flex items-center gap-4">
          <div className="bg-[#832B56]/10 p-3 rounded-full text-[#832B56]"><Activity /></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Rendimiento API</p>
            <p className="text-2xl font-bold text-gray-800">99.9%</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-yellow-500 flex items-center gap-4">
          <div className="bg-yellow-100 p-3 rounded-full text-yellow-600"><ShieldCheck /></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Estado Servidor</p>
            <p className="text-2xl font-bold text-gray-800">Estable</p>
          </div>
        </div>
      </div>

      <div className="bg-[#283C2A] text-white p-8 rounded-3xl shadow-xl flex justify-between items-center overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">¿Listo para gestionar usuarios?</h2>
          <p className="text-white/80 mb-6">Accede a la base de datos completa y realiza operaciones CRUD.</p>
          <button 
            onClick={() => router.push('/usuarios')}
            className="bg-white text-[#283C2A] px-6 py-2.5 rounded-full font-bold hover:bg-gray-100 transition-all"
          >
            Ir a Usuarios
          </button>
        </div>
        <Users size={180} className="absolute -right-10 -bottom-10 text-white/10 rotate-12" />
      </div>
    </div>
  );
}