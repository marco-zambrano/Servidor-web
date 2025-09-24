import type cliente = require("./cliente");

export interface IMascotas {
    id: number;
    nombre: string;
    edad: number;
    raza: string;
    cliente: cliente.ICliente
};