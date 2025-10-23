import { Module } from '@nestjs/common';
import { ReservasAsientosService } from './reservas-asientos.service';
import { ReservasAsientosResolver } from './reservas-asientos.resolver';

@Module({
  providers: [ReservasAsientosResolver, ReservasAsientosService],
})
export class ReservasAsientosModule {}
