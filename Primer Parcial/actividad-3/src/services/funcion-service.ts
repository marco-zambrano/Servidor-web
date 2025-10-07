import { AppDataSource } from "../config/data-surce.js";
import { Funcion } from "../entities/funcion.js";

export class FuncionService {
    private repo = AppDataSource.getRepository(Funcion);
    // Crear Funcion
    async create(data: Partial<Funcion>) {
        const funcion = this.repo.create(data);
        return this.repo.save(funcion);
    }
    // Encontrar todas las funciones
    async findAll() {
        return this.repo.find();
    }
    // Encontrar una funcion por ID
    async findOne(id: string) {
        return this.repo.findOne({ where: { id }});
    }
    async update(id: string, data: Partial<Funcion>) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async remove(id: string) {
        return this.repo.delete(id);
    }
}
