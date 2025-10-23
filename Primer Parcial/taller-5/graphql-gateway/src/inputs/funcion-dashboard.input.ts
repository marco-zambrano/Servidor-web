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