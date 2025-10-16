import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Reserva } from '../../reserva/entities/reserva.entity';
import { Asiento } from '../../asiento/entities/asiento.entity';

@Entity()
export class ReservaAsiento {
        @PrimaryGeneratedColumn('uuid')
        id: string;

    @ManyToOne(() => Reserva, (r) => r.reservasAsiento)
    reserva: Reserva;

    @ManyToOne(() => Asiento, (a) => a.reservasAsiento)
    asiento: Asiento;
}
