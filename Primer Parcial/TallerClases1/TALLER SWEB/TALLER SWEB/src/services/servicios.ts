import { IServicio } from "../dominios/servicios";
import { DtoCrearServicio } from "../dto/crearUsuario.dts";

const servicios : IServicio[] = [];

export class Crud_Servicio {
    constructor() {
        
    };

    mostrar(id:number) {
        let servicio_encontrado = servicios.find((sre) => sre.id == id);
        if (!servicio_encontrado) {
            throw new Error("No se encontro el servicio")
        }

        return servicio_encontrado;
    };

    eliminar(id: number, callback: CallableFunction) {
        let msg_error;
        let msg_resolve;

        let idx_viejo_servicio= servicios.findIndex((sre) => sre.id == id);
        if (idx_viejo_servicio === -1) {
            msg_error = "Not found"
            callback(msg_error)
            return
        }

        else {
            msg_resolve = "Deleted"
            callback(msg_resolve)
        }
        callback(msg_error, msg_resolve)
        servicios.splice(idx_viejo_servicio, 1)
    };

    crear(nuevoServicio: DtoCrearServicio) {
        const servicio = {
            id: servicios.length +1,
            ...nuevoServicio
        }

        servicios.push(servicio)
    };

    actualizar(id:number, nuevoServicio:IServicio) : Promise<IServicio> {
        return new Promise<IServicio>((resolve, reject) => {
            setTimeout(() => {
                let idx_viejo_servicio = servicios.findIndex((sre) => sre.id == id);
                if (idx_viejo_servicio === -1) {
                    return reject(new Error("Not found"));
                }
                servicios.splice(idx_viejo_servicio, 1, nuevoServicio);
                servicios.push(nuevoServicio);
                }, 2000)
            
        })}; 

};