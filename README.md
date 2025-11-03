# FullVision – Página de destino React + TypeScript

Una página de destino moderna y responsiva para un servicio de aplicación de streaming construida con React, TypeScript, Vite y Tailwind CSS.

## Características

- Hero pulido con formulario de captura de correo electrónico
- Destacados de características con íconos
- Sección de dispositivos
- Tarjetas CTA de precios
- FAQ accesible (detalles/resumen)
- UI responsiva y oscura con Tailwind
- Prueba mínima usando Vitest + Testing Library

## Pruébalo

Instala dependencias (Node 18+ recomendado):

```
npm install
```

Inicia el servidor de desarrollo:

```
npm run dev
```

Construye para producción:

```
npm run build
```

Vista previa de la construcción de producción:

```
npm run preview
```

Ejecuta pruebas:

```
npm test
```

## Despliegue en GitHub Pages

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages cuando se hace push a la rama `main`.

Para desplegar manualmente:

```
npm run deploy
```

El sitio estará disponible en: `https://Aoshi346.github.io/Streaming/`

### Configuración de GitHub Pages

1. Ve a la configuración del repositorio en GitHub
2. Navega a Settings > Pages
3. En "Source", selecciona "GitHub Actions"
4. El workflow desplegará automáticamente los cambios cuando se haga push a `main`

## Notas

- La marca, copia e imágenes son marcadores de posición—reemplaza con tus propios activos.
- Tailwind está configurado en `tailwind.config.js`; los estilos comienzan en `src/index.css`.
- La página de destino vive en `src/components` y se compone en `src/App.tsx`.
