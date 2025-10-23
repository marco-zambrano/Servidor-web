// src/types/pelicula.type.ts
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { FuncionType } from './funcion.type';

@ObjectType()
export class PeliculaType {
  @Field(() => ID)
  id_pelicula: string;

  @Field()
  titulo: string;

  @Field()
  genero: string;

  @Field({ nullable: true })
  descripcion?: string;

  @Field({ nullable: true })
  clasificacion?: string;

  @Field(() => [FuncionType], { nullable: true })
  funciones?: FuncionType[];
}