import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReservaService } from './reserva.service';
import { Reserva } from './entities/reserva.entity';
import { CreateReservaInput } from './dto/create-reserva.input';
import { UpdateReservaInput } from './dto/update-reserva.input';

@Resolver(() => Reserva)
export class ReservaResolver {
  constructor(private readonly reservaService: ReservaService) {}

  @Mutation(() => Reserva)
  createReserva(@Args('createReservaInput') createReservaInput: CreateReservaInput) {
    return this.reservaService.create(createReservaInput);
  }

  @Query(() => [Reserva], { name: 'reserva' })
  findAll() {
    return this.reservaService.findAll();
  }

  @Query(() => Reserva, { name: 'reserva' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reservaService.findOne(id);
  }

  @Mutation(() => Reserva)
  updateReserva(@Args('updateReservaInput') updateReservaInput: UpdateReservaInput) {
    return this.reservaService.update(updateReservaInput.id, updateReservaInput);
  }

  @Mutation(() => Reserva)
  removeReserva(@Args('id', { type: () => Int }) id: number) {
    return this.reservaService.remove(id);
  }
}
