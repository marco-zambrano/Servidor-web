import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateSalaDto {
	@IsString()
	@IsNotEmpty()
	nombre: string;

	@IsInt()
	@Min(1)
	capacidad: number;

	@IsString()
	tipo: string;

	@IsOptional()
	@IsString()
	estado?: string;
}
