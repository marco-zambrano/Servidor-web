# Queries Ingeniosas - Sistema de Gestión de Reservas de Cine

Este documento describe las 9 queries complejas implementadas en el GraphQL Gateway, distribuidas en 3 categorías según su propósito.

---

## MARCO: Consultas de Información Agregada

Estas queries combinan datos de 2 o más entidades del servicio REST para generar vistas consolidadas.

### 1. **Cartelera Completa** (`carteleraCompleta`)

**Descripción**: Obtiene la cartelera completa del cine con todas las películas, sus funciones disponibles, precios y disponibilidad de asientos.

**Entidades combinadas**: Películas + Funciones + Salas + Reservas + ReservaAsiento

**Caso de uso**: Dashboard principal del cine, página de cartelera pública

**Query GraphQL**:
```graphql
query {
  carteleraCompleta {
    pelicula {
      id_pelicula
      titulo
      genero
      clasificacion
      descripcion
    }
    totalFunciones
    precioMinimo
    precioMaximo
    funcionesDisponibles {
      id_funcion
      fecha_hora
      precio
      sala {
        nombre
        capacidad
        tipo
      }
      asientosDisponibles
    }
  }
}
```

**Datos calculados**:
- Total de funciones por película
- Precio mínimo y máximo de las funciones
- Asientos disponibles por función (capacidad - asientos reservados)

---

### 2. **Ocupación de Salas** (`ocupacionSalas`)

**Descripción**: Análisis detallado de la ocupación de todas las salas del cine con estadísticas de funciones y reservas.

**Entidades combinadas**: Salas + Funciones + Reservas + ReservaAsiento + Películas

**Caso de uso**: Reportes gerenciales, análisis de utilización de recursos

**Query GraphQL**:
```graphql
query {
  ocupacionSalas {
    sala {
      id_sala
      nombre
      capacidad
      tipo
      estado
    }
    totalFunciones
    totalReservas
    asientosReservados
    porcentajeOcupacion
    funcionesDetalle {
      id_funcion
      fecha_hora
      pelicula {
        titulo
        genero
      }
      reservasCount
      asientosReservados
    }
  }
}
```

**Datos calculados**:
- Porcentaje de ocupación por sala
- Total de asientos reservados vs capacidad total
- Detalle de reservas por cada función en la sala

---

### 3. **Historial de Usuario** (`historialUsuario`)

**Descripción**: Historial completo de un usuario con todas sus reservas, películas vistas, gastos totales y detalles de cada transacción.

**Entidades combinadas**: Usuario + Reservas + Funciones + Películas + Salas + Facturas + ReservaAsiento + Asientos

**Caso de uso**: Perfil de usuario, historial de compras, análisis de cliente

**Query GraphQL**:
```graphql
query {
  historialUsuario(usuarioId: "uuid-del-usuario") {
    id_usuario
    nombre
    correo
    totalReservas
    gastoTotal
    reservas {
      id_reserva
      estado
      cantidad_asientos
      pelicula {
        titulo
        genero
      }
      sala {
        nombre
      }
      fecha_funcion
      precioFuncion
      totalPagado
      fecha_emision_factura
      asientosReservados
    }
  }
}
```

**Datos calculados**:
- Gasto total acumulado del usuario
- Lista de asientos específicos reservados en cada función
- Total pagado por cada reserva (desde facturas)

---

## 📈 JOSTIN: Consultas de Análisis de Negocio

Estas queries realizan cálculos y análisis sobre los datos para generar métricas, estadísticas y KPIs.

### 4. **Películas Más Populares** (`peliculasMasPopulares`)

**Descripción**: Ranking de películas más populares con estadísticas completas de ventas, ocupación y rendimiento.

**Métricas calculadas**:
- Total de funciones programadas
- Total de reservas realizadas
- Total de asientos vendidos
- Ingresos totales generados
- Promedio de asientos por función
- Tasa de ocupación (%)

**Caso de uso**: Análisis de rendimiento de películas, decisiones de programación

**Query GraphQL**:
```graphql
query {
  peliculasMasPopulares(limite: 10) {
    pelicula {
      titulo
      genero
      clasificacion
    }
    totalFunciones
    totalReservas
    totalAsientosVendidos
    ingresosTotales
    promedioAsientosPorFuncion
    tasaOcupacion
  }
}
```

