import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config'; // ConfigService lee el .env
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutentificacionModule } from './autentificacion/autentificacion.module';
import { BeneficiariosModule } from './beneficiarios/beneficiarios.module';
import { AlumnosModule } from './alumnos/alumnos.module';
import { AutorizadosModule } from './autorizados/autorizados.module';
import { AsignacionModule } from './asignacion/asignacion.module';

@Module({
  imports: [
    // 1. Cargamos el .env de forma global
    ConfigModule.forRoot({ isGlobal: true }),

    // 2. Conexión asíncrona a PostgreSQL (Estilo profesional)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Necesita el módulo de configuración
      inject: [ConfigService], // Inyecta el servicio para leer variables
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        // Busca automáticamente archivos que terminen en .entity.ts
        entities: [__dirname + '/**/*.entity{.ts,.js}'], 
        synchronize: true, // Crea las tablas automáticamente en DataGrip
      }),
    }),

    UsersModule,

    AutentificacionModule,

    BeneficiariosModule,

    AlumnosModule,

    AutorizadosModule,

    AsignacionModule,
  ],
})
export class AppModule {}