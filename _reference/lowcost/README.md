# Template B · GreenLeaf (low-cost)

App Vite independiente. Estética luminosa, cálida y orientada a **conversión** (teléfono
tappable en header/body/footer, formulario corto siempre a la mano, urgencia). Comparte los
Legos de `@ledge/ui` pero su paleta, tipografía y copy son propios.

## Correr

```bash
# desde la raíz del monorepo:
npm run dev:lowcost
# o desde esta carpeta:
npm run dev            # http://localhost:5174
```

## Dónde cambiar cosas (lo único que tocas)

| Qué | Archivo |
|---|---|
| **Imágenes y textos** (todo: servicios, precios, reseñas, áreas, before/after) | [`src/data/content.ts`](src/data/content.ts) |
| **Paleta / tipografía / esquinas** | [`src/index.css`](src/index.css) (variables `--color-*`, `--font-*`) |
| **Teléfono / urgencia** | `site.phone` y `urgency` en `src/data/content.ts` |

### Imágenes
Todas en `src/data/content.ts` con la forma `{ src, alt, caption?, neighborhood? }`. Reemplaza
`src: ''` por la URL de la **foto real de obra** (regla dura: nada de stock genérico — el `alt`
lo deja claro en el placeholder). Aspect-ratios ya fijados: sin saltos de layout.

## Deploy en Vercel

| Setting | Valor |
|---|---|
| **Root Directory** | `apps/lowcost` |
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

El `vercel.json` incluye el rewrite SPA para React Router.
