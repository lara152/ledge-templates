import { Gallery } from '@/components/Gallery';
import { GreenLeafPhoneButton } from './GreenLeafPhoneButton';
import { GreenLeafQuickForm } from './GreenLeafQuickForm';
import type { Service } from '@/lib/types';

export function GreenLeafServiceLanding({ service }: { service: Service }) {
  return (
    <>
      <section className="border-b border-line bg-surface-sunken">
        <div className="container-page grid gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow mb-3">Service</p>
            <h1 className="text-4xl sm:text-5xl">{service.name}</h1>
            {service.description ? <p className="mt-4 text-lg text-ink-muted">{service.description}</p> : null}
            {service.priceInfo ? (
              <p className="mt-6 text-2xl font-extrabold text-primary">{service.priceInfo}</p>
            ) : null}
            {service.includes?.length ? (
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {service.includes.map((i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-xs text-primary-fg">
                      ✓
                    </span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <GreenLeafPhoneButton variant="solid" />
              <span className="text-sm text-ink-muted">or get a free estimate →</span>
            </div>
          </div>
          <div className="lg:pl-6">
            <GreenLeafQuickForm title={`Free ${service.name.toLowerCase()} estimate`} />
          </div>
        </div>
      </section>

      {service.gallery?.length ? (
        <section className="section">
          <div className="container-page">
            <h2 className="text-2xl sm:text-3xl">Recent {service.name.toLowerCase()}</h2>
            <p className="mt-2 text-ink-muted">Real jobs, real yards — never stock photos.</p>
            <div className="mt-8">
              <Gallery items={service.gallery} columns={3} ratio="4/3" />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
