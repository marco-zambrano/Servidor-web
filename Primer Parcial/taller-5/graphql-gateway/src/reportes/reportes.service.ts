import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReportesService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    try {
      const response = await firstValueFrom(
        this.httpService.get('/reporte')
      );
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  async findOne(id: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/reporte/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  async findByAdmin(adminId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/reporte?admin=${adminId}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }
}