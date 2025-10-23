import { Resolver, Query, Args } from '@nestjs/graphql';
import { ReservaAsientoType } from '../types/reserva-asiento.type';
import { ReservasAsientosService } from './reservas-asientos.service';

@Resolver(() => ReservaAsientoType)
export class ReservasAsientosResolver {
  constructor(private reservasAsientosService: ReservasAsientosService) {}

  @Query(() => [ReservaAsientoType], { name: 'reservasAsientos' })
  async getReservasAsientos() {
    return this.reservasAsientosService.findAll();
  }

  @Query(() => ReservaAsientoType, { name: 'reservaAsiento' })
  async getReservaAsiento(@Args('id', { type: () => String }) id: string) {
    return this.reservasAsientosService.findOne(id);
  }

  @Query(() => [ReservaAsientoType], { name: 'reservasAsientosByReserva' })
  async getReservasAsientosByReserva(@Args('reservaId', { type: () => String }) reservaId: string) {
    return this.reservasAsientosService.findByReserva(reservaId);
  }
}