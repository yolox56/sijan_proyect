/**
 * Cliente HTTP base para comunicarse con el backend.
 * * Centraliza la URL base y los headers comunes.
 * Todos los hooks usan esta función en lugar de llamar a fetch() directamente.
 * Así, si cambia la URL del API, solo hay que cambiarla aquí.
 */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  // Construye la URL completa combinando la base y el endpoint
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers, // Permite sobrescribir o añadir headers si es necesario
    },
    ...options,
  });

  // Log para depuración en desarrollo
  console.log('Respuesta de la API:', response);

  // Manejo de errores centralizado
  if (!response.ok) {
    // Intenta obtener el mensaje de error del backend, si no, usa el status
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.message ?? `Error ${response.status}`);
  }

  // Retorna el JSON tipado con el genérico <T>
  // Nota: DELETE suele devolver un objeto con mensaje; otras respuestas devuelven los datos.
  return response.json() as Promise<T>;
}