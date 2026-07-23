import { GreenLeafPageHeader } from './GreenLeafPageHeader';
import { GreenLeafServiceCard } from './GreenLeafServiceCard';
import { services } from '@/lib/site';

export function GreenLeafServices() {
  const svc = services();
  return (
    <>
      <GreenLeafPageHeader
        eyebrow="Services"
        title="Everything to keep your yard great"
        intro="From weekly mowing to full installs — clear pricing and a free estimate on any of it."
      />
      <section className="section">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {svc.map((s) => (
              <GreenLeafServiceCard key={s.slug || s.name} service={s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
