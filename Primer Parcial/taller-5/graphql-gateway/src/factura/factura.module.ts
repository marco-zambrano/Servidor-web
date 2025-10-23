import { Module, forwardRef } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaResolver } from './factura.resolver';
import { ReservaModule } from '../reserva/reserva.module';

@Module({
  imports: [forwardRef(() => ReservaModule)],
  providers: [FacturaResolver, FacturaService],
  exports: [FacturaService],
})
export class FacturaModule {}
