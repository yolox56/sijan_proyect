import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("User") // Le dice a la DB: "Crea una tabla llamada User"
export class User {
  @PrimaryGeneratedColumn('uuid') // Genera un ID único automáticamente (UUID)
  id!: string; // Columna para el ID se declara como string porque es manejado como texto

  @Column() // Columna para texto
  nombre!: string;

  @Column({ unique: true }) // El correo debe ser único, no se puede repetir
  correo!: string;

  @Column() // Columna para números
  edad!: number;

  @Column() // Columna para la contraseña
  password!: string;
}
