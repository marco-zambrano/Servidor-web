import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReservasService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const response = await firstValueFrom(
      this.httpService.get('/reserva')
    );
    return response.data;
  }

  async findOne(id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`/reserva/${id}`)
    );
    return response.data;
  }

  async findByUsuario(usuarioId: string) {
    const response = await firstValueFrom(
      this.httpService.get(`/reserva?usuario=${usuarioId}`)
    );
    return response.data;
  }

  async findByFuncion(funcionId: string) {
    const response = await firstValueFrom(
      this.httpService.get(`/reserva?funcion=${funcionId}`)
    );
    return response.data;
  }
}