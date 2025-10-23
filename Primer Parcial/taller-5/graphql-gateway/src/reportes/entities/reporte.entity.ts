import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Reporte {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
