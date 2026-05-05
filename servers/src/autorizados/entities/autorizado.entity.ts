import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Beneficiario } from '../../beneficiarios/entities/beneficiario.entity';
import { Asignacion } from '../../asignacion/entities/asignacion.entity';

@Entity('autorizados')
export class Autorizado {
  @PrimaryColumn()
  curp_autorizado!: string;

  @Column()
  nombre!: string;

  @Column()
  apellidos!: string;

  @Column()
  edad!: number;

  @ManyToOne(() => Beneficiario)
  @JoinColumn({ name: 'num_empleado_beneficiario' })
  beneficiario!: Beneficiario;

  // Conexión con la tabla intermedia
  @OneToMany(() => Asignacion, (asignacion) => asignacion.autorizado)
  asignaciones!: Asignacion[];
}