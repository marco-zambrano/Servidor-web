import { Module, forwardRef } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PeliculasService } from './peliculas.service';
import { PeliculasResolver } from './peliculas.resolver';
import { FuncionModule } from '../funcion/funcion.module';

@Module({
  imports: [HttpModule, forwardRef(() => FuncionModule)],
  providers: [PeliculasResolver, PeliculasService],
  exports: [PeliculasService],
})
export class PeliculasModule {}
