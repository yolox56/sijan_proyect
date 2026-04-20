'use client';
import Image from 'next/image';
import { useAutentificacion } from '@/hooks/useAutentificacion';
import SignUpForm from '@/components/autentificacion/SignUp/SignUpForm';
export default function SignUpPage() {
  const { signUp, error } = useAutentificacion();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#DBDACE]"> {/* Fondo crema para consistencia */}
      <div className="bg-white/30 p-8 rounded-xl shadow-lg w-full max-w-md border-t-40 border-[#283C2A]">
        <h1 className="text-3xl font-bold text-[#283C2A] mb-6 text-center">Registro</h1>
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
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <SignUpForm onSignUp={signUp} />
      </div>
    </div>
  );
}