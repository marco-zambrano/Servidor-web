import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { ReservaType } from './reserva.type';

@ObjectType()
export class FacturaType {
  @Field(() => ID)
  id_factura: string;

  @Field()
  fecha_emision: Date;

  @Field(() => Float)
  total: number;

  @Field()
  metodo_pago: string;

  @Field(() => ReservaType, { nullable: true })
  reserva?: ReservaType;
}
