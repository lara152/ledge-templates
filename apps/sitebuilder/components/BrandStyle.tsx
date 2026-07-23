import { brand, template } from '@/lib/site';
import { hoverShade, readableFg, softTint } from '@/lib/color';
import type { Template } from '@/lib/types';

/**
 * Injects the brand theme as CSS custom properties on :root, derived from
 * config.brand + the selected look. Per-look neutral palettes (surface/ink/line)
 * and display fonts live here so each look carries its own paper tone without
 * touching components; a client's brand.colors still override the accent hues.
 */

type Palette = {
  primary: string;
  secondary: string;
  accent: string;
  radius: string;
  /** Dark-band background (footer / CTA). Defaults to `secondary`. */
  contrast?: string;
  /** Neutral tokens; when omitted a look inherits the globals.css defaults. */
  neutrals?: Record<string, string>;
  /** Display font stack (body stays Inter unless brand.fonts overrides it). */
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
  secondary: '#1E2A22', // deep forest (dark bands)
  accent: '#BE6A45', // warm terracotta
  radius: '16px',
  contrast: '#1E2A22',
  neutrals: {
    '--ink': '#25231D',
    '--ink-muted': '#57534A',
    '--ink-subtle': '#847E71',
    '--surface': '#F7F3EA', // warm cream paper
    '--surface-raised': '#FFFDF8',
    '--surface-sunken': '#EFE8DA',
    '--line': '#E4DCCB',
  },
  display: "var(--font-fraunces), 'Georgia', serif",
};

const MERIDIAN: Palette = {
  primary: '#C9A24B', // muted gold — restrained luxury
  secondary: '#0B0B0D',
  accent: '#7D8A6A', // deep sage
  radius: '2px', // near-square = editorial
  contrast: '#17171A', // lifted charcoal for footer/CTA bands
  neutrals: {
    '--ink': '#F3EFE7', // warm ivory
    '--ink-muted': '#9A978F',
    '--ink-subtle': '#7C7A70',
    '--surface': '#101012', // charcoal page
    '--surface-raised': '#17171A',
    '--surface-sunken': '#212126',
    '--line': '#2C2C31',
  },
  display: "var(--font-cormorant), 'Georgia', serif",
};

const GREENLEAF: Palette = {
  primary: '#2F9E44', // fresh green — trust
  secondary: '#17251D',
  accent: '#F08C00', // warm amber — CTAs / urgency
  radius: '16px', // friendly, rounded
  contrast: '#17251D',
  neutrals: {
    '--ink': '#17251D', // dark green-slate
    '--ink-muted': '#56655C',
    '--ink-subtle': '#7C8A80',
    '--surface': '#FFFFFF',
    '--surface-raised': '#FFFFFF',
    '--surface-sunken': '#EEF4EE', // light green tint
    '--line': '#E0E8E2',
  },
  display: 'var(--font-jakarta), system-ui, sans-serif',
};

const PRESETS: Record<Template, Palette> = {
  classic: CLASSIC,
  studio: STUDIO,
  meridian: MERIDIAN,
  greenleaf: GREENLEAF,
};

export function BrandStyle() {
  const preset = PRESETS[template] ?? CLASSIC;

  const colors = brand.colors ?? {};
  const primary = colors.primary?.trim() || preset.primary;
  const secondary = colors.secondary?.trim() || preset.secondary;
  const accent = colors.accent?.trim() || preset.accent;
  const radius = brand.radius?.trim() || preset.radius;
  const contrast = preset.contrast ?? secondary;

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

  if (preset.display) vars['--font-display'] = preset.display;
  if (brand.fonts?.display?.trim()) vars['--font-display'] = brand.fonts.display.trim();
  if (brand.fonts?.body?.trim()) vars['--font-body'] = brand.fonts.body.trim();

  const css = `:root{${Object.entries(vars)
    .map(([k, v]) => `${k}:${v};`)
    .join('')}}`;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
