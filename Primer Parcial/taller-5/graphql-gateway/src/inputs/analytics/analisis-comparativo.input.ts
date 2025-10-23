import { ObjectType, Field, ID, Float, Int, InputType } from '@nestjs/graphql';

@ObjectType()
export class GeneroAnalisisType {
  @Field()
  genero: string;

  @Field(() => Int)
  total_peliculas: number;

  @Field(() => Int)
  total_funciones: number;

  @Field(() => Int)
  total_reservas: number;

  @Field(() => Float)
  ingreso_total: number;

  @Field(() => Float)
  promedio_ocupacion: number;

  @Field(() => Float)
  ingreso_promedio_por_pelicula: number;

  @Field(() => Float)
  reservas_promedio_por_funcion: number;

  @Field()
  pelicula_top: string;

  @Field(() => Float)
  ingreso_pelicula_top: number;

  @Field(() => [PeliculaComparativaType])
  peliculas: PeliculaComparativaType[];
}

@ObjectType()
export class PeliculaComparativaType {
  @Field()
  titulo: string;

  @Field(() => Int)
  funciones: number;

  @Field(() => Int)
  reservas: number;

  @Field(() => Float)
  ingresos: number;

  @Field(() => Float)
  ocupacion: number;
}
