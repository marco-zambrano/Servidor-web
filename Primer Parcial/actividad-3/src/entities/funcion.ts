import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Funcion{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nombre: string;

    @Column()
    fecha: Date;
    
    @Column()
    precio: number
}