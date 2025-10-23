import { CreateReservasAsientoInput } from './create-reservas-asiento.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReservasAsientoInput extends PartialType(CreateReservasAsientoInput) {
  @Field(() => Int)
  id: number;
}
