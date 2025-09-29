"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteService = void 0;
const clientes = []; //Repositorio en memoria
class ClienteService {
    //Metodo de crear, usa callback
    crearCliente(cliente, callback) {
        if (!cliente.nombre || !cliente.telefono || !cliente.direccion) {
            callback("Faltan datos obligatorios");
            return;
        }
        const nuevoCliente = {
            id: clientes.length + 1,
            ...cliente
        };
        clientes.push(nuevoCliente);
        setTimeout(() => callback(null, nuevoCliente), 500);
    }
    //Metodo para leer/mostrar usa await/async
    async obtenerCliente(id) {
        const cliente = clientes.find(c => c.id === id);
        if (!cliente)
            throw new Error("Cliente no encontrado");
        return new Promise(resolve => setTimeout(() => resolve(cliente), 500));
    }
    async listarClientes() {
        return new Promise(resolve => setTimeout(() => resolve(clientes), 500));
    }
    //Metodo para actualizar, usa promise
    actualizarCliente(id, datosActualizados) {
        return new Promise((resolve, reject) => {
            const index = clientes.findIndex(c => c.id === id);
            if (index === -1)
                return reject(new Error("Cliente no encontrado"));
            const clienteActual = clientes[index];
            const clienteActualizado = { ...clienteActual, ...datosActualizados };
            clientes[index] = clienteActualizado;
            setTimeout(() => resolve(clienteActualizado), 500);
        });
    }
    //Metodo para borrar, usa async/await
    async eliminarCliente(id) {
        const index = clientes.findIndex(c => c.id === id);
        if (index === -1)
            throw new Error("Cliente no encontrado");
        clientes.splice(index, 1);
        return new Promise(resolve => setTimeout(() => resolve(true), 500));
    }
}
exports.ClienteService = ClienteService;
//# sourceMappingURL=Scliente.js.map