import { Injectable } from '@nestjs/common';
import { PeliculasService } from '../peliculas/peliculas.service';
import { FuncionService } from '../funcion/funcion.service';
import { SalasService } from '../salas/salas.service';
import { ReservaService } from '../reserva/reserva.service';
import { ReservaAsientoService } from '../reserva-asiento/reserva-asiento.service';
import {
    PeliculaPopularType,
    RendimientoHorarioType,
    AnalisisIngresosType,
    IngresosPorPeliculaType,
    IngresosPorSalaType,
} from '../inputs/analytics.input';

@Injectable()
export class AnalyticsJostinService {
    constructor(
        private readonly peliculasService: PeliculasService,
        private readonly funcionService: FuncionService,
        private readonly salasService: SalasService,
        private readonly reservaService: ReservaService,
        private readonly reservaAsientoService: ReservaAsientoService,
    ) { }

    // QUERY 4: Películas Más Populares
    async getPeliculasMasPopulares(limite: number): Promise<PeliculaPopularType[]> {
        const peliculas = await this.peliculasService.findAll();
        const funciones = await this.funcionService.findAll();
        const reservas = await this.reservaService.findAll();
        const reservasAsiento = await this.reservaAsientoService.findAll();
        const salas = await this.salasService.findAll();

        const peliculasStats: PeliculaPopularType[] = [];

        for (const pelicula of peliculas) {
            const funcionesPelicula = funciones.filter(
                (f) => f.pelicula?.id_pelicula === pelicula.id_pelicula,
            );

            if (funcionesPelicula.length === 0) continue;

            let totalReservas = 0;
            let totalAsientosVendidos = 0;
            let ingresosTotales = 0;
            let capacidadTotal = 0;

            for (const funcion of funcionesPelicula) {
                const reservasFuncion = reservas.filter(
                    (r) => r.funcion?.id_funcion === funcion.id_funcion,
                );

                totalReservas += reservasFuncion.length;

                for (const reserva of reservasFuncion) {
                    const asientosReserva = reservasAsiento.filter(
                        (ra) => ra.reserva?.id_reserva === reserva.id_reserva,
                    );
                    const numAsientos = asientosReserva.length;
                    totalAsientosVendidos += numAsientos;
                    ingresosTotales += funcion.precio * numAsientos;
                }

                const sala = salas.find((s) => s.id_sala === funcion.sala?.id_sala);
                if (sala) {
                    capacidadTotal += sala.capacidad;
                }
            }

            const promedioAsientosPorFuncion =
                funcionesPelicula.length > 0
                    ? totalAsientosVendidos / funcionesPelicula.length
                    : 0;

            const tasaOcupacion =
                capacidadTotal > 0 ? (totalAsientosVendidos / capacidadTotal) * 100 : 0;

            peliculasStats.push({
                pelicula,
                totalFunciones: funcionesPelicula.length,
                totalReservas,
                totalAsientosVendidos,
                ingresosTotales: parseFloat(ingresosTotales.toFixed(2)),
                promedioAsientosPorFuncion: parseFloat(
                    promedioAsientosPorFuncion.toFixed(2),
                ),
                tasaOcupacion: parseFloat(tasaOcupacion.toFixed(2)),
            });
        }

        // Ordenar por total de asientos vendidos
        peliculasStats.sort((a, b) => b.totalAsientosVendidos - a.totalAsientosVendidos);

        return peliculasStats.slice(0, limite);
    }

    // QUERY 5: Rendimiento por Horario
    async getRendimientoPorHorario(): Promise<RendimientoHorarioType[]> {
        const funciones = await this.funcionService.findAll();
        const reservas = await this.reservaService.findAll();
        const reservasAsiento = await this.reservaAsientoService.findAll();
        const peliculas = await this.peliculasService.findAll();
        const salas = await this.salasService.findAll();

        const rangos = {
            'Mañana (6:00-12:00)': { min: 6, max: 12 },
            'Tarde (12:00-18:00)': { min: 12, max: 18 },
            'Noche (18:00-24:00)': { min: 18, max: 24 },
        };

        const rendimiento: RendimientoHorarioType[] = [];

        for (const [rangoNombre, rango] of Object.entries(rangos)) {
            const funcionesRango = funciones.filter((f) => {
                const hora = new Date(f.fecha_hora).getHours();
                return hora >= rango.min && hora < rango.max;
            });

            let totalReservas = 0;
            let ingresosTotales = 0;
            let totalAsientosVendidos = 0;
            let capacidadTotal = 0;
            const peliculasVistas = new Map<string, number>();

            for (const funcion of funcionesRango) {
                const reservasFuncion = reservas.filter(
                    (r) => r.funcion?.id_funcion === funcion.id_funcion,
                );

                totalReservas += reservasFuncion.length;

                for (const reserva of reservasFuncion) {
                    const asientosReserva = reservasAsiento.filter(
                        (ra) => ra.reserva?.id_reserva === reserva.id_reserva,
                    );
                    const numAsientos = asientosReserva.length;
                    totalAsientosVendidos += numAsientos;
                    ingresosTotales += funcion.precio * numAsientos;
                }

                const sala = salas.find((s) => s.id_sala === funcion.sala?.id_sala);
                if (sala) {
                    capacidadTotal += sala.capacidad;
                }

                if (funcion.pelicula?.id_pelicula) {
                    const count = peliculasVistas.get(funcion.pelicula.id_pelicula) || 0;
                    peliculasVistas.set(funcion.pelicula.id_pelicula, count + 1);
                }
            }

            const promedioIngresosPorFuncion =
                funcionesRango.length > 0 ? ingresosTotales / funcionesRango.length : 0;

            const tasaOcupacionPromedio =
                capacidadTotal > 0 ? (totalAsientosVendidos / capacidadTotal) * 100 : 0;

            // Top 3 películas más vistas en este horario
            const topPeliculas = Array.from(peliculasVistas.entries())
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([id]) => peliculas.find((p) => p.id_pelicula === id))
                .filter((p) => p !== undefined);

            rendimiento.push({
                rangoHorario: rangoNombre,
                totalFunciones: funcionesRango.length,
                totalReservas,
                ingresosTotales: parseFloat(ingresosTotales.toFixed(2)),
                promedioIngresosPorFuncion: parseFloat(
                    promedioIngresosPorFuncion.toFixed(2),
                ),
                tasaOcupacionPromedio: parseFloat(tasaOcupacionPromedio.toFixed(2)),
                peliculasMasVistas: topPeliculas,
            });
        }

