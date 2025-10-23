# Ejemplos de Queries GraphQL - Sistema de Cine

Este documento contiene ejemplos prácticos de cómo usar cada una de las 9 queries implementadas.

---

##  MARCO: Consultas de Información Agregada

### Query 1: Cartelera Completa

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
        id_sala
        nombre
        capacidad
        tipo
      }
      asientosDisponibles
    }
  }
}
```

**Resultado esperado**: Lista de todas las películas en cartelera con sus funciones, precios y disponibilidad.

---

### Query 2: Ocupación de Salas

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

**Uso**: Dashboard gerencial para ver qué salas están más ocupadas.

---

### Query 3: Historial de Usuario

```graphql
query {
  historialUsuario(usuarioId: "uuid-del-usuario-aqui") {
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
        clasificacion
      }
      sala {
        nombre
        tipo
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

**Uso**: Perfil de usuario, historial de compras.

---

## JOSTIN: Consultas de Análisis de Negocio

### Query 4: Películas Más Populares

```graphql
query {
  peliculasMasPopulares(limite: 5) {
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

**Uso**: Análisis de rendimiento, decisiones de programación.

---

### Query 5: Rendimiento por Horario

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

**Uso**: Optimización de horarios, estrategias de precios.

---

### Query 6: Análisis de Ingresos

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
        genero
      }
      ingresos
      reservas
      porcentajeDelTotal
    }
    desglosePorSala {
      id_sala
      nombreSala
      ingresos
      funciones
      porcentajeDelTotal
    }
  }
}
```

**Uso**: Reportes financieros mensuales, análisis de rentabilidad.

---

## JEREMY: Consultas de Búsqueda y Filtrado Avanzado

### Query 7: Búsqueda Avanzada de Funciones

**Ejemplo: Buscar funciones de acción con precio entre $5 y $15**

```graphql
query {
  buscarFunciones(filtros: {
    genero: "Acción"
    precioMinimo: 5.0
    precioMaximo: 15.0
    ordenarPor: "precio"
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

---

### Query 8: Clientes Frecuentes

**Ejemplo: Top 10 clientes VIP (más de 5 reservas y $50 gastados)**

```graphql
query {
  clientesFrecuentes(filtros: {
    minimoReservas: 5
    gastoMinimo: 50.0
    limite: 10
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

---

### Query 9: Disponibilidad con Recomendaciones

**Ejemplo: Buscar función para familia (4 personas, presupuesto $60)**

```graphql
query {
  disponibilidadFunciones(filtros: {
    fecha: "2025-10-25"
    genero: "Animación"
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
          descripcion
        }
        sala {
          nombre
          tipo
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

---

## Casos de Uso Combinados

### Caso 1: Usuario busca película para ver con amigos

```graphql
# Paso 1: Ver cartelera
query {
  carteleraCompleta {
    pelicula {
      titulo
      genero
      clasificacion
    }
    precioMinimo
    precioMaximo
    totalFunciones
  }
}

# Paso 2: Buscar funciones específicas
query {
  buscarFunciones(filtros: {
    genero: "Comedia"
    fechaInicio: "2025-10-25"
    asientosMinimosDisponibles: 6
    precioMaximo: 12.0
    ordenarPor: "fecha"
  }) {
    fecha_hora
    precio
    pelicula { titulo }
    asientosDisponibles
  }
}
```

### Caso 2: Gerente analiza rendimiento del mes

```graphql
# Análisis completo del mes
query {
  analisisIngresos(
    fechaInicio: "2025-10-01"
    fechaFin: "2025-10-31"
  ) {
    ingresosTotales
    totalReservas
    ticketPromedio
    desglosePorPelicula {
      pelicula { titulo }
      ingresos
      porcentajeDelTotal
    }
  }
  
  peliculasMasPopulares(limite: 5) {
    pelicula { titulo }
    totalAsientosVendidos
    tasaOcupacion
  }
  
  rendimientoPorHorario {
    rangoHorario
    ingresosTotales
    tasaOcupacionPromedio
  }
}
```

### Caso 3: Marketing identifica clientes para campaña

```graphql
query {
  clientesFrecuentes(filtros: {
    minimoReservas: 3
    gastoMinimo: 30.0
    limite: 50
  }) {
    nombre
    correo
    totalReservas
    gastoTotal
    generosPreferidos
    diasDesdeUltimaReserva
  }
}
```