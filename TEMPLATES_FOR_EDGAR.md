# Templates de Ledge — estado actual, cómo funcionan, y preguntas para Edgar

> **Propósito:** poner a Edgar al día de cómo están armados hoy los templates de sitios web,
> explicar la diferencia entre las dos "familias" que existen, y —lo más importante— **pedirle
> que rete el enfoque**: ¿esto está bien pensado? ¿cómo lo escalamos sin tropezar? ¿vale la pena
> construir ya una plataforma self-serve donde el cliente elige un template y se aprovisiona solo?
>
> **Repo:** https://github.com/lara152/ledge-templates (monorepo, npm workspaces).
> **Autoría de opiniones:** las secciones marcadas **[Claude]** son mi análisis; las secciones
> marcadas **[Para Edgar]** son preguntas abiertas donde queremos su pushback.

---

## 1. Los 4 templates hoy

| # | Template | Familia | Dónde vive | Stack | Estado |
|---|----------|---------|------------|-------|--------|
| 1 | **classic** | A — sitebuilder | `apps/sitebuilder` (es un *look*) | Next.js | ✅ Hecho + en GitHub |
| 2 | **studio** | A — sitebuilder | `apps/sitebuilder` (es un *look*) | Next.js | ✅ Hecho + en GitHub |
| 3 | **highend** (Meridian) | B — Vite | `apps/highend` (app propia) | Vite + React Router | ✅ Hecho · falta multi-cliente |
| 4 | **lowcost** (GreenLeaf) | B — Vite | `apps/lowcost` (app propia) | Vite + React Router | ✅ Hecho · falta multi-cliente |

Todos comparten un paquete de componentes base, `@ledge/ui` (solo lo usan los de Vite hoy).

---

## 2. La diferencia clave: son DOS familias, dos arquitecturas

Esto es lo que hay que entender antes que nada. Los 4 no son el mismo tipo de cosa.

### Familia A — el **sitebuilder** (classic + studio)
- **Qué es:** UNA sola aplicación Next.js que es un "motor". `classic` y `studio` **no son apps separadas**: son **dos estilos** del mismo motor. Se elige el estilo con una línea de config (`"template": "classic"` o `"studio"`).
- **Multi-cliente: YA resuelto.** Cada cliente es una carpeta `apps/sitebuilder/clients/<cliente>/site.config.json` con SUS datos. Un comando (`npm run use <cliente>`) elige cuál construir. El código del motor es uno solo.
- **Para qué sirve:** generar **muchos** sitios de cliente **rápido**, editando un archivo de config. Trae SEO/answer-engine automático (JSON-LD, sitemap, llms.txt). Se despliega en **Cloudflare Pages**.
- **Analogía:** una **cafetera con 2 botones**. Metes los datos de un cliente, aprietas un botón (estilo), sale su sitio.

### Familia B — los **templates Vite** (highend + lowcost)
- **Qué es:** cada uno es **su propia app independiente**, hecha a mano, con páginas ricas (galería, lightbox, before/after, rutas con React Router).
- **Multi-cliente: TODAVÍA NO.** Hoy cada app tiene **un solo** `content.ts` (los datos del demo). No hay forma limpia de meter varios clientes al mismo template. Este es el hueco a resolver.
- **Para qué sirve:** sitios premium/diferenciados donde el diseño importa más que la velocidad de producción. Se despliegan en **Vercel**.
- **Analogía:** dos **pasteles ya hechos**. Cada uno es su propia cosa; no hay "botón" que elegir.

### Comparación lado a lado

| | Familia A (sitebuilder) | Familia B (Vite: highend/lowcost) |
|---|---|---|
| ¿Qué es un "template"? | Un *estilo* dentro de un motor | Una *app* completa |
| ¿Cómo se elige? | Config: `"template": "..."` | Es la carpeta misma (`apps/highend`) |
| Multi-cliente | ✅ `clients/<slug>/` + selector | ❌ aún no existe |
| Datos del cliente | `clients/<slug>/site.config.json` | Hoy: un `content.ts` único |
| Deploy | Cloudflare Pages | Vercel |
| SEO automático | Sí (JSON-LD, sitemap, llms.txt) | Básico (hecho a mano) |
| Fortaleza | Volumen, rapidez, config-driven | Diseño a la medida, interactividad |

---

## 3. Cómo está organizado el repo (para que Edgar lo ubique)

```
ledge-templates/
├── packages/ui/            @ledge/ui — componentes "Lego" + tokens (Button, Card, ImageSlot,
│                           Gallery, Lightbox, BeforeAfter). Lo usan los templates Vite.
└── apps/
    ├── highend/            Vite — app propia (residencial de lujo)     [1 solo content.ts]
    ├── lowcost/            Vite — app propia (conversión/volumen)      [1 solo content.ts]
    └── sitebuilder/        Next.js — motor config-driven
        └── clients/
            ├── northline-hvac/   → look "classic"
            └── sage-and-stone/   → look "studio"
```

