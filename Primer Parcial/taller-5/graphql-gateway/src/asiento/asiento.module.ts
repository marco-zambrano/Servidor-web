import { Module } from '@nestjs/common';
import { AsientoService } from './asiento.service';
import { AsientoResolver } from './asiento.resolver';

@Module({
  providers: [AsientoResolver, AsientoService],
})
export class AsientoModule {}
