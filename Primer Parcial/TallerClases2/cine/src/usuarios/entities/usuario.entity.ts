import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id_usuario: string;

    @Column()
    nombre: string;

    @Column()
    correo: string;

    @Column()
    contraseña: string;

    @Column()
    rol: string;
}

