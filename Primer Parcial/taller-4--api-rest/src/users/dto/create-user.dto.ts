import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsNumber()
    @Min(0)
    edad: number;

    @IsString()
    @IsNotEmpty()
    apellido: string;
}