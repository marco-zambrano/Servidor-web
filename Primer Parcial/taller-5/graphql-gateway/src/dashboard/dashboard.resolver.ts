import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { FuncionDashboardType } from '../inputs/dashboard/funcion-dashboard.input';
import { UsuarioReporteCompletoType } from '../inputs/dashboard/usuario-reporte-completo.input';
import { PeliculaRendimientoType } from '../inputs/dashboard/pelicula-rendimiento.input';
import { DashboardService } from './dashboard.service';

@Resolver()
export class DashboardResolver {
  constructor(private dashboardService: DashboardService) {}

  @Query(() => FuncionDashboardType, { name: 'funcionDashboard' })
  // @Description('Obtiene datos clave de un dashboard para una función específica, incluyendo ocupación y ingresos.')
  async getFuncionDashboard(
    @Args('idFuncion', { type: () => String }) idFuncion: string
  ) {
    return this.dashboardService.getFuncionDashboard(idFuncion);
  }

  @Query(() => UsuarioReporteCompletoType, { name: 'usuarioReporteCompleto' })
  // @Description('Obtiene un reporte completo de un usuario, incluyendo su historial de reservas y métricas de actividad.')
  async getUsuarioReporteCompleto(
    @Args('idUsuario', { type: () => String }) idUsuario: string,
    @Args('limite', { type: () => Int, nullable: true, defaultValue: 5 }) limite: number
  ) {
    return this.dashboardService.getUsuarioReporteCompleto(idUsuario, limite);
  }

  @Query(() => PeliculaRendimientoType, { name: 'peliculaRendimiento' })
  // @Description('Obtiene el rendimiento de una película, incluyendo ingresos totales, número de funciones y espectadores.')
  async getPeliculaRendimiento(
    @Args('idPelicula', { type: () => String }) idPelicula: string
  ) {
    return this.dashboardService.getPeliculaRendimiento(idPelicula);
  }
}