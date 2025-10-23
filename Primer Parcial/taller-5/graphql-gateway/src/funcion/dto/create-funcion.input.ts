import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFuncionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
