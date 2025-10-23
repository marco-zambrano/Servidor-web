# 🎬 GraphQL Gateway - Sistema de Gestión de Reservas de Cine

## 📋 Descripción del Proyecto

Este proyecto es un **GraphQL Gateway** desarrollado con **NestJS** que consume una API REST existente para proporcionar una interfaz GraphQL moderna y eficiente para un sistema de gestión de reservas de cine.

### 🎯 Objetivos Cumplidos

✅ Gateway GraphQL que consume API REST completa  
✅ 9 queries ingeniosas distribuidas en 3 categorías  
✅ Tipos GraphQL con relaciones completas  
✅ Servicios especializados por integrante  
✅ Documentación completa con ejemplos  

---

## 🏗️ Arquitectura del Proyecto

```
graphql-gateway/
├── src/
│   ├── types/                    # Tipos GraphQL
│   │   ├── pelicula.type.ts
│   │   ├── sala.type.ts
│   │   ├── funcion.type.ts
│   │   ├── asiento.type.ts
│   │   ├── user.type.ts
│   │   ├── reserva.type.ts
│   │   ├── factura.type.ts
│   │   ├── reserva-asiento.type.ts
│   │   ├── cartelera.type.ts     # Tipos para queries agregadas
│   │   ├── analytics.type.ts     # Tipos para análisis
│   │   └── busqueda.type.ts      # Tipos para búsquedas
│   │
│   ├── analytics/                # Módulo de queries complejas
│   │   ├── analytics.module.ts
│   │   ├── analytics.resolver.ts
│   │   ├── analytics.service.ts
│   │   ├── analytics-integrante1.service.ts
│   │   ├── analytics-integrante2.service.ts
│   │   └── analytics-integrante3.service.ts
│   │
│   ├── peliculas/               # Módulo de películas
│   ├── funciones/               # Módulo de funciones
│   ├── salas/                   # Módulo de salas
│   ├── reservas/                # Módulo de reservas
│   ├── asientos/                # Módulo de asientos
│   ├── users/                   # Módulo de usuarios
│   ├── facturas/                # Módulo de facturas
│   └── reserva-asiento/         # Módulo de relación reserva-asiento
│
├── QUERIES_INGENIOSAS.md        # Documentación de queries
├── EJEMPLOS_QUERIES.md          # Ejemplos prácticos
└── README_PROYECTO.md           # Este archivo
```

---

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js v18 o superior
- npm o yarn
- API REST corriendo en `http://localhost:3000`

### Pasos de Instalación

```bash
# 1. Navegar al directorio del proyecto
cd graphql-gateway

# 2. Instalar dependencias
npm install

# 3. Iniciar en modo desarrollo
npm run start:dev
```

El servidor GraphQL estará disponible en: **http://localhost:3001/graphql**

---

## 📊 Queries Implementadas

### 🎯 INTEGRANTE 1: Información Agregada (3 queries)

| Query | Descripción | Entidades Combinadas |
|-------|-------------|---------------------|
| `carteleraCompleta` | Cartelera con funciones y disponibilidad | Películas + Funciones + Salas + Reservas |
| `ocupacionSalas` | Análisis de ocupación de salas | Salas + Funciones + Reservas + Asientos |
| `historialUsuario` | Historial completo de un usuario | Usuario + Reservas + Funciones + Películas + Salas + Facturas |

### 📈 INTEGRANTE 2: Análisis de Negocio (3 queries)

| Query | Descripción | Métricas Calculadas |
|-------|-------------|---------------------|
| `peliculasMasPopulares` | Ranking de películas por rendimiento | Ingresos, tasa de ocupación, promedio de asientos |
| `rendimientoPorHorario` | Análisis por franjas horarias | Ingresos por horario, ocupación promedio |
| `analisisIngresos` | KPIs financieros por período | Ticket promedio, ingresos por día, desgloses |

### 🔍 INTEGRANTE 3: Búsqueda y Filtrado (3 queries)

| Query | Descripción | Características |
|-------|-------------|----------------|
| `buscarFunciones` | Motor de búsqueda avanzado | Múltiples filtros, ordenamiento, disponibilidad |
| `clientesFrecuentes` | Análisis de clientes VIP | Patrones de consumo, preferencias |
| `disponibilidadFunciones` | Búsqueda con recomendaciones | Sistema inteligente de sugerencias |

---

## 🎨 Tecnologías Utilizadas

- **NestJS** - Framework backend
- **GraphQL** - API Query Language
- **Apollo Server** - Servidor GraphQL
- **TypeScript** - Lenguaje de programación
- **Axios** - Cliente HTTP para consumir REST API
- **RxJS** - Programación reactiva

---

## 📖 Documentación

### Archivos de Documentación

1. **QUERIES_INGENIOSAS.md** - Descripción detallada de cada query
   - Entidades combinadas
   - Métricas calculadas
   - Casos de uso
   - Ejemplos de queries GraphQL

2. **EJEMPLOS_QUERIES.md** - Ejemplos prácticos listos para usar
   - Queries básicas
   - Queries con filtros
   - Casos de uso combinados
   - Tips de implementación

---

## 🎯 Características Principales

### ✨ Queries Simples (CRUD Básico)

