import type { ImageAsset } from '@ledge/ui';

/* ============================================================================
   TEMPLATE B · GREENLEAF — CONTENIDO CENTRALIZADO
   ----------------------------------------------------------------------------
   TODO el texto y TODAS las imágenes viven aquí. Para poner fotos reales:
   reemplaza cada `src: ''` por su URL. REGLA DURA: nada de stock genérico —
   estas son fotos REALES de obra (el alt lo deja claro en el placeholder).
   ============================================================================ */

export const site = {
  name: 'GreenLeaf',
  fullName: 'GreenLeaf Lawn & Landscape',
  tagline: 'Affordable lawn care & landscaping, done right',
  phone: '(512) 555-0198',
  email: 'hello@greenleafaustin.com',
  city: 'Austin, TX',
  hours: 'Mon–Sat 7am–6pm',
  serviceAreaShort: 'Austin & surrounding areas',
};

/** Tel: href limpio para todos los botones tappables. */
export const telHref = `tel:${site.phone.replace(/[^\d+]/g, '')}`;

export const nav = [
  { label: 'Services', to: '/services' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Work', to: '/portfolio' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Areas', to: '/areas' },
];

/* Barra de urgencia (arriba del todo). */
export const urgency = {
  banner: 'Free estimates · Booking spring cleanups now — limited spots this month',
  hero: 'Only a few maintenance openings left this month',
};

/* ------------------------------------------------------------------- Hero -- */
export const hero = {
  headline: 'A greener yard, without the hassle',
  sub: 'Reliable lawn care and landscaping across Austin — clear pricing, friendly crews, and a free estimate within one business day.',
  points: ['Free, no-pressure estimate', 'Upfront pricing — no surprises', 'Locally owned, fully insured'],
  // Foto REAL de obra: patio delantero recién cortado, luminoso, casa suburbana de Austin.
  image: { src: '', alt: 'Real job photo: freshly mowed front lawn with crisp edges at an Austin home' } as ImageAsset,
};

/* --------------------------------------------------------------- Services -- */
export type Service = {
  slug: string;
  name: string;
  tagline: string;
  includes: string[];
  priceRange: string;
  image: ImageAsset;
  gallery: ImageAsset[];
};

