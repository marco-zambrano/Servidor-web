import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservaAsiento } from './entities/reserva-asiento.entity';
import { CreateReservaAsientoDto } from './dto/create-reserva-asiento.dto';
import { UpdateReservaAsientoDto } from './dto/update-reserva-asiento.dto';

@Injectable()
export class ReservaAsientoService {
    constructor(@InjectRepository(ReservaAsiento) private readonly repo: Repository<ReservaAsiento>) {}

    async create(dto: CreateReservaAsientoDto) {
        const e = this.repo.create(dto as any);
        return this.repo.save(e);
    }

    async findAll() {
        return this.repo.find({ relations: ['reserva', 'asiento'] });
    }

    async findOne(id: string) {
        const r = await this.repo.findOne({ where: { id: id }, relations: ['reserva', 'asiento'] });
        if (!r) throw new NotFoundException(`ReservaAsiento ${id} no encontrada`);
        return r;
    }

    async update(id: string, dto: UpdateReservaAsientoDto) {
        await this.findOne(id);
        await this.repo.update({ id } as any, dto as any);
        return this.findOne(id);
    }

    async remove(id: string) {
        await this.findOne(id);
        await this.repo.delete({ id } as any);
        return { message: `ReservaAsiento ${id} eliminada` };
    }
}
