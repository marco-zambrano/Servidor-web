import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AsientoService } from './asiento.service';
import { Asiento } from './entities/asiento.entity';
import { CreateAsientoInput } from './dto/create-asiento.input';
import { UpdateAsientoInput } from './dto/update-asiento.input';

@Resolver(() => Asiento)
export class AsientoResolver {
  constructor(private readonly asientoService: AsientoService) {}

  @Mutation(() => Asiento)
  createAsiento(@Args('createAsientoInput') createAsientoInput: CreateAsientoInput) {
    return this.asientoService.create(createAsientoInput);
  }

  @Query(() => [Asiento], { name: 'asiento' })
  findAll() {
    return this.asientoService.findAll();
  }

  @Query(() => Asiento, { name: 'asiento' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.asientoService.findOne(id);
  }

  @Mutation(() => Asiento)
  updateAsiento(@Args('updateAsientoInput') updateAsientoInput: UpdateAsientoInput) {
    return this.asientoService.update(updateAsientoInput.id, updateAsientoInput);
  }

  @Mutation(() => Asiento)
  removeAsiento(@Args('id', { type: () => Int }) id: number) {
    return this.asientoService.remove(id);
  }
}
