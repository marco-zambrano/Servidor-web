"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scliente_1 = require("../src/services/Scliente");
const clienteService = new Scliente_1.ClienteService();
clienteService.crearCliente({ nombre: "Juan Perez", telefono: "123456789", direccion: "Av. Siempre Viva 123" }, (err, cliente) => {
    if (err)
        console.log("Error al crear:", err);
    else
        console.log("Cliente creado:", cliente);
});
(async () => {
    try {
        const cliente = await clienteService.obtenerCliente(1);
        console.log("Cliente obtenido: ", cliente);
        const todos = await clienteService.listarClientes();
        console.log("Todos los clientes: ", todos);
    }
    catch (err) {
        console.error(err);
    }
})();
clienteService.actualizarCliente(1, { telefono: "987654321" })
    .then(c => console.log("Cliente actualizado: ", c))
    .catch(err => console.error(err));
(async () => {
    try {
        const eliminado = await clienteService.eliminarCliente(1);
        console.log("Cliente eliminado: ", eliminado);
    }
    catch (err) {
        console.error(err);
    }
});
//# sourceMappingURL=app.js.map