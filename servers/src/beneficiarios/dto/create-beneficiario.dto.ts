import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateBeneficiarioDto {
  @IsInt() // <--- ¡ESTO ES VITAL!
  @IsNotEmpty()
  num_empleado!: number;

  @IsString()
  @IsNotEmpty()
  curp!: string;

  @IsString()
  nombre!: string;

  @IsString()
  apellidos!: string;

  @IsInt()
  edad!: number;

  @IsString()
  plaza!: string;
}