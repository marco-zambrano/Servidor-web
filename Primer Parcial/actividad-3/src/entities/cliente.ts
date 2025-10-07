import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"
 

@Entity()
export class Cliente{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nombre: string;

    @Column()
    correo: string;

    @Column()
    telefono: string;

    @Column()
    direccion: string;

    @Column()
    fechaRegistro: Date;
}