import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AsientosService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    try {
      const response = await firstValueFrom(
        this.httpService.get('/asiento')
      );
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  async findOne(id: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/asiento/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  async findBySala(salaId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/asiento?sala=${salaId}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }
}