- **`@ledge/ui` se comparte por alias** (una sola copia de código; arreglas ahí → mejora en todos los Vite).
- **El sitebuilder es autocontenido** (tiene sus propios componentes; no usa `@ledge/ui`).
- **Imágenes:** hoy son placeholders. Cada template centraliza sus imágenes en un archivo de datos
  (`content.ts` / `site.config.json`) con la forma `{ src, alt, caption, neighborhood }`. Se cambian
  reemplazando URLs. (A escala, las fotos deberían vivir en un bucket tipo Cloudflare R2, no en el repo.)

---

## 4. Lo que SÍ nos encanta y queremos conservar: "arregla uno → se arreglan todos"

Esta propiedad viene de **separar el código del template de los datos del cliente**:
- El **código** vive una sola vez (el template / `@ledge/ui`). Si arreglas un bug o mejoras el diseño, **le llega a todos los clientes de ese template de un jalón.**
- Los **datos** de cada cliente viven aparte, aislados.

Hoy esto **ya funciona en la Familia A** (sitebuilder). En la **Familia B (Vite) todavía no**, porque no tienen la capa multi-cliente. **Nuestro siguiente paso propuesto es dársela**, para que las 4 funcionen igual.

---

## 5. [Claude] La visión: una plataforma self-serve

**La idea de Lara (para presentarle a Edgar):** un cliente entra a un sitio de Ledge, ve una
**galería de todos los templates** (con preview en vivo), elige el que le gusta, llena un formulario
con sus datos y fotos, aprieta "apply for this template", **y a nosotros nos llegan los datos y se
crea su carpeta/sitio automáticamente.**

### [Claude] Cómo llegar ahí — mi recomendación: por etapas, NO de un jalón

El error clásico sería construir toda la plataforma primero. Mejor validar barato y subir escalón por escalón:

- **Etapa 0 — cimiento (ahora):** dar a highend/lowcost la capa **multi-cliente** (mismo patrón
  `clients/` + selector que ya tiene el sitebuilder). Sin esto, nada escala. Se hace ya, sirva o no la plataforma.

- **Etapa 1 — intake manual pero rápido:** un formulario simple (una página, o hasta Typeform/Formspree)
  donde el prospecto **elige template + manda su info y fotos**. Cae en una tabla de **Supabase** (Ledge ya
  tiene Supabase) + las fotos a **Cloudflare R2**. Un humano de Ledge revisa y corre un script que arma la
  carpeta del cliente y despliega. *El paso humano es un filtro de calidad, no un cuello de botella, a bajo
  volumen (<20 sitios en 6 meses).*

- **Etapa 2 — aprovisionamiento semi-automático:** un comando `new-client <template> <id-de-submission>`
  que jala los datos de Supabase + fotos de R2, genera el `content.ts`/config del cliente, commitea y dispara
  el deploy (API de Vercel/Cloudflare). Sigue habiendo un humano que aprieta el botón, pero es 1 comando.

- **Etapa 3 — self-serve completo:** la app de Ledge: galería + **preview en vivo con SUS datos** + "apply"
  → crea todo solo (carpeta vía API de GitHub, deploy vía API de Vercel/Cloudflare, dominio). Este es el SaaS
  de verdad. **Solo se construye cuando la Etapa 1 pruebe que el funnel convierte.**

### [Claude] Dónde viven los datos en este modelo
- **Info del negocio + qué template + estado** → tabla en **Supabase** (reusar el de Ledge; nada de Firebase).
- **Fotos** → **Cloudflare R2** (o Supabase Storage), carpeta por cliente.
- **Sitio generado** → su propio deploy + dominio (aislado por cliente).
- **Código del template** → el monorepo (compartido, se arregla una vez).

---

## 6. [Claude] Cómo hacerlo lo más escalable posible (sin tropezar, sin "revisit")

Principios que sostienen el "arregla uno → se arreglan todos" y evitan rehacer cosas:

1. **Separar CÓDIGO de DATOS.** El código del template es compartido; cada cliente es solo datos. **Nunca**
   se clona el template por cliente (eso causa *drift*: arreglas en uno y los demás quedan viejos).
2. **Una sola fuente de verdad por dato.** La info de cada cliente en UN lugar (su archivo/su fila en DB).
   Nada copiado en dos lados que se desincronice.
3. **Derivado, no mantenido a mano.** SEO, sitemaps, previews → generados de los datos, no editados a mano.
4. **Primitivos compartidos disciplinados.** `@ledge/ui` es la capa Lego: templates nuevos la reusan y las
   mejoras se propagan. Regla: lo reutilizable va al paquete; lo que da identidad vive en cada template.
