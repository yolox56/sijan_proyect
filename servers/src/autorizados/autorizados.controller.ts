import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AutorizadosService } from './autorizados.service';
import { CreateAutorizadoDto } from './dto/create-autorizado.dto';
import { UpdateAutorizadoDto } from './dto/update-autorizado.dto';

@Controller('autorizados')
export class AutorizadosController {
  constructor(private readonly autorizadosService: AutorizadosService) {}

  @Post()
  create(@Body() createAutorizadoDto: CreateAutorizadoDto) {
    return this.autorizadosService.create(createAutorizadoDto);
  }

  @Get()
  findAll() {
    return this.autorizadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // Eliminamos el '+' porque la CURP es un string
    return this.autorizadosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAutorizadoDto: UpdateAutorizadoDto) {
    // Eliminamos el '+' para evitar el error TS2345
    return this.autorizadosService.update(id, updateAutorizadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // Eliminamos el '+' aquí también
    return this.autorizadosService.remove(id);
  }
}