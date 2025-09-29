import { ICliente} from "../domain/cliente";

//Creado por Reyes Vinces Jeremy Daniel
//Servicio de cliente con metodos CRUD
//Usa diferentes estilos de asincronismo: callback, promise, async/await
//Repositorio en memoria (array)

const clientes: ICliente[] = []; //Repositorio en memoria

export class ClienteService { //Servicio de cliente con metodos CRUD

    //Metodo de crear, usa callback
    crearCliente(cliente: Omit<ICliente, 'id'>, callback: (error: string | null, cliente?: ICliente) => void) { //Omit es un tipo utilitario que excluye la propiedad id del tipo ICliente
        if (!cliente.nombre  || !cliente.telefono || !cliente.direccion) { //Verifica que los datos obligatorios esten presentes

            callback("Faltan datos obligatorios");   //Si faltan datos, llama al callback con error
            return;

        }

        const nuevoCliente: ICliente = { //Crea un nuevo cliente
            id: clientes.length + 1, //Genera un id secuencial
            ... cliente //Usa el operador spread para copiar las propiedades del objeto cliente
        };

        clientes.push(nuevoCliente); //Agrega el nuevo cliente al array

        setTimeout( () => callback(null, nuevoCliente), 500); //Simula operacion asincrona
            
        }
    
    //Metodo para leer/mostrar usa await/async
    async obtenerCliente(id: number): Promise<ICliente> { //Retorna una promesa que resuelve con el cliente
        const cliente = clientes.find(c => c.id === id); //Busca el cliente por id
    if (!cliente) throw new Error("Cliente no encontrado"); //si no existe el cliente, lanza error
    return new Promise(resolve => setTimeout(() => resolve(cliente), 500));
    }

    async listarClientes(): Promise<ICliente[]> { //Retorna una promesa que resuelve con el array de clientes
        return new Promise(resolve => setTimeout(() => resolve(clientes), 500));
    }
    

    //Metodo para actualizar, usa promise
    actualizarCliente(id: number, datosActualizados: Partial<ICliente>): Promise<ICliente> { //Partial permite que los datos sean opcionales
        return new Promise((resolve, reject) => { //Retorna una promesa
            const index = clientes.findIndex(c => c.id === id); //Busca el indice del cliente
            if (index === -1) return reject(new Error("Cliente no encontrado")); //si no existe el cliente, rechaza la promesa

            const clienteActual = clientes[index]; //Obtiene el cliente actual
            const clienteActualizado = { ...clienteActual, ...datosActualizados} as ICliente; //Actualiza los datos del cliente
            clientes[index] = clienteActualizado; //Guarda el cliente actualizado en el array

            setTimeout(() => resolve(clienteActualizado), 500);
        });
    }


    //Metodo para borrar, usa async/await

    async eliminarCliente(id: number): Promise<boolean> {
        const index = clientes.findIndex(c => c.id === id); //Busca el indice del cliente
        if (index === -1) throw new Error("Cliente no encontrado"); //si no existe el cliente, lanza error

        clientes.splice(index, 1); //Elimina el cliente del array
        return new Promise(resolve => setTimeout( () => resolve(true), 500));
    }

}

