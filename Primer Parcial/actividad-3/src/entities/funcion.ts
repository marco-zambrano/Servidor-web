import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Cliente } from "./cliente.js";
import { Pelicula } from "./pelicula.js";
import { Sala } from "./sala.js";

@Entity()
export class Funcion {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    nombre: string;

    @Column()
    fecha: Date;

    @Column()
    precio: number;

    // Relación con Pelicula (muchas funciones pueden estar asociadas a una película)
    @ManyToOne(() => Pelicula, pelicula => pelicula.funciones)
    @JoinColumn()
    pelicula: Pelicula;

    // Relación con Sala (una función se lleva a cabo en una sala)
    @ManyToOne(() => Sala, sala => sala.funciones)
    @JoinColumn()
    sala: Sala;

    // Relación con Cliente (opcional, si quieres registrar clientes que asisten a la función)
    @ManyToOne(() => Cliente, cliente => cliente.funciones)
    @JoinColumn()
    cliente: Cliente;
}