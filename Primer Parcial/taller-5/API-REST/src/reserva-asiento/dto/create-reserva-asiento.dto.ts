import { IsUUID } from 'class-validator';

export class CreateReservaAsientoDto {
  @IsUUID()
  id_reserva: string;

  @IsUUID()
  id_asiento: string;
}
