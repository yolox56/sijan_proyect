import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Alumno } from '../../alumnos/entities/alumno.entity';

@Entity('beneficiarios')
export class Beneficiario {
  @PrimaryColumn()
  num_empleado!: number;

  @Column({ unique: true })
  curp!: string;

  @Column()
  nombre!: string;

  @Column()
  apellidos!: string;

  @Column()
  edad!: number;

  @Column()
  plaza!: string;

  @OneToMany(() => Alumno, (alumno) => alumno.beneficiario)
  alumnos!: Alumno[];
}