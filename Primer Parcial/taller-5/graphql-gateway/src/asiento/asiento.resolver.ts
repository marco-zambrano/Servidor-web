import { Resolver, Query, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { AsientoService } from './asiento.service';
import { SalasService } from '../salas/salas.service';
import { ReservaAsientoService } from '../reserva-asiento/reserva-asiento.service';
import { AsientoType } from '../types/asiento.type';
import { SalaType } from '../types/sala.type';
import { ReservaAsientoType } from '../types/reserva-asiento.type';

@Resolver(() => AsientoType)
export class AsientoResolver {
  constructor(
    private readonly asientoService: AsientoService,
    private readonly salasService: SalasService,
    private readonly reservaAsientoService: ReservaAsientoService,
  ) {}

  @Query(() => [AsientoType], { name: 'asientos' })
  findAll() {
    return this.asientoService.findAll();
  }

  @Query(() => AsientoType, { name: 'asiento' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.asientoService.findOne(id);
  }

  @ResolveField(() => SalaType, { nullable: true })
  async sala(@Parent() asiento: AsientoType) {
    if (asiento.sala?.id_sala) {
      return this.salasService.findOne(asiento.sala.id_sala);
    }
    return null;
  }

  @ResolveField(() => [ReservaAsientoType], { nullable: true })
  async reservasAsiento(@Parent() asiento: AsientoType) {
    return this.reservaAsientoService.findByAsiento(asiento.id_asiento);
  }
}
