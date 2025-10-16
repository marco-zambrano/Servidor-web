import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { Funcion } from '../../funcion/entities/funcion.entity';
import { User } from '../../users/entities/user.entity';
import { Factura } from '../../factura/entities/factura.entity';
import { ReservaAsiento } from '../../reserva-asiento/entities/reserva-asiento.entity';

@Entity()
export class Reserva {
    @PrimaryGeneratedColumn('uuid')
    id_reserva: string;

    @Column('int')
    cantidad_asientos: number;

    @Column()
    estado: string;

    @ManyToOne(() => Funcion, (f) => f.reservas)
    funcion: Funcion;

    @ManyToOne(() => User, (u) => u.reservas)
    usuario: User;

    @OneToOne(() => Factura, (factura) => factura.reserva, { nullable: true })
    @JoinColumn({ name: 'id_factura' })
    factura: Factura;

    @OneToMany(() => ReservaAsiento, (ra) => ra.reserva)
    reservasAsiento: ReservaAsiento[];
}
