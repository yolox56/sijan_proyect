'use client';
import { useState } from 'react';
import { SignUpData } from '@/types/autentificacion';

interface Props {
  onSignUp: (datos: SignUpData) => Promise<void>;
}

export default function SignUpForm({ onSignUp }: Props) {
  const [form, setForm] = useState<SignUpData>({
    nombre: '',
    edad: 0,
    correo: '', // Asegúrate que en SignUpData sea correo o correo según tu API
    password: ''//,
   // rol: 'usuario' // Valor por defecto
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUp(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input 
        className="border p-2 rounded" 
        placeholder="Nombre" 
        onChange={e => setForm({...form, nombre: e.target.value})} 
      />
      <input 
        className="border p-2 rounded" 
        placeholder="correo" 
        type="email"
        onChange={e => setForm({...form, correo: e.target.value})} 
      />
      <input
        className="border p-2 rounded"
        placeholder="Edad"
        type="number"
        min={1}
        onChange={e => setForm({ ...form, edad: Number(e.target.value) })}
      />
      <input 
        className="border p-2 rounded" 
        placeholder="Contraseña" 
        type="password"
        onChange={e => setForm({...form, password: e.target.value})} 
      />
      <button className="bg-[#283C2A] text-white py-2 rounded font-bold">
        Crear Cuenta
      </button>
    </form>
  );
}