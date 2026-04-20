import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';  

@Module({
  // TypeOrmModule.forFeature registra la entidad específica para este módulo
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  // Exportamos el servicio por si otros módulos necesitan validar users
  exports: [UsersService],
})
export class UsersModule {}
