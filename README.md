# Crossfit Gaymes Frontend

Frontend base para una competencia de CrossFit, construido con React, TypeScript y Vite.

## Características

- Home responsive inspirado en plataformas de competencia deportiva.
- Color principal `#FF6A00`.
- Página de ingreso.
- Consumo de API Java mediante Axios.
- Datos de demostración cuando el backend no está disponible.
- Variables de entorno.
- Docker multi-stage con Nginx.
- Health check `/health`.
- Arquitectura separada por componentes, páginas, servicios, hooks, tipos y configuración.

## Desarrollo local

```bash
cp .env.example .env
npm install
npm run dev
```

Disponible en `http://localhost:5173`.

## Backend Java esperado

El frontend intenta consultar:

```http
GET ${VITE_API_BASE_URL}/competitions/featured
```

Ejemplo de respuesta:

```json
{
  "id": "1",
  "name": "Gaymes wods 2026",
  "subtitle": "Cuatro sábados. Cuatro pruebas. Un marico campeón.",
  "description": "Competencia individual...",
  "registrationStart": "01 JUL 2026",
  "registrationEnd": "31 JUL 2026",
  "eventStart": "08 AGO 2026",
  "eventEnd": "29 AGO 2026",
  "location": "Santiago, Chile",
  "categories": [
    {
      "id": "rx-men",
      "name": "RX Hombres",
      "capacity": 20,
      "registered": 14
    }
  ]
}
```

## Docker

### Docker Compose

```bash
cp .env.example .env
docker compose up --build
```

Disponible en `http://localhost:8081`.

### Construcción manual

```bash
docker build   --build-arg VITE_API_BASE_URL=https://api.ejemplo.cl/api   --build-arg VITE_APP_NAME="Crossfit Gaymes"   -t crossfit-gaymes-web .

docker run --rm -p 8081:80 crossfit-gaymes-web
```

## Estructura

```text
src/
├── app/              # Rutas y composición principal
├── components/
│   ├── home/         # Componentes específicos del Home
│   └── layout/       # Header y componentes transversales
├── config/           # Variables y configuración
├── data/             # Datos fallback/demo
├── hooks/            # Hooks reutilizables
├── pages/            # Pantallas de la aplicación
├── services/         # Cliente HTTP y acceso al backend
├── styles/           # Estilos globales
└── types/            # Contratos TypeScript
```

## Nota sobre variables de entorno

En Vite, las variables `VITE_*` se incorporan durante la compilación. Para cambiar el endpoint en una imagen Docker estática, se debe reconstruir la imagen con el `build-arg` correspondiente.
