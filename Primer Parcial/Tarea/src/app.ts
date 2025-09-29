import { ClienteService } from "../src/services/Scliente"; //Importamos el servicio que tiene CRUD de cliente
import { PeliculaService } from "./services/Spelicula"; //Importamos el servicio que tiene CRUD de pelicula

const clienteService = new ClienteService(); //Instanciamos el servicio cliente
const peliculaService = new PeliculaService(); //Instanciamos el servicio pelicula


//Usamos la funcion para crear cliente
clienteService.crearCliente(
    { nombre: "Juan Perez", telefono: "123456789", direccion: "Av. Siempre Viva 123" },
    (err, cliente) => {
        if (err) console.log("Error al crear:", err);
        else console.log("Cliente creado:", cliente);
    }
);


//Usamos la funcion para obtener cliente y listar clientes
(async () => {
    try {
        const cliente = await clienteService.obtenerCliente(1);
        console.log("Cliente obtenido: ", cliente);

        const todos = await clienteService.listarClientes();
        console.log("Todos los clientes: ", todos);
    } catch (err) {
        console.error(err);
    }

})();


//Usamos la funcion para actualizar cliente
clienteService.actualizarCliente(1, { telefono: "987654321" })
    .then( c => console.log("Cliente actualizado: ", c))
    .catch( err => console.error(err));

//Usamos la funcion para eliminar cliente
(async () => {
    try {
        const eliminado = await clienteService.eliminarCliente(1);
        console.log("Cliente eliminado: ", eliminado);
    } catch (err) {
        console.error(err);
    }
})();



// ------------------- PELICULAS ---------------------
//Usamos la funcion para crear pelicula
peliculaService.crearPelicula(
    { nombre: "Super Mario Bros", genero: "Aventura", año: 2023 },
    (err, pelicula) => {
        if (err) console.log("Error al crear:", err);
        else console.log("Pelicula creada:", pelicula);
    }
);

//Usamos la funcion para obtener pelicula y listar peliculas
(async () => {
    try {
        const pelicula = await peliculaService.obtenerPelicula(1);
        console.log("Pelicula obtenida: ", pelicula);

        const listaDePeliculas = await peliculaService.listarPeliculas();
        console.log("Todas las peliculas: ", listaDePeliculas);
    } catch (err) {
        console.error(err);
    }

})();

//Usamos la funcion para actualizar pelicula
peliculaService.actualizarPelicula(1, { genero: "Animacion" })
    .then( p => console.log("Pelicula actualizada: ", p))
    .catch( err => console.error(err));

//Usamos la funcion para eliminar pelicula
(async () => {
    try {
        const eliminada = await peliculaService.eliminarPelicula(1);
        console.log("Pelicula eliminada: ", eliminada);
    } catch (err) {
        console.error(err);
    }
})();
