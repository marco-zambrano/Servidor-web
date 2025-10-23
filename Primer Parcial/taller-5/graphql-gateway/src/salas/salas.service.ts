import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SalaType } from '../types/sala.type';

@Injectable()
export class SalasService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<SalaType[]> {
    const response = await firstValueFrom(
      this.httpService.get('/salas')
    );
    return response.data;
  }

  async findOne(id: string): Promise<SalaType> {
    const response = await firstValueFrom(
      this.httpService.get(`/salas/${id}`)
    );
    return response.data;
  }
}
