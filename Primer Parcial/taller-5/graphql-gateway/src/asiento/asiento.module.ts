import { Module, forwardRef } from '@nestjs/common';
import { AsientoService } from './asiento.service';
import { AsientoResolver } from './asiento.resolver';
import { SalasModule } from '../salas/salas.module';
import { ReservaAsientoModule } from '../reserva-asiento/reserva-asiento.module';

@Module({
  imports: [forwardRef(() => SalasModule), forwardRef(() => ReservaAsientoModule)],
  providers: [AsientoResolver, AsientoService],
  exports: [AsientoService],
})
export class AsientoModule {}
