import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReporteService {
    constructor(private readonly httpService: HttpService) { }

    async findAll() {
        try {
            const response = await firstValueFrom(
                this.httpService.get('/reporte'),
            );
            return response.data;
        } catch (error) {
            throw new HttpException(
                error.response?.data || 'Error al obtener reportes',
                error.response?.status || 500,
            );
        }
    }

    async findOne(id: string) {
        try {
            const response = await firstValueFrom(
                this.httpService.get(`/reporte/${id}`),
            );
            return response.data;
        } catch (error) {
            throw new HttpException(
                error.response?.data || 'Error al obtener el reporte',
                error.response?.status || 500,
            );
        }
    }
}
