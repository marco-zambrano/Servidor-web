import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Reserva])],
    controllers: [ReservaController],
    providers: [ReservaService],
    exports: [TypeOrmModule],
})
export class ReservaModule {}
