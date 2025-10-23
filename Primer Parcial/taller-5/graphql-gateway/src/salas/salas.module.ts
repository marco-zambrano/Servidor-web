import { Module, forwardRef } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SalasService } from './salas.service';
import { SalasResolver } from './salas.resolver';
import { AsientoModule } from '../asiento/asiento.module';
import { FuncionModule } from '../funcion/funcion.module';

@Module({
  imports: [HttpModule, forwardRef(() => AsientoModule), forwardRef(() => FuncionModule)],
  providers: [SalasResolver, SalasService],
  exports: [SalasService],
})
export class SalasModule {}
