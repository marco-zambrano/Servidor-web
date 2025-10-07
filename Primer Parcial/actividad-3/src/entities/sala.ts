import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Sala{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nombre: string;

    @Column()
    capacidad: number;

    @Column()
    tipo: string;

    @Column()
    estado: "disponible" | "ocupada" | "mantenimiento";

}


