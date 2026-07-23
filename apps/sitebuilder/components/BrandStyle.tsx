import { brand, template } from '@/lib/site';
import { hoverShade, readableFg, softTint } from '@/lib/color';

/**
 * Injects the brand theme as CSS custom properties on :root, derived entirely
 * from config.brand + the selected template. Editing site.config.json re-themes
 * the whole site — no component edits. Colors that aren't provided fall back to a
 * template-appropriate palette; foreground/soft/hover tokens are computed for
 * AA-readable contrast.
 *
 * Per-template neutral palettes (surface/ink/line) live here — not in globals.css —
 * so a template can carry its own paper tone (the "studio" look is warm cream + earth)
 * while every client's site stays fully config-driven.
 */

type Palette = {
  primary: string;
  secondary: string;
  accent: string;
  radius: string;
  /** Neutral tokens; when a template omits these it inherits the globals.css defaults. */
  neutrals?: Record<string, string>;
  /** Display font stack override (body stays Inter unless brand.fonts overrides it). */
  display?: string;
};

const CLASSIC: Palette = {
  primary: '#1B4D89', // confident, trustworthy blue
  secondary: '#0F1B2D', // deep ink navy (dark bands)
  accent: '#E8B04B', // warm gold
  radius: '14px',
};

const STUDIO: Palette = {
  primary: '#35513F', // deep botanical green
  secondary: '#20302733', // placeholder — replaced below (kept opaque via defaults)
  accent: '#BE6A45', // warm terracotta
  radius: '16px',
  neutrals: {
    '--ink': '#25231D', // warm near-black
    '--ink-muted': '#57534A',
    '--ink-subtle': '#847E71',
    '--surface': '#F7F3EA', // warm cream paper
    '--surface-raised': '#FFFDF8', // lifted cards
    '--surface-sunken': '#EFE8DA', // quiet fills
    '--line': '#E4DCCB', // warm hairline
  },
  display: "var(--font-fraunces), 'Georgia', serif",
};

// Deep forest for studio dark bands (footer / CTA). Kept as its own constant so the
// secondary swatch a client sets doesn't have to double as the dark-band color.
const STUDIO_CONTRAST = '#1E2A22';

export function BrandStyle() {
  const isStudio = template === 'studio';
  const preset = isStudio ? STUDIO : CLASSIC;

  const colors = brand.colors ?? {};
  const primary = colors.primary?.trim() || preset.primary;
  const secondary = colors.secondary?.trim() || (isStudio ? STUDIO_CONTRAST : preset.secondary);
  const accent = colors.accent?.trim() || preset.accent;
  const radius = brand.radius?.trim() || preset.radius;
  const contrast = isStudio ? STUDIO_CONTRAST : secondary;

  const vars: Record<string, string> = {
    '--brand-primary': primary,
    '--brand-primary-fg': readableFg(primary),
    '--brand-primary-soft': softTint(primary),
    '--brand-primary-hover': hoverShade(primary),
    '--brand-secondary': secondary,
    '--brand-secondary-fg': readableFg(secondary),
    '--brand-accent': accent,
    '--brand-accent-fg': readableFg(accent),
    '--surface-contrast': contrast,
    '--surface-contrast-fg': readableFg(contrast),
    '--radius': radius,
    ...(preset.neutrals ?? {}),
  };

  // Template display font (unless the client overrides fonts explicitly).
  if (preset.display) vars['--font-display'] = preset.display;
  if (brand.fonts?.display?.trim()) vars['--font-display'] = brand.fonts.display.trim();
  if (brand.fonts?.body?.trim()) vars['--font-body'] = brand.fonts.body.trim();

  const css = `:root{${Object.entries(vars)
    .map(([k, v]) => `${k}:${v};`)
    .join('')}}`;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
