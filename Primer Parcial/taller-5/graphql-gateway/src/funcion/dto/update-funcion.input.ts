import { CreateFuncionInput } from './create-funcion.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFuncionInput extends PartialType(CreateFuncionInput) {
  @Field(() => Int)
  id: number;
}
