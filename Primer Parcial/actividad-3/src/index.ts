import { UsuarioService } from "./services/cliente-service.js";
import { PeliculaService } from "./services/pelicula-service.js";
import { SalaService } from "./services/sala-service.js";
import { FuncionService } from "./services/funcion-service.js";
import { AppDataSource } from "./config/data-surce.js";

async function main() {
    await AppDataSource.initialize();
    console.log("Base de datos conectada");

    // Instancias de los servicios
    const usuarioService = new UsuarioService();
    const peliculaService = new PeliculaService();
    const salaService = new SalaService();
    const funcionService = new FuncionService();

    // --- CLIENTE ---
    // Crear
    const cliente = await usuarioService.create({ nombre: "Juan", correo: "juan@mail.com" });
    console.log("Cliente creado:", cliente);

    // Listar todos
    const clientes = await usuarioService.findAll();
    console.log("Todos los clientes:", clientes);

    // Buscar por ID
    const clienteById = await usuarioService.findOne(cliente.id);
    console.log("Cliente por ID:", clienteById);

    // Actualizar
    const clienteActualizado = await usuarioService.update(cliente.id, { nombre: "Juan Actualizado" });
    console.log("Cliente actualizado:", clienteActualizado);

    // Eliminar
    await usuarioService.remove(cliente.id);
    console.log("Cliente eliminado");

    // --- PELICULA ---
    const pelicula = await peliculaService.create({ titulo: "Matrix", genero: "Acción" });
    console.log("Película creada:", pelicula);

    const peliculas = await peliculaService.findAll();
    console.log("Todas las películas:", peliculas);

    const peliculaById = await peliculaService.findOne(pelicula.id);
    console.log("Película por ID:", peliculaById);

    const peliculaActualizada = await peliculaService.update(pelicula.id, { titulo: "Matrix Reloaded" });
    console.log("Película actualizada:", peliculaActualizada);

    await peliculaService.remove(pelicula.id);
    console.log("Película eliminada");

    // --- SALA ---
    const sala = await salaService.create({ nombre: "Sala 1", capacidad: 100 });
    console.log("Sala creada:", sala);

    const salas = await salaService.findAll();
    console.log("Todas las salas:", salas);

    const salaById = await salaService.findOne(sala.id);
    console.log("Sala por ID:", salaById);

    const salaActualizada = await salaService.update(sala.id, { nombre: "Sala VIP" });
    console.log("Sala actualizada:", salaActualizada);

    await salaService.remove(sala.id);
    console.log("Sala eliminada");

    // --- FUNCION ---
    // NOTA: Debes tener IDs válidos de película y sala para crear una función
    // Aquí se crean de nuevo para el ejemplo
    const pelicula2 = await peliculaService.create({ titulo: "Inception", genero: "Ciencia Ficción" });
    const sala2 = await salaService.create({ nombre: "Sala 2", capacidad: 80 });

    const funcion = await funcionService.create({
        fecha: new Date(),
        pelicula: pelicula2,
        sala: sala2
    });
    console.log("Función creada:", funcion);

    const funciones = await funcionService.findAll();
    console.log("Todas las funciones:", funciones);

    const funcionById = await funcionService.findOne(funcion.id);
    console.log("Función por ID:", funcionById);

    const funcionActualizada = await funcionService.update(funcion.id, { fecha: new Date() });
    console.log("Función actualizada:", funcionActualizada);

    await funcionService.remove(funcion.id);
    console.log("Función eliminada");

    // Limpieza de datos de ejemplo
    await peliculaService.remove(pelicula2.id);
    await salaService.remove(sala2.id);

    await AppDataSource.destroy();
    console.log("Base de datos desconectada");
}

main().catch(err => {
    console.error("Error:", err);
});