// src/types/funcion.type.ts
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { PeliculaType } from './pelicula.type';
import { SalaType } from './sala.type';
import { ReservaType } from './reserva.type';

@ObjectType()
export class FuncionType {
  @Field(() => ID)
  id_funcion: string;

  @Field()
  fecha_hora: Date;

  @Field(() => Float)
  precio: number;

  @Field(() => PeliculaType, { nullable: true })
  pelicula?: PeliculaType;

  @Field(() => SalaType, { nullable: true })
  sala?: SalaType;

  @Field(() => [ReservaType], { nullable: true })
  reservas?: ReservaType[];
}