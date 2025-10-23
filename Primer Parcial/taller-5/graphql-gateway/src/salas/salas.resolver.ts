import { Resolver, Query, Args } from '@nestjs/graphql';
import { SalaType } from '../types/sala.type';
import { SalasService } from './salas.service';

@Resolver(() => SalaType)
export class SalasResolver {
  constructor(private salasService: SalasService) {}

  @Query(() => [SalaType], { name: 'salas' })
  async getSalas() {
    return this.salasService.findAll();
  }

  @Query(() => SalaType, { name: 'sala' })
  async getSala(@Args('id', { type: () => String }) id: string) {
    return this.salasService.findOne(id);
  }
}