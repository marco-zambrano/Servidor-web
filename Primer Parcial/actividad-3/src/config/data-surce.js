import { DataSource } from 'typeorm';
import { Cliente } from "../entities/cliente.js";
import { Pelicula } from "../entities/pelicula.js";
import { Sala } from "../entities/sala.js";
import { Funcion } from "../entities/funcion.js";
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres', // LE PONEMOS NUESTRO USUARIO
    password: 'tu_password', // lE PONEMOS NUESTRA CONTRASEÑA
    database: 'testdb', // LE PONEMOS NUESTRA BASE DE DATOS
    synchronize: true,
    entities: [Cliente, Pelicula, Sala, Funcion],
    logging: false,
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-surce.js.map