import { Test, TestingModule } from '@nestjs/testing';
import { ReservasAsientosResolver } from './reservas-asientos.resolver';
import { ReservasAsientosService } from './reservas-asientos.service';

describe('ReservasAsientosResolver', () => {
  let resolver: ReservasAsientosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservasAsientosResolver, ReservasAsientosService],
    }).compile();

    resolver = module.get<ReservasAsientosResolver>(ReservasAsientosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
