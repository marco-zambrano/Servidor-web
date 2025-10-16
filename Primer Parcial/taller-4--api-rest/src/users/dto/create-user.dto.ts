import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    id: string;

    @IsString()
    nombre: string;

    @IsNumber()
    edad: number;

    @IsString()
    apellido: string;
}