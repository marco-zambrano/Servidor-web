import { Injectable } from '@nestjs/common';
import { ReservasService } from '../reservas/reservas.service';
import { FacturasService } from '../facturas/facturas.service';
import { FuncionesService } from '../funciones/funciones.service';
import { PeliculasService } from '../peliculas/peliculas.service';
import { SalasService } from '../salas/salas.service';

interface GeneroData {
  peliculas: any[];
  totalFunciones: number;
  totalReservas: number;
  ingresoTotal: number;
  ocupacionTotal: number;
  funcionesCount: number;
}


@Injectable()
export class AnalyticsService {
  constructor(
    private reservasService: ReservasService,
    private facturasService: FacturasService,
    private funcionesService: FuncionesService,
    private peliculasService: PeliculasService,
    private salasService: SalasService,
  ) {}

  // Query 4: Análisis de Ventas por Período con Métricas
  async getVentasAnalisis(fechaInicio: Date, fechaFin: Date, agruparPor: string = 'dia') {
    // Obtener todas las reservas
    const todasReservas = await this.reservasService.findAll();
    // Obtener todas las facturas
    const facturas = await this.facturasService.findAll();
    // Filtrar reservas por período
    const reservas = todasReservas.filter(r => {
      const fechaReserva = new Date(r.funcion.fecha_hora);
      return fechaReserva >= fechaInicio && fechaReserva <= fechaFin;
    });

    // Calcular métricas generales
    const totalReservas = reservas.length;
    const totalAsientosVendidos = reservas.reduce((sum, r) => sum + r.cantidad_asientos, 0);
    
    const facturasReservas = facturas.filter(f =>
      reservas.some(r => r.id_reserva === f.reserva?.id_reserva)
    );
    const ingresoTotal = facturasReservas.reduce((sum, f) => sum + parseFloat(f.total), 0);

    const ingresoPromedioPorReserva = totalReservas > 0 ? ingresoTotal / totalReservas : 0;
    const precioPromedioPorAsiento = totalAsientosVendidos > 0 ? ingresoTotal / totalAsientosVendidos : 0;

    const reservasCanceladas = reservas.filter(r => r.estado === 'cancelada').length;
    const tasaCancelacion = totalReservas > 0 ? (reservasCanceladas / totalReservas) * 100 : 0;

    // Encontrar película más vendida
    const peliculasVentas = {};
    for (const reserva of reservas) {
      const funcion = await this.funcionesService.findOne(reserva.funcion.id_funcion);
      const peliculaId = funcion.pelicula.id_pelicula;

      if (!peliculasVentas[peliculaId]) {
        peliculasVentas[peliculaId] = { count: 0, titulo: '' };
      }
      peliculasVentas[peliculaId].count += reserva.cantidad_asientos;
    }

    let peliculaMasVendida = 'N/A';
    let maxVentas = 0;
    for (const [peliculaId, peliculaData] of Object.entries(peliculasVentas) as [string, { count: number; titulo: string }][]) {
      if (peliculaData.count > maxVentas) {
        maxVentas = peliculaData.count;
        const pelicula = await this.peliculasService.findOne(peliculaId);
        peliculaMasVendida = pelicula.titulo;
      }
    }

    // Encontrar sala más utilizada
    const salasUso = {};
    for (const reserva of reservas) {
      const funcion = await this.funcionesService.findOne(reserva.funcion.id_funcion);
      const salaId = funcion.sala.id_sala;

      if (!salasUso[salaId]) {
        salasUso[salaId] = { count: 0, nombre: '' };
      }
      salasUso[salaId].count++;
    }

    let salaMasUtilizada = 'N/A';
    let maxUso = 0;
    for (const [salaId, salaData] of Object.entries(salasUso) as [string, { count: number; nombre: string }][]) {
      if (salaData.count > maxUso) {
        maxUso = salaData.count;
        const sala = await this.salasService.findOne(salaId);
        salaMasUtilizada = sala.nombre;
      }
    }

    // Agrupar por día
    const ventasPorDia = {};
    for (const reserva of reservas) {
      const fecha = new Date(reserva.funcion.fecha_hora).toISOString().split('T')[0];
      
      if (!ventasPorDia[fecha]) {
        ventasPorDia[fecha] = { reservas: 0, ingresos: 0 };
      }
      
      ventasPorDia[fecha].reservas++;
      
      const factura = facturasReservas.find(f => f.reserva?.id_reserva === reserva.id_reserva);
      if (factura) {
        ventasPorDia[fecha].ingresos += parseFloat(factura.total);
      }
    }

    const detalleDiario = Object.entries(ventasPorDia).map(([fecha, ventaData]: [string, { reservas: number; ingresos: number }]) => ({
      fecha: new Date(fecha),
      reservas: ventaData.reservas,
      ingresos: ventaData.ingresos,
    }));

    const periodo = `${fechaInicio.toISOString().split('T')[0]} - ${fechaFin.toISOString().split('T')[0]}`;

    return {
      periodo,
      total_reservas: totalReservas,
      total_asientos_vendidos: totalAsientosVendidos,
      ingreso_total: ingresoTotal,
      ingreso_promedio_por_reserva: ingresoPromedioPorReserva,
      precio_promedio_por_asiento: precioPromedioPorAsiento,
      reservas_canceladas: reservasCanceladas,
      tasa_cancelacion: tasaCancelacion,
      pelicula_mas_vendida: peliculaMasVendida,
      sala_mas_utilizada: salaMasUtilizada,
      detalle_diario: detalleDiario,
    };
  }