5. **Aprovisionar con código, no a mano.** Onboarding = un script/pipeline repetible. Es lo que deja escalar
   sin errores humanos.
6. **Un registro de clientes** (una tabla: quién tiene qué template, qué dominio, qué estado). El "tablero de control".
7. **Consistencia entre templates.** Que TODOS manejen clientes igual (mismo patrón `clients/`), para no
   reaprender por template. (Por eso importa emparejar highend/lowcost con el modelo del sitebuilder.)
8. **Tener presentes los límites de hosting.** Ya medimos: Cloudflare Pages tope ~100 proyectos/cuenta y
   500 builds/mes; Vercel tiene los suyos. A escala real puede convencer más un modelo **multi-tenant**
   (una sola app desplegada que sirve a muchos clientes desde la DB, ruteando por dominio) en vez de un
   deploy por cliente. **← esta es una pregunta grande para Edgar (abajo).**

---

## 7. [Para Edgar] Preguntas — **por favor, RÉTANOS**

Queremos pushback honesto. Si crees que algo está sobre-diseñado, mal enfocado, o que hay un camino más simple, dilo sin filtro.

### Sobre las dos familias
1. ¿Es un error tener **dos arquitecturas** (motor config-driven vs app-por-template)? ¿Deberíamos unificar en una sola? ¿En cuál, y qué perdemos?
2. Dos stacks (Next.js/Cloudflare + Vite/Vercel) en un mismo repo, dos destinos de deploy. ¿Es una trampa de mantenimiento? ¿Estandarizamos?

### Sobre multi-cliente en los templates Vite
3. ¿"Carpeta `clients/` por template + selector" es el modelo correcto, o los datos del cliente deberían vivir en una **base de datos/CMS desde el día uno** (para que un no-dev edite sin tocar el repo)?
4. ¿En qué punto se rompe "cada cliente es una carpeta en el repo"? (tamaño del repo, tiempos de build, topes de proyectos en Cloudflare/Vercel)

### Sobre la plataforma self-serve
5. ¿Construir la plataforma ya es **prematuro**? ¿Cuál es la forma **más barata** de validar que un sitio-template gratis **convierte** a un prospecto en cliente de pago, ANTES de construirla?
6. **Build vs. buy:** ¿deberíamos usar algo existente (Webflow, Framer, un headless CMS) en vez de construir todo a mano? ¿Qué ganamos/perdemos por ser dueños del código?
7. Si la construimos: ¿cuál es el **pipeline mínimo** de aprovisionamiento? ¿API de GitHub + API de Vercel? ¿O mejor **multi-tenant** (una sola app que renderiza cualquier cliente desde la DB, ruteando por dominio) — cero repos/deploys por cliente?

### Sobre escala y arquitectura
8. El "arregla uno → se arreglan todos": ¿aguanta cuando un cliente pide **personalización**? Si un cliente quiere algo que el template no expresa, ¿forkeamos (drift) o extendemos el template (y arriesgamos romper a los demás)? ¿Cómo trazamos esa línea?
9. **Multi-tenant vs. deploy-por-cliente:** ¿una sola app desplegada por template, sirviendo a todos sus clientes desde una DB, ruteando por dominio? Eso esquivaría los topes de deploy. ¿Tradeoffs reales?
10. **Imágenes a escala:** ¿R2 vs Supabase Storage vs un CDN de imágenes con resize? ¿Qué eliges para cientos de clientes × decenas de fotos?

### Sobre negocio / operación
11. ¿"Sitio gratis como imán de leads" es el funnel correcto? ¿Qué convierte mejor: gratis, o template de pago + fee de setup?
12. ¿Quién **mantiene** los sitios después del lanzamiento (ediciones, soporte)? Ese es el costo escondido que nadie planea.

### La pregunta meta
13. ¿Estamos **sobre-ingenierizando**? ¿Deberíamos hacer a mano los primeros ~5 sitios de clientes reales y **aprender**, antes de sistematizar nada de esto?
14. ¿Un **monorepo** es siquiera lo correcto, o a escala sería más limpio repos separados + un paquete npm compartido publicado?

---

## 8. Decisión pendiente / próximos pasos

- **Inmediato (independiente de todo):** darle a highend/lowcost la capa multi-cliente (Etapa 0). ¿De acuerdo?
- **A decidir con Edgar:** ¿unificamos familias? ¿multi-tenant vs deploy-por-cliente? ¿build vs buy? ¿cuándo (o si) construimos la plataforma self-serve?
- **A validar antes de invertir en la plataforma:** ¿un sitio gratis convierte? (armar 1–2 a mano con clientes reales y medir).

> **Nota:** este documento vive en el repo `ledge-templates` (raíz). Las decisiones que salgan de la
> plática con Edgar deberían quedar registradas aquí mismo para no re-litigarlas después.
