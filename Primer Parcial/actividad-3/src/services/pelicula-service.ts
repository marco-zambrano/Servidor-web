import { AppDataSource } from "../config/data-surce.js";
import { Pelicula } from "../entities/pelicula.js";

export class PeliculaService {
    private repo = AppDataSource.getRepository(Pelicula);
    // Crear Pelicula
    async create(data: Partial<Pelicula>) {
        const pelicula = this.repo.create(data);
        return this.repo.save(pelicula);
    }
    // Encontrar todas las peliculas
    async findAll() {
        return this.repo.find({});
    }
    // Encontrar una pelicula por ID
    async findOne(id: string) {
        return this.repo.findOne({ where: { id }});
    }
    // Actualizar pelicula
    async update(id: string, data: Partial<Pelicula>) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    // Eliminar pelicula
    async remove(id: string) {
        return this.repo.delete(id);
    }
}