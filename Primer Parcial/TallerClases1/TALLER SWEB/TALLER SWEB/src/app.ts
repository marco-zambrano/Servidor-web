import { Crud_Servicio } from "./services/servicios";
import { DtoCrearServicio } from "./dto/crearUsuario.dts";
import { IServicio } from "./dominios/servicios";

const crud_servicio : Crud_Servicio = new Crud_Servicio ();
const dtoCrearServicio: DtoCrearServicio = {nombre: "Peluqueria", precio:10};
const servicio : IServicio = {id: 1, nombre: "veterinaria", precio: 10}

function manejar_error(error:string, resolve?: string){
    if (error) {
        console.log(error)
    }
    console.log(resolve)
}

crud_servicio.crear(dtoCrearServicio)
crud_servicio.actualizar(1, servicio)
crud_servicio.eliminar(7, manejar_error)
console.log(crud_servicio.mostrar(1))

const pintar = async () => { 
    const rest = await crud_servicio.actualizar(1, servicio)
    console.log(rest)
}
