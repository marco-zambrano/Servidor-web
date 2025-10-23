import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReportesService } from './reportes.service';
import { Reporte } from './entities/reporte.entity';
import { CreateReporteInput } from './dto/create-reporte.input';
import { UpdateReporteInput } from './dto/update-reporte.input';

@Resolver(() => Reporte)
export class ReportesResolver {
  constructor(private readonly reportesService: ReportesService) {}

  @Mutation(() => Reporte)
  createReporte(@Args('createReporteInput') createReporteInput: CreateReporteInput) {
    return this.reportesService.create(createReporteInput);
  }

  @Query(() => [Reporte], { name: 'reportes' })
  findAll() {
    return this.reportesService.findAll();
  }

  @Query(() => Reporte, { name: 'reporte' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reportesService.findOne(id);
  }

  @Mutation(() => Reporte)
  updateReporte(@Args('updateReporteInput') updateReporteInput: UpdateReporteInput) {
    return this.reportesService.update(updateReporteInput.id, updateReporteInput);
  }

  @Mutation(() => Reporte)
  removeReporte(@Args('id', { type: () => Int }) id: number) {
    return this.reportesService.remove(id);
  }
}
