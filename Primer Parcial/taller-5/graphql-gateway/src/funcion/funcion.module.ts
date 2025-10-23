import { Module } from '@nestjs/common';
import { FuncionService } from './funcion.service';
import { FuncionResolver } from './funcion.resolver';

@Module({
  providers: [FuncionResolver, FuncionService],
})
export class FuncionModule {}
