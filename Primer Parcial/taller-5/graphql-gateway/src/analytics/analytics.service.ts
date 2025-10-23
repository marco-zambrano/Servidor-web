import { Injectable } from '@nestjs/common';
import { AnalyticsMarcoService } from './analytics-marco.service';
import { AnalyticsJostinService } from './analytics-jostin.service';
import { AnalyticsJeremyService } from './analytics-jeremy.service';

@Injectable()
export class AnalyticsService {
    constructor(
        private readonly marcoService: AnalyticsMarcoService,
        private readonly jostinService: AnalyticsJostinService,
        private readonly jeremyService: AnalyticsJeremyService,
    ) { }

    // Marco: Consultas de Información Agregada
    async getCarteleraCompleta() {
        return this.marcoService.getCarteleraCompleta();
    }

    async getOcupacionSalas() {
        return this.marcoService.getOcupacionSalas();
    }

    async getHistorialUsuario(usuarioId: string) {
        return this.marcoService.getHistorialUsuario(usuarioId);
    }

    // Jostin: Consultas de Análisis de Negocio
    async getPeliculasMasPopulares(limite: number) {
        return this.jostinService.getPeliculasMasPopulares(limite);
    }

    async getRendimientoPorHorario() {
        return this.jostinService.getRendimientoPorHorario();
    }

    async getAnalisisIngresos(fechaInicio: Date, fechaFin: Date) {
        return this.jostinService.getAnalisisIngresos(fechaInicio, fechaFin);
    }

    // Jeremy: Consultas de Búsqueda y Filtrado Avanzado
    async buscarFunciones(filtros: any) {
        return this.jeremyService.buscarFunciones(filtros);
    }

    async getClientesFrecuentes(filtros: any) {
        return this.jeremyService.getClientesFrecuentes(filtros);
    }

    async getDisponibilidadFunciones(filtros: any) {
        return this.jeremyService.getDisponibilidadFunciones(filtros);
    }
}
