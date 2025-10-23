import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FuncionesService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const response = await firstValueFrom(
      this.httpService.get('/funcion')
    );
    return response.data;
  }

  async findOne(id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`/funcion/${id}`)
    );
    return response.data;
  }

  async findByPelicula(peliculaId: string) {
    const response = await firstValueFrom(
      this.httpService.get(`/funcion?pelicula=${peliculaId}`)
    );
    return response.data;
  }

  async findBySala(salaId: string) {
    const response = await firstValueFrom(
      this.httpService.get(`/funcion?sala=${salaId}`)
    );
    return response.data;
  }
}

