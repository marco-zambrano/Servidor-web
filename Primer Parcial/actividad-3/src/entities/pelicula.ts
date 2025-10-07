import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Pelicula{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    titulo: string;

    @Column()
    genero: string;

    @Column()
    descripcion: string;

    @Column()
    clasificacion: "adulto" | "jovenes" | "infantil";

}


