import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alumno, AlumnoStatus } from './entities/alumno.entity'; 
import { Beneficiario } from '../beneficiarios/entities/beneficiario.entity';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';

@Injectable()
export class AlumnosService {
  constructor(
    @InjectRepository(Alumno)
    private alumnoRepository: Repository<Alumno>,

    @InjectRepository(Beneficiario)
    private beneficiarioRepository: Repository<Beneficiario>,
  ) {}

  async create(createAlumnoDto: CreateAlumnoDto) {
    const { num_empleado_beneficiario, ...datosAlumno } = createAlumnoDto;

    const beneficiario = await this.beneficiarioRepository.findOne({
      where: { num_empleado: num_empleado_beneficiario }
    });

    if (!beneficiario) {
      throw new NotFoundException(`Error: El beneficiario ${num_empleado_beneficiario} no existe.`);
    }

    try {
      const nuevoAlumno = this.alumnoRepository.create({
        ...datosAlumno,
        status: datosAlumno.status as AlumnoStatus,
        beneficiario: beneficiario 
      });
      return await this.alumnoRepository.save(nuevoAlumno);
    } catch (error) {
      throw new BadRequestException('Error al insertar el alumno. Verifica la CURP.');
    }
  }

  async findAll() {
    // Espacio para frontend: Trae la relación completa para mostrar datos del tutor
    return await this.alumnoRepository.find({ relations: ['beneficiario'] });
  }

  async findOne(curp: string) {
    const alumno = await this.alumnoRepository.findOne({
      where: { curp_alumno: curp },
      relations: ['beneficiario']
    });
    if (!alumno) throw new NotFoundException(`Alumno con CURP ${curp} no encontrado`);
    return alumno;
  }

  async update(curp: string, updateAlumnoDto: UpdateAlumnoDto) {
    const alumno = await this.findOne(curp);
    const actualizado = Object.assign(alumno, updateAlumnoDto);
    return await this.alumnoRepository.save(actualizado);
  }

  async remove(curp: string) {
    const alumno = await this.findOne(curp);
    return await this.alumnoRepository.remove(alumno);
  }
}