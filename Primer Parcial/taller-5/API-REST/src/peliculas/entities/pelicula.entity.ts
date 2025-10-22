import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Funcion } from '../../funcion/entities/funcion.entity';

@Entity()
export class Pelicula {
		@PrimaryGeneratedColumn('uuid')
		id_pelicula: string;

	@Column()
	titulo: string;

	@Column()
	genero: string;

	@Column({ nullable: true })
	descripcion: string;

	@Column({ nullable: true })
	clasificacion: string;

	@OneToMany(() => Funcion, (f) => f.pelicula)
	funciones: Funcion[];
}
