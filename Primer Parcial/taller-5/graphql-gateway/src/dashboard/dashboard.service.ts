import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DashboardService {
  constructor(private readonly httpService: HttpService) {}

  // Query 1: Dashboard de Función con Película, Sala y Estado de Reservas
  async getFuncionDashboard(idFuncion: string) {
    // Obtener función
    const funcionResponse = await firstValueFrom(
      this.httpService.get(`/funcion/${idFuncion}`)
    );
    const funcion = funcionResponse.data;

    // Obtener película
    const peliculaResponse = await firstValueFrom(
      this.httpService.get(`/peliculas/${funcion.pelicula.id_pelicula}`)
    );
    const pelicula = peliculaResponse.data;

    // Obtener sala
    const salaResponse = await firstValueFrom(
      this.httpService.get(`/salas/${funcion.sala.id_sala}`)
    );
    const sala = salaResponse.data;

    // Obtener reservas de esta función
    const reservasResponse = await firstValueFrom(
      this.httpService.get(`/reserva?funcion=${idFuncion}`)
    );
    const reservas = reservasResponse.data;

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
    const usuarioResponse = await firstValueFrom(
      this.httpService.get(`/users/${idUsuario}`)
    );
    const usuario = usuarioResponse.data;

    // Obtener todas las reservas del usuario
    const reservasResponse = await firstValueFrom(
      this.httpService.get(`/reserva?usuario=${idUsuario}`)
    );
    const reservas = reservasResponse.data;

    // Obtener facturas del usuario
    const facturasResponse = await firstValueFrom(
      this.httpService.get(`/factura`)
    );
    const todasFacturas = facturasResponse.data;
    
    // Filtrar facturas del usuario
    const facturas = todasFacturas.filter(f => 
      reservas.some(r => r.id_reserva === f.reserva?.id_reserva)
    );

    // Calcular estadísticas
    const totalReservas = reservas.length;
    const reservasActivas = reservas.filter(r => r.estado === 'activa').length;
    const reservasCanceladas = reservas.filter(r => r.estado === 'cancelada').length;
    const gastoTotal = facturas.reduce((sum, f) => sum + parseFloat(f.total), 0);

    // Obtener últimas reservas con detalles
    const ultimasReservas = await Promise.all(
      reservas.slice(0, limite).map(async (reserva) => {
        // Obtener función
        const funcionResponse = await firstValueFrom(
          this.httpService.get(`/funcion/${reserva.funcion.id_funcion}`)
        );
        const funcion = funcionResponse.data;

        // Obtener película
        const peliculaResponse = await firstValueFrom(
          this.httpService.get(`/peliculas/${funcion.pelicula.id_pelicula}`)
        );
        const pelicula = peliculaResponse.data;

        // Obtener sala
        const salaResponse = await firstValueFrom(
          this.httpService.get(`/salas/${funcion.sala.id_sala}`)
        );
        const sala = salaResponse.data;

        // Obtener factura si existe
        const factura = facturas.find(f => f.reserva?.id_reserva === reserva.id_reserva);

        // Obtener asientos reservados
        const asientosResponse = await firstValueFrom(
          this.httpService.get(`/reserva-asiento?reserva=${reserva.id_reserva}`)
        );
        const reservasAsientos = asientosResponse.data;

        const numerosAsientos = await Promise.all(
          reservasAsientos.map(async (ra) => {
            const asientoResponse = await firstValueFrom(
              this.httpService.get(`/asiento/${ra.asiento.id_asiento}`)
            );
            return asientoResponse.data.numero;
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
    const peliculaResponse = await firstValueFrom(
      this.httpService.get(`/peliculas/${idPelicula}`)
    );
    const pelicula = peliculaResponse.data;

    // Obtener todas las funciones de la película
    const funcionesResponse = await firstValueFrom(
      this.httpService.get(`/funcion?pelicula=${idPelicula}`)
    );
    const funciones = funcionesResponse.data;

    // Obtener todas las reservas
    const reservasResponse = await firstValueFrom(
      this.httpService.get(`/reserva`)
    );
    const todasReservas = reservasResponse.data;

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
        const salaResponse = await firstValueFrom(
          this.httpService.get(`/salas/${funcion.sala.id_sala}`)
        );
        const sala = salaResponse.data;

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