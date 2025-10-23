import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ReservaType } from '../types/reserva.type';

@Injectable()
export class ReservaService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<ReservaType[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('/reserva')
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error al obtener reservas',
        error.response?.status || 500,
      );
    }
  }

  async findOne(id: string): Promise<ReservaType> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/reserva/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error al obtener la reserva',
        error.response?.status || 500,
      );
    }
  }

  async findByFuncion(funcionId: string): Promise<ReservaType[]> {
    const reservas = await this.findAll();
    return reservas.filter(r => r.funcion?.id_funcion === funcionId);
  }

  async findByUsuario(usuarioId: string): Promise<ReservaType[]> {
    const reservas = await this.findAll();
    return reservas.filter(r => r.usuario?.id_usuario === usuarioId);
  }
}
