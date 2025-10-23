import { Resolver, Query, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { SalasService } from './salas.service';
import { AsientoService } from '../asiento/asiento.service';
import { FuncionService } from '../funcion/funcion.service';
import { SalaType } from '../types/sala.type';
import { AsientoType } from '../types/asiento.type';
import { FuncionType } from '../types/funcion.type';

@Resolver(() => SalaType)
export class SalasResolver {
  constructor(
    private readonly salasService: SalasService,
    private readonly asientoService: AsientoService,
    private readonly funcionService: FuncionService,
  ) {}

  @Query(() => [SalaType], { name: 'salas' })
  findAll() {
    return this.salasService.findAll();
  }

  @Query(() => SalaType, { name: 'sala' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.salasService.findOne(id);
  }

  @ResolveField(() => [AsientoType], { nullable: true })
  async asientos(@Parent() sala: SalaType) {
    return this.asientoService.findBySala(sala.id_sala);
  }

  @ResolveField(() => [FuncionType], { nullable: true })
  async funciones(@Parent() sala: SalaType) {
    return this.funcionService.findBySala(sala.id_sala);
  }
}
