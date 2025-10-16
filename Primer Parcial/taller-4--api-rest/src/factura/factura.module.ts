import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Factura])], //importamos el repositorio de Factura para poder usarlo en el servicio
  controllers: [FacturaController],
  providers: [FacturaService],
  exports: [TypeOrmModule] //exportamos el repositorio para poder usarlo en otros modulos
})
export class FacturaModule {}
