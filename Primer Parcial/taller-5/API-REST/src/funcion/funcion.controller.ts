import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { FuncionService } from './funcion.service';
import { CreateFuncionDto } from './dto/create-funcion.dto';
import { UpdateFuncionDto } from './dto/update-funcion.dto';

@Controller('funcion')
export class FuncionController {
    constructor(private readonly service: FuncionService) {}

    @Post()
    create(@Body() dto: CreateFuncionDto) {
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
    update(@Param('id') id: string, @Body() dto: UpdateFuncionDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
