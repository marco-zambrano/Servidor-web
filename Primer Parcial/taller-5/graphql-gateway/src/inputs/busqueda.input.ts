import { ObjectType, Field, ID, Int, Float, InputType } from '@nestjs/graphql';
import { PeliculaType } from '../types/pelicula.type';
import { FuncionType } from '../types/funcion.type';

// Query 7: Búsqueda avanzada de funciones
@InputType()
export class BusquedaFuncionesInput {
  @Field({ nullable: true })
  peliculaId?: string;

  @Field({ nullable: true })
  genero?: string;

  @Field({ nullable: true })
  salaId?: string;

  @Field({ nullable: true })
  fechaInicio?: Date;

  @Field({ nullable: true })
  fechaFin?: Date;

  @Field(() => Float, { nullable: true })
  precioMinimo?: number;

  @Field(() => Float, { nullable: true })
  precioMaximo?: number;

  @Field(() => Int, { nullable: true })
  asientosMinimosDisponibles?: number;

  @Field({ nullable: true })
  ordenarPor?: string; // 'fecha', 'precio', 'disponibilidad'

  @Field({ nullable: true })
  orden?: string; // 'ASC', 'DESC'
}

@ObjectType()
export class FuncionBusquedaType {
  @Field(() => ID)
  id_funcion: string;

  @Field()
  fecha_hora: Date;

  @Field(() => Float)
  precio: number;

  @Field(() => PeliculaType)
  pelicula: PeliculaType;

  @Field()
  nombreSala: string;

  @Field(() => Int)
  capacidadSala: number;

  @Field(() => Int)
  asientosDisponibles: number;

  @Field(() => Float)
  porcentajeDisponibilidad: number;
}

// Query 8: Clientes frecuentes con análisis
@InputType()
export class FiltroClientesFrecuentesInput {
  @Field(() => Int, { nullable: true })
  minimoReservas?: number;

  @Field(() => Float, { nullable: true })
  gastoMinimo?: number;

  @Field({ nullable: true })
  fechaInicio?: Date;

  @Field({ nullable: true })
  fechaFin?: Date;

  @Field(() => Int, { defaultValue: 10 })
  limite: number;
}

@ObjectType()
export class ClienteFrecuenteType {
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

  @Field(() => Float)
  gastoPromedioPorReserva: number;

  @Field(() => [String])
  generosPreferidos: string[];

  @Field(() => [PeliculaType])
  peliculasMasVistas: PeliculaType[];

  @Field()
  ultimaReserva: Date;

  @Field(() => Int)
  diasDesdeUltimaReserva: number;
}

// Query 9: Disponibilidad de funciones con filtros
@InputType()
export class DisponibilidadFuncionesInput {
  @Field()
  fecha: Date;

  @Field({ nullable: true })
  genero?: string;

  @Field({ nullable: true })
  clasificacion?: string;

  @Field(() => Int, { nullable: true })
  asientosRequeridos?: number;

  @Field(() => Float, { nullable: true })
  presupuestoMaximo?: number;
}

@ObjectType()
export class DisponibilidadFuncionType {
  @Field()
  fecha: Date;

  @Field(() => Int)
  totalFuncionesDisponibles: number;

  @Field(() => [FuncionDisponibleType])
  funciones: FuncionDisponibleType[];
}

@ObjectType()
export class FuncionDisponibleType {
  @Field(() => FuncionType)
  funcion: FuncionType;

  @Field(() => Int)
  asientosDisponibles: number;

  @Field(() => Float)
  costoTotal: number;

  @Field()
  recomendada: boolean;

  @Field({ nullable: true })
  razonRecomendacion?: string;
}
