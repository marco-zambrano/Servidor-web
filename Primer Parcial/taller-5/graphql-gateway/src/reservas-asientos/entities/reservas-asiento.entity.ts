import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ReservasAsiento {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
