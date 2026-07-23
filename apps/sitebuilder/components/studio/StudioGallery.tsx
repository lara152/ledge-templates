import { galleryItems } from '@/lib/site';
import { config } from '@/lib/config';

/**
 * Portfolio grid — the image-forward showcase. Each item is a photo with an optional
 * title + location captioned over a soft gradient. Renders nothing without images.
 */
export function StudioGallery() {
  const items = galleryItems();
  if (items.length === 0) return null;

  const heading = config.gallery?.heading?.trim() || 'Recent work';
  const subhead = config.gallery?.subhead?.trim();

  return (
    <section id="portfolio" className="section scroll-mt-24" style={{ backgroundColor: 'var(--surface-sunken)' }}>
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Portfolio</p>
          <h2 className="text-3xl sm:text-4xl">{heading}</h2>
          {subhead ? <p className="mt-4 text-lg leading-relaxed text-ink-muted">{subhead}</p> : null}
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li
              key={`${item.image}-${i}`}
              className="group relative overflow-hidden rounded-card border border-[var(--line)] shadow-soft"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.alt?.trim() || item.title?.trim() || 'Project photo'}
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
              {item.title?.trim() || item.location?.trim() ? (
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 p-5"
                  style={{ background: 'linear-gradient(0deg, rgba(20,28,22,0.72) 0%, rgba(20,28,22,0) 100%)' }}
                >
                  {item.title?.trim() ? (
                    <p className="font-display text-lg font-medium text-white">{item.title.trim()}</p>
                  ) : null}
                  {item.location?.trim() ? (
                    <p className="text-sm text-white/80">{item.location.trim()}</p>
                  ) : null}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
