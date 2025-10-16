import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateFacturaDto {
    @IsNumber()
    id_factura: number;

    @IsDate()
    fecha_emision: Date;

    @IsNumber()
    total: number;

    @IsString()
    metodo_pago: string;

    @IsNumber()
    id_reserva: number;
}
