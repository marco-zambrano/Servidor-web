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
    FuncionBusquedaType,
    ClienteFrecuenteType,
    DisponibilidadFuncionType,
    FuncionDisponibleType,
    BusquedaFuncionesInput,
    FiltroClientesFrecuentesInput,
    DisponibilidadFuncionesInput,
} from '../inputs/busqueda.input';

@Injectable()
export class AnalyticsJeremyService {
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

    // QUERY 7: Búsqueda Avanzada de Funciones
    async buscarFunciones(
        filtros: BusquedaFuncionesInput,
    ): Promise<FuncionBusquedaType[]> {
        let funciones = await this.funcionService.findAll();
        const peliculas = await this.peliculasService.findAll();
        const salas = await this.salasService.findAll();
        const reservas = await this.reservaService.findAll();
        const reservasAsiento = await this.reservaAsientoService.findAll();

        // Aplicar filtros
        if (filtros.peliculaId) {
            funciones = funciones.filter(
                (f) => f.pelicula?.id_pelicula === filtros.peliculaId,
            );
        }

        if (filtros.genero) {
            funciones = funciones.filter((f) => {
                const pelicula = peliculas.find(
                    (p) => p.id_pelicula === f.pelicula?.id_pelicula,
                );
                return pelicula?.genero === filtros.genero;
            });
        }

        if (filtros.salaId) {
            funciones = funciones.filter((f) => f.sala?.id_sala === filtros.salaId);
        }

        if (filtros.fechaInicio) {
            const inicio = new Date(filtros.fechaInicio);
            funciones = funciones.filter((f) => new Date(f.fecha_hora) >= inicio);
        }

        if (filtros.fechaFin) {
            const fin = new Date(filtros.fechaFin);
            funciones = funciones.filter((f) => new Date(f.fecha_hora) <= fin);
        }

        if (filtros.precioMinimo !== undefined) {
            funciones = funciones.filter((f) => f.precio >= filtros.precioMinimo!);
        }

        if (filtros.precioMaximo !== undefined) {
            funciones = funciones.filter((f) => f.precio <= filtros.precioMaximo!);
        }

        // Construir resultado con disponibilidad
        const resultado: FuncionBusquedaType[] = [];

        for (const funcion of funciones) {
            const pelicula = peliculas.find(
                (p) => p.id_pelicula === funcion.pelicula?.id_pelicula,
            );
            const sala = salas.find((s) => s.id_sala === funcion.sala?.id_sala);

            if (!pelicula || !sala) continue;

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
            const porcentajeDisponibilidad = (asientosDisponibles / sala.capacidad) * 100;

            // Filtro de asientos mínimos disponibles
            if (
                filtros.asientosMinimosDisponibles &&
                asientosDisponibles < filtros.asientosMinimosDisponibles
            ) {
                continue;
            }

            resultado.push({
                id_funcion: funcion.id_funcion,
                fecha_hora: funcion.fecha_hora,
                precio: funcion.precio,
                pelicula,
                nombreSala: sala.nombre,
                capacidadSala: sala.capacidad,
                asientosDisponibles,
                porcentajeDisponibilidad: parseFloat(porcentajeDisponibilidad.toFixed(2)),
            });
        }

        // Ordenamiento
        if (filtros.ordenarPor) {
            resultado.sort((a, b) => {
                let comparison = 0;

                switch (filtros.ordenarPor) {
                    case 'fecha':
                        comparison =
                            new Date(a.fecha_hora).getTime() - new Date(b.fecha_hora).getTime();
                        break;
                    case 'precio':
                        comparison = a.precio - b.precio;
                        break;
                    case 'disponibilidad':
                        comparison = a.asientosDisponibles - b.asientosDisponibles;
                        break;
                }

                return filtros.orden === 'DESC' ? -comparison : comparison;
            });
        }

        return resultado;
    }

