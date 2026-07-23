/**
 * Tiny, dependency-free hex color math used at build time to derive theme tokens
 * (contrast-safe foreground, soft tint, hover shade) from the 3 brand colors in
 * site.config.json. Keeping the derivation in JS (rather than CSS color-mix) means
 * the exported CSS uses concrete hex values with universal browser support.
 */

type Rgb = { r: number; g: number; b: number };

export function parseHex(hex: string): Rgb | null {
  if (typeof hex !== 'string') return null;
  let h = hex.trim().replace(/^#/, '');
  if (h.length === 3 || h.length === 4) {
    h = h
      .slice(0, 3)
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (h.length === 6 || h.length === 8) {
    h = h.slice(0, 6);
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    if ([r, g, b].some(Number.isNaN)) return null;
    return { r, g, b };
  }
  return null;
}

function clamp(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)));
}

function toHex({ r, g, b }: Rgb): string {
  return `#${[r, g, b].map((n) => clamp(n).toString(16).padStart(2, '0')).join('')}`;
}

function mix(hex: string, target: Rgb, amount: number): string {
  const rgb = parseHex(hex);
  if (!rgb) return hex;
  return toHex({
    r: rgb.r + (target.r - rgb.r) * amount,
    g: rgb.g + (target.g - rgb.g) * amount,
    b: rgb.b + (target.b - rgb.b) * amount,
  });
}

const WHITE: Rgb = { r: 255, g: 255, b: 255 };
const BLACK: Rgb = { r: 0, g: 0, b: 0 };

export function lighten(hex: string, amount: number): string {
  return mix(hex, WHITE, amount);
}

export function darken(hex: string, amount: number): string {
  return mix(hex, BLACK, amount);
}

/** WCAG relative luminance (0–1). */
export function luminance(hex: string): number {
  const rgb = parseHex(hex);
  if (!rgb) return 0;
  const toLin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * toLin(rgb.r) + 0.7152 * toLin(rgb.g) + 0.0722 * toLin(rgb.b);
}

const NEAR_BLACK = '#0b1a20';

/** Pick a readable foreground (near-black or white) for text on the given background. */
export function readableFg(bg: string): string {
  const L = luminance(bg);
  const contrastWhite = 1.05 / (L + 0.05);
  const contrastBlack = (L + 0.05) / 0.05;
  return contrastWhite >= contrastBlack ? '#ffffff' : NEAR_BLACK;
}

/** A very light tint of the color, for soft backgrounds. */
export function softTint(hex: string): string {
  return lighten(hex, 0.88);
}

/** A slightly darker shade for hover/active states. */
export function hoverShade(hex: string): string {
  return darken(hex, 0.12);
}
