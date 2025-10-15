import { IsString, IsUUID, Max, MaxLength } from "class-validator";

export class CreateUsuarioDto {
    @IsUUID()
    id_usuario: string;

    @IsString()
    nombre: string;

    @IsString()
    @MaxLength(10)
    contraseña: string;

    @IsString()
    rol: string;
}
