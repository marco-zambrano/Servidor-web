import { ObjectType, Field, ID, Float, Int, InputType } from '@nestjs/graphql';

ObjectType();
export class SalaKPIsType {
  @Field(() => ID)
  id_sala: string;

  @Field()
  nombre_sala: string;

  @Field()
  tipo: string;

  @Field(() => Int)
  capacidad: number;

  @Field(() => Int)
  total_funciones: number;

  @Field(() => Int)
  funciones_completadas: number;

  @Field(() => Float)
  tasa_ocupacion_promedio: number;

  @Field(() => Float)
  tasa_ocupacion_maxima: number;

  @Field(() => Float)
  tasa_ocupacion_minima: number;

  @Field(() => Float)
  ingreso_total: number;

  @Field(() => Float)
  ingreso_por_funcion: number;

  @Field(() => Int)
  asientos_vendidos_total: number;

  @Field(() => Int)
  asientos_disponibles_total: number;

  @Field(() => [HorarioPicoType])
  horarios_pico: HorarioPicoType[];
}

@ObjectType()
export class HorarioPicoType {
  @Field()
  hora: string;

  @Field(() => Int)
  funciones: number;

  @Field(() => Float)
  ocupacion_promedio: number;
}
