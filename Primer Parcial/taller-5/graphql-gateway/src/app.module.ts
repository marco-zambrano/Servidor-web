import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpModule } from '@nestjs/axios';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { SalasModule } from './salas/salas.module';
import { ReservaAsientoModule } from './reserva-asiento/reserva-asiento.module';
import { ReservaModule } from './reserva/reserva.module';
import { ReporteModule } from './reporte/reporte.module';
import { PeliculasModule } from './peliculas/peliculas.module';
import { FuncionModule } from './funcion/funcion.module';
import { FacturaModule } from './factura/factura.module';
import { AsientoModule } from './asiento/asiento.module';
import { AnalyticsModule } from './analytics/analytics.module';
@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true, // Apollo Playground
    }),
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: 'http://localhost:3000',
        timeout: 5000,
        maxRedirects: 5,
      }),
      global: true,
    }),
    UsersModule,
    SalasModule,
    ReservaAsientoModule,
    ReservaModule,
    ReporteModule,
    PeliculasModule,
    FuncionModule,
    FacturaModule,
    AsientoModule,
    AnalyticsModule,
  ],
})
export class AppModule { }