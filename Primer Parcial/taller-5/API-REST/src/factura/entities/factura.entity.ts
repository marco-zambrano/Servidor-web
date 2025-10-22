import { Column, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn } from 'typeorm';
import { Reserva } from '../../reserva/entities/reserva.entity';

@Entity()
export class Factura {
        @PrimaryGeneratedColumn('uuid')
        id_factura: string;

    @Column()
    fecha_emision: Date;

    @Column('decimal', { precision: 10, scale: 2 })
    total: number;

    @Column()
    metodo_pago: string;

    @OneToOne(() => Reserva, (r) => r.factura)
    @JoinColumn({ name: 'id_reserva' })
    reserva: Reserva;
}
