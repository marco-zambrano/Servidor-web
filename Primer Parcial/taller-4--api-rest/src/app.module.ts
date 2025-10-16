import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { SalasModule } from './salas/salas.module';
import { PeliculasModule } from './peliculas/peliculas.module';
import { FacturaModule } from './factura/factura.module';
import { ReporteModule } from './reporte/reporte.module';
import { FuncionModule } from './funcion/funcion.module';
import { ReservaModule } from './reserva/reserva.module';
import { AsientoModule } from './asiento/asiento.module';
import { ReservaAsientoModule } from './reserva-asiento/reserva-asiento.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'cinest.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
    }), 
  UsersModule,
  SalasModule,
  PeliculasModule,
  FacturaModule,
  ReporteModule,
  FuncionModule,
  ReservaModule,
  AsientoModule,
  ReservaAsientoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
