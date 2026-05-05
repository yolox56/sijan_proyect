import { Module } from '@nestjs/common';
import { BeneficiariosService } from './beneficiarios.service';
import { BeneficiariosController } from './beneficiarios.controller';
import { Beneficiario } from './entities/beneficiario.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([Beneficiario])],// Aquí importamos el módulo de TypeORM para la entidad Beneficiario
  controllers: [BeneficiariosController],
  providers: [BeneficiariosService],
})
export class BeneficiariosModule {}
