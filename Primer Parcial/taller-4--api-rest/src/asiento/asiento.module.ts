import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asiento } from './entities/asiento.entity';
import { AsientoService } from './asiento.service';
import { AsientoController } from './asiento.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Asiento])],
    controllers: [AsientoController],
    providers: [AsientoService],
    exports: [TypeOrmModule],
})
export class AsientoModule {}