**KPIs**:
- **Tasa de ocupación**: (Asientos vendidos / Capacidad total) × 100
- **Promedio de asientos por función**: Asientos vendidos / Total funciones
- **Ingresos totales**: Suma de (precio × asientos) de todas las funciones

---

### 5. **Rendimiento por Horario** (`rendimientoPorHorario`)

**Descripción**: Análisis de rendimiento de funciones agrupadas por rangos horarios (mañana, tarde, noche) con métricas de ingresos y ocupación.

**Rangos horarios**:
- Mañana: 6:00 - 12:00
- Tarde: 12:00 - 18:00
- Noche: 18:00 - 24:00

**Métricas calculadas**:
- Total de funciones por horario
- Total de reservas
- Ingresos totales
- Promedio de ingresos por función
- Tasa de ocupación promedio
- Top 3 películas más vistas en cada horario

**Caso de uso**: Optimización de horarios, estrategias de precios dinámicos

**Query GraphQL**:
```graphql
query {
  rendimientoPorHorario {
    rangoHorario
    totalFunciones
    totalReservas
    ingresosTotales
    promedioIngresosPorFuncion
    tasaOcupacionPromedio
    peliculasMasVistas {
      titulo
      genero
    }
  }
}
```

**Análisis estratégico**: Identifica los horarios más rentables y las preferencias del público por franja horaria.

---

### 6. **Análisis de Ingresos** (`analisisIngresos`)

**Descripción**: Análisis completo de ingresos por período con KPIs financieros y desgloses detallados por película y sala.

**Métricas calculadas**:
- Ingresos totales del período
- Total de reservas y asientos vendidos
- Ticket promedio (ingreso por asiento)
- Ingreso promedio por día
- Desglose de ingresos por película (con % del total)
- Desglose de ingresos por sala (con % del total)

**Caso de uso**: Reportes financieros, análisis de rentabilidad, comparación de períodos

**Query GraphQL**:
```graphql
query {
  analisisIngresos(
    fechaInicio: "2025-01-01"
    fechaFin: "2025-01-31"
  ) {
    periodo
    ingresosTotales
    totalReservas
    totalAsientosVendidos
    ticketPromedio
    ingresoPromedioPorDia
    desglosePorPelicula {
      pelicula {
        titulo
      }
      ingresos
      reservas
      porcentajeDelTotal
    }
    desglosePorSala {
      nombreSala
      ingresos
      funciones
      porcentajeDelTotal
    }
  }
}
```

**KPIs financieros**:
- **Ticket promedio**: Ingresos totales / Asientos vendidos
- **Ingreso por día**: Ingresos totales / Días del período
- **Contribución por película**: (Ingresos película / Ingresos totales) × 100

---

## 🔍 JEREMY: Consultas de Búsqueda y Filtrado Avanzado

Estas queries implementan búsquedas complejas con múltiples filtros, ordenamiento y lógica inteligente.

### 7. **Búsqueda Avanzada de Funciones** (`buscarFunciones`)

**Descripción**: Motor de búsqueda avanzado con múltiples filtros combinables, ordenamiento flexible y cálculo de disponibilidad en tiempo real.

**Filtros disponibles**:
- Por película específica (ID)
- Por género
- Por sala
- Rango de fechas (inicio y fin)
- Rango de precios (mínimo y máximo)
- Asientos mínimos disponibles
- Ordenamiento: por fecha, precio o disponibilidad
- Orden: ascendente o descendente

**Caso de uso**: Búsqueda de funciones para usuarios, sistema de reservas

**Query GraphQL**:
```graphql
query {
  buscarFunciones(filtros: {
    genero: "Acción"
    fechaInicio: "2025-10-25"
    fechaFin: "2025-10-31"
    precioMinimo: 5.0
    precioMaximo: 15.0
    asientosMinimosDisponibles: 10
    ordenarPor: "fecha"
    orden: "ASC"
  }) {
    id_funcion
    fecha_hora
    precio
    pelicula {
      titulo
      genero
      clasificacion
    }
    nombreSala
    capacidadSala
    asientosDisponibles
    porcentajeDisponibilidad
  }
}
```

**Características**:
- Filtros combinables (AND lógico)
- Disponibilidad calculada en tiempo real
- Porcentaje de disponibilidad para cada función
- Ordenamiento flexible por múltiples criterios

---

### 8. **Clientes Frecuentes** (`clientesFrecuentes`)

**Descripción**: Análisis de clientes frecuentes con patrones de consumo, preferencias y segmentación avanzada.

