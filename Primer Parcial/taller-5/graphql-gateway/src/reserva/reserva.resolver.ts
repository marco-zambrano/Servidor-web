import { Resolver, Query, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { ReservaService } from './reserva.service';
import { FuncionService } from '../funcion/funcion.service';
import { UsersService } from '../users/users.service';
import { FacturaService } from '../factura/factura.service';
import { ReservaAsientoService } from '../reserva-asiento/reserva-asiento.service';
import { ReservaType } from '../types/reserva.type';
import { FuncionType } from '../types/funcion.type';
import { UserType } from '../types/user.type';
import { FacturaType } from '../types/factura.type';
import { ReservaAsientoType } from '../types/reserva-asiento.type';

@Resolver(() => ReservaType)
export class ReservaResolver {
  constructor(
    private readonly reservaService: ReservaService,
    private readonly funcionService: FuncionService,
    private readonly usersService: UsersService,
    private readonly facturaService: FacturaService,
    private readonly reservaAsientoService: ReservaAsientoService,
  ) {}

  @Query(() => [ReservaType], { name: 'reservas' })
  findAll() {
    return this.reservaService.findAll();
  }

  @Query(() => ReservaType, { name: 'reserva' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.reservaService.findOne(id);
  }

  @ResolveField(() => FuncionType, { nullable: true })
  async funcion(@Parent() reserva: ReservaType) {
    if (reserva.funcion?.id_funcion) {
      return this.funcionService.findOne(reserva.funcion.id_funcion);
    }
    return null;
  }

  @ResolveField(() => UserType, { nullable: true })
  async usuario(@Parent() reserva: ReservaType) {
    if (reserva.usuario?.id_usuario) {
      return this.usersService.findOne(reserva.usuario.id_usuario);
    }
    return null;
  }

  @ResolveField(() => FacturaType, { nullable: true })
  async factura(@Parent() reserva: ReservaType) {
    if (reserva.factura?.id_factura) {
      return this.facturaService.findOne(reserva.factura.id_factura);
    }
    return null;
  }

  @ResolveField(() => [ReservaAsientoType], { nullable: true })
  async reservasAsiento(@Parent() reserva: ReservaType) {
    return this.reservaAsientoService.findByReserva(reserva.id_reserva);
  }
}
