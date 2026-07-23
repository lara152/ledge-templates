import { Container } from '@ledge/ui';
import { site, telHref, urgency } from '@/data/content';

/** Franja de urgencia arriba del todo (scrollea; el Nav queda sticky debajo). */
export function UrgencyBar() {
  return (
    <div className="bg-brand text-brand-fg">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 py-2 text-center text-sm">
          <span>{urgency.banner}</span>
          <a href={telHref} className="font-semibold underline underline-offset-2">
            Call {site.phone}
          </a>
        </div>
      </Container>
    </div>
  );
}