**Filtros disponibles**:
- Mínimo de reservas realizadas
- Gasto mínimo total
- Rango de fechas para análisis
- Límite de resultados

**Análisis incluido**:
- Total de reservas y gasto total
- Gasto promedio por reserva
- Géneros preferidos (top 3)
- Películas más vistas
- Última reserva y días desde entonces

**Caso de uso**: Programas de fidelización, marketing dirigido, análisis de clientes VIP

**Query GraphQL**:
```graphql
query {
  clientesFrecuentes(filtros: {
    minimoReservas: 5
    gastoMinimo: 50.0
    fechaInicio: "2025-01-01"
    fechaFin: "2025-10-31"
    limite: 20
  }) {
    id_usuario
    nombre
    correo
    totalReservas
    gastoTotal
    gastoPromedioPorReserva
    generosPreferidos
    peliculasMasVistas {
      titulo
      genero
    }
    ultimaReserva
    diasDesdeUltimaReserva
  }
}
```

**Segmentación de clientes**:
- **Clientes VIP**: > 10 reservas y > $100 gastados
- **Clientes regulares**: 5-10 reservas
- **Clientes inactivos**: > 30 días desde última reserva

---

### 9. **Disponibilidad con Recomendaciones** (`disponibilidadFunciones`)

**Descripción**: Consulta inteligente de disponibilidad de funciones con sistema de recomendaciones basado en criterios del usuario.

**Filtros disponibles**:
- Fecha específica
- Género de película
- Clasificación
- Asientos requeridos
- Presupuesto máximo

**Sistema de recomendaciones**:
- Marca funciones como "recomendadas" según criterios
- Proporciona razones de recomendación
- Calcula costo total para el grupo
- Prioriza funciones con mejor disponibilidad

**Caso de uso**: Asistente de reservas, recomendaciones personalizadas

**Query GraphQL**:
```graphql
query {
  disponibilidadFunciones(filtros: {
    fecha: "2025-10-25"
    genero: "Comedia"
    clasificacion: "ATP"
    asientosRequeridos: 4
    presupuestoMaximo: 60.0
  }) {
    fecha
    totalFuncionesDisponibles
    funciones {
      funcion {
        id_funcion
        fecha_hora
        precio
        pelicula {
          titulo
          genero
          clasificacion
        }
        sala {
          nombre
        }
      }
      asientosDisponibles
      costoTotal
      recomendada
      razonRecomendacion
    }
  }
}
```

**Lógica de recomendación**:
1. Tiene suficientes asientos disponibles
2. Está dentro del presupuesto
3. Cumple con los filtros de género y clasificación
4. Tiene buena disponibilidad (> 50%)

---

## Resumen de Distribución

| Integrante | Tipo de Query | Queries Asignadas |
|------------|---------------|-------------------|
| **Marco** | Información Agregada | 1. Cartelera Completa<br>2. Ocupación de Salas<br>3. Historial de Usuario |
| **Jostin** | Análisis de Negocio | 4. Películas Más Populares<br>5. Rendimiento por Horario<br>6. Análisis de Ingresos |
| **Jeremy** | Búsqueda y Filtrado | 7. Búsqueda Avanzada de Funciones<br>8. Clientes Frecuentes<br>9. Disponibilidad con Recomendaciones |

---

## Notas de Implementación

1. **Todas las queries están definidas** en `src/analytics/analytics.resolver.ts`
2. **Los tipos GraphQL** están en:
   - `src/types/cartelera.type.ts` (Queries 1-3)
   - `src/types/analytics.type.ts` (Queries 4-6)
   - `src/types/busqueda.type.ts` (Queries 7-9)
3. **La lógica de negocio** se implementa en `src/analytics/analytics.service.ts`
4. **El módulo** está registrado en `src/analytics/analytics.module.ts`

## Cómo Probar

1. Inicia el servidor GraphQL: `npm run start:dev`
2. Accede al playground: `http://localhost:3001/graphql`
3. Copia y pega cualquiera de las queries de ejemplo
4. Ajusta los parámetros según tus necesidades

## Valor de Negocio

Estas queries proporcionan:
- **Dashboards en tiempo real** para gerencia
- **Análisis de rentabilidad** por película, sala y horario
- **Segmentación de clientes** para marketing
- **Optimización de recursos** (salas y horarios)
- **Experiencia de usuario mejorada** con búsquedas inteligentes y recomendaciones
