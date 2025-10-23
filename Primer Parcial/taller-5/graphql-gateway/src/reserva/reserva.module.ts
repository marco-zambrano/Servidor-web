import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaResolver } from './reserva.resolver';

@Module({
  providers: [ReservaResolver, ReservaService],
})
export class ReservaModule {}
