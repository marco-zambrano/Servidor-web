import { AppDataSource } from "../config/data-surce.js";
import { Cliente } from "../entities/cliente.js";

export class UsuarioService {
    private repo = AppDataSource.getRepository(Cliente);

    // Crear Cliente
    async create(data: Partial<Cliente>) {
        const user = this.repo.create(data);
        return this.repo.save(user);
    }
    //  Encontrar todos los clientes
    async findAll() {
        return this.repo.find();
    }
    // Entontrar un cliente por ID
    async findOne(id: string) {
        return this.repo.findOne({ where: { id }});
    }
    // Actualizar cliente
    async update(id: string, data: Partial<Cliente>) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    // Eliminar cliente
    async remove(id: string) {
        return this.repo.delete(id);
    }
}