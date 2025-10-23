import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ReservaType } from './reserva.type';

@ObjectType()
export class UserType {
  @Field(() => ID)
  id_usuario: string;

  @Field()
  nombre: string;

  @Field()
  correo: string;

  @Field()
  rol: string;

  @Field(() => [ReservaType], { nullable: true })
  reservas?: ReservaType[];
}
