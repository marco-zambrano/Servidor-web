import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import {
  FuncionDashboardType,
  UsuarioReporteCompletoType,
  PeliculaRendimientoType,
} from '../inputs/funcion-dashboard.input';
import { DashboardService } from './dashboard.service';

@Resolver()
export class DashboardResolver {
  constructor(private dashboardService: DashboardService) {}

  @Query(() => FuncionDashboardType, { name: 'funcionDashboard' })
  async getFuncionDashboard(
    @Args('idFuncion', { type: () => String }) idFuncion: string
  ) {
    return this.dashboardService.getFuncionDashboard(idFuncion);
  }

  @Query(() => UsuarioReporteCompletoType, { name: 'usuarioReporteCompleto' })
  async getUsuarioReporteCompleto(
    @Args('idUsuario', { type: () => String }) idUsuario: string,
    @Args('limite', { type: () => Int, nullable: true, defaultValue: 5 }) limite: number
  ) {
    return this.dashboardService.getUsuarioReporteCompleto(idUsuario, limite);
  }

  @Query(() => PeliculaRendimientoType, { name: 'peliculaRendimiento' })
  async getPeliculaRendimiento(
    @Args('idPelicula', { type: () => String }) idPelicula: string
  ) {
    return this.dashboardService.getPeliculaRendimiento(idPelicula);
  }
}