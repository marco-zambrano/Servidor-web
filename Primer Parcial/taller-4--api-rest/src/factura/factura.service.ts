import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FacturaService {
  constructor(@InjectRepository(Factura)
  private readonly facturaRepo: Repository<Factura> 
){}
  async create(createFacturaDto: CreateFacturaDto) {
    const newFactura = this.facturaRepo.create(createFacturaDto);
    return await this.facturaRepo.save(newFactura);
  }

  async findAll() {
    return await this.facturaRepo.find();
  }

  async findOne(id: number) {
    const factura = await this.facturaRepo.findOneBy({id_factura: id})
    if (!factura) {
      throw new NotFoundException(`No se encontro la factura ${id}`); //Error 400 genera
    }
    return factura;
  }

  async update(id: number, updateFacturaDto: UpdateFacturaDto) {
    const factura = await this.facturaRepo.findOneBy({id_factura: id}) //buscamos la factura por id usando el repositorio
    if (!factura) {
      throw new NotFoundException(`No se encontro la factura con id: ${id}`); //Error 400 genera
    }
    this.facturaRepo.update(id, updateFacturaDto)
    return await this.facturaRepo.findOneBy({id_factura: id}); //se pone de nuevo por que se actualizo y hay que devolver el nuevo valor
  }

  async remove(id: number) {
    const factura = await this.findOne(id) //usamos el metodo findOne para verificar que la factura existe
    await this.facturaRepo.delete(id) //para borrar podemos usar delete, remove o softRemove, en este caso usamos delete
    return `La factura con id: ${id} ha sido eliminado`;
  }
}
