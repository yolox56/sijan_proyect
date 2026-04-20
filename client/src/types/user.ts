// src/types/usuario.ts

export interface User {
  id: string;
  nombre: string;
  correo: string; // Tu profesor usa 'correo' en el formulario, asegúrate que en NestJS se llame igual o cámbialo a 'correo'
  edad: number;
}

// Lo que necesitamos para crear uno (sin el ID, porque el ID lo crea la base de datos)
export interface CreateUserData {
  nombre: string;
  correo: string;
  edad: number;
}