import { Resolver, Query, Args } from '@nestjs/graphql';
import { FuncionType } from '../types/funcion.type';
import { FuncionesService } from './funciones.service';

@Resolver(() => FuncionType)
export class FuncionesResolver {
  constructor(private funcionesService: FuncionesService) {}

  @Query(() => [FuncionType], { name: 'funciones' })
  async getFunciones() {
    return this.funcionesService.findAll();
  }

  @Query(() => FuncionType, { name: 'funcion' })
  async getFuncion(@Args('id', { type: () => String }) id: string) {
    return this.funcionesService.findOne(id);
  }

  @Query(() => [FuncionType], { name: 'funcionesByPelicula' })
  async getFuncionesByPelicula(@Args('peliculaId', { type: () => String }) peliculaId: string) {
    return this.funcionesService.findByPelicula(peliculaId);
  }

  @Query(() => [FuncionType], { name: 'funcionesBySala' })
  async getFuncionesBySala(@Args('salaId', { type: () => String }) salaId: string) {
    return this.funcionesService.findBySala(salaId);
  }
}