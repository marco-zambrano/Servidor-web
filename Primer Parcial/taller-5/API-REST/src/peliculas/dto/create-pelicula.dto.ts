import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePeliculaDto {
	@IsString()
	@IsNotEmpty()
	titulo: string;

	@IsString()
	@IsNotEmpty()
	genero: string;

	@IsOptional()
	@IsString()
	descripcion?: string;

	@IsOptional()
	@IsString()
	clasificacion?: string;
}
