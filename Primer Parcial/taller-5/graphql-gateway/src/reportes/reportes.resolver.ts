import { Resolver, Query, Args } from '@nestjs/graphql';
import { ReporteType } from '../types/reporte.type';
import { ReportesService } from './reportes.service';

@Resolver(() => ReporteType)
export class ReportesResolver {
  constructor(private reportesService: ReportesService) {}

  @Query(() => [ReporteType], { name: 'reportes' })
  async getReportes() {
    return this.reportesService.findAll();
  }

  @Query(() => ReporteType, { name: 'reporte' })
  async getReporte(@Args('id', { type: () => String }) id: string) {
    return this.reportesService.findOne(id);
  }

  @Query(() => [ReporteType], { name: 'reportesByAdmin' })
  async getReportesByAdmin(@Args('adminId', { type: () => String }) adminId: string) {
    return this.reportesService.findByAdmin(adminId);
  }
}