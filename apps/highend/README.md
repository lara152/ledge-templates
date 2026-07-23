# Template A · Meridian (high-end)

App Vite independiente. Estética cinemática, residencial de lujo. Comparte los Legos de
`@ledge/ui` pero su paleta, tipografía y copy son propios.

## Correr

```bash
# desde la raíz del monorepo:
npm run dev:highend
# o desde esta carpeta:
npm run dev
```

## Dónde cambiar cosas (lo único que tocas)

| Qué | Archivo |
|---|---|
| **Imágenes y textos** (todo) | [`src/data/content.ts`](src/data/content.ts) |
| **Paleta / tipografía / esquinas** | [`src/index.css`](src/index.css) (variables `--color-*`, `--font-*`) |
| **Fuentes cargadas** | [`index.html`](index.html) (link de Google Fonts) |

### Imágenes
Todas viven en `src/data/content.ts` con la forma `{ src, alt, caption?, neighborhood? }`.
Para poner una foto real: reemplaza `src: ''` por la URL. Mientras `src` esté vacío, verás
un placeholder elegante con la descripción de la toma que va ahí (el `alt`). Los aspect-ratios
ya están fijados en cada componente, así que no hay saltos de layout al cargar.

## Deploy en Vercel

Un proyecto de Vercel apuntando a esta carpeta:

| Setting | Valor |
|---|---|
| **Root Directory** | `apps/highend` |
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

El `vercel.json` ya incluye el rewrite para que el routing SPA (React Router) funcione en refresh.
