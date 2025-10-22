import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reporte } from './entities/reporte.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ReporteService {

  constructor(@InjectRepository(Reporte) //creamos el constructor para inyectar el repositorio TypeORM
  private readonly reporteRepo: Repository<Reporte>
) {}

  async create(createReporteDto: CreateReporteDto) {
    const { id_admin, ...rest } = createReporteDto as any;
    const userRepo = this.reporteRepo.manager.getRepository(User);
    const admin = await userRepo.findOneBy({ id_usuario: id_admin });
    if (!admin) throw new NotFoundException(`Admin ${id_admin} no encontrado`);
    const newReporte = this.reporteRepo.create({ ...rest, admin });
    return await this.reporteRepo.save(newReporte);
  }

  async findAll() {
    return await this.reporteRepo.find({ relations: ['admin'] });
  }

  async findOne(id: string) {
    const reporte =  await this.reporteRepo.findOne({ where: { id_reporte: id }, relations: ['admin'] });
    if (!reporte) {
      throw new NotFoundException(`No se encontro el reporte ${id}`);
    }
    return reporte;
  }

  async update(id: string, updateReporteDto: UpdateReporteDto) {
    const reporte = await this.reporteRepo.findOne({ where: { id_reporte: id } });
    if (!reporte) {
      throw new NotFoundException(`No se encontro el reporte con id: ${id}`);
    }
    this.reporteRepo.update({ id_reporte: id } as any, updateReporteDto);
    return await this.reporteRepo.findOne({ where: { id_reporte: id } });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.reporteRepo.delete({ id_reporte: id } as any);
    return `El reporte con id: ${id} ha sido eliminado`;
  }
}
