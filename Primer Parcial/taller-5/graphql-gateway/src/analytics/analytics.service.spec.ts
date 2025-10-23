import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsService } from './analytics.service';
import { ReservasService } from '../reservas/reservas.service';
import { FacturasService } from '../facturas/facturas.service';
import { FuncionesService } from '../funciones/funciones.service';
import { PeliculasService } from '../peliculas/peliculas.service';
import { SalasService } from '../salas/salas.service';

describe('AnalyticsService', () => {
  let service: AnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalyticsService,
        { provide: ReservasService, useValue: {} },
        { provide: FacturasService, useValue: {} },
        { provide: FuncionesService, useValue: {} },
        { provide: PeliculasService, useValue: {} },
        { provide: SalasService, useValue: {} },
      ],
    }).compile();

    service = module.get<AnalyticsService>(AnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
