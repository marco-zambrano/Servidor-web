import { IsDate, IsNumber, IsString, IsUUID, Max, MaxLength } from "class-validator";

export class CreateReporteDto {
    @IsNumber()
    id_reporte: number;

    @IsDate()
    fecha_generación: Date;
    
    @IsUUID()
    id_admin: string
}
