import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

@Injectable()
export class ReservaService {
    constructor(@InjectRepository(Reserva) private readonly repo: Repository<Reserva>) {}

    async create(dto: CreateReservaDto) {
        const ent = this.repo.create(dto as any);
        return this.repo.save(ent);
    }

    async findAll() {
        return this.repo.find({ relations: ['funcion', 'usuario', 'reservasAsiento'] });
    }

    async findOne(id: string) {
        const r = await this.repo.findOne({ where: { id_reserva: id }, relations: ['funcion', 'usuario', 'reservasAsiento'] });
        if (!r) throw new NotFoundException(`Reserva ${id} no encontrada`);
        return r;
    }

    async update(id: string, dto: UpdateReservaDto) {
        await this.findOne(id);
        await this.repo.update({ id_reserva: id } as any, dto as any);
        return this.findOne(id);
    }

    async remove(id: string) {
        await this.findOne(id);
        await this.repo.delete({ id_reserva: id } as any);
        return { message: `Reserva ${id} eliminada` };
    }
}
