import { ObjectType, Field, ID, Float, Int, InputType } from '@nestjs/graphql';

@InputType()
export class BusquedaUsuariosInput {
  @Field({ nullable: true })
  nombre?: string;

  @Field({ nullable: true })
  correo?: string;

  @Field({ nullable: true })
  rol?: string;

  @Field({ nullable: true })
  reservas_min?: number;

  @Field({ nullable: true })
  reservas_max?: number;

  @Field({ nullable: true })
  gasto_min?: number;

  @Field({ nullable: true })
  gasto_max?: number;

  @Field({ nullable: true })
  fecha_ultima_reserva_desde?: Date;

  @Field({ nullable: true })
  tiene_reservas_activas?: boolean;

  @Field({ nullable: true })
  ordenar_por?: string; // 'nombre', 'total_reservas', 'gasto_total'

  @Field({ nullable: true })
  orden?: string; // 'ASC', 'DESC'

  @Field(() => Int, { nullable: true })
  limite?: number;

  @Field(() => Int, { nullable: true })
  pagina?: number;
}

@ObjectType()
export class BusquedaUsuariosResultType {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  pagina_actual: number;

  @Field(() => Int)
  total_paginas: number;

  @Field(() => [UsuarioBusquedaType])
  usuarios: UsuarioBusquedaType[];
}

@ObjectType()
export class UsuarioBusquedaType {
  @Field(() => ID)
  id_usuario: string;

  @Field()
  nombre: string;

  @Field()
  correo: string;

  @Field()
  rol: string;

  @Field(() => Int)
  total_reservas: number;

  @Field(() => Int)
  reservas_activas: number;

  @Field(() => Float)
  gasto_total: number;

  @Field({ nullable: true })
  fecha_ultima_reserva?: Date;

  @Field({ nullable: true })
  pelicula_favorita?: string;

  @Field(() => [ReservaResumenType])
  ultimas_reservas: ReservaResumenType[];
}

@ObjectType()
export class ReservaResumenType {
  @Field(() => ID)
  id_reserva: string;

  @Field()
  titulo_pelicula: string;

  @Field()
  fecha_funcion: Date;

  @Field(() => Int)
  asientos: number;

  @Field()
  estado: string;

  @Field(() => Float, { nullable: true })
  total?: number;
}
