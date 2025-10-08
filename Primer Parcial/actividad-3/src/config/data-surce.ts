import { DataSource } from 'typeorm';
import { Cliente } from "../entities/cliente.js";
import { Pelicula } from "../entities/pelicula.js";
import { Sala } from "../entities/sala.js";
import { Funcion } from "../entities/funcion.js";

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
    entities: [Cliente, Pelicula, Sala, Funcion],
    logging: false,
    migrations: [],
    subscribers: [],
});
