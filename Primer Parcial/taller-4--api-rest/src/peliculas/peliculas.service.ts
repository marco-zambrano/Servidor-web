import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pelicula } from './entities/pelicula.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PeliculasService {
  constructor(
    @InjectRepository(Pelicula)
    private readonly peliculaRepo: Repository<Pelicula>,
  ) {}

  async create(createPeliculaDto: CreatePeliculaDto) {
    const entity = this.peliculaRepo.create(createPeliculaDto);
    return await this.peliculaRepo.save(entity);
  }

  async findAll() {
    return await this.peliculaRepo.find();
  }

  async findOne(id: string) {
    const peli = await this.peliculaRepo.findOneBy({ id_pelicula: id });
    if (!peli) throw new NotFoundException(`No se encontró la pelicula ${id}`);
    return peli;
  }

  async update(id: string, updatePeliculaDto: UpdatePeliculaDto) {
    await this.findOne(id);
    await this.peliculaRepo.update({ id_pelicula: id } as any, updatePeliculaDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.peliculaRepo.delete({ id_pelicula: id } as any);
    return { message: `Pelicula ${id} eliminada` };
  }
}
