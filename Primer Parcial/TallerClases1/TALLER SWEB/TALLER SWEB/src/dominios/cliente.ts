import type mascotas = require("./mascotas");
import type reserva = require("./reserva");

export interface ICliente {
    id: number;
    nombre: string;
    identificacion: number;
    mascotas: mascotas.IMascotas[];
    reservas: reserva.IReserva[]
};


