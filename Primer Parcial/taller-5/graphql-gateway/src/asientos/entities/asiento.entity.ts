import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Asiento {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
