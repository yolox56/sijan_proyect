import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsignacionesService } from './asignacion.service';
import { AsignacionesController } from './asignacion.controller';
import { Asignacion } from './entities/asignacion.entity'; // Entidad base del módulo
import { Alumno } from '../alumnos/entities/alumno.entity'; // Entidad necesaria para validación
import { Autorizado } from '../autorizados/entities/autorizado.entity'; // Entidad necesaria para validación

@Module({
  imports: [
    // Registra los repositorios para que el Servicio pueda usarlos
    TypeOrmModule.forFeature([Asignacion, Alumno, Autorizado]) 
  ],
  controllers: [AsignacionesController], // Registra el controlador de rutas
  providers: [AsignacionesService], // Registra la lógica de negocio
})
export class AsignacionModule {}