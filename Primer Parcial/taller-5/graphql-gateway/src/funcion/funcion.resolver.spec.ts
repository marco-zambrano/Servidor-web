import { Test, TestingModule } from '@nestjs/testing';
import { FuncionResolver } from './funcion.resolver';
import { FuncionService } from './funcion.service';

describe('FuncionResolver', () => {
  let resolver: FuncionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuncionResolver, FuncionService],
    }).compile();

    resolver = module.get<FuncionResolver>(FuncionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
