import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Sala } from '../../salas/entities/sala.entity';
import { ReservaAsiento } from '../../reserva-asiento/entities/reserva-asiento.entity';

@Entity()
export class Asiento {
    @PrimaryGeneratedColumn('uuid')
    id_asiento: string;

    @Column()
    numero: string;

    @Column()
    estado: string;

    @ManyToOne(() => Sala, (s) => s.asientos)
    sala: Sala;

    @OneToMany(() => ReservaAsiento, (ra) => ra.asiento)
    reservasAsiento: ReservaAsiento[];
}
