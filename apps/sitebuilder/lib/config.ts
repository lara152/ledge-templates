import rawConfig from '@/site.config.json';
import type { SiteConfig } from './types';

/**
 * The single source of truth for the whole site. Imported statically so it is
 * baked into the static export at build time. Everything the site renders —
 * copy, nav, theme tokens, SEO tags, JSON-LD, llms.txt — derives from here.
 *
 * Structural validity is enforced by scripts/validate-config.cjs, which runs in
 * next.config.js at the top of every build.
 */
export const config = rawConfig as SiteConfig;
