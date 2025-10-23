import { Resolver, Query, Args } from '@nestjs/graphql';
import { PeliculaType } from '../types/pelicula.type';
import { PeliculasService } from './peliculas.service';

@Resolver(() => PeliculaType)
export class PeliculasResolver {
  constructor(private peliculasService: PeliculasService) {}

  @Query(() => [PeliculaType], { name: 'peliculas' })
  async getPeliculas() {
    return this.peliculasService.findAll();
  }

  @Query(() => PeliculaType, { name: 'pelicula' })
  async getPelicula(@Args('id', { type: () => String }) id: string) {
    return this.peliculasService.findOne(id);
  }
}