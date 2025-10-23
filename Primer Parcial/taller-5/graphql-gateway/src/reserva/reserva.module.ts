import { Module, forwardRef } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaResolver } from './reserva.resolver';
import { FuncionModule } from '../funcion/funcion.module';
import { UsersModule } from '../users/users.module';
import { FacturaModule } from '../factura/factura.module';
import { ReservaAsientoModule } from '../reserva-asiento/reserva-asiento.module';

@Module({
  imports: [
    forwardRef(() => FuncionModule),
    forwardRef(() => UsersModule),
    forwardRef(() => FacturaModule),
    forwardRef(() => ReservaAsientoModule),
  ],
  providers: [ReservaResolver, ReservaService],
  exports: [ReservaService],
})
export class ReservaModule {}
