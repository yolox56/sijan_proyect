import { IsString, IsInt, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateAutorizadoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(18)
  @MaxLength(18)
  curp_autorizado!: string; // Usamos !: para asegurar que el valor llegará tras la validación

  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  apellidos!: string;

  @IsInt()
  @IsNotEmpty()
  edad!: number;

  @IsInt()
  @IsNotEmpty()
  num_empleado_beneficiario!: number; // ID del trabajador responsable
}