import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Alumno } from '../alumnos/entities/alumno.entity';
import { Autorizado } from '../autorizados/entities/autorizado.entity';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto'; // Importamos el DTO de actualización

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion)
    private asignacionRepository: Repository<Asignacion>, // Repositorio principal de este servicio
    @InjectRepository(Alumno)
    private alumnoRepository: Repository<Alumno>, // Necesario para validar que el niño exista
    @InjectRepository(Autorizado)
    private autorizadoRepository: Repository<Autorizado>, // Necesario para validar que la persona autorizada exista
  ) {}

  // MÉTODO: Crea un nuevo permiso de entrega entre un niño y un adulto
  async create(createAsignacionDto: CreateAsignacionDto) {
    const { curp_alumno, curp_autorizado } = createAsignacionDto; // Extraemos las CURPs del DTO

    // 1. Buscamos al alumno en la tabla de alumnos
    const alumno = await this.alumnoRepository.findOne({ where: { curp_alumno } });
    if (!alumno) throw new NotFoundException('Alumno no encontrado'); // Si no existe, enviamos un error 404

    // 2. Buscamos a la persona autorizada en su tabla correspondiente
    const autorizado = await this.autorizadoRepository.findOne({ where: { curp_autorizado } });
    if (!autorizado) throw new NotFoundException('Autorizado no encontrado'); // Si no existe, enviamos un error 404

    try {
      // 3. Creamos la instancia de la relación vinculando los objetos completos
      const nuevaAsignacion = this.asignacionRepository.create({ alumno, autorizado });
      return await this.asignacionRepository.save(nuevaAsignacion); // Guardamos la asignación en la DB
    } catch (error) {
      // Si la base de datos detecta que ya existe esa combinación exacta, lanzamos un error 400
      throw new BadRequestException('Esta asignación ya existe para este alumno y autorizado.');
    }
  }

  // MÉTODO: Retorna todas las asignaciones registradas en "el sijan"
  async findAll() {
    // CONEXIÓN FRONTEND: El administrador podrá ver la lista completa de "Quién puede recoger a quién"
    return await this.asignacionRepository.find({ 
      relations: ['alumno', 'autorizado'] // Trae los datos de ambas tablas en un solo JSON
    });
  }

  // MÉTODO: Busca una asignación específica por su ID numérico
  async findOne(id: number) {
    // CONEXIÓN FRONTEND: Útil si se desea ver el detalle de un permiso específico
    const asignacion = await this.asignacionRepository.findOne({
      where: { id },
      relations: ['alumno', 'autorizado'] // Incluye la información del niño y el adulto
    });
    if (!asignacion) throw new NotFoundException(`La asignación con ID #${id} no existe`);
    return asignacion;
  }

  // MÉTODO: Permite actualizar una asignación (por ejemplo, cambiar el alumno o el autorizado)
  async update(id: number, updateAsignacionDto: UpdateAsignacionDto) {
    // 1. Verificamos que el registro exista primero
    const asignacion = await this.findOne(id);
    
    // 2. Fusionamos los cambios del DTO con el registro actual de la base de datos
    const actualizado = Object.assign(asignacion, updateAsignacionDto);
    
    // 3. Guardamos los cambios en PostgreSQL
    return await this.asignacionRepository.save(actualizado);
  }

  // MÉTODO: Elimina permanentemente un permiso de entrega
  async remove(id: number) {
    // 1. Buscamos el registro para confirmar que existe
    const asignacion = await this.findOne(id);
    
    // 2. Borramos el registro físico de la tabla 'asignaciones'
    return await this.asignacionRepository.remove(asignacion);
  }

  // MÉTODO EXTRA PARA EL FRONTEND: Filtra autorizados por un niño específico
  async findAutorizadosByAlumno(curp_alumno: string) {
    // CONEXIÓN FRONTEND: Este método es el que usará la maestra en la puerta de la guardería
    return await this.asignacionRepository.find({
      where: { alumno: { curp_alumno } },
      relations: ['autorizado'] // Solo necesitamos saber quiénes son los adultos permitidos
    });
  }
}