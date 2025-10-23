import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PeliculaType } from '../types/pelicula.type';

@Injectable()
export class PeliculasService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<PeliculaType[]> {
    const response = await firstValueFrom(
      this.httpService.get('/peliculas')
    );
    return response.data;
  }

  async findOne(id: string): Promise<PeliculaType> {
    const response = await firstValueFrom(
      this.httpService.get(`/peliculas/${id}`)
    );
    return response.data;
  }
}
