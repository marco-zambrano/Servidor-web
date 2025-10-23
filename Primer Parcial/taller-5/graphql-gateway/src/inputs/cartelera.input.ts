import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { PeliculaType } from '../types/pelicula.type';
import { SalaType } from '../types/sala.type';

// Query 1: Cartelera completa con funciones disponibles
@ObjectType()
export class CarteleraType {
  @Field(() => PeliculaType)
  pelicula: PeliculaType;

  @Field(() => Int)
  totalFunciones: number;

  @Field(() => [FuncionCarteleraType])
  funcionesDisponibles: FuncionCarteleraType[];

  @Field(() => Float)
  precioMinimo: number;

  @Field(() => Float)
  precioMaximo: number;
}

@ObjectType()
export class FuncionCarteleraType {
  @Field(() => ID)
  id_funcion: string;

  @Field()
  fecha_hora: Date;

  @Field(() => Float)
  precio: number;

  @Field(() => SalaType)
  sala: SalaType;

  @Field(() => Int)
  asientosDisponibles: number;
}

// Query 2: Ocupación de salas
@ObjectType()
export class OcupacionSalaType {
  @Field(() => SalaType)
  sala: SalaType;

  @Field(() => Int)
  totalFunciones: number;

  @Field(() => Int)
  totalReservas: number;

  @Field(() => Int)
  asientosReservados: number;

  @Field(() => Float)
  porcentajeOcupacion: number;

  @Field(() => [FuncionOcupacionType])
  funcionesDetalle: FuncionOcupacionType[];
}

@ObjectType()
export class FuncionOcupacionType {
  @Field(() => ID)
  id_funcion: string;

  @Field()
  fecha_hora: Date;

  @Field(() => PeliculaType)
  pelicula: PeliculaType;

  @Field(() => Int)
  reservasCount: number;

  @Field(() => Int)
  asientosReservados: number;
}

// Query 3: Historial completo de usuario
@ObjectType()
export class HistorialUsuarioType {
  @Field(() => ID)
  id_usuario: string;

  @Field()
  nombre: string;

  @Field()
  correo: string;

  @Field(() => Int)
  totalReservas: number;

  @Field(() => Float)
  gastoTotal: number;

  @Field(() => [ReservaDetalladaType])
  reservas: ReservaDetalladaType[];
}

@ObjectType()
export class ReservaDetalladaType {
  @Field(() => ID)
  id_reserva: string;

  @Field()
  estado: string;

  @Field(() => Int)
  cantidad_asientos: number;

  @Field(() => PeliculaType)
  pelicula: PeliculaType;

  @Field(() => SalaType)
  sala: SalaType;

  @Field()
  fecha_funcion: Date;

  @Field(() => Float)
  precioFuncion: number;

  @Field(() => Float, { nullable: true })
  totalPagado: number;

  @Field({ nullable: true })
  fecha_emision_factura: Date;

  @Field(() => [String])
  asientosReservados: string[];
}
