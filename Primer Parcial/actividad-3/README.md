# Proyecto de TypeORM con TypeScript y Node.js

Este es un proyecto de práctica para demostrar el uso de TypeORM con TypeScript y Node.js. El proyecto modela un sistema simple de gestión de un cine.

## Entidades
El proyecto utiliza las siguientes entidades:

### Cliente
Representa a un cliente del cine.
- `id`: UUID (Clave primaria)
- `nombre`: string
- `correo`: string
- `telefono`: string
- `direccion`: string
- `fechaRegistro`: Date

### Pelicula
Representa una película que se puede proyectar.
- `id`: UUID (Clave primaria)
- `titulo`: string
- `genero`: string
- `descripcion`: string
- `clasificacion`: "adulto" | "jovenes" | "infantil"

### Sala
Representa una sala de cine.
- `id`: UUID (Clave primaria)
- `nombre`: string
- `capacidad`: number
- `tipo`: string
- `estado`: "disponible" | "ocupada" | "mantenimiento"

### Funcion
Representa una función o proyección específica de una película en una sala.
- `id`: UUID (Clave primaria)
- `nombre`: string
- `fecha`: Date
- `precio`: number

## Relaciones entre Entidades

- **Pelicula - Funcion**: Una `Pelicula` puede tener muchas `Funciones`. (Relación Uno a Muchos)
- **Sala - Funcion**: Una `Sala` puede tener muchas `Funciones`. (Relación Uno a Muchos)
- **Funcion - Pelicula**: Muchas `Funciones` están asociadas a una `Pelicula`. (Relación Muchos a Uno)
- **Funcion - Sala**: Muchas `Funciones` se llevan a cabo in una `Sala`. (Relación Muchos a Uno)
- **Funcion - Cliente**: Muchas `Funciones` pueden ser vistas por un `Cliente`. (Relación Muchos a Uno)

## Instrucciones de Instalación

1.  Clona el repositorio.
2.  Instala las dependencias usando npm:
    ```bash
    npm install
    ```

## Cómo Ejecutar el Proyecto

Para ejecutar el script principal (`index.ts`) en modo de desarrollo (con transpilación al vuelo), usa:

```bash
npm run dev
```

Para construir el proyecto (transpilar de TypeScript a JavaScript) y luego ejecutarlo, usa:

```bash
npm run build
npm start
```
