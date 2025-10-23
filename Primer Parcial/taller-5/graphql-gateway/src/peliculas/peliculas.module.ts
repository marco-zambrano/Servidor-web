import { Module, forwardRef } from '@nestjs/common';
import { PeliculasService } from './peliculas.service';
import { PeliculasResolver } from './peliculas.resolver';
import { FuncionModule } from '../funcion/funcion.module';

@Module({
  imports: [forwardRef(() => FuncionModule)],
  providers: [PeliculasResolver, PeliculasService],
  exports: [PeliculasService],
})
export class PeliculasModule {}
