import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    nombre!: string;
    
    @Column()
    edad!: number;

    @Column()
    apellido!: string;

}
