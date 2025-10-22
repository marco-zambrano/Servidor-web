import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ReservaAsientoService } from './reserva-asiento.service';
import { CreateReservaAsientoDto } from './dto/create-reserva-asiento.dto';
import { UpdateReservaAsientoDto } from './dto/update-reserva-asiento.dto';

@Controller('reserva-asiento')
export class ReservaAsientoController {
    constructor(private readonly service: ReservaAsientoService) {}

    @Post()
    create(@Body() dto: CreateReservaAsientoDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateReservaAsientoDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
