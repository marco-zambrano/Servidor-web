import { Injectable } from '@nestjs/common';
import { FuncionesService } from '../funciones/funciones.service';
import { PeliculasService } from '../peliculas/peliculas.service';
import { SalasService } from '../salas/salas.service';
import { ReservasService } from '../reservas/reservas.service';
import { FacturasService } from '../facturas/facturas.service';
import { ReservasAsientosService } from '../reservas-asientos/reservas-asientos.service';
import { AsientosService } from '../asientos/asientos.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class DashboardService {
  constructor(
    private funcionesService: FuncionesService,
    private peliculasService: PeliculasService,
    private salasService: SalasService,
    private reservasService: ReservasService,
    private facturasService: FacturasService,
    private reservasAsientosService: ReservasAsientosService,
    private asientosService: AsientosService,
    private usersService: UsersService,
  ) {}

  // Query 1: Dashboard de Función con Película, Sala y Estado de Reservas
  async getFuncionDashboard(idFuncion: string) {
    // Obtener función
    const funcion = await this.funcionesService.findOne(idFuncion);
    // Obtener película
    const pelicula = await this.peliculasService.findOne(funcion.pelicula.id_pelicula);
    // Obtener sala
    const sala = await this.salasService.findOne(funcion.sala.id_sala);
    // Obtener reservas de esta función
    const reservas = await this.reservasService.findByFuncion(idFuncion);

    // Calcular métricas
    const totalReservas = reservas.length;
    const asientosReservados = reservas.reduce((sum, r) => sum + r.cantidad_asientos, 0);
    const asientosDisponibles = sala.capacidad - asientosReservados;
    const porcentajeOcupacion = (asientosReservados / sala.capacidad) * 100;
    const ingresoEstimado = asientosReservados * funcion.precio;

    return {
      id_funcion: funcion.id_funcion,
      titulo_pelicula: pelicula.titulo,
      genero_pelicula: pelicula.genero,
      nombre_sala: sala.nombre,
      capacidad_sala: sala.capacidad,
      fecha_hora: funcion.fecha_hora,
      precio: funcion.precio,
      total_reservas: totalReservas,
      asientos_reservados: asientosReservados,
      asientos_disponibles: asientosDisponibles,
      porcentaje_ocupacion: porcentajeOcupacion,
      ingreso_estimado: ingresoEstimado,
    };
  }

  // Query 2: Reporte de Usuario con sus Reservas y Gastos
  async getUsuarioReporteCompleto(idUsuario: string, limite: number = 5) {
    // Obtener usuario
    const usuario = await this.usersService.findOne(idUsuario);
    // Obtener todas las reservas del usuario
    const reservas = await this.reservasService.findByUsuario(idUsuario);
    // Obtener todas las facturas
    const todasFacturas = await this.facturasService.findAll();
    // Filtrar facturas del usuario
    const facturas = todasFacturas.filter(f => reservas.some(r => r.id_reserva === f.reserva?.id_reserva));

    // Calcular estadísticas
    const totalReservas = reservas.length;
    const reservasActivas = reservas.filter(r => r.estado === 'activa').length;
    const reservasCanceladas = reservas.filter(r => r.estado === 'cancelada').length;
    const gastoTotal = facturas.reduce((sum, f) => sum + parseFloat(f.total), 0);

    // Obtener últimas reservas con detalles
    const ultimasReservas = await Promise.all(
      reservas.slice(0, limite).map(async (reserva) => {
        // Obtener función
        const funcion = await this.funcionesService.findOne(reserva.funcion.id_funcion);
        // Obtener película
        const pelicula = await this.peliculasService.findOne(funcion.pelicula.id_pelicula);
        // Obtener sala
        const sala = await this.salasService.findOne(funcion.sala.id_sala);
        // Obtener factura si existe
        const factura = facturas.find(f => f.reserva?.id_reserva === reserva.id_reserva);
        // Obtener asientos reservados
        const reservasAsientos = await this.reservasAsientosService.findByReserva(reserva.id_reserva);
        const numerosAsientos = await Promise.all(
          reservasAsientos.map(async (ra) => {
            const asiento = await this.asientosService.findOne(ra.asiento.id_asiento);
            return asiento.numero;
          })
        );

        return {
          id_reserva: reserva.id_reserva,
          titulo_pelicula: pelicula.titulo,
          nombre_sala: sala.nombre,
          fecha_hora_funcion: funcion.fecha_hora,
          cantidad_asientos: reserva.cantidad_asientos,
          estado: reserva.estado,
          total_pagado: factura ? parseFloat(factura.total) : null,
          metodo_pago: factura?.metodo_pago || null,
          numeros_asientos: numerosAsientos,
        };
      })
    );

    return {
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
      total_reservas: totalReservas,
      reservas_activas: reservasActivas,
      reservas_canceladas: reservasCanceladas,
      gasto_total: gastoTotal,
      ultimas_reservas: ultimasReservas,
    };
  }

  // Query 3: Vista de Película con Todas sus Funciones y Rendimiento
  async getPeliculaRendimiento(idPelicula: string) {
    // Obtener película
    const pelicula = await this.peliculasService.findOne(idPelicula);
    // Obtener todas las funciones de la película
    const funciones = await this.funcionesService.findByPelicula(idPelicula);
    // Obtener todas las reservas
    const todasReservas = await this.reservasService.findAll();
    // Calcular métricas generales
    const totalFunciones = funciones.length;
    const funcionesActivas = funciones.filter(f => new Date(f.fecha_hora) > new Date()).length;

    let totalReservas = 0;
    let ingresoTotal = 0;
    let ocupacionTotal = 0;

    // Procesar cada función
    const funcionesResumen = await Promise.all(
      funciones.map(async (funcion) => {
        // Obtener sala
        const sala = await this.salasService.findOne(funcion.sala.id_sala);
        // Filtrar reservas de esta función
        const reservasFuncion = todasReservas.filter(
          r => r.funcion.id_funcion === funcion.id_funcion
        );

        const numReservas = reservasFuncion.length;
        const asientosReservados = reservasFuncion.reduce((sum, r) => sum + r.cantidad_asientos, 0);
        const ocupacion = (asientosReservados / sala.capacidad) * 100;

        totalReservas += numReservas;
        ingresoTotal += asientosReservados * parseFloat(funcion.precio);
        ocupacionTotal += ocupacion;

        return {
          id_funcion: funcion.id_funcion,
          fecha_hora: funcion.fecha_hora,
          nombre_sala: sala.nombre,
          precio: parseFloat(funcion.precio),
          reservas: numReservas,
          ocupacion: ocupacion,
        };
      })
    );

    const promedioOcupacion = funciones.length > 0 ? ocupacionTotal / funciones.length : 0;

    return {
      id_pelicula: pelicula.id_pelicula,
      titulo: pelicula.titulo,
      genero: pelicula.genero,
      descripcion: pelicula.descripcion,
      clasificacion: pelicula.clasificacion,
      total_funciones: totalFunciones,
      funciones_activas: funcionesActivas,
      total_reservas: totalReservas,
      ingreso_total: ingresoTotal,
      promedio_ocupacion: promedioOcupacion,
      funciones: funcionesResumen,
    };
  }
}