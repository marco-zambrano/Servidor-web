import { Resolver, Query, Args } from '@nestjs/graphql';
import { ReservaType } from '../types/reserva.type';
import { ReservasService } from './reservas.service';

@Resolver(() => ReservaType)
export class ReservasResolver {
  constructor(private reservasService: ReservasService) {}

  @Query(() => [ReservaType], { name: 'reservas' })
  async getReservas() {
    return this.reservasService.findAll();
  }

  @Query(() => ReservaType, { name: 'reserva' })
  async getReserva(@Args('id', { type: () => String }) id: string) {
    return this.reservasService.findOne(id);
  }

  @Query(() => [ReservaType], { name: 'reservasByUsuario' })
  async getReservasByUsuario(@Args('usuarioId', { type: () => String }) usuarioId: string) {
    return this.reservasService.findByUsuario(usuarioId);
  }

  @Query(() => [ReservaType], { name: 'reservasByFuncion' })
  async getReservasByFuncion(@Args('funcionId', { type: () => String }) funcionId: string) {
    return this.reservasService.findByFuncion(funcionId);
  }
}