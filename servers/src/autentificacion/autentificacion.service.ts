
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AutentificacionService {
  constructor(private usersService: UsersService) {}

  async validarUsuario(correo: string, pass: string): Promise<any> {
    // 1. Usamos la nueva función que creamos en el paso anterior
    const usuario = await this.usersService.findOneByCorreo(correo);
    
    // 2. Comparamos (asumiendo que tu entidad User tiene .password)
    if (usuario && usuario.password === pass) {
      const { password, ...result } = usuario;
      return result;
    }
    
    throw new UnauthorizedException('Correo o contraseña incorrectos');
  }

  async login(user: any) {
    return {
      token: 'TOKEN_PROVISIONAL_' + user.id,
      usuario: {
        id: user.id,
        correo: user.correo,
        nombre: user.nombre
      },
    };
  }
}