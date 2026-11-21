
# Consulta de criptomonedas

Aplicación web desarrollada con React, TypeScript y Vite que permite consultar precios de criptomonedas utilizando la API de CoinGecko.

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- React Router DOM
- Zod
- CSS
- API de CoinGecko

## Funcionalidades

- Consulta de precios de Bitcoin, Ethereum y Solana.
- Selección de moneda: dólar estadounidense (USD) o peso argentino (ARS).
- Búsqueda de criptomonedas por nombre.
- Validación de formularios mediante Zod.
- Visualización de mensajes de carga, resultados y errores.
- Selección temporal de criptomonedas.
- Botón para reintentar consultas.
- Página de detalle de cada criptomoneda.
- Página 404 para rutas inexistentes.

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
├── types/
│   └── crypto.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

## Instalación

Clonar o descargar el proyecto y ejecutar:

```bash
npm install
```

## Ejecución

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Abrir en el navegador la dirección local que indique Vite.

## Compilación

Para verificar y generar la versión de producción:

```bash
npm run build
```

## Rutas

- `/` : página principal de consulta.
- `/criptomonedas/:id` : detalle de una criptomoneda.
- Cualquier otra ruta muestra la página 404.

## API utilizada

CoinGecko API:

https://api.coingecko.com/api/v3/simple/price

## Validación

El formulario utiliza Zod y `safeParse` para validar los datos antes de realizar la consulta.

## Estado del proyecto

Proyecto académico desarrollado como parte de la Actividad 2 de Programación Web.
