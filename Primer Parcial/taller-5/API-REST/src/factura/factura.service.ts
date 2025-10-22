import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { Repository } from 'typeorm';
import { Reserva } from '../reserva/entities/reserva.entity';

@Injectable()
export class FacturaService {
  constructor(@InjectRepository(Factura)
  private readonly facturaRepo: Repository<Factura> 
){}
  async create(createFacturaDto: CreateFacturaDto) {
    const { id_reserva, ...rest } = createFacturaDto as any;
    const reservaRepo = this.facturaRepo.manager.getRepository(Reserva);
    const reserva = await reservaRepo.findOneBy({ id_reserva });
    if (!reserva) throw new NotFoundException(`Reserva ${id_reserva} no existe`);
    const newFactura = this.facturaRepo.create({ ...rest, reserva });
    return await this.facturaRepo.save(newFactura);
  }

  async findAll() {
    return await this.facturaRepo.find({ relations: ['reserva'] });
  }

  async findOne(id: string) {
    const factura = await this.facturaRepo.findOne({ where: { id_factura: id }, relations: ['reserva'] });
    if (!factura) {
      throw new NotFoundException(`No se encontro la factura ${id}`);
    }
    return factura;
  }

  async update(id: string, updateFacturaDto: UpdateFacturaDto) {
    const factura = await this.facturaRepo.findOne({ where: { id_factura: id } })
    if (!factura) {
      throw new NotFoundException(`No se encontro la factura con id: ${id}`);
    }
    this.facturaRepo.update({ id_factura: id } as any, updateFacturaDto);
    return await this.facturaRepo.findOne({ where: { id_factura: id } });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.facturaRepo.delete({ id_factura: id } as any);
    return `La factura con id: ${id} ha sido eliminado`;
  }
}
