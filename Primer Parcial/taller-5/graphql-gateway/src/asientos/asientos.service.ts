import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AsientosService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const response = await firstValueFrom(
      this.httpService.get('/asiento')
    );
    return response.data;
  }

  async findOne(id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`/asiento/${id}`)
    );
    return response.data;
  }

  async findBySala(salaId: string) {
    const response = await firstValueFrom(
      this.httpService.get(`/asiento?sala=${salaId}`)
    );
    return response.data;
  }
}
