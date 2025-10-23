import { Resolver, Query, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { ReservaAsientoService } from './reserva-asiento.service';
import { ReservaService } from '../reserva/reserva.service';
import { AsientoService } from '../asiento/asiento.service';
import { ReservaAsientoType } from '../types/reserva-asiento.type';
import { ReservaType } from '../types/reserva.type';
import { AsientoType } from '../types/asiento.type';

@Resolver(() => ReservaAsientoType)
export class ReservaAsientoResolver {
  constructor(
    private readonly reservaAsientoService: ReservaAsientoService,
    private readonly reservaService: ReservaService,
    private readonly asientoService: AsientoService,
  ) {}

  @Query(() => [ReservaAsientoType], { name: 'reservasAsiento' })
  findAll() {
    return this.reservaAsientoService.findAll();
  }

  @Query(() => ReservaAsientoType, { name: 'reservaAsiento' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.reservaAsientoService.findOne(id);
  }

  @ResolveField(() => ReservaType, { nullable: true })
  async reserva(@Parent() reservaAsiento: ReservaAsientoType) {
    if (reservaAsiento.reserva?.id_reserva) {
      return this.reservaService.findOne(reservaAsiento.reserva.id_reserva);
    }
    return null;
  }

  @ResolveField(() => AsientoType, { nullable: true })
  async asiento(@Parent() reservaAsiento: ReservaAsientoType) {
    if (reservaAsiento.asiento?.id_asiento) {
      return this.asientoService.findOne(reservaAsiento.asiento.id_asiento);
    }
    return null;
  }
}
