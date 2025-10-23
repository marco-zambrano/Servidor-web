import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpModule } from '@nestjs/axios';
import { join } from 'path';

import { ReportesModule } from './reportes/reportes.module';
import { FacturasModule } from './facturas/facturas.module';
import { ReservasAsientosModule } from './reservas-asientos/reservas-asientos.module';
import { ReservasModule } from './reservas/reservas.module';
import { FuncionesModule } from './funciones/funciones.module';
import { PeliculasModule } from './peliculas/peliculas.module';
import { AsientosModule } from './asientos/asientos.module';
import { UsersModule } from './users/users.module';
import { SalasModule } from './salas/salas.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true, // Apollo Playground
    }),
    HttpModule.register({
      baseURL: 'http://localhost:3000', // URL del servicio REST
      timeout: 5000,
      maxRedirects: 5,
    }),
    SalasModule,
    UsersModule,
    AsientosModule,
    PeliculasModule,
    FuncionesModule,
    ReservasModule,
    ReservasAsientosModule,
    FacturasModule,
    ReportesModule,
    DashboardModule,
    AnalyticsModule,
    SearchModule,
  ],
  providers: [],
})
export class AppModule {}
