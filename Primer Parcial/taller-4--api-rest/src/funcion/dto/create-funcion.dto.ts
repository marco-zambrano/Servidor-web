import { IsUUID, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateFuncionDto {
    @IsDateString()
    fecha_hora: string;

    @IsNumber()
    precio: number;

    @IsUUID()
    id_pelicula: string;

    @IsUUID()
    id_sala: string;
}
