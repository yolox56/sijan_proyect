import { IsEmail, IsInt, IsString, MinLength } from 'class-validator';
export class CreateUserDto {
    @IsString()
  nombre!: string;

  @IsEmail()

  correo!: string;

  @IsInt()
  edad!: number;

  @MinLength(6)
  password!: string;
}
