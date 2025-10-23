import { Resolver, Query, Args } from '@nestjs/graphql';
import { AnalyticsService } from './analytics.service';
import {
    CarteleraType,
    OcupacionSalaType,
    HistorialUsuarioType,
} from '../types/cartelera.type';
import {
    PeliculaPopularType,
    RendimientoHorarioType,
    AnalisisIngresosType,
} from '../types/analytics.type';
import {
    FuncionBusquedaType,
    ClienteFrecuenteType,
    DisponibilidadFuncionType,
    BusquedaFuncionesInput,
    FiltroClientesFrecuentesInput,
    DisponibilidadFuncionesInput,
} from '../types/busqueda.type';

@Resolver()
export class AnalyticsResolver {
    constructor(private readonly analyticsService: AnalyticsService) { }

    // ============================================
    // INTEGRANTE 1: CONSULTAS DE INFORMACIÓN AGREGADA
    // ============================================

    /**
     * Query 1: Cartelera completa con información de películas, funciones y disponibilidad
     * Combina: Películas + Funciones + Salas + Reservas
     */
    @Query(() => [CarteleraType], {
        name: 'carteleraCompleta',
        description: 'Obtiene la cartelera completa con todas las funciones disponibles, precios y disponibilidad de asientos',
    })
    async getCarteleraCompleta(): Promise<CarteleraType[]> {
        return this.analyticsService.getCarteleraCompleta();
    }

    /**
     * Query 2: Ocupación de salas con estadísticas detalladas
     * Combina: Salas + Funciones + Reservas + Asientos
     */
    @Query(() => [OcupacionSalaType], {
        name: 'ocupacionSalas',
        description: 'Análisis de ocupación de todas las salas con porcentajes y detalles de funciones',
    })
    async getOcupacionSalas(): Promise<OcupacionSalaType[]> {
        return this.analyticsService.getOcupacionSalas();
    }

    /**
     * Query 3: Historial completo de reservas de un usuario
     * Combina: Usuario + Reservas + Funciones + Películas + Salas + Facturas + Asientos
     */
    @Query(() => HistorialUsuarioType, {
        name: 'historialUsuario',
        description: 'Historial completo de un usuario con todas sus reservas, películas vistas y gastos',
    })
    async getHistorialUsuario(
        @Args('usuarioId') usuarioId: string,
    ): Promise<HistorialUsuarioType> {
        return this.analyticsService.getHistorialUsuario(usuarioId);
    }

    // ============================================
    // INTEGRANTE 2: CONSULTAS DE ANÁLISIS DE NEGOCIO
    // ============================================

    /**
     * Query 4: Películas más populares con métricas de rendimiento
     * Calcula: Total de reservas, ingresos, tasa de ocupación, promedio de asientos
     */
    @Query(() => [PeliculaPopularType], {
        name: 'peliculasMasPopulares',
        description: 'Top de películas más populares con estadísticas de ventas y ocupación',
    })
    async getPeliculasMasPopulares(
        @Args('limite', { defaultValue: 10 }) limite: number,
    ): Promise<PeliculaPopularType[]> {
        return this.analyticsService.getPeliculasMasPopulares(limite);
    }

    /**
     * Query 5: Rendimiento de funciones por horario
     * Calcula: Ingresos por rango horario, promedio de ocupación, películas más vistas
     */
    @Query(() => [RendimientoHorarioType], {
        name: 'rendimientoPorHorario',
        description: 'Análisis de rendimiento de funciones agrupadas por rangos horarios (mañana, tarde, noche)',
    })
    async getRendimientoPorHorario(): Promise<RendimientoHorarioType[]> {
        return this.analyticsService.getRendimientoPorHorario();
    }

    /**
     * Query 6: Análisis de ingresos por período con KPIs
     * Calcula: Ingresos totales, ticket promedio, ingresos por día, desglose por película y sala
     */
    @Query(() => AnalisisIngresosType, {
        name: 'analisisIngresos',
        description: 'Análisis completo de ingresos con KPIs y desgloses por película y sala',
    })
    async getAnalisisIngresos(
        @Args('fechaInicio') fechaInicio: Date,
        @Args('fechaFin') fechaFin: Date,
    ): Promise<AnalisisIngresosType> {
        return this.analyticsService.getAnalisisIngresos(fechaInicio, fechaFin);
    }

    // ============================================
    // INTEGRANTE 3: CONSULTAS DE BÚSQUEDA Y FILTRADO AVANZADO
    // ============================================

    /**
     * Query 7: Búsqueda avanzada de funciones con múltiples filtros
     * Filtros: Película, género, sala, rango de fechas, precio, disponibilidad
     * Incluye: Ordenamiento y paginación
     */
    @Query(() => [FuncionBusquedaType], {
        name: 'buscarFunciones',
        description: 'Búsqueda avanzada de funciones con filtros múltiples, ordenamiento y disponibilidad en tiempo real',
    })
    async buscarFunciones(
        @Args('filtros') filtros: BusquedaFuncionesInput,
    ): Promise<FuncionBusquedaType[]> {
        return this.analyticsService.buscarFunciones(filtros);
    }

    /**
     * Query 8: Clientes frecuentes con análisis de comportamiento
     * Filtros: Mínimo de reservas, gasto mínimo, período
     * Incluye: Géneros preferidos, películas más vistas, días desde última reserva
     */
    @Query(() => [ClienteFrecuenteType], {
        name: 'clientesFrecuentes',
        description: 'Análisis de clientes frecuentes con patrones de consumo y preferencias',
    })
    async getClientesFrecuentes(
        @Args('filtros') filtros: FiltroClientesFrecuentesInput,
    ): Promise<ClienteFrecuenteType[]> {
        return this.analyticsService.getClientesFrecuentes(filtros);
    }

    /**
     * Query 9: Disponibilidad de funciones con recomendaciones
     * Filtros: Fecha, género, clasificación, asientos requeridos, presupuesto
     * Incluye: Recomendaciones inteligentes basadas en criterios
     */
    @Query(() => DisponibilidadFuncionType, {
        name: 'disponibilidadFunciones',
        description: 'Consulta de disponibilidad de funciones con filtros avanzados y recomendaciones inteligentes',
    })
    async getDisponibilidadFunciones(
        @Args('filtros') filtros: DisponibilidadFuncionesInput,
    ): Promise<DisponibilidadFuncionType> {
        return this.analyticsService.getDisponibilidadFunciones(filtros);
    }
}
