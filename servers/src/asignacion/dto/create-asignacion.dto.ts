import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateAsignacionDto {
  @IsString() // Valida que el dato sea una cadena de texto
  @IsNotEmpty() // No permite valores vacíos
  @MinLength(18) // Longitud mínima de la CURP
  @MaxLength(18) // Longitud máxima de la CURP
  curp_alumno!: string; // Recibe la CURP del niño a vincular

  @IsString() // Valida el tipo de dato string
  @IsNotEmpty() // Obligatorio para el registro
  @MinLength(18) // Estándar de CURP
  @MaxLength(18) // Estándar de CURP
  curp_autorizado!: string; // Recibe la CURP del adulto permitido
}