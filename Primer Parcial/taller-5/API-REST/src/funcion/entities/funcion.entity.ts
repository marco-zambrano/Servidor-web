import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Pelicula } from '../../peliculas/entities/pelicula.entity';
import { Sala } from '../../salas/entities/sala.entity';
import { Reserva } from '../../reserva/entities/reserva.entity';

@Entity()
export class Funcion {
    @PrimaryGeneratedColumn('uuid')
    id_funcion: string;

    @Column('datetime')
    fecha_hora: Date;

    @Column('decimal', { precision: 10, scale: 2 })
    precio: number;

    @ManyToOne(() => Pelicula, (p) => p.funciones)
    pelicula: Pelicula;

    @ManyToOne(() => Sala, (s) => s.funciones)
    sala: Sala;

    @OneToMany(() => Reserva, (r) => r.funcion)
    reservas: Reserva[];
}
