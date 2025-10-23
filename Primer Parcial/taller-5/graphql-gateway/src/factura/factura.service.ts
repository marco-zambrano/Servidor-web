import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { FacturaType } from '../types/factura.type';

@Injectable()
export class FacturaService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<FacturaType[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('/factura')
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error al obtener facturas',
        error.response?.status || 500,
      );
    }
  }

  async findOne(id: string): Promise<FacturaType> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/factura/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error al obtener la factura',
        error.response?.status || 500,
      );
    }
  }
}
