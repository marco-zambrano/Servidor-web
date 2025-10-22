import { IsString, IsUUID } from 'class-validator';

export class CreateAsientoDto {
  @IsString()
  numero: string;

  @IsString()
  estado: string;

  @IsUUID()
  id_sala: string;
}
