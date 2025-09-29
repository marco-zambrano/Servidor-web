import { ICliente } from "../domain/cliente";
export declare class ClienteService {
    crearCliente(cliente: Omit<ICliente, 'id'>, callback: (error: string | null, cliente?: ICliente) => void): void;
    obtenerCliente(id: number): Promise<ICliente>;
    listarClientes(): Promise<ICliente[]>;
    actualizarCliente(id: number, datosActualizados: Partial<ICliente>): Promise<ICliente>;
    eliminarCliente(id: number): Promise<boolean>;
}
//# sourceMappingURL=Scliente.d.ts.map