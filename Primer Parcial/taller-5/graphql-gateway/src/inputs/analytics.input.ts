import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { PeliculaType } from '../types/pelicula.type';

// Query 4: Películas más populares con estadísticas
@ObjectType()
export class PeliculaPopularType {
  @Field(() => PeliculaType)
  pelicula: PeliculaType;

  @Field(() => Int)
  totalFunciones: number;

  @Field(() => Int)
  totalReservas: number;

  @Field(() => Int)
  totalAsientosVendidos: number;

  @Field(() => Float)
  ingresosTotales: number;

  @Field(() => Float)
  promedioAsientosPorFuncion: number;

  @Field(() => Float)
  tasaOcupacion: number;
}

// Query 5: Rendimiento de funciones por horario
@ObjectType()
export class RendimientoHorarioType {
  @Field()
  rangoHorario: string;

  @Field(() => Int)
  totalFunciones: number;

  @Field(() => Int)
  totalReservas: number;

  @Field(() => Float)
  ingresosTotales: number;

  @Field(() => Float)
  promedioIngresosPorFuncion: number;

  @Field(() => Float)
  tasaOcupacionPromedio: number;

  @Field(() => [PeliculaType])
  peliculasMasVistas: PeliculaType[];
}

// Query 6: Análisis de ingresos por período
@ObjectType()
export class AnalisisIngresosType {
  @Field()
  periodo: string;

  @Field(() => Float)
  ingresosTotales: number;

  @Field(() => Int)
  totalReservas: number;

  @Field(() => Int)
  totalAsientosVendidos: number;

  @Field(() => Float)
  ticketPromedio: number;

  @Field(() => Float)
  ingresoPromedioPorDia: number;

  @Field(() => [IngresosPorPeliculaType])
  desglosePorPelicula: IngresosPorPeliculaType[];

  @Field(() => [IngresosPorSalaType])
  desglosePorSala: IngresosPorSalaType[];
}

@ObjectType()
export class IngresosPorPeliculaType {
  @Field(() => PeliculaType)
  pelicula: PeliculaType;

  @Field(() => Float)
  ingresos: number;

  @Field(() => Int)
  reservas: number;

  @Field(() => Float)
  porcentajeDelTotal: number;
}

@ObjectType()
export class IngresosPorSalaType {
  @Field(() => ID)
  id_sala: string;

  @Field()
  nombreSala: string;

  @Field(() => Float)
  ingresos: number;

  @Field(() => Int)
  funciones: number;

  @Field(() => Float)
  porcentajeDelTotal: number;
}
