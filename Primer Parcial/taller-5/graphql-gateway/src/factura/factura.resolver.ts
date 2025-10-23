import { Resolver, Query, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { FacturaService } from './factura.service';
import { ReservaService } from '../reserva/reserva.service';
import { FacturaType } from '../types/factura.type';
import { ReservaType } from '../types/reserva.type';

@Resolver(() => FacturaType)
export class FacturaResolver {
  constructor(
    private readonly facturaService: FacturaService,
    private readonly reservaService: ReservaService,
  ) {}

  @Query(() => [FacturaType], { name: 'facturas' })
  findAll() {
    return this.facturaService.findAll();
  }

  @Query(() => FacturaType, { name: 'factura' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.facturaService.findOne(id);
  }

  @ResolveField(() => ReservaType, { nullable: true })
  async reserva(@Parent() factura: FacturaType) {
    if (factura.reserva?.id_reserva) {
      return this.reservaService.findOne(factura.reserva.id_reserva);
    }
    return null;
  }
}
