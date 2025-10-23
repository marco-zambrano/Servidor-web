import { Resolver, Query, Args } from '@nestjs/graphql';
import { FacturaType } from '../types/factura.type';
import { FacturasService } from './facturas.service';

@Resolver(() => FacturaType)
export class FacturasResolver {
  constructor(private facturasService: FacturasService) {}

  @Query(() => [FacturaType], { name: 'facturas' })
  async getFacturas() {
    return this.facturasService.findAll();
  }

  @Query(() => FacturaType, { name: 'factura' })
  async getFactura(@Args('id', { type: () => String }) id: string) {
    return this.facturasService.findOne(id);
  }

  @Query(() => FacturaType, { name: 'facturaByReserva', nullable: true })
  async getFacturaByReserva(@Args('reservaId', { type: () => String }) reservaId: string) {
    const facturas = await this.facturasService.findByReserva(reservaId);
    return facturas.length > 0 ? facturas[0] : null;
  }
}