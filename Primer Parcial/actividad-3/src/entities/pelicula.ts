import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Funcion } from "./funcion.js";

@Entity()
export class Pelicula {
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

    // Relación con Funcion (una película puede tener varias funciones)
    @OneToMany(() => Funcion, funcion => funcion.pelicula)
    funciones: Funcion[];
}