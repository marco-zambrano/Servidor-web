import { Injectable } from '@nestjs/common';
import { PeliculasService } from '../peliculas/peliculas.service';
import { FuncionService } from '../funcion/funcion.service';
import { SalasService } from '../salas/salas.service';
import { ReservaService } from '../reserva/reserva.service';
import { AsientoService } from '../asiento/asiento.service';
import { UsersService } from '../users/users.service';
import { FacturaService } from '../factura/factura.service';
import { ReservaAsientoService } from '../reserva-asiento/reserva-asiento.service';
import {
    CarteleraType,
    OcupacionSalaType,
    HistorialUsuarioType,
    FuncionCarteleraType,
    FuncionOcupacionType,
    ReservaDetalladaType,
} from '../inputs/cartelera.input';

@Injectable()
export class AnalyticsMarcoService {
    constructor(
        private readonly peliculasService: PeliculasService,
        private readonly funcionService: FuncionService,
        private readonly salasService: SalasService,
        private readonly reservaService: ReservaService,
        private readonly asientoService: AsientoService,
        private readonly usersService: UsersService,
        private readonly facturaService: FacturaService,
        private readonly reservaAsientoService: ReservaAsientoService,
    ) { }

    // QUERY 1: Cartelera Completa
    async getCarteleraCompleta(): Promise<CarteleraType[]> {
        const peliculas = await this.peliculasService.findAll();
        const funciones = await this.funcionService.findAll();
        const reservas = await this.reservaService.findAll();
        const reservasAsiento = await this.reservaAsientoService.findAll();

        const cartelera: CarteleraType[] = [];

        for (const pelicula of peliculas) {
            const funcionesPelicula = funciones.filter(
                (f) => f.pelicula?.id_pelicula === pelicula.id_pelicula,
            );

            if (funcionesPelicula.length === 0) continue;

            const funcionesDetalle: FuncionCarteleraType[] = [];
            const precios: number[] = [];

            for (const funcion of funcionesPelicula) {
                const sala = funcion.sala;
                if (!sala) continue;

                const reservasFuncion = reservas.filter(
                    (r) => r.funcion?.id_funcion === funcion.id_funcion,
                );

                let asientosReservados = 0;
                for (const reserva of reservasFuncion) {
                    const asientosReserva = reservasAsiento.filter(
                        (ra) => ra.reserva?.id_reserva === reserva.id_reserva,
                    );
                    asientosReservados += asientosReserva.length;
                }

                const asientosDisponibles = sala.capacidad - asientosReservados;

                funcionesDetalle.push({
                    id_funcion: funcion.id_funcion,
                    fecha_hora: funcion.fecha_hora,
                    precio: funcion.precio,
                    sala: sala,
                    asientosDisponibles,
                });

                precios.push(funcion.precio);
            }

            cartelera.push({
                pelicula,
                totalFunciones: funcionesPelicula.length,
                funcionesDisponibles: funcionesDetalle,
                precioMinimo: Math.min(...precios),
                precioMaximo: Math.max(...precios),
            });
        }

        return cartelera;
    }

    // QUERY 2: Ocupación de Salas
    async getOcupacionSalas(): Promise<OcupacionSalaType[]> {
        const salas = await this.salasService.findAll();
        const funciones = await this.funcionService.findAll();
        const reservas = await this.reservaService.findAll();
        const reservasAsiento = await this.reservaAsientoService.findAll();
        const peliculas = await this.peliculasService.findAll();

        const ocupacion: OcupacionSalaType[] = [];

        for (const sala of salas) {
            const funcionesSala = funciones.filter(
                (f) => f.sala?.id_sala === sala.id_sala,
            );

            let totalReservas = 0;
            let asientosReservados = 0;
            const funcionesDetalle: FuncionOcupacionType[] = [];

            for (const funcion of funcionesSala) {
                const reservasFuncion = reservas.filter(
                    (r) => r.funcion?.id_funcion === funcion.id_funcion,
                );

                let asientosFuncion = 0;
                for (const reserva of reservasFuncion) {
                    const asientosReserva = reservasAsiento.filter(
                        (ra) => ra.reserva?.id_reserva === reserva.id_reserva,
                    );
                    asientosFuncion += asientosReserva.length;
                }

                totalReservas += reservasFuncion.length;
                asientosReservados += asientosFuncion;

                const pelicula = peliculas.find(
                    (p) => p.id_pelicula === funcion.pelicula?.id_pelicula,
                );

                if (pelicula) {
                    funcionesDetalle.push({
                        id_funcion: funcion.id_funcion,
                        fecha_hora: funcion.fecha_hora,
                        pelicula,
                        reservasCount: reservasFuncion.length,
                        asientosReservados: asientosFuncion,
                    });
                }
            }

            const capacidadTotal = sala.capacidad * funcionesSala.length;
            const porcentajeOcupacion =
                capacidadTotal > 0 ? (asientosReservados / capacidadTotal) * 100 : 0;

            ocupacion.push({
                sala,
                totalFunciones: funcionesSala.length,
                totalReservas,
                asientosReservados,
                porcentajeOcupacion: parseFloat(porcentajeOcupacion.toFixed(2)),
                funcionesDetalle,
            });
        }

        return ocupacion;
    }

    // QUERY 3: Historial de Usuario
    async getHistorialUsuario(usuarioId: string): Promise<HistorialUsuarioType> {
        const usuario = await this.usersService.findOne(usuarioId);
        const reservas = await this.reservaService.findByUsuario(usuarioId);
        const funciones = await this.funcionService.findAll();
        const peliculas = await this.peliculasService.findAll();
        const salas = await this.salasService.findAll();
        const facturas = await this.facturaService.findAll();
        const reservasAsiento = await this.reservaAsientoService.findAll();
        const asientos = await this.asientoService.findAll();

        let gastoTotal = 0;
        const reservasDetalladas: ReservaDetalladaType[] = [];

        for (const reserva of reservas) {
            const funcion = funciones.find(
                (f) => f.id_funcion === reserva.funcion?.id_funcion,
            );
            if (!funcion) continue;

            const pelicula = peliculas.find(
                (p) => p.id_pelicula === funcion.pelicula?.id_pelicula,
            );
            const sala = salas.find((s) => s.id_sala === funcion.sala?.id_sala);

            const factura = facturas.find(
                (f) => f.reserva?.id_reserva === reserva.id_reserva,
            );

            const asientosReserva = reservasAsiento.filter(
                (ra) => ra.reserva?.id_reserva === reserva.id_reserva,
            );

            const numerosAsientos = asientosReserva
                .map((ra) => {
                    const asiento = asientos.find(
                        (a) => a.id_asiento === ra.asiento?.id_asiento,
                    );
                    return asiento?.numero || '';
                })
                .filter((n) => n);

            if (factura) {
                gastoTotal += factura.total;
            }

            if (pelicula && sala) {
                reservasDetalladas.push({
                    id_reserva: reserva.id_reserva,
                    estado: reserva.estado,
                    cantidad_asientos: reserva.cantidad_asientos,
                    pelicula,
                    sala,
                    fecha_funcion: funcion.fecha_hora,
                    precioFuncion: funcion.precio,
                    totalPagado: factura?.total || 0,
                    fecha_emision_factura: factura?.fecha_emision || new Date(),
                    asientosReservados: numerosAsientos,
                });
            }
        }

        return {
            id_usuario: usuario.id_usuario,
            nombre: usuario.nombre,
            correo: usuario.correo,
            totalReservas: reservas.length,
            gastoTotal: parseFloat(gastoTotal.toFixed(2)),
            reservas: reservasDetalladas,
        };
    }
}
