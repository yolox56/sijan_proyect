'use client';

import { useRequireAuth } from '@/hooks/useRequireAuth';

export default function UsuariosPage() {
  const isAuthorized = useRequireAuth();

  if (!isAuthorized) return null;

  return (
    <section className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold text-[#283C2A] mb-2">Gestión de usuarios</h1>
      <p className="text-gray-500">Módulo protegido. Aquí puedes administrar usuarios.</p>
    </section>
  );
}
