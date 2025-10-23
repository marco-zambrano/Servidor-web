import { ObjectType, Field, ID, Float, Int, InputType } from '@nestjs/graphql';

@InputType()
export class BusquedaDisponibilidadInput {
  @Field(() => ID)
  id_funcion: string;

  @Field(() => Int, { nullable: true })
  asientos_requeridos?: number;

  @Field({ nullable: true })
  preferencia_ubicacion?: string; // 'adelante', 'centro', 'atras'

  @Field({ nullable: true })
  asientos_juntos?: boolean;

  @Field({ nullable: true })
  fila_preferida?: string;
}

@ObjectType()
export class DisponibilidadAsientosType {
  @Field(() => ID)
  id_funcion: string;

  @Field()
  titulo_pelicula: string;

  @Field()
  fecha_hora: Date;

  @Field()
  nombre_sala: string;

  @Field(() => Int)
  capacidad_total: number;

  @Field(() => Int)
  asientos_disponibles: number;

  @Field(() => Int)
  asientos_reservados: number;

  @Field(() => Float)
  porcentaje_disponible: number;

  @Field(() => [AsientoDisponibleType])
  asientos: AsientoDisponibleType[];

  @Field(() => [GrupoAsientosType], { nullable: true })
  sugerencias_grupos?: GrupoAsientosType[];
}

@ObjectType()
export class AsientoDisponibleType {
  @Field(() => ID)
  id_asiento: string;

  @Field()
  numero: string;

  @Field()
  estado: string;

  @Field({ nullable: true })
  fila?: string;

  @Field({ nullable: true })
  columna?: string;

  @Field({ nullable: true })
  ubicacion?: string; // 'adelante', 'centro', 'atras'
}

@ObjectType()
export class GrupoAsientosType {
  @Field(() => Int)
  cantidad: number;

  @Field()
  ubicacion: string;

  @Field(() => [String])
  numeros_asientos: string[];

  @Field(() => Boolean)
  asientos_contiguos: boolean;
}
