import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AsignacionesService } from './asignacion.service';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';

@Controller('asignaciones') // Define la ruta base: localhost:3001/asignaciones
export class AsignacionesController {
  constructor(private readonly asignacionesService: AsignacionesService) {}

  @Post() // Escucha peticiones POST para crear asignaciones
  create(@Body() createAsignacionDto: CreateAsignacionDto) {
    return this.asignacionesService.create(createAsignacionDto);
  }

  @Get() // Escucha peticiones GET para ver todos los registros
  findAll() {
    return this.asignacionesService.findAll();
  }

  @Get('alumno/:curp') // Ruta dinámica para consultar por niño: asignaciones/alumno/CURP123
  findByAlumno(@Param('curp') curp: string) {
    // CONEXIÓN FRONTEND: Se usará en la pantalla de "Salida de Alumnos"
    return this.asignacionesService.findAutorizadosByAlumno(curp);
  }

  @Delete(':id') // Escucha peticiones DELETE por ID para quitar un permiso
  remove(@Param('id') id: string) {
    return this.asignacionesService.remove(+id); // El '+' convierte el texto de la URL en número
  }
}
