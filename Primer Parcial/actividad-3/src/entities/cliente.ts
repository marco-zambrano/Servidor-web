import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    nombre!: string;

    @Column()
    correo!: string;
}