import type cliente = require("./cliente");
import type mascotas = require("./mascotas");
import type servicios = require("./servicios");

export interface IReserva {
    id: number,
    fecha_reserva: string,
    cliente: cliente.ICliente,
    servicio: servicios.IServicio[],
    mascotas: mascotas.IMascotas[]
};