export const services: Service[] = [
  {
    slug: 'maintenance',
    name: 'Lawn & Landscape Maintenance',
    tagline: 'Weekly or biweekly mowing, edging, and cleanup that keeps your yard sharp all season.',
    includes: ['Mowing, edging & line-trimming', 'Blow-down of hard surfaces', 'Bed weeding & shrub tidy-up', 'Seasonal color swaps (optional)'],
    priceRange: 'From $149/mo',
    image: { src: '', alt: 'Real job photo: crew mowing a maintained St. Augustine lawn' },
    gallery: [
      { src: '', alt: 'Real job photo: crisp mow lines on a front lawn', caption: 'Weekly mow', neighborhood: 'Round Rock' },
      { src: '', alt: 'Real job photo: edged walkway after service', caption: 'Clean edging', neighborhood: 'Cedar Park' },
      { src: '', alt: 'Real job photo: tidied planting beds', caption: 'Bed cleanup', neighborhood: 'Austin' },
    ],
  },
  {
    slug: 'seasonal-cleanup',
    name: 'Seasonal Cleanups',
    tagline: 'Spring and fall resets — leaves, debris, cutbacks, and fresh mulch so the yard starts strong.',
    includes: ['Leaf & debris removal', 'Perennial cutbacks', 'Fresh mulch install', 'Haul-away included'],
    priceRange: '$250–$600 per visit',
    image: { src: '', alt: 'Real job photo: fall cleanup with bagged leaves and fresh mulch beds' },
    gallery: [
      { src: '', alt: 'Real job photo: fresh dark mulch in a bed', caption: 'Fresh mulch', neighborhood: 'Pflugerville' },
      { src: '', alt: 'Real job photo: cleared leaves along a fence line', caption: 'Leaf removal', neighborhood: 'Austin' },
    ],
  },
  {
    slug: 'irrigation',
    name: 'Sprinkler & Irrigation',
    tagline: 'Repairs, tune-ups, and smart-controller upgrades that cut your water bill and keep every zone green.',
    includes: ['Leak & head repairs', 'Zone audits & coverage fixes', 'Smart-controller install', 'Seasonal tune-ups'],
    priceRange: 'Repairs from $95',
    image: { src: '', alt: 'Real job photo: technician adjusting a sprinkler head in a green lawn' },
    gallery: [
      { src: '', alt: 'Real job photo: new smart irrigation controller on a garage wall', caption: 'Smart controller', neighborhood: 'Georgetown' },
      { src: '', alt: 'Real job photo: sprinkler head watering a zone at dusk', caption: 'Even coverage', neighborhood: 'Leander' },
    ],
  },
  {
    slug: 'hardscape',
    name: 'Hardscape & Patios',
    tagline: 'Paver patios, walkways, and retaining walls built to last — usable outdoor space on a real budget.',
    includes: ['Paver patios & walkways', 'Retaining walls', 'Fire pits & seating areas', 'Drainage solutions'],
    priceRange: 'Projects from $4,500',
    image: { src: '', alt: 'Real job photo: newly installed paver patio with seating area' },
    gallery: [
      { src: '', alt: 'Real job photo: paver walkway to a front door', caption: 'Paver walkway', neighborhood: 'Cedar Park' },
      { src: '', alt: 'Real job photo: stone retaining wall with planting', caption: 'Retaining wall', neighborhood: 'Austin' },
      { src: '', alt: 'Real job photo: backyard fire pit with gravel seating area', caption: 'Fire pit area', neighborhood: 'Round Rock' },
    ],
  },
  {
    slug: 'design',
    name: 'Landscape Design',
    tagline: 'A clear, affordable plan — plants, layout, and budget — so you know exactly what you are getting.',
    includes: ['Site visit & measurements', 'Plant & layout plan', 'Itemized budget', 'Phased options'],
    priceRange: 'Design from $450',
    image: { src: '', alt: 'Real job photo: simple landscape plan on a clipboard in a front yard' },
    gallery: [
      { src: '', alt: 'Real job photo: newly planted, drought-friendly front bed', caption: 'Planted design', neighborhood: 'Austin' },
    ],
  },
  {
    slug: 'construction',
    name: 'Landscape Construction',
    tagline: 'Full installs — beds, sod, plants, edging, and lighting — turning a plan into a finished yard.',
    includes: ['Sod & planting install', 'Bed shaping & edging', 'Landscape lighting', 'Drainage & grading'],
    priceRange: 'Installs from $3,500',
    image: { src: '', alt: 'Real job photo: finished front-yard install with fresh sod and new beds' },
    gallery: [
      { src: '', alt: 'Real job photo: fresh sod rolled out on a graded yard', caption: 'New sod', neighborhood: 'Pflugerville' },
      { src: '', alt: 'Real job photo: low-voltage path lighting at dusk', caption: 'Path lighting', neighborhood: 'Austin' },
    ],
  },
];

/* ---------------------------------------------------------------- Pricing -- */
export type Plan = {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  highlighted?: boolean;
};

export const plans: Plan[] = [
  {
    name: 'Basic',
    price: '$149',
    cadence: '/mo',
    blurb: 'Biweekly mow & tidy for a hands-off yard.',
    features: ['Mow, edge & blow (biweekly)', 'Hard-surface blow-down', 'Free estimate', 'No contract'],
  },
  {
    name: 'Full Care',
    price: '$249',
    cadence: '/mo',
    blurb: 'Weekly service plus beds — our most popular plan.',
    features: ['Everything in Basic, weekly', 'Bed weeding & shrub trim', 'Seasonal color swaps', 'Priority scheduling'],
    highlighted: true,
  },
  {
    name: 'Premium',
    price: '$399',
    cadence: '/mo',
    blurb: 'Full-service care with irrigation and fertilization.',
    features: ['Everything in Full Care', 'Fertilization program', 'Irrigation checks', 'Same-week response'],
  },
];

export const customQuote = {
  title: 'Bigger project?',
  blurb: 'Patios, irrigation, design, or a full install — get a fast, itemized custom quote with no obligation.',
};

/* -------------------------------------------------------------- Portfolio -- */
export type BeforeAfterItem = {
  city: string;
  scope: string;
  duration: string;
  before: ImageAsset;
  after: ImageAsset;
};

