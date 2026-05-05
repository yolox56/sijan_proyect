'use client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface Props {
  onLogin: (correo: string, pass: string) => Promise<void>;
  onCancelar: () => void;
}

export default function LoginForm({ onLogin, onCancelar }: Props) {
  const [form, setForm] = useState({ correo: '', password: '' });
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setEnviando(true);
      setError(null);
      
      await onLogin(form.correo, form.password);
      
      // 2. AGREGA LA ALERTA AQUÍ
      toast.success('¡Inicio de sesión completado!', {
        duration: 4000,
        style: {
          background: '#283C2A',
          color: '#DBDACE',
          fontWeight: 'bold',
        },
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Credenciales inválidas');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-white/5">
      {error && <p className="text-red-600 text-sm bg-red-50 p-2 rounded border border-red-200">{error}</p>}
      
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-black">Numero de Empleado: </label>
        <input
          type="correo"
          required
          className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[black] outline-none transition-all"
          placeholder="Debe tener 7 caracteres"
          onChange={(e) => setForm({...form, correo: e.target.value})}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">Contraseña</label>
        <input
          type="password"
          required
          className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#832B56] outline-none transition-all"
          placeholder="••••••••"
          onChange={(e) => setForm({...form, password: e.target.value})}
        />
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="bg-[#832B56] text-white py-3 rounded-lg font-bold hover:bg-[#6b2346] disabled:opacity-50 shadow-md transition-all"
      >
        {enviando ? 'Verificando...' : 'Entrar al Sistema '}
      </button>
    </form>
  );
}