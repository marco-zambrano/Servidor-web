import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AsientoType } from '../types/asiento.type';

@Injectable()
export class AsientoService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<AsientoType[]> {
    const response = await firstValueFrom(
      this.httpService.get('/asiento')
    );
    return response.data;
  }

  async findOne(id: string): Promise<AsientoType> {
    const response = await firstValueFrom(
      this.httpService.get(`/asiento/${id}`)
    );
    return response.data;
  }

  async findBySala(salaId: string): Promise<AsientoType[]> {
    const asientos = await this.findAll();
    return asientos.filter(a => a.sala?.id_sala === salaId);
  }
}
