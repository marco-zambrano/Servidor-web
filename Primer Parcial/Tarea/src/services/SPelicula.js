"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeliculaService = void 0;
const peliculas = [];
class PeliculaService {
    // Metodo para crear una pelicula con callback
    crearPelicula(pelicula, callback) {
        if (!pelicula.nombre || !pelicula.genero || !pelicula.año) {
            callback("Faltan datos obligatorios");
            return;
        }
        const nuevaPelicula = {
            id: peliculas.length + 1, // generamos una nueva propiedad id
            ...pelicula // spread operator para copiar las demas propiedades
        };
        peliculas.push(nuevaPelicula);
        // Le generamos un delay para simular una operacion asincrona
        setTimeout(() => callback(null, nuevaPelicula), 1000);
    }
    // Obtenemos las peliculas
    async obtenerPelicula(id) {
        const pelicula = peliculas.find(p => p.id === id);
        if (!pelicula)
            throw new Error("Pelicula no encontrada");
        return new Promise(resolve => setTimeout(() => resolve(pelicula), 500));
    }
    // Obtenemos todas las peliculas
    async listarPeliculas() {
        return new Promise(resolve => setTimeout(() => resolve(peliculas), 500));
    }
    // Actualizamos una pelicula
    actualizarPelicula(id, datosActualizados) {
        return new Promise((resolve, reject) => {
            const pelicula = peliculas.find(p => p.id === id);
            if (!pelicula)
                return reject(new Error("Pelicula no encontrada"));
            const peliculaActualizada = { ...pelicula, ...datosActualizados };
            const index = peliculas.findIndex(p => p.id === id);
            peliculas[index] = peliculaActualizada;
            setTimeout(() => resolve(peliculaActualizada), 1000);
        });
    }
    async eliminarPelicula(id) {
        const index = peliculas.findIndex(p => p.id === id);
        if (index === -1)
            throw new Error("Pelicula no encontrada");
        peliculas.splice(index, 1);
        return new Promise(resolve => setTimeout(() => resolve(true), 500));
    }
}
exports.PeliculaService = PeliculaService;
//# sourceMappingURL=SPelicula.js.map