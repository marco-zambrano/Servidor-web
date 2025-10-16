import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
export class Reporte {
    @PrimaryGeneratedColumn('increment')
    id_reporte: number;

    @Column()
    fecha_generación: Date;

    @Column()
    id_admin: string;
}
