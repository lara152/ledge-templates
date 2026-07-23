import type { Metadata } from 'next';
import { Space_Grotesk, Inter, Fraunces, Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { BrandStyle } from '@/components/BrandStyle';
import { JsonLd } from '@/components/JsonLd';
import { Header } from '@/components/Header';
import { StudioHeader } from '@/components/studio/StudioHeader';
import { MeridianHeader } from '@/components/meridian/MeridianHeader';
import { GreenLeafHeader } from '@/components/greenleaf/GreenLeafHeader';
import { GreenLeafUrgencyBar } from '@/components/greenleaf/GreenLeafUrgencyBar';
import { Footer } from '@/components/Footer';
import { MeridianFooter } from '@/components/meridian/MeridianFooter';
import { GreenLeafFooter } from '@/components/greenleaf/GreenLeafFooter';
import { business, template } from '@/lib/site';
import { siteUrl } from '@/lib/site';
import { businessSchema, websiteSchema } from '@/lib/schema';

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' });
const body = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
// Editorial serif for the image-forward "studio" template (selected in BrandStyle).
const serif = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' });
// High-contrast serif for the cinematic "meridian" look.
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});
// Friendly geometric sans for the conversion-focused "greenleaf" look.
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const defaultTitle = business.tagline?.trim()
  ? `${business.name} — ${business.tagline.trim()}`
  : business.name;
const description = business.oneLineDescription?.trim() || business.tagline?.trim() || business.name;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: defaultTitle,
    template: `%s · ${business.name}`,
  },
  description,
  applicationName: business.name,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: business.name,
    url: siteUrl(),
    title: defaultTitle,
    description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${serif.variable} ${cormorant.variable} ${jakarta.variable}`}
    >
      <body>
        <BrandStyle />
        <JsonLd data={[businessSchema(), websiteSchema()]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-[var(--brand-primary)] focus:px-4 focus:py-2 focus:text-[var(--brand-primary-fg)]"
        >
          Skip to content
        </a>
        {template === 'meridian' ? (
          <MeridianHeader />
        ) : template === 'studio' ? (
          <StudioHeader />
        ) : template === 'greenleaf' ? (
          <>
            <GreenLeafUrgencyBar />
            <GreenLeafHeader />
          </>
        ) : (
          <Header />
        )}
        <main id="main">{children}</main>
        {template === 'meridian' ? (
          <MeridianFooter />
        ) : template === 'greenleaf' ? (
          <GreenLeafFooter />
        ) : (
          <Footer />
        )}
      </body>
    </html>
  );
}
