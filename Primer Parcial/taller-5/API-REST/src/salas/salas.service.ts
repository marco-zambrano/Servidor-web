import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sala } from './entities/sala.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalasService {
  constructor(@InjectRepository(Sala) private readonly salaRepo: Repository<Sala>) {}

  async create(createSalaDto: CreateSalaDto) {
    const entity = this.salaRepo.create(createSalaDto);
    return await this.salaRepo.save(entity);
  }

  async findAll() {
    return await this.salaRepo.find();
  }

  async findOne(id: string) {
    const sala = await this.salaRepo.findOneBy({ id_sala: id });
    if (!sala) throw new NotFoundException(`No se encontró la sala ${id}`);
    return sala;
  }

  async update(id: string, updateSalaDto: UpdateSalaDto) {
    await this.findOne(id);
    await this.salaRepo.update({ id_sala: id } as any, updateSalaDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.salaRepo.delete({ id_sala: id } as any);
    return { message: `Sala ${id} eliminada` };
  }
}
