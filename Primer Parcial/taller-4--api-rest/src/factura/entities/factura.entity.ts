import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Factura {
    @PrimaryGeneratedColumn('increment')
    id_factura: number;

    @Column()
    fecha_emision: Date;

    @Column()
    total: number;

    @Column()
    metodo_pago: string;

    @Column()
    id_reserva: number;
}