  // Query 5: KPIs de Ocupación de Salas
  async getSalaKPIs(idSala: string) {
    // Obtener sala
    const sala = await this.salasService.findOne(idSala);

    // Obtener funciones de la sala
    const funciones = await this.funcionesService.findBySala(idSala);

    // Obtener todas las reservas
    const todasReservas = await this.reservasService.findAll();

    const totalFunciones = funciones.length;
    const ahora = new Date();
    const funcionesCompletadas = funciones.filter(f => new Date(f.fecha_hora) < ahora).length;

        let tasasOcupacion: number[] = [];
    let ingresoTotal = 0;
    let asientosVendidosTotal = 0;
    const horariosPico = {};

    for (const funcion of funciones) {
      const reservasFuncion = todasReservas.filter(
        r => r.funcion.id_funcion === funcion.id_funcion
      );

      const asientosReservados = reservasFuncion.reduce((sum, r) => sum + r.cantidad_asientos, 0);
      const tasaOcupacion = (asientosReservados / sala.capacidad) * 100;
      tasasOcupacion.push(tasaOcupacion);

      ingresoTotal += asientosReservados * parseFloat(funcion.precio);
      asientosVendidosTotal += asientosReservados;

      // Analizar horarios pico
      const hora = new Date(funcion.fecha_hora).getHours();
      const rangoHora = `${hora}:00`;
      
      if (!horariosPico[rangoHora]) {
        horariosPico[rangoHora] = { funciones: 0, ocupacionTotal: 0 };
      }
      horariosPico[rangoHora].funciones++;
      horariosPico[rangoHora].ocupacionTotal += tasaOcupacion;
    }

    const tasaOcupacionPromedio = tasasOcupacion.length > 0 
      ? tasasOcupacion.reduce((sum, t) => sum + t, 0) / tasasOcupacion.length 
      : 0;
    const tasaOcupacionMaxima = tasasOcupacion.length > 0 ? Math.max(...tasasOcupacion) : 0;
    const tasaOcupacionMinima = tasasOcupacion.length > 0 ? Math.min(...tasasOcupacion) : 0;

    const ingresoPorFuncion = totalFunciones > 0 ? ingresoTotal / totalFunciones : 0;
    const asientosDisponiblesTotal = (sala.capacidad * totalFunciones) - asientosVendidosTotal;

    const horariosPicoArray = Object.entries(horariosPico).map(([hora, horarioData]: [string, { funciones: number; ocupacionTotal: number }]) => ({
      hora,
      funciones: horarioData.funciones,
      ocupacion_promedio: horarioData.ocupacionTotal / horarioData.funciones,
    })).sort((a, b) => b.ocupacion_promedio - a.ocupacion_promedio);

    return {
      id_sala: sala.id_sala,
      nombre_sala: sala.nombre,
      tipo: sala.tipo,
      capacidad: sala.capacidad,
      total_funciones: totalFunciones,
      funciones_completadas: funcionesCompletadas,
      tasa_ocupacion_promedio: tasaOcupacionPromedio,
      tasa_ocupacion_maxima: tasaOcupacionMaxima,
      tasa_ocupacion_minima: tasaOcupacionMinima,
      ingreso_total: ingresoTotal,
      ingreso_por_funcion: ingresoPorFuncion,
      asientos_vendidos_total: asientosVendidosTotal,
      asientos_disponibles_total: asientosDisponiblesTotal,
      horarios_pico: horariosPicoArray,
    };
  }

