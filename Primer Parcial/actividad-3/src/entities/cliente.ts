import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Funcion } from "./funcion.js";

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    nombre!: string;

    @Column()
    correo!: string;

    //@OneToMany(() => Funcion, funcion => funcion.cliente)
    //funciones: Funcion[];
}