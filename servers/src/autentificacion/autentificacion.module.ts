
import { Module } from '@nestjs/common';
import { AutentificacionController } from './autentificacion.controller';
import { AutentificacionService } from './autentificacion.service';
import { UsersModule } from '../users/users.module'; // Importante para usar UsersService

@Module({
  imports: [UsersModule], 
  controllers: [AutentificacionController],
  providers: [AutentificacionService],
})
export class AutentificacionModule {}