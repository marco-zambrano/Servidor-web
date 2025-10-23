import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsResolver } from './analytics.resolver';

import { ReservasModule } from '../reservas/reservas.module';
import { FacturasModule } from '../facturas/facturas.module';
import { FuncionesModule } from '../funciones/funciones.module';
import { PeliculasModule } from '../peliculas/peliculas.module';
import { SalasModule } from '../salas/salas.module';

@Module({
  imports: [
    ReservasModule,
    FacturasModule,
    FuncionesModule,
    PeliculasModule,
    SalasModule,
  ],
  providers: [AnalyticsResolver, AnalyticsService],
})
export class AnalyticsModule {}