import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcion } from './entities/funcion.entity';
import { CreateFuncionDto } from './dto/create-funcion.dto';
import { UpdateFuncionDto } from './dto/update-funcion.dto';

@Injectable()
export class FuncionService {
    constructor(@InjectRepository(Funcion) private readonly repo: Repository<Funcion>) {}

    async create(dto: CreateFuncionDto) {
        const ent = this.repo.create(dto as any);
        return await this.repo.save(ent);
    }

    async findAll() {
        return await this.repo.find({ relations: ['pelicula', 'sala'] });
    }

    async findOne(id: string) {
        const f = await this.repo.findOne({ where: { id_funcion: id }, relations: ['pelicula', 'sala'] });
        if (!f) throw new NotFoundException(`Funcion ${id} no encontrada`);
        return f;
    }

    async update(id: string, dto: UpdateFuncionDto) {
        await this.findOne(id);
        await this.repo.update({ id_funcion: id } as any, dto as any);
        return this.findOne(id);
    }

    async remove(id: string) {
        await this.findOne(id);
        await this.repo.delete({ id_funcion: id } as any);
        return { message: `Funcion ${id} eliminada` };
    }
}
