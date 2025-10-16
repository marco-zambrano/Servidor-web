import { IsDate, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateFacturaDto {
    @IsDate()
    fecha_emision: Date;

    @IsNumber()
    total: number;

    @IsString()
    metodo_pago: string;

    @IsUUID()
    id_reserva: string;
}
