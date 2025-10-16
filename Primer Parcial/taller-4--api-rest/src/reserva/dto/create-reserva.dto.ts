import { IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CreateReservaDto {
  @IsNumber()
  @Min(1)
  cantidad_asientos: number;

  @IsString()
  estado: string;

  @IsUUID()
  id_funcion: string;

  @IsUUID()
  id_usuario: string;
}
