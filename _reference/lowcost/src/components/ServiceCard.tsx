import { Link } from 'react-router-dom';
import { ImageSlot } from '@ledge/ui';
import type { Service } from '@/data/content';

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-surface shadow-soft transition-shadow hover:shadow-lift"
    >
      <ImageSlot
        image={service.image}
        ratio="4/3"
        rounded={false}
        imgClassName="transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg">{service.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.tagline}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-bold text-brand">{service.priceRange}</span>
          <span className="text-sm font-medium text-muted transition-colors group-hover:text-brand">
            Learn more →
          </span>
        </div>
      </div>
    </Link>
  );
}
