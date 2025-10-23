import { Injectable } from '@nestjs/common';
import { CreateReservasAsientoInput } from './dto/create-reservas-asiento.input';
import { UpdateReservasAsientoInput } from './dto/update-reservas-asiento.input';

@Injectable()
export class ReservasAsientosService {
  create(createReservasAsientoInput: CreateReservasAsientoInput) {
    return 'This action adds a new reservasAsiento';
  }

  findAll() {
    return `This action returns all reservasAsientos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservasAsiento`;
  }

  update(id: number, updateReservasAsientoInput: UpdateReservasAsientoInput) {
    return `This action updates a #${id} reservasAsiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservasAsiento`;
  }
}
