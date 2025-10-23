import { Test, TestingModule } from '@nestjs/testing';
import { ReportesResolver } from './reportes.resolver';
import { ReportesService } from './reportes.service';

describe('ReportesResolver', () => {
  let resolver: ReportesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportesResolver, ReportesService],
    }).compile();

    resolver = module.get<ReportesResolver>(ReportesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
