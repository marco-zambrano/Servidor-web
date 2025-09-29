import type { IPelicula } from "../domain/pelicula";
export declare class PeliculaService {
    crearPelicula(pelicula: Omit<IPelicula, 'id'>, callback: (error: string | null, pelicula?: IPelicula) => void): void;
    obtenerPelicula(id: number): Promise<IPelicula>;
    listarPeliculas(): Promise<IPelicula[]>;
    actualizarPelicula(id: number, datosActualizados: Partial<IPelicula>): Promise<IPelicula>;
    eliminarPelicula(id: number): Promise<boolean>;
}
//# sourceMappingURL=SPelicula.d.ts.map