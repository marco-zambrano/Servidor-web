import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpModule } from '@nestjs/axios';
import { join } from 'path';
import { UsuariosRestService } from './usuarios/usuarios-rest/usuarios-rest.service';
import { SalasRestService } from './salas/salas-rest/salas-rest.service';
import { AsientosRestService } from './asientos/asientos-rest/asientos-rest.service';
import { PeliculasRestService } from './peliculas/peliculas-rest/peliculas-rest.service';
import { FuncionesRestService } from './funciones/funciones-rest/funciones-rest.service';
import { ReservasRestService } from './reservas/reservas-rest/reservas-rest.service';
import { ReservasAsientosRestService } from './reservas-asientos/reservas-asientos-rest/reservas-asientos-rest.service';
import { FacturasRestService } from './facturas/facturas-rest/facturas-rest.service';
import { ReportesRestService } from './reportes/reportes-rest/reportes-rest.service';

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
    // Aquí se importarán los módulos de resolvers
  ],
  providers: [UsuariosRestService, SalasRestService, AsientosRestService, PeliculasRestService, FuncionesRestService, ReservasRestService, ReservasAsientosRestService, FacturasRestService, ReportesRestService],
})
export class AppModule {}
