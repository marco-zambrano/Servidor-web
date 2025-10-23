import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FuncionService } from './funcion.service';
import { Funcion } from './entities/funcion.entity';
import { CreateFuncionInput } from './dto/create-funcion.input';
import { UpdateFuncionInput } from './dto/update-funcion.input';

@Resolver(() => Funcion)
export class FuncionResolver {
  constructor(private readonly funcionService: FuncionService) {}

  @Mutation(() => Funcion)
  createFuncion(@Args('createFuncionInput') createFuncionInput: CreateFuncionInput) {
    return this.funcionService.create(createFuncionInput);
  }

  @Query(() => [Funcion], { name: 'funcion' })
  findAll() {
    return this.funcionService.findAll();
  }

  @Query(() => Funcion, { name: 'funcion' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.funcionService.findOne(id);
  }

  @Mutation(() => Funcion)
  updateFuncion(@Args('updateFuncionInput') updateFuncionInput: UpdateFuncionInput) {
    return this.funcionService.update(updateFuncionInput.id, updateFuncionInput);
  }

  @Mutation(() => Funcion)
  removeFuncion(@Args('id', { type: () => Int }) id: number) {
    return this.funcionService.remove(id);
  }
}
