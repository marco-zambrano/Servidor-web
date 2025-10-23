import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';

// Query 2: Reporte de Usuario Completo
@ObjectType()
export class UsuarioReporteCompletoType {
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

  @Field(() => Int)
  reservas_canceladas: number;

  @Field(() => Float)
  gasto_total: number;

  @Field(() => [ReservaDetalladaType])
  ultimas_reservas: ReservaDetalladaType[];
}

@ObjectType()
export class ReservaDetalladaType {
  @Field(() => ID)
  id_reserva: string;

  @Field()
  titulo_pelicula: string;

  @Field()
  nombre_sala: string;

  @Field()
  fecha_hora_funcion: Date;

  @Field(() => Int)
  cantidad_asientos: number;

  @Field()
  estado: string;

  @Field(() => Float, { nullable: true })
  total_pagado?: number;

  @Field({ nullable: true })
  metodo_pago?: string;

  @Field(() => [String])
  numeros_asientos: string[];
}