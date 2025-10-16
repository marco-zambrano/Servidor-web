import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reporte } from './entities/reporte.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReporteService {

  constructor(@InjectRepository(Reporte) //creamos el constructor para inyectar el repositorio TypeORM
  private readonly reporteRepo: Repository<Reporte>
) {}

  async create(createReporteDto: CreateReporteDto) {
    const newReporte = this.reporteRepo.create(createReporteDto);
    return await this.reporteRepo.save(newReporte);
  }

  async findAll() {
    return await this.reporteRepo.find();
  }

  async findOne(id: number) {
    const reporte =  await this.reporteRepo.findOneBy({id_reporte: id}) //buscamos el reporte por id usando el repositorio
    if (!reporte) {
      throw new NotFoundException(`No se encontro el reporte ${id}`); //Error 400 genera
    }
    return reporte;
  }

  async update(id: number, updateReporteDto: UpdateReporteDto) {
    const reporte = await this.reporteRepo.findOneBy({id_reporte: id}) //buscamos el reporte por id usando el repositorio
    if (!reporte) {
      throw new NotFoundException(`No se encontro el reporte con id: ${id}`); //Error 400 genera
    }
    this.reporteRepo.update(id, updateReporteDto)
    return await this.reporteRepo.findOneBy({id_reporte: id}); //se pone de nuevo por que se actualizo y hay que devolver el nuevo valor
  }

  async remove(id: number) {
    const reporte = await this.findOne(id) //usamos el metodo findOne para verificar que el reporte existe
    await this.reporteRepo.delete(id) //para borrar podemos usar delete, remove o softRemove, en este caso usamos delete
    return `El reporte con id: ${id} ha sido eliminado`;
  }
}
