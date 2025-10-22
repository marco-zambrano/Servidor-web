import { IsDate, IsNumber, IsString, IsUUID, Max, MaxLength } from "class-validator";

export class CreateReporteDto {
    @IsDate()
    fecha_generacion: Date;

    @IsUUID()
    id_admin: string;
}
