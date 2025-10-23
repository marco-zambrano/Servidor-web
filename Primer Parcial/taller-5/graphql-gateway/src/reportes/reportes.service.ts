import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReportesService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const response = await firstValueFrom(
      this.httpService.get('/reporte')
    );
    return response.data;
  }

  async findOne(id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`/reporte/${id}`)
    );
    return response.data;
  }

  async findByAdmin(adminId: string) {
    const response = await firstValueFrom(
      this.httpService.get(`/reporte?admin=${adminId}`)
    );
    return response.data;
  }
}