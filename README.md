# Pulso Abierto – Consulta de criptomonedas

Aplicación web desarrollada con React, TypeScript y Vite que permite consultar precios de criptomonedas mediante la API de CoinGecko.

El proyecto permite consultar cotizaciones, buscar criptomonedas, visualizar información detallada y administrar una lista de favoritos.

## Publicación

- **Aplicación en producción:** https://pulso-abierto-chi.vercel.app/
- **Repositorio GitHub:** https://github.com/Riquelme-Maximiliano/pulso-abierto

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- React Router DOM
- Zustand
- Zod
- CSS
- Vitest
- Testing Library
- API de CoinGecko

## Funcionalidades

- Consulta de precios de Bitcoin, Ethereum y Solana.
- Selección de moneda: dólar estadounidense (USD) o peso argentino (ARS).
- Búsqueda de criptomonedas por nombre.
- Validación de formularios mediante Zod.
- Visualización de mensajes de carga, resultados y errores.
- Selección de criptomonedas.
- Reintento de consultas.
- Página de detalle de cada criptomoneda.
- Sistema para agregar y quitar criptomonedas de favoritos.
- Persistencia de favoritos mediante localStorage.
- Navegación entre páginas mediante React Router DOM.
- Página 404 para rutas inexistentes.
- Diseño adaptable a dispositivos móviles y computadoras.

## Estructura del proyecto

```text
src/
├── components/
│   ├── CryptoCard.tsx
│   ├── CryptoForm.tsx
│   ├── CryptoList.tsx
│   └── CryptoStatus.tsx
├── pages/
│   ├── Home.tsx
│   ├── CryptoDetail.tsx
│   └── NotFound.tsx
├── services/
│   └── cryptoService.ts
├── store/
│   └── favoritesStore.ts
├── types/
│   └── crypto.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Riquelme-Maximiliano/pulso-abierto.git
```

Ingresar a la carpeta del proyecto:

```bash
cd pulso-abierto
```

Instalar las dependencias:

```bash
npm install
```

## Ejecución

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Abrir en el navegador la dirección local indicada por Vite.

## Pruebas automatizadas

Para ejecutar las pruebas:

```bash
npm test -- --run
```

Las pruebas permiten verificar el funcionamiento de los servicios, componentes y almacenamiento de favoritos.

## Compilación

Para verificar y generar la versión de producción:

```bash
npm run build
```

Para visualizar la versión compilada localmente:

```bash
npm run preview
```

## Rutas

- `/`: página principal de consulta.
- `/criptomonedas/:id`: detalle de una criptomoneda.
- Cualquier otra ruta muestra la página 404.

## API utilizada

CoinGecko API:

https://api.coingecko.com/api/v3/simple/price

## Validación

El formulario utiliza Zod y `safeParse` para validar los datos antes de realizar las consultas.

## Persistencia de datos

El sistema de favoritos utiliza Zustand para administrar el estado y localStorage para conservar las criptomonedas seleccionadas incluso después de actualizar la página.

## Despliegue

La aplicación está desplegada en Vercel y conectada al repositorio de GitHub.

Los cambios enviados a la rama principal pueden generar nuevos despliegues automáticamente.

## Estado del proyecto

Proyecto académico desarrollado como parte de la Actividad 4 de Programación Web de TECLAB.

**Estado:** Publicado en producción y con pruebas funcionales verificadas.