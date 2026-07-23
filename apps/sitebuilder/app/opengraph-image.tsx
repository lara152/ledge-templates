import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { config } from '@/lib/config';
import { brand, siteHost } from '@/lib/site';

/**
 * Branded Open Graph / Twitter share image, generated at build time from
 * site.config.json. Fully config-driven: business name, tagline, host, and brand
 * colors all come from config. Shipped as a single static PNG in the export.
 */
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${config.business.name}${config.business.tagline ? ` — ${config.business.tagline}` : ''}`;
// Force static generation so it exports cleanly (no request-time data).
export const dynamic = 'force-static';

const DEFAULTS = { primary: '#1B4D89', secondary: '#0F1B2D', accent: '#E8B04B' };

export default async function OpengraphImage() {
  const fontData = readFileSync(join(process.cwd(), 'assets', 'og-display.woff'));
  const primary = brand.colors?.primary?.trim() || DEFAULTS.primary;
  const secondary = brand.colors?.secondary?.trim() || DEFAULTS.secondary;
  const accent = brand.colors?.accent?.trim() || DEFAULTS.accent;

  const name = config.business.name;
  const tagline = config.business.tagline?.trim() || config.business.oneLineDescription?.trim() || '';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: `linear-gradient(135deg, ${secondary} 0%, ${primary} 160%)`,
          color: '#ffffff',
          fontFamily: 'Display',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '5px',
              background: accent,
            }}
          />
          <div style={{ fontSize: '26px', letterSpacing: '0.08em', opacity: 0.82 }}>
            {siteHost().toUpperCase()}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: name.length > 26 ? '76px' : '92px', lineHeight: 1.02, letterSpacing: '-0.03em' }}>
            {name}
          </div>
          {tagline ? (
            <div style={{ marginTop: '28px', fontSize: '34px', lineHeight: 1.25, opacity: 0.86, maxWidth: '900px' }}>
              {tagline}
            </div>
          ) : null}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '24px', opacity: 0.72 }}>
          <div style={{ width: '40px', height: '3px', background: accent }} />
          <div>{config.contact?.serviceArea?.trim() || 'Trusted local service'}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Display', data: fontData, weight: 600, style: 'normal' }],
    },
  );
}
