# Ledge Templates — monorepo

**Un solo repo, el hogar de TODOS los templates de sitios web de Ledge.** Cada template es una app
independiente que corre y se despliega por su cuenta. Hay dos "motores":

**Vite — templates hechos a mano (comparten `@ledge/ui`):**
- **`apps/highend`** — high-end, residencial de lujo (cinemático, charcoal, serif).
- **`apps/lowcost`** — low-cost, orientado a conversión (luminoso, verde/ámbar, teléfono tappable + formulario corto + urgencia).

**Next.js — motor config-driven (otro tipo de producto):**
- **`apps/sitebuilder`** — genera sitios de cliente editando un archivo de config; trae 2 looks: **`classic`** y **`studio`**. Se despliega en **Cloudflare Pages** (no Vercel) y tiene su propio README/CLAUDE dentro.

**Compartido:**
- **`packages/ui`** — `@ledge/ui`: los Legos + tokens (Button, Card, Section, Grid, ImageSlot, Gallery, Lightbox, BeforeAfter). Lo usan las apps de Vite.

Stack: **React + Vite + TS + Tailwind + React Router** (highend/lowcost) · **Next.js** (sitebuilder). npm workspaces.

## Estructura

```
ledge-templates/
├── package.json            # workspaces: ["packages/*", "apps/*"]
├── tsconfig.base.json
├── packages/
│   └── ui/                 # @ledge/ui — Legos compartidos + tailwind-preset (tokens)
└── apps/
    ├── highend/            # Vite — residencial de lujo
    ├── lowcost/            # Vite — conversión / volumen
    └── sitebuilder/        # Next.js — motor config-driven (looks: classic, studio)
```

## Cómo funciona el "Lego" compartido (apps de Vite)

- Cada app de Vite resuelve `@ledge/ui` por un **alias** hacia su fuente (`packages/ui/src`). Sin
  paso de build, y con `resolve.dedupe` hay **una sola copia de React**.
- `@ledge/ui/tailwind-preset.cjs` define **tokens semánticos** (colores, fuentes, radios) como CSS
  variables; cada app pone los **valores** en su `src/index.css`. Así los Legos adoptan la identidad
  de cada app sin tocar el paquete.
- Regla de oro: lo reutilizable (layout, grid, imágenes, lightbox) va en `packages/ui`; lo que da
  identidad (paleta, tipografía, tono, copy) vive en cada app.
- El **sitebuilder** (Next.js) es autocontenido: tiene sus propios componentes y no usa `@ledge/ui`.

## Correr en local

```bash
npm install               # una vez, en la raíz (instala todos los workspaces)

npm run dev:highend       # Vite   → http://localhost:5173
npm run dev:lowcost       # Vite   → http://localhost:5174
npm run dev:sitebuilder   # Next   → http://localhost:3000
```

Cada app también corre sola con `npm run dev` desde su carpeta.

## Build

```bash
npm run build:highend      # apps/highend/dist
npm run build:lowcost      # apps/lowcost/dist
npm run build:sitebuilder  # apps/sitebuilder/out (export estático Next)
npm run build              # las tres
```

## Deploy (una app por proyecto)

Cada app se despliega por separado, apuntando a su carpeta:

| App | Host | Root Directory | Build | Output |
|---|---|---|---|---|
| `apps/highend` | Vercel | `apps/highend` | `npm run build` | `dist` |
| `apps/lowcost` | Vercel | `apps/lowcost` | `npm run build` | `dist` |
| `apps/sitebuilder` | Cloudflare Pages | `apps/sitebuilder` | `npm run build` | `out` |

Las apps de Vite traen su `vercel.json` (rewrite SPA). El sitebuilder trae su propio README con los
ajustes de Cloudflare Pages.

> **Replicable y escalable:** para un template nuevo, se agrega otra carpeta en `apps/` — un repo, N sitios.
