import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Asiento } from '../../asiento/entities/asiento.entity';
import { Funcion } from '../../funcion/entities/funcion.entity';

@Entity()
export class Sala {
		@PrimaryGeneratedColumn('uuid')
		id_sala: string;

	@Column()
	nombre: string;

	@Column('int')
	capacidad: number;

	@Column()
	tipo: string;

	@Column()
	estado: string;

	@OneToMany(() => Asiento, (a) => a.sala)
	asientos: Asiento[];

	@OneToMany(() => Funcion, (f) => f.sala)
	funciones: Funcion[];
}
