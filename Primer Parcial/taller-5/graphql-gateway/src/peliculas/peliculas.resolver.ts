import { Resolver, Query, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { PeliculasService } from './peliculas.service';
import { FuncionService } from '../funcion/funcion.service';
import { PeliculaType } from '../types/pelicula.type';
import { FuncionType } from '../types/funcion.type';

@Resolver(() => PeliculaType)
export class PeliculasResolver {
  constructor(
    private readonly peliculasService: PeliculasService,
    private readonly funcionService: FuncionService,
  ) {}

  @Query(() => [PeliculaType], { name: 'peliculas' })
  findAll() {
    return this.peliculasService.findAll();
  }

  @Query(() => PeliculaType, { name: 'pelicula' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.peliculasService.findOne(id);
  }

  @ResolveField(() => [FuncionType], { nullable: true })
  async funciones(@Parent() pelicula: PeliculaType) {
    return this.funcionService.findByPelicula(pelicula.id_pelicula);
  }
}
