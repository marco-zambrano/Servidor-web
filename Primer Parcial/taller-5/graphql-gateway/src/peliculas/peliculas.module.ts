import { Module } from '@nestjs/common';
import { PeliculasService } from './peliculas.service';
import { PeliculasResolver } from './peliculas.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [PeliculasResolver, PeliculasService],
  exports: [PeliculasService],
})
export class PeliculasModule {}
