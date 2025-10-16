import { Module } from '@nestjs/common';
import { ReporteService } from './reporte.service';
import { ReporteController } from './reporte.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reporte } from './entities/reporte.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reporte])], //importamos el repositorio de Reporte para poder usarlo en el servicio
  controllers: [ReporteController],
  providers: [ReporteService],
  exports: [TypeOrmModule] //exportamos el repositorio para poder usarlo en otros modulos
})
export class ReporteModule {}
