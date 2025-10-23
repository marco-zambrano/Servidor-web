import { Injectable } from '@nestjs/common';
import { CreateFuncionInput } from './dto/create-funcion.input';
import { UpdateFuncionInput } from './dto/update-funcion.input';

@Injectable()
export class FuncionService {
  create(createFuncionInput: CreateFuncionInput) {
    return 'This action adds a new funcion';
  }

  findAll() {
    return `This action returns all funcion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} funcion`;
  }

  update(id: number, updateFuncionInput: UpdateFuncionInput) {
    return `This action updates a #${id} funcion`;
  }

  remove(id: number) {
    return `This action removes a #${id} funcion`;
  }
}
