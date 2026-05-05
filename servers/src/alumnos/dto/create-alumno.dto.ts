import { IsString, IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateAlumnoDto {
  @IsString()
  @IsNotEmpty()
  curp_alumno!: string;

  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  apellidos!: string;

  @IsInt()
  @Min(0)
  @Max(6) // Edad máxima para guardería
  edad!: number;
  @IsString()
  @IsNotEmpty()
  alergias!: string;

  @IsString()
  status!: string; // "SOLICITUD", "ESPERA", "ACTIVO"

  @IsInt()
  @IsNotEmpty()
  num_empleado_beneficiario!: number; // El ID del papá/mamá
}