        return rendimiento;
    }

    // QUERY 6: Análisis de Ingresos
    async getAnalisisIngresos(
        fechaInicio: Date,
        fechaFin: Date,
    ): Promise<AnalisisIngresosType> {
        const funciones = await this.funcionService.findAll();
        const reservas = await this.reservaService.findAll();
        const reservasAsiento = await this.reservaAsientoService.findAll();
        const peliculas = await this.peliculasService.findAll();
        const salas = await this.salasService.findAll();

        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);

        const funcionesPeriodo = funciones.filter((f) => {
            const fecha = new Date(f.fecha_hora);
            return fecha >= inicio && fecha <= fin;
        });

        let ingresosTotales = 0;
        let totalReservas = 0;
        let totalAsientosVendidos = 0;
        const ingresosPorPelicula = new Map<string, { ingresos: number; reservas: number }>();
        const ingresosPorSala = new Map<string, { ingresos: number; funciones: number }>();

        for (const funcion of funcionesPeriodo) {
            const reservasFuncion = reservas.filter(
                (r) => r.funcion?.id_funcion === funcion.id_funcion,
            );

            totalReservas += reservasFuncion.length;

            let ingresosFuncion = 0;
            for (const reserva of reservasFuncion) {
                const asientosReserva = reservasAsiento.filter(
                    (ra) => ra.reserva?.id_reserva === reserva.id_reserva,
                );
                const numAsientos = asientosReserva.length;
                const ingresos = funcion.precio * numAsientos;

                totalAsientosVendidos += numAsientos;
                ingresosTotales += ingresos;
                ingresosFuncion += ingresos;

                // Por película
                if (funcion.pelicula?.id_pelicula) {
                    const stats = ingresosPorPelicula.get(funcion.pelicula.id_pelicula) || {
                        ingresos: 0,
                        reservas: 0,
                    };
                    stats.ingresos += ingresos;
                    stats.reservas += 1;
                    ingresosPorPelicula.set(funcion.pelicula.id_pelicula, stats);
                }
            }

            // Por sala
            if (funcion.sala?.id_sala) {
                const stats = ingresosPorSala.get(funcion.sala.id_sala) || {
                    ingresos: 0,
                    funciones: 0,
                };
                stats.ingresos += ingresosFuncion;
                stats.funciones += 1;
                ingresosPorSala.set(funcion.sala.id_sala, stats);
            }
        }

        const ticketPromedio =
            totalAsientosVendidos > 0 ? ingresosTotales / totalAsientosVendidos : 0;

        const dias = Math.ceil((fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24)) || 1;
        const ingresoPromedioPorDia = ingresosTotales / dias;

        // Desglose por película
        const desglosePorPelicula: IngresosPorPeliculaType[] = [];
        for (const [peliculaId, stats] of ingresosPorPelicula.entries()) {
            const pelicula = peliculas.find((p) => p.id_pelicula === peliculaId);
            if (pelicula) {
                desglosePorPelicula.push({
                    pelicula,
                    ingresos: parseFloat(stats.ingresos.toFixed(2)),
                    reservas: stats.reservas,
                    porcentajeDelTotal: parseFloat(
                        ((stats.ingresos / ingresosTotales) * 100).toFixed(2),
                    ),
                });
            }
        }
        desglosePorPelicula.sort((a, b) => b.ingresos - a.ingresos);

        // Desglose por sala
        const desglosePorSala: IngresosPorSalaType[] = [];
        for (const [salaId, stats] of ingresosPorSala.entries()) {
            const sala = salas.find((s) => s.id_sala === salaId);
            if (sala) {
                desglosePorSala.push({
                    id_sala: salaId,
                    nombreSala: sala.nombre,
                    ingresos: parseFloat(stats.ingresos.toFixed(2)),
                    funciones: stats.funciones,
                    porcentajeDelTotal: parseFloat(
                        ((stats.ingresos / ingresosTotales) * 100).toFixed(2),
                    ),
                });
            }
        }
        desglosePorSala.sort((a, b) => b.ingresos - a.ingresos);

        return {
            periodo: `${inicio.toLocaleDateString()} - ${fin.toLocaleDateString()}`,
            ingresosTotales: parseFloat(ingresosTotales.toFixed(2)),
            totalReservas,
            totalAsientosVendidos,
            ticketPromedio: parseFloat(ticketPromedio.toFixed(2)),
            ingresoPromedioPorDia: parseFloat(ingresoPromedioPorDia.toFixed(2)),
            desglosePorPelicula,
            desglosePorSala,
        };
    }
}
