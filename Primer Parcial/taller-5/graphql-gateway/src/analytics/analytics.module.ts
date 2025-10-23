import { Module } from '@nestjs/common';
import { AnalyticsResolver } from './analytics.resolver';
import { AnalyticsService } from './analytics.service';
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
  providers: [AnalyticsResolver, AnalyticsService],
})
export class AnalyticsModule {}
