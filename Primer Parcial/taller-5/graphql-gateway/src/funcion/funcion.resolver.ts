import { Resolver, Query, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { FuncionService } from './funcion.service';
import { PeliculasService } from '../peliculas/peliculas.service';
import { SalasService } from '../salas/salas.service';
import { ReservaService } from '../reserva/reserva.service';
import { FuncionType } from '../types/funcion.type';
import { PeliculaType } from '../types/pelicula.type';
import { SalaType } from '../types/sala.type';
import { ReservaType } from '../types/reserva.type';

@Resolver(() => FuncionType)
export class FuncionResolver {
  constructor(
    private readonly funcionService: FuncionService,
    private readonly peliculasService: PeliculasService,
    private readonly salasService: SalasService,
    private readonly reservaService: ReservaService,
  ) {}

  @Query(() => [FuncionType], { name: 'funciones' })
  findAll() {
    return this.funcionService.findAll();
  }

  @Query(() => FuncionType, { name: 'funcion' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.funcionService.findOne(id);
  }

  @ResolveField(() => PeliculaType, { nullable: true })
  async pelicula(@Parent() funcion: FuncionType) {
    if (funcion.pelicula?.id_pelicula) {
      return this.peliculasService.findOne(funcion.pelicula.id_pelicula);
    }
    return null;
  }

  @ResolveField(() => SalaType, { nullable: true })
  async sala(@Parent() funcion: FuncionType) {
    if (funcion.sala?.id_sala) {
      return this.salasService.findOne(funcion.sala.id_sala);
    }
    return null;
  }

  @ResolveField(() => [ReservaType], { nullable: true })
  async reservas(@Parent() funcion: FuncionType) {
    return this.reservaService.findByFuncion(funcion.id_funcion);
  }
}
