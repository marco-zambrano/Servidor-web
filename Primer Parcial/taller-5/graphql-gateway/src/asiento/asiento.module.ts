import { Module, forwardRef } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AsientoService } from './asiento.service';
import { AsientoResolver } from './asiento.resolver';
import { SalasModule } from '../salas/salas.module';
import { ReservaAsientoModule } from '../reserva-asiento/reserva-asiento.module';

@Module({
  imports: [HttpModule, forwardRef(() => SalasModule), forwardRef(() => ReservaAsientoModule)],
  providers: [AsientoResolver, AsientoService],
  exports: [AsientoService],
})
export class AsientoModule {}
