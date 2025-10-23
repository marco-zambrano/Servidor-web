import { Resolver, Query, Args } from '@nestjs/graphql';
import { AnalyticsService } from './analytics.service';
import {
    CarteleraType,
    OcupacionSalaType,
    HistorialUsuarioType,
} from '../inputs/cartelera.input';
import {
    PeliculaPopularType,
    RendimientoHorarioType,
    AnalisisIngresosType,
} from '../inputs/analytics.input';
import {
    FuncionBusquedaType,
    ClienteFrecuenteType,
    DisponibilidadFuncionType,
    BusquedaFuncionesInput,
    FiltroClientesFrecuentesInput,
    DisponibilidadFuncionesInput,
} from '../inputs/busqueda.input';

@Resolver()
export class AnalyticsResolver {
    constructor(private readonly analyticsService: AnalyticsService) { }

    // Marco: CONSULTAS DE INFORMACIÓN AGREGADA
    // Query 1
    @Query(() => [CarteleraType], {
        name: 'carteleraCompleta',
        description: 'Obtiene la cartelera completa con todas las funciones disponibles, precios y disponibilidad de asientos',
    })
    async getCarteleraCompleta(): Promise<CarteleraType[]> {
        return this.analyticsService.getCarteleraCompleta();
    }

    // Query 2
    @Query(() => [OcupacionSalaType], {
        name: 'ocupacionSalas',
        description: 'Análisis de ocupación de todas las salas con porcentajes y detalles de funciones',
    })
    async getOcupacionSalas(): Promise<OcupacionSalaType[]> {
        return this.analyticsService.getOcupacionSalas();
    }

    // Query 3
    @Query(() => HistorialUsuarioType, {
        name: 'historialUsuario',
        description: 'Historial completo de un usuario con todas sus reservas, películas vistas y gastos',
    })
    async getHistorialUsuario(
        @Args('usuarioId') usuarioId: string,
    ): Promise<HistorialUsuarioType> {
        return this.analyticsService.getHistorialUsuario(usuarioId);
    }


    // Jostin: CONSULTAS DE ANÁLISIS DE NEGOCIO
    // Query 4
    @Query(() => [PeliculaPopularType], {
        name: 'peliculasMasPopulares',
        description: 'Top de películas más populares con estadísticas de ventas y ocupación',
    })
    async getPeliculasMasPopulares(
        @Args('limite', { defaultValue: 10 }) limite: number,
    ): Promise<PeliculaPopularType[]> {
        return this.analyticsService.getPeliculasMasPopulares(limite);
    }

    // Query 5
    @Query(() => [RendimientoHorarioType], {
        name: 'rendimientoPorHorario',
        description: 'Análisis de rendimiento de funciones agrupadas por rangos horarios (mañana, tarde, noche)',
    })
    async getRendimientoPorHorario(): Promise<RendimientoHorarioType[]> {
        return this.analyticsService.getRendimientoPorHorario();
    }

    // Query 6
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


    // Jeremy: CONSULTAS DE BÚSQUEDA Y FILTRADO AVANZADO
    // Query 7
    @Query(() => [FuncionBusquedaType], {
        name: 'buscarFunciones',
        description: 'Búsqueda avanzada de funciones con filtros múltiples, ordenamiento y disponibilidad en tiempo real',
    })
    async buscarFunciones(
        @Args('filtros') filtros: BusquedaFuncionesInput,
    ): Promise<FuncionBusquedaType[]> {
        return this.analyticsService.buscarFunciones(filtros);
    }

    // Query 8
    @Query(() => [ClienteFrecuenteType], {
        name: 'clientesFrecuentes',
        description: 'Análisis de clientes frecuentes con patrones de consumo y preferencias',
    })
    async getClientesFrecuentes(
        @Args('filtros') filtros: FiltroClientesFrecuentesInput,
    ): Promise<ClienteFrecuenteType[]> {
        return this.analyticsService.getClientesFrecuentes(filtros);
    }

    // Query 9
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
