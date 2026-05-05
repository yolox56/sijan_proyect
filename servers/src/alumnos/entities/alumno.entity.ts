import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Beneficiario } from '../../beneficiarios/entities/beneficiario.entity';

export enum AlumnoStatus {
  SOLICITUD = 'SOLICITUD',
  CITA_PENDIENTE = 'CITA_PENDIENTE',
  ACTIVO = 'ACTIVO',
  BAJA = 'BAJA',
}

@Entity('alumnos')
export class Alumno {
  @PrimaryColumn()
  curp_alumno!: string;

  @Column()
  nombre!: string;

  @Column()
  apellidos!: string;

  @Column()
  edad!: number;

  @Column({ type: 'text', nullable: true })
  alergias!: string;

  @Column({
    type: 'enum',
    enum: AlumnoStatus,
    default: AlumnoStatus.SOLICITUD,
  })
  status!: AlumnoStatus;

  @ManyToOne(() => Beneficiario, (beneficiario) => beneficiario.alumnos)
  @JoinColumn({ name: 'num_empleado_beneficiario' })
  beneficiario!: Beneficiario;
}