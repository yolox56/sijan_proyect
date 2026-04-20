'use client';
import { useAutentificacion } from '@/hooks/useAutentificacion';
import LoginForm from '@/components/autentificacion/login/LoginForm';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'; // 1. Importa Image

export default function LoginPage() {
  const { login, error } = useAutentificacion();
  const router = useRouter();

  const handleLogin = async (correo: string, pass: string) => {
    await login({ correo, password: pass });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#DBDACE]"> {/* Fondo crema para consistencia */}
      <div className="bg-white/30 p-8 rounded-2xl shadow-ld w-full max-w-md border-t-30 border-[#832B56]">
        <h1 className="text-3xl font-extrabold text-[#283C2A] text-center">Iniciar Sesión</h1>
        
        {/* 2. AGREGA LA IMAGEN AQUÍ */}
        <div className="flex justify-center my-6">
          <Image 
            src="/login.png" // Tu imagen en public/logo-login.png
            alt="Logo"
            width={250}
            height={250}
            className="bg-transparent"
          />
        </div>

        {error && <p className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center border border-red-200">{error}</p>}
        
        <LoginForm onLogin={handleLogin} onCancelar={() => router.push('/')} />
        
        <p className="mt-8 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link href="/signup" className="text-[#832B56] font-bold hover:text-[#6b2346] transition-colors">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}