export const beforeAfter: BeforeAfterItem[] = [
  {
    city: 'Round Rock, TX',
    scope: 'Full front-yard refresh — sod, beds & edging',
    duration: '3 days',
    before: { src: '', alt: 'Real job photo: patchy, weedy front yard before service' },
    after: { src: '', alt: 'Real job photo: same front yard with fresh sod and clean beds after' },
  },
  {
    city: 'Cedar Park, TX',
    scope: 'Paver patio + fire pit',
    duration: '5 days',
    before: { src: '', alt: 'Real job photo: bare dirt backyard corner before' },
    after: { src: '', alt: 'Real job photo: finished paver patio with fire pit after' },
  },
  {
    city: 'Austin, TX',
    scope: 'Overgrown beds cleared & replanted',
    duration: '2 days',
    before: { src: '', alt: 'Real job photo: overgrown, weedy planting beds before' },
    after: { src: '', alt: 'Real job photo: clean, mulched, freshly planted beds after' },
  },
  {
    city: 'Pflugerville, TX',
    scope: 'Dead lawn replaced with drought-friendly landscape',
    duration: '4 days',
    before: { src: '', alt: 'Real job photo: dead, brown lawn before' },
    after: { src: '', alt: 'Real job photo: xeriscape with gravel, plants and steel edging after' },
  },
];

/* --------------------------------------------------------------- Reviews --- */
export type Review = { name: string; city: string; rating: number; text: string; source: string };

export const reviews: Review[] = [
  { name: 'Marcus T.', city: 'Round Rock', rating: 5, source: 'Google', text: 'Booked online, got a quote the next morning, and my yard has never looked better. Fair price and they actually show up when they say.' },
  { name: 'Priya S.', city: 'Cedar Park', rating: 5, source: 'Google', text: 'The Full Care plan is worth every penny. Weekly crew is friendly and thorough, and the beds look amazing.' },
  { name: 'The Alvarez family', city: 'Austin', rating: 5, source: 'Google', text: 'They turned our dead lawn into a low-water landscape we love. Clear pricing, no upsell, done in a few days.' },
  { name: 'Dana R.', city: 'Pflugerville', rating: 5, source: 'Google', text: 'Fixed three broken sprinkler heads and set up a smart controller. Water bill already dropped. Highly recommend.' },
  { name: 'Kevin M.', city: 'Georgetown', rating: 5, source: 'Google', text: 'New paver patio came out better than we pictured. On time, on budget, cleaned up every day.' },
  { name: 'Sofia L.', city: 'Leander', rating: 5, source: 'Google', text: 'Reliable, affordable, and easy to reach. Been with GreenLeaf for two seasons and won’t switch.' },
];

export const reviewsSummary = { rating: '4.9', count: '320+' };

/* ---------------------------------------------------------- Service areas -- */
export type Area = { slug: string; city: string; blurb: string; neighborhoods: string[] };

export const areas: Area[] = [
  { slug: 'austin', city: 'Austin', blurb: 'Full lawn care and landscaping across central Austin and the suburbs.', neighborhoods: ['Mueller', 'Circle C', 'Tarrytown', 'South Congress', 'Crestview'] },
  { slug: 'round-rock', city: 'Round Rock', blurb: 'Reliable weekly maintenance and installs throughout Round Rock.', neighborhoods: ['Teravista', 'Forest Creek', 'Paloma Lake', 'Behrens Ranch'] },
  { slug: 'cedar-park', city: 'Cedar Park', blurb: 'Lawn care, hardscape, and irrigation for Cedar Park homes.', neighborhoods: ['Buttercup Creek', 'Ranch at Brushy Creek', 'Twin Creeks'] },
  { slug: 'pflugerville', city: 'Pflugerville', blurb: 'Affordable, dependable service across Pflugerville.', neighborhoods: ['Falcon Pointe', 'Blackhawk', 'Avalon'] },
  { slug: 'georgetown', city: 'Georgetown', blurb: 'Maintenance and landscaping for Georgetown and Sun City.', neighborhoods: ['Sun City', 'Wolf Ranch', 'Berry Creek'] },
  { slug: 'leander', city: 'Leander', blurb: 'Growing with Leander — lawn care, design, and build.', neighborhoods: ['Crystal Falls', 'Travisso', 'Bryson'] },
];

/* --------------------------------------------------------------- Contact --- */
export const serviceOptions = [
  'Lawn maintenance',
  'Seasonal cleanup',
  'Sprinkler / irrigation',
  'Hardscape / patio',
  'Landscape design',
  'Landscape construction',
  'Something else',
];
