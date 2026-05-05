import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importante para conectar con la DB
import { AutorizadosService } from './autorizados.service';
import { AutorizadosController } from './autorizados.controller';
import { Autorizado } from './entities/autorizado.entity'; // Importamos la entidad
import { Beneficiario } from '../beneficiarios/entities/beneficiario.entity'; // Importamos el responsable

@Module({
  imports: [
    // FUNCIÓN: REGISTRO DE REPOSITORIOS
    // Esto le dice a Nest que este módulo tiene permiso de usar las tablas
    // de Autorizados y Beneficiarios en la base de datos.
    TypeOrmModule.forFeature([Autorizado, Beneficiario])
  ],
  controllers: [AutorizadosController],
  providers: [AutorizadosService],
  // EXPORTACIÓN PARA EL FRONT: 
  // Si otro módulo necesitara validar autorizados, lo exportaríamos aquí.
  exports: [AutorizadosService] 
})
export class AutorizadosModule {}