    // QUERY 8: Clientes Frecuentes
    async getClientesFrecuentes(
        filtros: FiltroClientesFrecuentesInput,
    ): Promise<ClienteFrecuenteType[]> {
        const usuarios = await this.usersService.findAll();
        const reservas = await this.reservaService.findAll();
        const facturas = await this.facturaService.findAll();
        const funciones = await this.funcionService.findAll();
        const peliculas = await this.peliculasService.findAll();

        const clientesStats: ClienteFrecuenteType[] = [];

        for (const usuario of usuarios) {
            let reservasUsuario = reservas.filter(
                (r) => r.usuario?.id_usuario === usuario.id_usuario,
            );

            // Filtro por fechas
            if (filtros.fechaInicio || filtros.fechaFin) {
                reservasUsuario = reservasUsuario.filter((r) => {
                    const funcion = funciones.find(
                        (f) => f.id_funcion === r.funcion?.id_funcion,
                    );
                    if (!funcion) return false;

                    const fecha = new Date(funcion.fecha_hora);
                    if (filtros.fechaInicio && fecha < new Date(filtros.fechaInicio))
                        return false;
                    if (filtros.fechaFin && fecha > new Date(filtros.fechaFin)) return false;

                    return true;
                });
            }

            if (reservasUsuario.length === 0) continue;

            // Calcular gasto total
            let gastoTotal = 0;
            for (const reserva of reservasUsuario) {
                const factura = facturas.find(
                    (f) => f.reserva?.id_reserva === reserva.id_reserva,
                );
                if (factura) {
                    gastoTotal += factura.total;
                }
            }

            // Filtros de mínimos
            if (filtros.minimoReservas && reservasUsuario.length < filtros.minimoReservas)
                continue;
            if (filtros.gastoMinimo && gastoTotal < filtros.gastoMinimo) continue;

            // Géneros preferidos
            const generosCount = new Map<string, number>();
            const peliculasVistas = new Map<string, number>();
            let ultimaFecha: Date | null = null;

            for (const reserva of reservasUsuario) {
                const funcion = funciones.find(
                    (f) => f.id_funcion === reserva.funcion?.id_funcion,
                );
                if (!funcion) continue;

                const fechaFuncion = new Date(funcion.fecha_hora);
                if (!ultimaFecha || fechaFuncion > ultimaFecha) {
                    ultimaFecha = fechaFuncion;
                }

                const pelicula = peliculas.find(
                    (p) => p.id_pelicula === funcion.pelicula?.id_pelicula,
                );
                if (!pelicula) continue;

                generosCount.set(pelicula.genero, (generosCount.get(pelicula.genero) || 0) + 1);
                peliculasVistas.set(
                    pelicula.id_pelicula,
                    (peliculasVistas.get(pelicula.id_pelicula) || 0) + 1,
                );
            }

            const generosPreferidos = Array.from(generosCount.entries())
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([genero]) => genero);

            const peliculasMasVistas = Array.from(peliculasVistas.entries())
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([id]) => peliculas.find((p) => p.id_pelicula === id))
                .filter((p) => p !== undefined);

            const diasDesdeUltimaReserva = ultimaFecha
                ? Math.floor((Date.now() - ultimaFecha.getTime()) / (1000 * 60 * 60 * 24))
                : 0;

