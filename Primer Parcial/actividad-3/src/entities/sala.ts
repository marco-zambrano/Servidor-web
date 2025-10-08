import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Funcion } from "./funcion.js";

@Entity()
export class Sala {
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

    // Relación con Funcion (una sala puede tener varias funciones)
    //@OneToMany(() => Funcion, funcion => funcion.sala)
    //funciones: Funcion[];
}