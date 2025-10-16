import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaAsiento } from './entities/reserva-asiento.entity';
import { ReservaAsientoService } from './reserva-asiento.service';
import { ReservaAsientoController } from './reserva-asiento.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ReservaAsiento])],
    controllers: [ReservaAsientoController],
    providers: [ReservaAsientoService],
    exports: [TypeOrmModule],
})
export class ReservaAsientoModule {}
