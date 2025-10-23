import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';

// Query 1: Dashboard de Función
@ObjectType()
export class FuncionDashboardType {
  @Field(() => ID)
  id_funcion: string;

  @Field()
  titulo_pelicula: string;

  @Field()
  genero_pelicula: string;

  @Field()
  nombre_sala: string;

  @Field(() => Int)
  capacidad_sala: number;

  @Field()
  fecha_hora: Date;

  @Field(() => Float)
  precio: number;

  @Field(() => Int)
  total_reservas: number;

  @Field(() => Int)
  asientos_reservados: number;

  @Field(() => Int)
  asientos_disponibles: number;

  @Field(() => Float)
  porcentaje_ocupacion: number;

  @Field(() => Float)
  ingreso_estimado: number;
}