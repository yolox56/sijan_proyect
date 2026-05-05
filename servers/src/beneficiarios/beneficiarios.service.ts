import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Beneficiario } from './entities/beneficiario.entity';
import { CreateBeneficiarioDto } from './dto/create-beneficiario.dto';
// 1. AGREGA ESTE IMPORT (Asegúrate de que el archivo exista)
import { UpdateBeneficiarioDto } from './dto/update-beneficiario.dto'; 

@Injectable()
export class BeneficiariosService {
  constructor(
    @InjectRepository(Beneficiario)
    private beneficiarioRepository: Repository<Beneficiario>,
  ) {}

  async create(createBeneficiarioDto: CreateBeneficiarioDto) {
    const { num_empleado } = createBeneficiarioDto;
    const empleadosPermitidosMock = [101, 102, 103]; 

    if (!empleadosPermitidosMock.includes(num_empleado)) {
      throw new BadRequestException(`El número de empleado ${num_empleado} no tiene derecho a este servicio.`);
    }

    const existente = await this.beneficiarioRepository.findOne({ where: { num_empleado } });
    if (existente) {
      throw new BadRequestException('Este beneficiario ya se encuentra registrado.');
    }

    const nuevoBeneficiario = this.beneficiarioRepository.create(createBeneficiarioDto);
    return await this.beneficiarioRepository.save(nuevoBeneficiario);
  }

  async findAll() {
    return await this.beneficiarioRepository.find({ relations: ['alumnos'] });
  }

  // --- COPIA DESDE AQUÍ HACIA ABAJO ---

  async findOne(num_empleado: number) {
    const beneficiario = await this.beneficiarioRepository.findOne({ 
      where: { num_empleado },
      relations: ['alumnos'] 
    });
    
    if (!beneficiario) {
      throw new NotFoundException(`Beneficiario con número de empleado ${num_empleado} no encontrado`);
    }
    return beneficiario;
  }

  async update(num_empleado: number, updateBeneficiarioDto: UpdateBeneficiarioDto) {
    // Reutilizamos findOne para validar que exista antes de intentar actualizar
    const beneficiario = await this.findOne(num_empleado); 
    const actualizado = Object.assign(beneficiario, updateBeneficiarioDto);
    return await this.beneficiarioRepository.save(actualizado);
  }

  async remove(num_empleado: number) {
    const beneficiario = await this.findOne(num_empleado);
    return await this.beneficiarioRepository.remove(beneficiario);
  }
} // <--- Esta es la última llave de la clase