            clientesStats.push({
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                correo: usuario.correo,
                totalReservas: reservasUsuario.length,
                gastoTotal: parseFloat(gastoTotal.toFixed(2)),
                gastoPromedioPorReserva: parseFloat(
                    (gastoTotal / reservasUsuario.length).toFixed(2),
                ),
                generosPreferidos,
                peliculasMasVistas,
                ultimaReserva: ultimaFecha || new Date(),
                diasDesdeUltimaReserva,
            });
        }

        // Ordenar por gasto total descendente
        clientesStats.sort((a, b) => b.gastoTotal - a.gastoTotal);

        return clientesStats.slice(0, filtros.limite || 10);
    }

    // QUERY 9: Disponibilidad de Funciones con Recomendaciones
    async getDisponibilidadFunciones(
        filtros: DisponibilidadFuncionesInput,
    ): Promise<DisponibilidadFuncionType> {
        const funciones = await this.funcionService.findAll();
        const peliculas = await this.peliculasService.findAll();
        const salas = await this.salasService.findAll();
        const reservas = await this.reservaService.findAll();
        const reservasAsiento = await this.reservaAsientoService.findAll();

        const fechaBusqueda = new Date(filtros.fecha);
        const fechaInicio = new Date(fechaBusqueda.setHours(0, 0, 0, 0));
        const fechaFin = new Date(fechaBusqueda.setHours(23, 59, 59, 999));

        // Filtrar funciones por fecha
        let funcionesFecha = funciones.filter((f) => {
            const fecha = new Date(f.fecha_hora);
            return fecha >= fechaInicio && fecha <= fechaFin;
        });

        // Aplicar filtros adicionales
        if (filtros.genero) {
            funcionesFecha = funcionesFecha.filter((f) => {
                const pelicula = peliculas.find(
                    (p) => p.id_pelicula === f.pelicula?.id_pelicula,
                );
                return pelicula?.genero === filtros.genero;
            });
        }

        if (filtros.clasificacion) {
            funcionesFecha = funcionesFecha.filter((f) => {
                const pelicula = peliculas.find(
                    (p) => p.id_pelicula === f.pelicula?.id_pelicula,
                );
                return pelicula?.clasificacion === filtros.clasificacion;
            });
        }

        const funcionesDisponibles: FuncionDisponibleType[] = [];

        for (const funcion of funcionesFecha) {
            const pelicula = peliculas.find(
                (p) => p.id_pelicula === funcion.pelicula?.id_pelicula,
            );
            const sala = salas.find((s) => s.id_sala === funcion.sala?.id_sala);

            if (!pelicula || !sala) continue;

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

            // Filtro por asientos requeridos
            if (
                filtros.asientosRequeridos &&
                asientosDisponibles < filtros.asientosRequeridos
            ) {
                continue;
            }

            const costoTotal = filtros.asientosRequeridos
                ? funcion.precio * filtros.asientosRequeridos
                : funcion.precio;

            // Filtro por presupuesto
            if (filtros.presupuestoMaximo && costoTotal > filtros.presupuestoMaximo) {
                continue;
            }

            // Lógica de recomendación
            let recomendada = false;
            let razonRecomendacion: string | undefined;

            const porcentajeDisponibilidad = (asientosDisponibles / sala.capacidad) * 100;

            if (porcentajeDisponibilidad > 50) {
                recomendada = true;
                razonRecomendacion = 'Excelente disponibilidad de asientos';
            } else if (
                filtros.presupuestoMaximo &&
                costoTotal <= filtros.presupuestoMaximo * 0.8
            ) {
                recomendada = true;
                razonRecomendacion = 'Precio muy conveniente para tu presupuesto';
            } else if (sala.tipo === 'VIP' || sala.tipo === 'Premium') {
                recomendada = true;
                razonRecomendacion = 'Sala premium con mejor experiencia';
            }

            funcionesDisponibles.push({
                funcion: {
                    ...funcion,
                    pelicula,
                    sala,
                },
                asientosDisponibles,
                costoTotal: parseFloat(costoTotal.toFixed(2)),
                recomendada,
                razonRecomendacion,
            });
        }

        // Ordenar: recomendadas primero, luego por disponibilidad
        funcionesDisponibles.sort((a, b) => {
            if (a.recomendada && !b.recomendada) return -1;
            if (!a.recomendada && b.recomendada) return 1;
            return b.asientosDisponibles - a.asientosDisponibles;
        });

        return {
            fecha: new Date(filtros.fecha),
            totalFuncionesDisponibles: funcionesDisponibles.length,
            funciones: funcionesDisponibles,
        };
    }
}
