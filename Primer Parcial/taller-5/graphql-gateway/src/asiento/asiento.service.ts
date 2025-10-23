import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AsientoType } from '../types/asiento.type';

@Injectable()
export class AsientoService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<AsientoType[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('/asiento')
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error al obtener asientos',
        error.response?.status || 500,
      );
    }
  }

  async findOne(id: string): Promise<AsientoType> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/asiento/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error al obtener el asiento',
        error.response?.status || 500,
      );
    }
  }

  async findBySala(salaId: string): Promise<AsientoType[]> {
    const asientos = await this.findAll();
    return asientos.filter(a => a.sala?.id_sala === salaId);
  }
}
