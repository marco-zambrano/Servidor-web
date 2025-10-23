import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FacturasService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const response = await firstValueFrom(
      this.httpService.get('/factura')
    );
    return response.data;
  }

  async findOne(id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`/factura/${id}`)
    );
    return response.data;
  }

  async findByReserva(reservaId: string) {
    const response = await firstValueFrom(
      this.httpService.get(`/factura?reserva=${reservaId}`)
    );
    return response.data;
  }
}
