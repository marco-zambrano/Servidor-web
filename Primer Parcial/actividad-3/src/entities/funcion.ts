import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Pelicula } from "./pelicula.js";
import { Sala } from "./sala.js";
import { Cliente } from "./cliente.js";

@Entity()
export class Funcion {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
    
    @Column()
    nombre!: string;

    @Column()
    fecha!: Date;

    @Column()
    precio!: number;

    @ManyToOne(() => Pelicula)
    @JoinColumn()
    pelicula!: Pelicula;

    @ManyToOne(() => Sala)
    @JoinColumn()
    sala!: Sala;

    @ManyToOne(() => Cliente)
    @JoinColumn()
    cliente!: Cliente;
}