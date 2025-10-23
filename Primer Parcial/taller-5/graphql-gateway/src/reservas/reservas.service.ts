import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReservasService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    try {
      const response = await firstValueFrom(
        this.httpService.get('/reserva')
      );
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  async findOne(id: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/reserva/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  async findByUsuario(usuarioId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/reserva?usuario=${usuarioId}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  async findByFuncion(funcionId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/reserva?funcion=${funcionId}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }
}