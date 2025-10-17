import { PartialType } from '@nestjs/mapped-types';
import { CreateReservaAsientoDto } from './create-reserva-asiento.dto';

export class UpdateReservaAsientoDto extends PartialType(CreateReservaAsientoDto) {}
