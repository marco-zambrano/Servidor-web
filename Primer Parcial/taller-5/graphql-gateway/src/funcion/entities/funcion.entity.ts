import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Funcion {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
