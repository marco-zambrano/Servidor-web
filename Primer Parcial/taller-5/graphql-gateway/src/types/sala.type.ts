// src/types/sala.type.ts
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { AsientoType } from './asiento.type';
import { FuncionType } from './funcion.type';

@ObjectType()
export class SalaType {
  @Field(() => ID)
  id_sala: string;

  @Field()
  nombre: string;

  @Field(() => Int)
  capacidad: number;

  @Field()
  tipo: string;

  @Field()
  estado: string;

  @Field(() => [AsientoType], { nullable: true })
  asientos?: AsientoType[];

  @Field(() => [FuncionType], { nullable: true })
  funciones?: FuncionType[];
}
