import type { ImageAsset } from '@ledge/ui';

/* ============================================================================
   TEMPLATE A · MERIDIAN — CONTENIDO CENTRALIZADO
   ----------------------------------------------------------------------------
   TODO el texto y TODAS las imágenes del sitio viven aquí. Para poner fotos
   reales: reemplaza el `src: ''` de cada imagen por su URL. El `alt` describe
   la toma que va en ese slot (y sale como texto del placeholder mientras src
   esté vacío). Forma de cada imagen: { src, alt, caption?, neighborhood? }.
   ============================================================================ */

export const site = {
  name: 'Meridian',
  fullName: 'Meridian Landscape Studio',
  tagline: 'Bespoke landscape design & build',
  location: 'Austin, Texas',
  email: 'studio@meridianlandscape.com',
  phone: '+1 (512) 555-0123',
  instagram: 'https://instagram.com/meridian.landscape',
  /** Regla high-end: nada de precios abiertos. Solo un piso. */
  projectsFrom: 'Projects from $75K',
} as const;

export const nav = [
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Services', to: '/services' },
  { label: 'Process', to: '/process' },
  { label: 'Studio', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

/* ------------------------------------------------------------------ Hero --- */
export const hero = {
  eyebrow: 'Austin · Texas Hill Country',
  headline: 'Gardens made to be lived in',
  sub: 'A design-build studio for singular residential landscapes.',
  // Foto/Video: plano cinematográfico full-bleed de un jardín de lujo al atardecer,
  // sin gente, mucho aire. Idealmente un video loop; si es imagen, 21/9 apaisada.
  image: {
    src: '',
    alt: 'Dusk view of a sculpted courtyard garden with a reflecting pool and limestone terrace',
  } as ImageAsset,
};

/* -------------------------------------------------------------- Projects --- */
export type Project = {
  slug: string;
  name: string;
  /** "Barrio, Ciudad" — se muestra como identidad del proyecto. */
  neighborhood: string;
  year: string;
  /** Opcional. Ej. "$180K backyard renovation". Máximo un rango, nunca lista de precios. */
  budget?: string;
  scope: string[];
  summary: string;
  /** Foto de portada (grid + hero del case study). */
  cover: ImageAsset;
  /** Galería del case study. */
  gallery: ImageAsset[];
};

export const projects: Project[] = [
  {
    slug: 'tarrytown-courtyard',
    name: 'Tarrytown Courtyard',
    neighborhood: 'Tarrytown, Austin',
    year: '2024',
    budget: '$180K backyard renovation',
    scope: ['Design', 'Build', 'Pool', 'Planting'],
    summary:
      'A walled 1930s lot reimagined as a series of outdoor rooms — a limestone dining terrace, a still reflecting pool, and layered native planting that softens the architecture.',
    // Portada: plano ancho al atardecer, terraza de piedra + espejo de agua.
    cover: {
      src: '',
      alt: 'Wide dusk shot of a limestone terrace beside a still reflecting pool',
      neighborhood: 'Tarrytown, Austin',
    },
    gallery: [
      { src: '', alt: 'Reflecting pool at blue hour with uplit oak canopy', caption: 'The reflecting pool at dusk' },
      { src: '', alt: 'Limestone dining terrace with built-in bench and pergola', caption: 'Dining terrace' },
      { src: '', alt: 'Detail of native planting bed with regional grasses and perennials', caption: 'Native planting detail' },
      { src: '', alt: 'Entry path of board-formed concrete pavers through a courtyard', caption: 'Entry sequence' },
    ],
  },
  {
    slug: 'westlake-hill-terrace',
    name: 'Hill Terrace',
    neighborhood: 'West Lake Hills',
    year: '2023',
    budget: '$240K design-build',
    scope: ['Design', 'Build', 'Hardscape', 'Lighting'],
    summary:
      'Cut into a steep Hill Country slope, a cascade of terraces steps down to a shaded lounge and fire garden with long views west.',
    cover: {
      src: '',
      alt: 'Stepped stone terraces descending a wooded Hill Country slope at golden hour',
      neighborhood: 'West Lake Hills',
    },
    gallery: [
      { src: '', alt: 'Fire garden with low seating and steel fire feature at dusk', caption: 'The fire garden' },
      { src: '', alt: 'Board-formed concrete retaining walls with integrated steps', caption: 'Terrace walls' },
      { src: '', alt: 'Long view west over the tree canopy from the upper terrace', caption: 'The view west' },
      { src: '', alt: 'Architectural lighting washing a limestone wall after dark', caption: 'Night lighting' },
    ],
  },
  {
    slug: 'clarksville-modern',
    name: 'Clarksville Modern',
    neighborhood: 'Clarksville, Austin',
    year: '2024',
    scope: ['Design', 'Build', 'Planting'],
    summary:
      'A restrained, architectural front and back garden for a modern infill home — crushed granite, corten edges, and a disciplined palette of three plants repeated with intent.',
    cover: {
      src: '',
      alt: 'Minimalist modern courtyard with corten steel planters and crushed granite',
      neighborhood: 'Clarksville, Austin',
    },
    gallery: [
      { src: '', alt: 'Corten steel planter with architectural agave against white render', caption: 'Corten & agave' },
      { src: '', alt: 'Crushed granite courtyard with single specimen tree', caption: 'The courtyard' },
      { src: '', alt: 'Repeated grass planting along a clean concrete walk', caption: 'Planting rhythm' },
    ],
  },
  {
    slug: 'barton-creek-retreat',
    name: 'Barton Creek Retreat',
    neighborhood: 'Barton Creek',
    year: '2023',
    budget: '$320K full property',
    scope: ['Design', 'Build', 'Pool', 'Planting', 'Lighting'],
    summary:
      'A whole-property landscape for a hillside residence — infinity pool, native meadow restoration, and an oak-shaded arrival court.',
    cover: {
      src: '',
      alt: 'Infinity-edge pool overlooking a native meadow and distant hills',
      neighborhood: 'Barton Creek',
    },
    gallery: [
      { src: '', alt: 'Infinity pool edge dissolving into the meadow beyond', caption: 'Infinity edge' },
      { src: '', alt: 'Restored native meadow in bloom with mown paths', caption: 'Meadow restoration' },
      { src: '', alt: 'Arrival court shaded by heritage live oaks', caption: 'Arrival court' },
      { src: '', alt: 'Outdoor kitchen and shaded dining pavilion', caption: 'Dining pavilion' },
    ],
  },
  {
    slug: 'pemberton-garden',
    name: 'Pemberton Garden',
    neighborhood: 'Pemberton Heights, Austin',
    year: '2022',
    scope: ['Design', 'Planting', 'Restoration'],
    summary:
      'A quiet, layered garden for a historic home — a restrained restoration that lets mature trees and a soft perennial understory carry the scene.',
    cover: {
      src: '',
      alt: 'Layered perennial garden beneath mature trees at a historic home',
      neighborhood: 'Pemberton Heights, Austin',
    },
    gallery: [
      { src: '', alt: 'Soft perennial understory in morning light', caption: 'Perennial understory' },
      { src: '', alt: 'Stone path winding beneath established canopy', caption: 'Garden path' },
      { src: '', alt: 'Shaded seating nook with limestone bench', caption: 'Seating nook' },
    ],
  },
];

/** Los primeros 3 se muestran full-bleed en el Home. */
export const featured = projects.slice(0, 3);

/* -------------------------------------------------------------- Services --- */
// Narrativa design-build (concepto → construcción → entrega), no lista de bullets.
export const servicesIntro = {
  eyebrow: 'What we do',
  headline: 'One studio, from first sketch to final stone',
  body: 'Meridian is a true design-build practice. The team that draws your garden is the team that builds it — so intent survives contact with the ground, and nothing is lost in a hand-off.',
};

export const servicePhases: { n: string; title: string; body: string; image: ImageAsset }[] = [
  {
    n: '01',
    title: 'Concept & design',
    body: 'We begin with how you want to live outside. Site study, grading, and planting come together into a considered plan and renderings you can walk through before a shovel moves.',
    image: { src: '', alt: 'Hand-drawn landscape master plan over trace paper with material samples' },
  },
  {
    n: '02',
    title: 'Build & craft',
    body: 'Our own crews execute the plan — stonework, water, structures, drainage, irrigation, and lighting — held to a level of finish most firms sub out and lose control of.',
    image: { src: '', alt: 'Craftsman setting cut limestone on a terrace during construction' },
  },
  {
    n: '03',
    title: 'Planting & delivery',
    body: 'We plant with an eye to how the garden reads in five years, not five weeks — then hand over a living space, with a care plan to keep it that way.',
    image: { src: '', alt: 'Freshly planted native garden bed with mature specimen trees' },
  },
];

/* --------------------------------------------------------------- Process --- */
export const process = {
  eyebrow: 'How we work',
  headline: 'A measured, full-service process',
  steps: [
    { title: 'Consultation', body: 'A conversation on site to understand the property, the architecture, and how you want to use it.' },
    { title: 'Design', body: 'Concept, master plan, and renderings — refined with you until the garden feels inevitable.' },
    { title: 'Proposal', body: 'A detailed scope and investment, transparent and fixed before we build.' },
    { title: 'Build', body: 'Our crews construct every element, managed by the designer who drew it.' },
    { title: 'Handover & care', body: 'We deliver the finished landscape with a stewardship plan for the years ahead.' },
  ],
};

/* Trust signals — premios, certificaciones, prensa. */
export const trust = {
  awards: ['NALP Award of Excellence, 2024', 'ASLA Texas Honor Award, 2023'],
  certifications: ['Licensed Landscape Architect (TX #4408)', 'NALP Accredited', 'Licensed & insured irrigation'],
  press: ['Austin Monthly', 'Tribeza', 'Dwell', 'Texas Architect'],
};

/* ----------------------------------------------------------------- About --- */
export const studio = {
  eyebrow: 'The studio',
  headline: 'A small studio, by intent',
  paragraphs: [
    'Meridian is a landscape design-build studio based in Austin. We take on a limited number of residential projects a year so that a principal is on every site, and every detail is drawn and built by the same hands.',
    'We work in native and adapted plants, honest materials, and restraint — landscapes that belong to the Hill Country and get better with every season.',
  ],
  // Foto: retrato editorial del equipo/fundador en un jardín, luz natural, tono cálido.
  portrait: { src: '', alt: 'Editorial portrait of the studio principal in a finished garden' } as ImageAsset,
  team: [
    { name: 'Elena Marsh', role: 'Principal / Landscape Architect', image: { src: '', alt: 'Portrait of Elena Marsh, principal landscape architect' } as ImageAsset },
    { name: 'Daniel Ortiz', role: 'Director of Build', image: { src: '', alt: 'Portrait of Daniel Ortiz, director of build' } as ImageAsset },
    { name: 'Priya Rao', role: 'Planting Designer', image: { src: '', alt: 'Portrait of Priya Rao, planting designer' } as ImageAsset },
  ],
};

/* --------------------------------------------------------------- Contact --- */
export const contact = {
  eyebrow: 'Begin',
  headline: 'Schedule a design consultation',
  body: 'We take on a limited number of projects each year. Tell us about your property and we will be in touch to arrange a private consultation.',
  // Sin precios abiertos, sin urgencia. Solo el piso de inversión.
  note: site.projectsFrom,
};
