import { Test, TestingModule } from '@nestjs/testing';
import { AsientoResolver } from './asiento.resolver';
import { AsientoService } from './asiento.service';

describe('AsientoResolver', () => {
  let resolver: AsientoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsientoResolver, AsientoService],
    }).compile();

    resolver = module.get<AsientoResolver>(AsientoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
