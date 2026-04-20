
'use client';
import { useState, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { LoginData, SignUpData, AutentificacionResponse } from '@/types/autentificacion';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function useAutentificacion() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 1. Función para iniciar sesión
  const login = useCallback(async (datos: LoginData) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await apiFetch<AutentificacionResponse>('/autentificacion/login', {
     //await apiFetch('/users', {   
       method: 'POST',
        body: JSON.stringify(datos),
      });

      // 1. IMPORTANTE: Usar el mismo nombre de llave que el HomePage ('token')
      localStorage.setItem('token', res.token);
      // Esto sirve para que el Header pueda leerlo después
     if (res.usuario) {
     localStorage.setItem('usuario', JSON.stringify(res.usuario));
     // --- ESTA ES LA LÍNEA MÁGICA ---
     // Lanzamos un evento para avisar a los demás componentes
      window.dispatchEvent(new Event('usuario-cambiado'));
     }

      
      // 2. Redirigir a la raíz '/' donde está tu HomePage.tsx
     
      router.push('/');
     // Refrescamos para que el Header detecte el cambio de inmediato
     router.refresh();


    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en login');
      throw err; // Para que el formulario pueda reaccionar también
    } finally {
      setLoading(false);
    }
  }, [router]);
// NUEVO: Función para registrar un nuevo usuario
  const signUp = useCallback(async (datos: SignUpData) => {
    try {
      setLoading(true);
      setError(null);
      //await apiFetch<AutentificacionResponse>('/autentificacion/signup', {
      await apiFetch('/users', {
        method: 'POST',
        body: JSON.stringify(datos),
      });
      // Después de registrarse, lo mandamos al login
      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en registro');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [router]);

  // 3. NUEVO: Función para limpiar la sesión
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    
    localStorage.removeItem('usuario'); // Limpiamos el nombre
    toast.success('Sesión cerrada correctamente', {
      icon: '👋',
      style: {
        background: '#283C2A', // Tu verde oscuro
        color: '#DBDACE',     // Tu crema
        fontWeight: 'bold',
      },
    });
      // --- ESTA ES LA LÍNEA MÁGICA ---
     // Lanzamos un evento para avisar a los demás componentes
      window.dispatchEvent(new Event('usuario-cambiado'));
    router.push('/login');
    router.refresh();// Refrescamos para que el Header actualice su estado iIMNMEDIATAMENTE después de cerrar sesión
  }, [router]);

  return { login, signUp, logout, loading, error };
}