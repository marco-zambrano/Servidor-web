import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReservasAsientosService } from './reservas-asientos.service';
import { ReservasAsiento } from './entities/reservas-asiento.entity';
import { CreateReservasAsientoInput } from './dto/create-reservas-asiento.input';
import { UpdateReservasAsientoInput } from './dto/update-reservas-asiento.input';

@Resolver(() => ReservasAsiento)
export class ReservasAsientosResolver {
  constructor(private readonly reservasAsientosService: ReservasAsientosService) {}

  @Mutation(() => ReservasAsiento)
  createReservasAsiento(@Args('createReservasAsientoInput') createReservasAsientoInput: CreateReservasAsientoInput) {
    return this.reservasAsientosService.create(createReservasAsientoInput);
  }

  @Query(() => [ReservasAsiento], { name: 'reservasAsientos' })
  findAll() {
    return this.reservasAsientosService.findAll();
  }

  @Query(() => ReservasAsiento, { name: 'reservasAsiento' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reservasAsientosService.findOne(id);
  }

  @Mutation(() => ReservasAsiento)
  updateReservasAsiento(@Args('updateReservasAsientoInput') updateReservasAsientoInput: UpdateReservasAsientoInput) {
    return this.reservasAsientosService.update(updateReservasAsientoInput.id, updateReservasAsientoInput);
  }

  @Mutation(() => ReservasAsiento)
  removeReservasAsiento(@Args('id', { type: () => Int }) id: number) {
    return this.reservasAsientosService.remove(id);
  }
}
