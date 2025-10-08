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

## Diagrama Entidad Relacion
https://www.plantuml.com/plantuml/png/fLJ1Rjim3BthApWFA18WHRV3BeLhD6lJBXWs35cmqowoHCT2PD6W5AHPctyVP3jkcYR3W5e7atpaUwGawDe7oM5LMI7UQIoCGmWojpX09oiSWSxZVmZeWWaRID8yQv3q8iz-kxGW5y2RFtZryGCeiiHN2vQRRD3LfHSn8qkUsUibRWOFGtWi35gzXJJFqgRmybRoyfwiHZSZdQLdIznawKM3PV0G1NkIuf2aPNW_RhvNjNsT8hkgtB7AoLrSMNfMeJRod54HwtqAKHgDu0CoKjZKwDj0XQ4atJdAiB8eHA0Q0a5E8L05sZ2gOCW9uPV6rP9b1KmhfnMnGuPFUt5h74Pw80ubxG6-b9hMnYsWaDRZ7b9AfzTiGa3NONkWij9xU1G009-bMYuQuPiu5QnB4x11nioqReCUvO8HNLj1h94FWAqGehqZS6CDke0ZKAq1Gv2-Tw9gSznWD0mluTTuTlDbF0C1kuC0HrNEU09Kn8pq0jpsqZ_G6hMoSWHrPxNYlVSVwi64bQKJu08TyYbGerTiQcN8dMhUIcyAe-IhdESPVihOlvUxtXlhpRicQwcCbatnzFjySZyv6Be-DHNw8FMf3RzRkJZA28hMQ5lUEM_jka1LoeZTZkUJ-VJRP1-i6PMXWtcQDw0_xkaBrJIz-vfbVLBSrtycT3VsQCvMY6Idai3Jq_avFKBIpPs8998VYtUSHo1nZKx79_Sl
