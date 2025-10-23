import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PeliculaType } from '../types/pelicula.type';

@Injectable()
export class PeliculasService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<PeliculaType[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('/peliculas')
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error al obtener películas',
        error.response?.status || 500,
      );
    }
  }

  async findOne(id: string): Promise<PeliculaType> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/peliculas/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error al obtener la película',
        error.response?.status || 500,
      );
    }
  }
}
