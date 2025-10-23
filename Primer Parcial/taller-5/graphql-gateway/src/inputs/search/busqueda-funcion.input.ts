import { ObjectType, Field, ID, Float, Int, InputType } from '@nestjs/graphql';

@InputType()
export class BusquedaFuncionesInput {
  @Field({ nullable: true })
  titulo_pelicula?: string;

  @Field({ nullable: true })
  genero?: string;

  @Field({ nullable: true })
  clasificacion?: string;

  @Field({ nullable: true })
  fecha_desde?: Date;

  @Field({ nullable: true })
  fecha_hasta?: Date;

  @Field({ nullable: true })
  precio_min?: number;

  @Field({ nullable: true })
  precio_max?: number;

  @Field({ nullable: true })
  tipo_sala?: string;

  @Field({ nullable: true })
  asientos_disponibles_min?: number;

  @Field({ nullable: true })
  ordenar_por?: string; // 'fecha', 'precio', 'ocupacion'

  @Field({ nullable: true })
  orden?: string; // 'ASC', 'DESC'

  @Field(() => Int, { nullable: true })
  limite?: number;

  @Field(() => Int, { nullable: true })
  pagina?: number;
}

@ObjectType()
export class BusquedaFuncionesResultType {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  pagina_actual: number;

  @Field(() => Int)
  total_paginas: number;

  @Field(() => [FuncionBusquedaType])
  funciones: FuncionBusquedaType[];
}

@ObjectType()
export class FuncionBusquedaType {
  @Field(() => ID)
  id_funcion: string;

  @Field()
  titulo_pelicula: string;

  @Field()
  genero: string;

  @Field({ nullable: true })
  clasificacion?: string;

  @Field()
  fecha_hora: Date;

  @Field(() => Float)
  precio: number;

  @Field()
  nombre_sala: string;

  @Field()
  tipo_sala: string;

  @Field(() => Int)
  capacidad_sala: number;

  @Field(() => Int)
  asientos_disponibles: number;

  @Field(() => Float)
  porcentaje_disponible: number;
}
