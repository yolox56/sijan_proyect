/*import { Injectable } from '@nestjs/common';
import { CreateAutorizadoDto } from './dto/create-autorizado.dto';
import { UpdateAutorizadoDto } from './dto/update-autorizado.dto';

@Injectable()
export class AutorizadosService {
  create(createAutorizadoDto: CreateAutorizadoDto) {
    return 'This action adds a new autorizado';
  }

  findAll() {
    return `This action returns all autorizados`;
  }

  findOne(id: number) {
    return `This action returns a #${id} autorizado`;
  }

  update(id: number, updateAutorizadoDto: UpdateAutorizadoDto) {
    return `This action updates a #${id} autorizado`;
  }

  remove(id: number) {
    return `This action removes a #${id} autorizado`;
  }
}*/

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Autorizado } from './entities/autorizado.entity';
import { Beneficiario } from '../beneficiarios/entities/beneficiario.entity';
import { CreateAutorizadoDto } from './dto/create-autorizado.dto';
import { UpdateAutorizadoDto } from './dto/update-autorizado.dto';

@Injectable()
export class AutorizadosService {
  constructor(
    @InjectRepository(Autorizado)
    private autorizadoRepository: Repository<Autorizado>,

    @InjectRepository(Beneficiario)
    private beneficiarioRepository: Repository<Beneficiario>,
  ) {}

  async create(createAutorizadoDto: CreateAutorizadoDto) {
    const { num_empleado_beneficiario, ...datosAutorizado } = createAutorizadoDto;

    // VALIDACIÓN: Verificamos que el responsable exista
    const beneficiario = await this.beneficiarioRepository.findOne({
      where: { num_empleado: num_empleado_beneficiario }
    });

    if (!beneficiario) {
      throw new NotFoundException(`Beneficiario ${num_empleado_beneficiario} no encontrado.`);
    }

    try {
      const nuevoAutorizado = this.autorizadoRepository.create({
        ...datosAutorizado,
        beneficiario: beneficiario
      });
      return await this.autorizadoRepository.save(nuevoAutorizado);
    } catch (error) {
      throw new BadRequestException('Error al crear el autorizado. Verifica si la CURP ya existe.');
    }
  }

  async findAll() {
    // CONEXIÓN FRONT: El administrador podrá ver quién registró a cada autorizado
    return await this.autorizadoRepository.find({ relations: ['beneficiario'] });
  }

  async findOne(curp: string) {
    // CONEXIÓN FRONT: Busca por CURP para mostrar detalles en la interfaz
    const autorizado = await this.autorizadoRepository.findOne({
      where: { curp_autorizado: curp },
      relations: ['beneficiario']
    });
    if (!autorizado) throw new NotFoundException('Autorizado no encontrado');
    return autorizado;
  }

  async update(curp: string, updateAutorizadoDto: UpdateAutorizadoDto) {
    // CONEXIÓN FRONT: Permite corregir nombres o apellidos desde el formulario
    const autorizado = await this.findOne(curp);
    const actualizado = Object.assign(autorizado, updateAutorizadoDto);
    return await this.autorizadoRepository.save(actualizado);
  }

  async remove(curp: string) {
    // CONEXIÓN FRONT: Elimina a la persona de la lista de personas permitidas
    const autorizado = await this.findOne(curp);
    return await this.autorizadoRepository.remove(autorizado);
  }
}