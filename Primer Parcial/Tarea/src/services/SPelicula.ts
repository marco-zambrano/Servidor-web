import type { IPelicula } from "../domain/pelicula";

const peliculas: IPelicula[] = []; 

export class PeliculaService { 
    // Metodo para crear una pelicula con callback
    crearPelicula(pelicula: Omit<IPelicula, 'id'>, callback: (error: string | null, pelicula?: IPelicula) => void) { 
        if (!pelicula.nombre  || !pelicula.genero || !pelicula.año) { 
            callback("Faltan datos obligatorios");   
            return;
        }

        const nuevaPelicula: IPelicula = { 
            id: peliculas.length + 1, // generamos una nueva propiedad id
            ... pelicula // spread operator para copiar las demas propiedades
        };

        peliculas.push(nuevaPelicula); 

        // Le generamos un delay para simular una operacion asincrona
        setTimeout( () => callback(null, nuevaPelicula), 300); 
    }
    
    // Obtenemos las peliculas
    async obtenerPelicula(id: number): Promise<IPelicula> { 
        const pelicula = peliculas.find(p => p.id === id); 
        if (!pelicula) throw new Error("Pelicula no encontrada"); 
        return new Promise(resolve => setTimeout(() => resolve(pelicula), 1500));
    }

    // Obtenemos todas las peliculas
    async listarPeliculas(): Promise<IPelicula[]> { 
        return new Promise(resolve => setTimeout(() => resolve(peliculas), 1500));
    }
    
    // Actualizamos una pelicula
    actualizarPelicula(id: number, datosActualizados: Partial<IPelicula>): Promise<IPelicula> { 
        return new Promise((resolve, reject) => { 
            const pelicula = peliculas.find(p => p.id === id);
            if (!pelicula) return reject(new Error("Pelicula no encontrada"));

            const peliculaActualizada = { ...pelicula, ...datosActualizados } as IPelicula; 
            const index = peliculas.findIndex(p => p.id === id); 
            peliculas[index] = peliculaActualizada;

            setTimeout(() => resolve(peliculaActualizada), 1500);
        });
    }

    async eliminarPelicula(id: number): Promise<boolean> {
        const index = peliculas.findIndex(p => p.id === id); 
        if (index === -1) throw new Error("Pelicula no encontrada"); 

        peliculas.splice(index, 1); 
        return new Promise(resolve => setTimeout( () => resolve(true), 1500));
    }
}
