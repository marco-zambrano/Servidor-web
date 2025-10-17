import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asiento } from './entities/asiento.entity';
import { CreateAsientoDto } from './dto/create-asiento.dto';
import { UpdateAsientoDto } from './dto/update-asiento.dto';

@Injectable()
export class AsientoService {
    constructor(@InjectRepository(Asiento) private readonly repo: Repository<Asiento>) {}

    async create(dto: CreateAsientoDto) {
        const e = this.repo.create(dto as any);
        return this.repo.save(e);
    }

    async findAll() {
        return this.repo.find({ relations: ['sala'] });
    }

    async findOne(id: string) {
        const a = await this.repo.findOne({ where: { id_asiento: id }, relations: ['sala'] });
        if (!a) throw new NotFoundException(`Asiento ${id} no encontrado`);
        return a;
    }

    async update(id: string, dto: UpdateAsientoDto) {
        await this.findOne(id);
        await this.repo.update({ id_asiento: id } as any, dto as any);
        return this.findOne(id);
    }

    async remove(id: string) {
        await this.findOne(id);
        await this.repo.delete({ id_asiento: id } as any);
        return { message: `Asiento ${id} eliminado` };
    }
}