Cada recurso tiene queries básicas:
- `peliculas` / `pelicula(id)`
- `salas` / `sala(id)`
- `funciones` / `funcion(id)`
- `asientos` / `asiento(id)`
- `reservas` / `reserva(id)`
- `users` / `user(id)`
- `facturas` / `factura(id)`

### 🔗 Relaciones GraphQL

Todas las relaciones están implementadas con Field Resolvers:
- Película → Funciones
- Sala → Asientos, Funciones
- Función → Película, Sala, Reservas
- Reserva → Función, Usuario, Factura, Asientos
- Usuario → Reservas

### 🚀 Queries Complejas

9 queries avanzadas que combinan múltiples recursos y calculan métricas en tiempo real.

---

## 💡 Ejemplos de Uso Rápido

### Obtener Cartelera Completa

```graphql
query {
  carteleraCompleta {
    pelicula { titulo genero }
    totalFunciones
    precioMinimo
    precioMaximo
    funcionesDisponibles {
      fecha_hora
      precio
      sala { nombre }
      asientosDisponibles
    }
  }
}
```

### Buscar Funciones con Filtros

```graphql
query {
  buscarFunciones(filtros: {
    genero: "Acción"
    precioMaximo: 15.0
    asientosMinimosDisponibles: 10
    ordenarPor: "fecha"
  }) {
    fecha_hora
    precio
    pelicula { titulo }
    asientosDisponibles
  }
}
```

### Análisis de Ingresos

```graphql
query {
  analisisIngresos(
    fechaInicio: "2025-10-01"
    fechaFin: "2025-10-31"
  ) {
    ingresosTotales
    ticketPromedio
    desglosePorPelicula {
      pelicula { titulo }
      ingresos
      porcentajeDelTotal
    }
  }
}
```

---

## 🧪 Testing

### Probar en GraphQL Playground

1. Inicia el servidor: `npm run start:dev`
2. Abre: `http://localhost:3001/graphql`
3. Copia ejemplos de `EJEMPLOS_QUERIES.md`
4. Ejecuta y explora

### Verificar Conexión con REST API

Asegúrate de que la API REST esté corriendo en `http://localhost:3000` antes de iniciar el gateway.

---

## 📊 Estructura de Datos

### Entidades Principales

- **Película**: Información de películas (título, género, clasificación)
- **Sala**: Salas del cine (nombre, capacidad, tipo)
- **Función**: Proyecciones (fecha/hora, precio)
- **Asiento**: Asientos de las salas (número, estado)
- **Usuario**: Clientes del cine (nombre, correo, rol)
- **Reserva**: Reservas de funciones (cantidad asientos, estado)
- **Factura**: Facturas de reservas (total, método de pago)
- **ReservaAsiento**: Relación entre reservas y asientos

---

## 🎓 Distribución del Trabajo

### Integrante 1 - Información Agregada
- ✅ Query 1: Cartelera Completa
- ✅ Query 2: Ocupación de Salas
- ✅ Query 3: Historial de Usuario

### Integrante 2 - Análisis de Negocio
- ✅ Query 4: Películas Más Populares
- ✅ Query 5: Rendimiento por Horario
- ✅ Query 6: Análisis de Ingresos

### Integrante 3 - Búsqueda y Filtrado
- ✅ Query 7: Búsqueda Avanzada de Funciones
- ✅ Query 8: Clientes Frecuentes
- ✅ Query 9: Disponibilidad con Recomendaciones

---

## 🔧 Configuración

### Variables de Entorno

El proyecto usa la configuración por defecto:
- **Puerto GraphQL**: 3001
- **API REST Base URL**: http://localhost:3000
- **Timeout**: 5000ms

Para modificar, edita `src/app.module.ts`:

```typescript
HttpModule.registerAsync({
  useFactory: () => ({
    baseURL: 'http://localhost:3000', // Cambiar aquí
    timeout: 5000,
    maxRedirects: 5,
  }),
  global: true,
}),
```

---

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run start:dev      # Inicia con hot-reload

# Producción
npm run build          # Compila el proyecto
npm run start:prod     # Inicia en modo producción

# Utilidades
npm run format         # Formatea el código
npm run lint           # Ejecuta el linter
```

---

## 🎉 Estado del Proyecto

### ✅ Completado

- [x] Configuración inicial del proyecto
- [x] Tipos GraphQL para todos los recursos
- [x] Servicios que consumen REST API
- [x] Resolvers con field resolvers
- [x] 9 queries ingeniosas implementadas
- [x] Documentación completa
- [x] Ejemplos de uso

### 🚀 Listo para Usar

El proyecto está **100% funcional** y listo para ser utilizado. Todas las queries están implementadas con su lógica completa y pueden ser probadas inmediatamente.

---

## 📞 Soporte

Para cualquier duda sobre las queries o su implementación, consulta:
1. `QUERIES_INGENIOSAS.md` - Documentación técnica
2. `EJEMPLOS_QUERIES.md` - Ejemplos prácticos
3. GraphQL Playground - Exploración interactiva

---

## 🏆 Logros del Proyecto

✨ **Gateway GraphQL completo y funcional**  
✨ **9 queries complejas con lógica de negocio**  
✨ **Arquitectura modular y escalable**  
✨ **Documentación exhaustiva**  
✨ **Ejemplos listos para usar**  
✨ **Código limpio y bien organizado**  

---

**¡Proyecto completado exitosamente! 🎉**

Desarrollado con ❤️ usando NestJS y GraphQL
