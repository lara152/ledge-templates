import { Link } from 'react-router-dom';
import { Container, Section, buttonClasses } from '@ledge/ui';
import { contact } from '@/data/content';

/** Banda de cierre reutilizable — "Schedule a design consultation". */
export function CtaBand() {
  return (
    <Section className="border-t border-line">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5">{contact.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl">{contact.headline}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">{contact.body}</p>
          <div className="mt-9 flex flex-col items-center gap-4">
            <Link to="/contact" className={buttonClasses('primary', 'lg')}>
              Schedule a Consultation
            </Link>
            <span className="text-sm text-muted">{contact.note}</span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
