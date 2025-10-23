import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { FacturaType } from '../types/factura.type';

@Injectable()
export class FacturaService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<FacturaType[]> {
    const response = await firstValueFrom(
      this.httpService.get('/factura')
    );
    return response.data;
  }

  async findOne(id: string): Promise<FacturaType> {
    const response = await firstValueFrom(
      this.httpService.get(`/factura/${id}`)
    );
    return response.data;
  }
}
