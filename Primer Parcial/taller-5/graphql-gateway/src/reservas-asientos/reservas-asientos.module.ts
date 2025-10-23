import { Module } from '@nestjs/common';
import { ReservasAsientosService } from './reservas-asientos.service';
import { ReservasAsientosResolver } from './reservas-asientos.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ReservasAsientosResolver, ReservasAsientosService],
  exports: [ReservasAsientosService],
})
export class ReservasAsientosModule {}
