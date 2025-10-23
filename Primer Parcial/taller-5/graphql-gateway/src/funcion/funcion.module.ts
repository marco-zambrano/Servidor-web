import { Module, forwardRef } from '@nestjs/common';
import { FuncionService } from './funcion.service';
import { FuncionResolver } from './funcion.resolver';
import { PeliculasModule } from '../peliculas/peliculas.module';
import { SalasModule } from '../salas/salas.module';
import { ReservaModule } from '../reserva/reserva.module';

@Module({
  imports: [
    forwardRef(() => PeliculasModule), 
    forwardRef(() => SalasModule), 
    forwardRef(() => ReservaModule)
  ],
  providers: [FuncionResolver, FuncionService],
  exports: [FuncionService],
})
export class FuncionModule {}
