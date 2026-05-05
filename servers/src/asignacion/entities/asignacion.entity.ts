import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Alumno } from '../../alumnos/entities/alumno.entity'; // Importamos la entidad Alumno para la relación
import { Autorizado } from '../../autorizados/entities/autorizado.entity'; // Importamos Autorizado para vincularlo

@Entity('asignaciones') // Define el nombre de la tabla en la base de datos
export class Asignacion {
  @PrimaryGeneratedColumn() // Crea un ID numérico autoincremental
  id!: number;

  // Relación: Muchos registros de asignación pueden pertenecer a un solo Alumno
  @ManyToOne(() => Alumno, (alumno) => alumno.curp_alumno, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'curp_alumno' }) // Define el nombre de la columna de llave foránea
  alumno!: Alumno;

  // Relación: Muchos registros de asignación pueden pertenecer a un solo Autorizado
  @ManyToOne(() => Autorizado, (autorizado) => autorizado.curp_autorizado, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'curp_autorizado' }) // Define la llave foránea que conecta con la persona autorizada
  autorizado!: Autorizado;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Registra automáticamente la fecha y hora de creación
  fecha_registro!: Date;
}