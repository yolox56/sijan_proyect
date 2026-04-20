

import { Controller, Post, Body } from '@nestjs/common';
import { AutentificacionService } from './autentificacion.service';

@Controller('autentificacion')
export class AutentificacionController {
  constructor(private authService: AutentificacionService) {}

  @Post('login')
  async login(@Body() body: any) {
    // Aquí recibimos 'email' del frontend y lo pasamos al servicio
    const user = await this.authService.validarUsuario(body.correo, body.password);
    return this.authService.login(user);
  }
}