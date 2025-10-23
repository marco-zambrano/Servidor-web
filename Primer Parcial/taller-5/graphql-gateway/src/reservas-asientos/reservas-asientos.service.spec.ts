import { Test, TestingModule } from '@nestjs/testing';
import { ReservasAsientosService } from './reservas-asientos.service';

describe('ReservasAsientosService', () => {
  let service: ReservasAsientosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservasAsientosService],
    }).compile();

    service = module.get<ReservasAsientosService>(ReservasAsientosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
