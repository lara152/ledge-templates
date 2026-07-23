# Ledge Landscaping Sites — monorepo

**Un solo repo, dos sitios de landscaping completamente distintos**, que comparten una base de
componentes ("Legos") pero tienen identidad visual, paleta, tipografía y copy 100% propios.

- **`apps/highend`** — Template A: high-end, residencial de lujo (cinemático, charcoal, serif).
- **`apps/lowcost`** — Template B: low-cost, orientado a volumen y conversión (luminoso, verde/ámbar, teléfono tappable + formulario corto + urgencia).
- **`packages/ui`** — `@ledge/ui`: los Legos compartidos + tokens (Button, Card, Section, Grid,
  ImageSlot, Gallery, Lightbox, BeforeAfter).

Stack: **React + Vite + TypeScript + Tailwind + React Router**, npm workspaces, listo para Vercel.

## Estructura

```
landscaping-sites/
├── package.json            # workspaces: ["packages/*", "apps/*"]
├── tsconfig.base.json
├── packages/
│   └── ui/                 # @ledge/ui — componentes compartidos + tailwind-preset (tokens)
└── apps/
    ├── highend/            # Template A (app Vite independiente)
    └── lowcost/            # Template B (app Vite independiente)
```

## Cómo funciona el "Lego" compartido

- Cada app resuelve `@ledge/ui` por un **alias de Vite** hacia su código fuente
  (`packages/ui/src`). No hay paso de build para el paquete, y con `resolve.dedupe` hay
  **una sola copia de React**.
- `@ledge/ui/tailwind-preset.cjs` define los **tokens semánticos** (colores, fuentes, radios) como
  CSS variables. Cada app pone los **valores** de esas variables en su `src/index.css` — por eso
  los Legos adoptan la identidad de cada app sin tocar el paquete compartido.
- Regla de oro: lo genuinamente reutilizable (layout, grid, imágenes, lightbox) va en `packages/ui`;
  lo que da identidad (paleta, tipografía, tono, copy) vive en cada app.

## Correr en local

```bash
npm install            # una vez, en la raíz (instala todos los workspaces)

npm run dev:highend    # Template A  → http://localhost:5173
npm run dev:lowcost    # Template B  → (cuando exista)
```

Cada app también corre sola con `npm run dev` desde su carpeta.

## Build

```bash
npm run build:highend  # genera apps/highend/dist
npm run build:lowcost
npm run build          # ambas
```

## Deploy en Vercel (una app por proyecto)

Cada app se despliega como **su propio proyecto de Vercel**, apuntando a su carpeta:

| Setting | highend | lowcost |
|---|---|---|
| **Root Directory** | `apps/highend` | `apps/lowcost` |
| **Framework Preset** | Vite | Vite |
| **Build Command** | `npm run build` | `npm run build` |
| **Output Directory** | `dist` | `dist` |
| **Install Command** | `npm install` (en la raíz del repo) | igual |

Vercel detecta el monorepo e instala desde la raíz; el Root Directory apunta a la app a construir.
Cada app trae su `vercel.json` con el rewrite SPA para que React Router funcione al refrescar.

> **Replicable y escalable:** para un tercer sitio, se agrega otra carpeta en `apps/` que reusa
> `@ledge/ui` con su propia identidad — un repo, N sitios.
