import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';

// Query 3: Película con Rendimiento
@ObjectType()
export class PeliculaRendimientoType {
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

  @Field(() => Int)
  total_funciones: number;

  @Field(() => Int)
  funciones_activas: number;

  @Field(() => Int)
  total_reservas: number;

  @Field(() => Float)
  ingreso_total: number;

  @Field(() => Float)
  promedio_ocupacion: number;

  @Field(() => [FuncionResumenType])
  funciones: FuncionResumenType[];
}

@ObjectType()
export class FuncionResumenType {
  @Field(() => ID)
  id_funcion: string;

  @Field()
  fecha_hora: Date;

  @Field()
  nombre_sala: string;

  @Field(() => Float)
  precio: number;

  @Field(() => Int)
  reservas: number;

  @Field(() => Float)
  ocupacion: number;
}