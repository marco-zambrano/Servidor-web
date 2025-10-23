import { Resolver, Query, Args } from '@nestjs/graphql';
import { AnalyticsService } from './analytics.service';

import { PeriodoAnalisisInput, VentasAnalisisType } from '../inputs/analytics/analisis-ventas.input';
import { SalaKPIsType } from '../inputs/analytics/ocupacion-sala.input';
import { GeneroAnalisisType } from '../inputs/analytics/analisis-comparativo.input';

@Resolver()
export class AnalyticsResolver {
  constructor(private analyticsService: AnalyticsService) {}

  @Query(() => VentasAnalisisType, { name: 'ventasAnalisis' })
  // @Description('Obtiene un análisis de ventas para un período de tiempo específico, con métricas clave.') 
  async getVentasAnalisis(
    @Args('input') input: PeriodoAnalisisInput
  ) {
    return this.analyticsService.getVentasAnalisis(
      input.fecha_inicio,
      input.fecha_fin,
      input.agrupar_por
    );
  }

  @Query(() => SalaKPIsType, { name: 'salaKPIs' })
  // @Description('Obtiene los indicadores clave de rendimiento (KPIs) para una sala específica.')
  async getSalaKPIs(
    @Args('idSala', { type: () => String }) idSala: string
  ) {
    return this.analyticsService.getSalaKPIs(idSala);
  }

  @Query(() => [GeneroAnalisisType], { name: 'generoAnalisis' })
  // @Description('Realiza un análisis comparativo de películas agrupadas por género.')
  async getGeneroAnalisis() {
    return this.analyticsService.getGeneroAnalisis();
  }
}