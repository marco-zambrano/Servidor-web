import { Module } from '@nestjs/common';
import { ReporteService } from './reporte.service';
import { ReporteResolver } from './reporte.resolver';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [ReporteResolver, ReporteService],
  exports: [ReporteService],
})
export class ReporteModule {}
