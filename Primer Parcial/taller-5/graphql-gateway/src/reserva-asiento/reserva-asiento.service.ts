import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ReservaAsientoType } from '../types/reserva-asiento.type';

@Injectable()
export class ReservaAsientoService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<ReservaAsientoType[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('/reserva-asiento')
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error al obtener reservas de asientos',
        error.response?.status || 500,
      );
    }
  }

  async findOne(id: string): Promise<ReservaAsientoType> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/reserva-asiento/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error al obtener la reserva de asiento',
        error.response?.status || 500,
      );
    }
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
