import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reserva } from '../../reserva/entities/reserva.entity';
import { Reporte } from '../../reporte/entities/reporte.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id_usuario: string;

    @Column()
    nombre: string;

    @Column({ unique: true })
    correo: string;

    @Column()
    contrasena: string;

    @Column()
    rol: string;

    @OneToMany(() => Reserva, (r) => r.usuario)
    reservas: Reserva[];

    @OneToMany(() => Reporte, (rep) => rep.admin)
    reportes: Reporte[];
}
