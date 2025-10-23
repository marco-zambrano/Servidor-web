import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { FuncionType } from './funcion.type';
import { UserType } from './user.type';
import { FacturaType } from './factura.type';
import { ReservaAsientoType } from './reserva-asiento.type';

@ObjectType()
export class ReservaType {
  @Field(() => ID)
  id_reserva: string;

  @Field(() => Int)
  cantidad_asientos: number;

  @Field()
  estado: string;

  @Field(() => FuncionType, { nullable: true })
  funcion?: FuncionType;

  @Field(() => UserType, { nullable: true })
  usuario?: UserType;

  @Field(() => FacturaType, { nullable: true })
  factura?: FacturaType;

  @Field(() => [ReservaAsientoType], { nullable: true })
  reservasAsiento?: ReservaAsientoType[];
}
