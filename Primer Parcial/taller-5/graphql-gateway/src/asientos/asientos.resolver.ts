import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AsientosService } from './asientos.service';
import { Asiento } from './entities/asiento.entity';
import { CreateAsientoInput } from './dto/create-asiento.input';
import { UpdateAsientoInput } from './dto/update-asiento.input';

@Resolver(() => Asiento)
export class AsientosResolver {
  constructor(private readonly asientosService: AsientosService) {}

  @Mutation(() => Asiento)
  createAsiento(@Args('createAsientoInput') createAsientoInput: CreateAsientoInput) {
    return this.asientosService.create(createAsientoInput);
  }

  @Query(() => [Asiento], { name: 'asientos' })
  findAll() {
    return this.asientosService.findAll();
  }

  @Query(() => Asiento, { name: 'asiento' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.asientosService.findOne(id);
  }

  @Mutation(() => Asiento)
  updateAsiento(@Args('updateAsientoInput') updateAsientoInput: UpdateAsientoInput) {
    return this.asientosService.update(updateAsientoInput.id, updateAsientoInput);
  }

  @Mutation(() => Asiento)
  removeAsiento(@Args('id', { type: () => Int }) id: number) {
    return this.asientosService.remove(id);
  }
}
