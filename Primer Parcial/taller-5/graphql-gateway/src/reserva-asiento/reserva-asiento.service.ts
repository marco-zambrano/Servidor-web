import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ReservaAsientoType } from '../types/reserva-asiento.type';

@Injectable()
export class ReservaAsientoService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<ReservaAsientoType[]> {
    const response = await firstValueFrom(
      this.httpService.get('/reserva-asiento')
    );
    return response.data;
  }

  async findOne(id: string): Promise<ReservaAsientoType> {
    const response = await firstValueFrom(
      this.httpService.get(`/reserva-asiento/${id}`)
    );
    return response.data;
  }

  async findByReserva(reservaId: string): Promise<ReservaAsientoType[]> {
    const reservasAsiento = await this.findAll();
    return reservasAsiento.filter(ra => ra.reserva?.id_reserva === reservaId);
  }

  async findByAsiento(asientoId: string): Promise<ReservaAsientoType[]> {
    const reservasAsiento = await this.findAll();
    return reservasAsiento.filter(ra => ra.asiento?.id_asiento === asientoId);
  }
}
