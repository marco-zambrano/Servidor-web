import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardResolver } from './dashboard.resolver';

import { FuncionesModule } from '../funciones/funciones.module';
import { PeliculasModule } from '../peliculas/peliculas.module';
import { SalasModule } from '../salas/salas.module';
import { ReservasModule } from '../reservas/reservas.module';
import { FacturasModule } from '../facturas/facturas.module';
import { ReservasAsientosModule } from '../reservas-asientos/reservas-asientos.module';
import { AsientosModule } from '../asientos/asientos.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    FuncionesModule,
    PeliculasModule,
    SalasModule,
    ReservasModule,
    FacturasModule,
    ReservasAsientosModule,
    AsientosModule,
    UsersModule,
  ],
  providers: [DashboardResolver, DashboardService],
})
export class DashboardModule {}