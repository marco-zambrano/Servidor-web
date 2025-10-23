import { ObjectType, Field, ID, Float, Int, InputType } from '@nestjs/graphql';

@InputType()
export class PeriodoAnalisisInput {
  @Field()
  fecha_inicio: Date;

  @Field()
  fecha_fin: Date;

  @Field({ nullable: true })
  agrupar_por?: string; // 'dia', 'semana', 'mes'
}

@ObjectType()
export class VentasAnalisisType {
  @Field()
  periodo: string;

  @Field(() => Int)
  total_reservas: number;

  @Field(() => Int)
  total_asientos_vendidos: number;

  @Field(() => Float)
  ingreso_total: number;

  @Field(() => Float)
  ingreso_promedio_por_reserva: number;

  @Field(() => Float)
  precio_promedio_por_asiento: number;

  @Field(() => Int)
  reservas_canceladas: number;

  @Field(() => Float)
  tasa_cancelacion: number;

  @Field()
  pelicula_mas_vendida: string;

  @Field()
  sala_mas_utilizada: string;

  @Field(() => [VentaDiariaType])
  detalle_diario: VentaDiariaType[];
}

@ObjectType()
export class VentaDiariaType {
  @Field()
  fecha: Date;

  @Field(() => Int)
  reservas: number;

  @Field(() => Float)
  ingresos: number;
}
