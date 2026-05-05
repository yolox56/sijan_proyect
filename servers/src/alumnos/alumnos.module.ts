import { Module } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { AlumnosController } from './alumnos.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Alumno } from './entities/alumno.entity';
import { Beneficiario } from '../beneficiarios/entities/beneficiario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Alumno, Beneficiario]) // sirve para importar las entidades de alumno y beneficiario en el módulo de alumnos, lo que permite que el servicio de alumnos
    //  pueda interactuar con la base de datos utilizando estas entidades.
  ],
  controllers: [AlumnosController],
  providers: [AlumnosService],
})
export class AlumnosModule {}
