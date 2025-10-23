import { Injectable } from '@nestjs/common';
import { AnalyticsIntegrante1Service } from './analytics-integrante1.service';
import { AnalyticsIntegrante2Service } from './analytics-integrante2.service';
import { AnalyticsIntegrante3Service } from './analytics-integrante3.service';

@Injectable()
export class AnalyticsService {
    constructor(
        private readonly integrante1Service: AnalyticsIntegrante1Service,
        private readonly integrante2Service: AnalyticsIntegrante2Service,
        private readonly integrante3Service: AnalyticsIntegrante3Service,
    ) { }

    // INTEGRANTE 1: Consultas de Información Agregada
    async getCarteleraCompleta() {
        return this.integrante1Service.getCarteleraCompleta();
    }

    async getOcupacionSalas() {
        return this.integrante1Service.getOcupacionSalas();
    }

    async getHistorialUsuario(usuarioId: string) {
        return this.integrante1Service.getHistorialUsuario(usuarioId);
    }

    // INTEGRANTE 2: Consultas de Análisis de Negocio
    async getPeliculasMasPopulares(limite: number) {
        return this.integrante2Service.getPeliculasMasPopulares(limite);
    }

    async getRendimientoPorHorario() {
        return this.integrante2Service.getRendimientoPorHorario();
    }

    async getAnalisisIngresos(fechaInicio: Date, fechaFin: Date) {
        return this.integrante2Service.getAnalisisIngresos(fechaInicio, fechaFin);
    }

    // INTEGRANTE 3: Consultas de Búsqueda y Filtrado Avanzado
    async buscarFunciones(filtros: any) {
        return this.integrante3Service.buscarFunciones(filtros);
    }

    async getClientesFrecuentes(filtros: any) {
        return this.integrante3Service.getClientesFrecuentes(filtros);
    }

    async getDisponibilidadFunciones(filtros: any) {
        return this.integrante3Service.getDisponibilidadFunciones(filtros);
    }
}