  // Query 6: Análisis Comparativo de Películas por Género
  async getGeneroAnalisis() {
    // Obtener todas las películas
    const peliculas = await this.peliculasService.findAll();

    // Obtener todas las funciones
    const funciones = await this.funcionesService.findAll();

    // Obtener todas las reservas
    const reservas = await this.reservasService.findAll();

    // Agrupar por género
    const generos = {};

    for (const pelicula of peliculas) {
      const genero = pelicula.genero;

      if (!generos[genero]) {
        generos[genero] = {
          peliculas: [],
          totalFunciones: 0,
          totalReservas: 0,
          ingresoTotal: 0,
          ocupacionTotal: 0,
          funcionesCount: 0,
        };
      }

      // Obtener funciones de esta película
      const funcionesPelicula = funciones.filter(
        f => f.pelicula.id_pelicula === pelicula.id_pelicula
      );

      let reservasPelicula = 0;
      let ingresoPelicula = 0;
      let ocupacionPelicula = 0;

      for (const funcion of funcionesPelicula) {
        const reservasFuncion = reservas.filter(
          r => r.funcion.id_funcion === funcion.id_funcion
        );

        const asientosReservados = reservasFuncion.reduce((sum, r) => sum + r.cantidad_asientos, 0);
        
        // Obtener sala para calcular ocupación
        const sala = await this.salasService.findOne(funcion.sala.id_sala);

        const ocupacion = (asientosReservados / sala.capacidad) * 100;

        reservasPelicula += reservasFuncion.length;
        ingresoPelicula += asientosReservados * parseFloat(funcion.precio);
        ocupacionPelicula += ocupacion;
      }

      generos[genero].peliculas.push({
        titulo: pelicula.titulo,
        funciones: funcionesPelicula.length,
        reservas: reservasPelicula,
        ingresos: ingresoPelicula,
        ocupacion: funcionesPelicula.length > 0 ? ocupacionPelicula / funcionesPelicula.length : 0,
      });

      generos[genero].totalFunciones += funcionesPelicula.length;
      generos[genero].totalReservas += reservasPelicula;
      generos[genero].ingresoTotal += ingresoPelicula;
      generos[genero].ocupacionTotal += ocupacionPelicula;
      generos[genero].funcionesCount += funcionesPelicula.length;
    }

    // Construir resultado
    return Object.entries(generos).map(([genero, generoData]: [string, GeneroData]) => {
      const totalPeliculas = generoData.peliculas.length;
      const promedioOcupacion = generoData.funcionesCount > 0 ? generoData.ocupacionTotal / generoData.funcionesCount : 0;
      const ingresoPromedioPorPelicula = totalPeliculas > 0 ? generoData.ingresoTotal / totalPeliculas : 0;
      const reservasPromedioPorFuncion = generoData.totalFunciones > 0 ? generoData.totalReservas / generoData.totalFunciones : 0;

      // Encontrar película top
      const peliculaTop = generoData.peliculas.reduce((max, p) => 
        p.ingresos > max.ingresos ? p : max, 
        generoData.peliculas[0] || { titulo: 'N/A', ingresos: 0 }
      );

      return {
        genero,
        total_peliculas: totalPeliculas,
        total_funciones: generoData.totalFunciones,
        total_reservas: generoData.totalReservas,
        ingreso_total: generoData.ingresoTotal,
        promedio_ocupacion: promedioOcupacion,
        ingreso_promedio_por_pelicula: ingresoPromedioPorPelicula,
        reservas_promedio_por_funcion: reservasPromedioPorFuncion,
        pelicula_top: peliculaTop.titulo,
        ingreso_pelicula_top: peliculaTop.ingresos,
        peliculas: generoData.peliculas,
      };
    });
  }
}