import { ObjectType, Field, ID } from '@nestjs/graphql';
import { SalaType } from './sala.type';
import { ReservaAsientoType } from './reserva-asiento.type';

@ObjectType()
export class AsientoType {
  @Field(() => ID)
  id_asiento: string;

  @Field()
  numero: string;

  @Field()
  estado: string;

  @Field(() => SalaType, { nullable: true })
  sala?: SalaType;

  @Field(() => [ReservaAsientoType], { nullable: true })
  reservasAsiento?: ReservaAsientoType[];
}
