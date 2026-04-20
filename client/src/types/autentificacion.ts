// Este archivo define los tipos relacionados con la autenticación,
//  como la respuesta del login y los datos necesarios para el login y el registro.
// Importamos los tipos de usuario para usarlos en la respuesta de autenticación
//Para el Login y Sign Up, necesitamos definir qué datos fluyen.


import { User, CreateUserData } from './user'; // Asegúrate que el archivo se llame user.ts

/**
 * Respuesta que devuelve el backend de NestJS tras un login exitoso.
 */
export interface AutentificacionResponse {
  usuario: User;
  token: string; 
}

/**
 * Datos necesarios para iniciar sesión.
 * Usamos 'correo' para que coincida con lo que enviamos en el LoginForm.
 */
export interface LoginData {
  correo: string;
  password: string;
}

/**
 * Datos para el registro de nuevos usuarios.
 * Extendemos CreateUserData y añadimos el password.
 */
export type SignUpData = CreateUserData & { 
  password: string;
  confirmPassword?: string; // Opcional, util para validaciones en el formulario
};