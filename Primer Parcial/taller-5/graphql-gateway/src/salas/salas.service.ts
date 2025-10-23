import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SalaType } from '../types/sala.type';

@Injectable()
export class SalasService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<SalaType[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('/salas')
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error al obtener salas',
        error.response?.status || 500,
      );
    }
  }

  async findOne(id: string): Promise<SalaType> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/salas/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error al obtener la sala',
        error.response?.status || 500,
      );
    }
  }
}
