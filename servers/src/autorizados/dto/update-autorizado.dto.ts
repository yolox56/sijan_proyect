import { PartialType } from '@nestjs/mapped-types';
import { CreateAutorizadoDto } from './create-autorizado.dto';

export class UpdateAutorizadoDto extends PartialType(CreateAutorizadoDto) {}
