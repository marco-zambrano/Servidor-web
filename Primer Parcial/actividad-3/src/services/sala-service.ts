import { AppDataSource } from "../config/data-surce.js";
import { Sala } from "../entities/sala.js";

export class SalaService {
    private repo = AppDataSource.getRepository(Sala);

    // Crear Sala
    async create(data: Partial<Sala>) {
        const sala = this.repo.create(data);
        return this.repo.save(sala);
    }
    // Encontrar todas las salas
    async findAll() {
        return this.repo.find();
    }
    // Encontrar una sala por ID
    async findOne(id: string) {
        return this.repo.findOne({ where: { id }});
    }
    // Actualizar sala
    async update(id: string, data: Partial<Sala>) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    // Eliminar sala
    async remove(id: string) {
        return this.repo.delete(id);
    }
}