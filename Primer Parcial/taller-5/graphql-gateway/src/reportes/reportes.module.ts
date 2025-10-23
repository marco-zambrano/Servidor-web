import { Module } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { ReportesResolver } from './reportes.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ReportesResolver, ReportesService],
  exports: [ReportesService],
})
export class ReportesModule {}
