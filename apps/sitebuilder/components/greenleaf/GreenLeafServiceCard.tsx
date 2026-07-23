import Link from 'next/link';
import { ImageSlot } from '@/components/ImageSlot';
import type { Service } from '@/lib/types';

export function GreenLeafServiceCard({ service }: { service: Service }) {
  const href = service.slug ? `/services/${service.slug}/` : '/contact/';
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-surface shadow-soft transition-shadow hover:shadow-lift"
    >
      <ImageSlot
        src={service.image}
        alt={service.name}
        ratio="4/3"
        rounded={false}
        imgClassName="transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg">{service.name}</h3>
        {service.description ? (
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{service.description}</p>
        ) : null}
        <div className="mt-4 flex items-center justify-between">
          {service.priceInfo ? <span className="text-sm font-bold text-primary">{service.priceInfo}</span> : <span />}
          <span className="text-sm font-medium text-ink-muted transition-colors group-hover:text-primary">
            Learn more →
          </span>
        </div>
      </div>
    </Link>
  );
}
