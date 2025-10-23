import { Test, TestingModule } from '@nestjs/testing';
import { ReservaResolver } from './reserva.resolver';
import { ReservaService } from './reserva.service';

describe('ReservaResolver', () => {
  let resolver: ReservaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservaResolver, ReservaService],
    }).compile();

    resolver = module.get<ReservaResolver>(ReservaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
