import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ReservaType } from './reserva.type';
import { AsientoType } from './asiento.type';

@ObjectType()
export class ReservaAsientoType {
  @Field(() => ID)
  id: string;

  @Field(() => ReservaType, { nullable: true })
  reserva?: ReservaType;

  @Field(() => AsientoType, { nullable: true })
  asiento?: AsientoType;
}
