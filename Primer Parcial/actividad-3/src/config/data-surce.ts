import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',     // LE PONEMOS NUESTRO USUARIO
    password: 'tu_password',  // lE PONEMOS NUESTRA CONTRASEÑA
    database: 'testdb',       // LE PONEMOS NUESTRA BASE DE DATOS
    synchronize: true,            
    logging: false,
    migrations: [],
    subscribers: [],
});
