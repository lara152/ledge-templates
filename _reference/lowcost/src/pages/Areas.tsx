import { Link } from 'react-router-dom';
import { Container, Section } from '@ledge/ui';
import { areas } from '@/data/content';
import { PageHeader } from '@/components/PageHeader';

export default function Areas() {
  return (
    <>
      <PageHeader
        eyebrow="Service areas"
        title="Where we work"
        intro="Lawn care and landscaping across Austin and the surrounding cities."
      />
      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <Link
                key={a.slug}
                to={`/areas/${a.slug}`}
                className="group rounded-card border border-line bg-surface p-6 shadow-soft transition-shadow hover:shadow-lift"
              >
                <h3 className="text-xl transition-colors group-hover:text-brand">{a.city}</h3>
                <p className="mt-2 text-sm text-muted">{a.blurb}</p>
                <p className="mt-4 text-sm font-semibold text-brand">View {a.city} →</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
