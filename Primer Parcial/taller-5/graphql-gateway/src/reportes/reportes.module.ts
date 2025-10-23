import { Module } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { ReportesResolver } from './reportes.resolver';

@Module({
  providers: [ReportesResolver, ReportesService],
})
export class ReportesModule {}
