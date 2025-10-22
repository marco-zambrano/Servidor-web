import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    correo: string;

    @IsString()
    @IsNotEmpty()
    contrasena: string;

    @IsString()
    @IsNotEmpty()
    rol: string;
}