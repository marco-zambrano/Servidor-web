import { Module } from '@nestjs/common';
import { AnalyticsResolver } from './analytics.resolver';
import { AnalyticsService } from './analytics.service';
import { AnalyticsIntegrante1Service } from './analytics-integrante1.service';
import { AnalyticsIntegrante2Service } from './analytics-integrante2.service';
import { AnalyticsIntegrante3Service } from './analytics-integrante3.service';
import { PeliculasModule } from '../peliculas/peliculas.module';
import { FuncionModule } from '../funcion/funcion.module';
import { SalasModule } from '../salas/salas.module';
import { ReservaModule } from '../reserva/reserva.module';
import { AsientoModule } from '../asiento/asiento.module';
import { UsersModule } from '../users/users.module';
import { FacturaModule } from '../factura/factura.module';
import { ReservaAsientoModule } from '../reserva-asiento/reserva-asiento.module';

@Module({
  imports: [
    PeliculasModule,
    FuncionModule,
    SalasModule,
    ReservaModule,
    AsientoModule,
    UsersModule,
    FacturaModule,
    ReservaAsientoModule,
  ],
  providers: [
    AnalyticsResolver,
    AnalyticsService,
    AnalyticsIntegrante1Service,
    AnalyticsIntegrante2Service,
    AnalyticsIntegrante3Service,
  ],
})
export class AnalyticsModule {}
