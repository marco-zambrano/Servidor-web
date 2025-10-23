import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ReservaType } from '../types/reserva.type';

@Injectable()
export class ReservaService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<ReservaType[]> {
    const response = await firstValueFrom(
      this.httpService.get('/reserva')
    );
    return response.data;
  }

  async findOne(id: string): Promise<ReservaType> {
    const response = await firstValueFrom(
      this.httpService.get(`/reserva/${id}`)
    );
    return response.data;
  }

  async findByFuncion(funcionId: string): Promise<ReservaType[]> {
    const reservas = await this.findAll();
    return reservas.filter(r => r.funcion?.id_funcion === funcionId);
  }

  async findByUsuario(usuarioId: string): Promise<ReservaType[]> {
    const reservas = await this.findAll();
    return reservas.filter(r => r.usuario?.id_usuario === usuarioId);
  }
}
