import { Resolver, Query, Args } from '@nestjs/graphql';
import { AsientoType } from '../types/asiento.type';
import { AsientosService } from './asientos.service';

@Resolver(() => AsientoType)
export class AsientosResolver {
  constructor(private asientosService: AsientosService) {}

  @Query(() => [AsientoType], { name: 'asientos' })
  async getAsientos() {
    return this.asientosService.findAll();
  }

  @Query(() => AsientoType, { name: 'asiento' })
  async getAsiento(@Args('id', { type: () => String }) id: string) {
    return this.asientosService.findOne(id);
  }

  @Query(() => [AsientoType], { name: 'asientosBySala' })
  async getAsientosBySala(@Args('salaId', { type: () => String }) salaId: string) {
    return this.asientosService.findBySala(salaId);
  }
}