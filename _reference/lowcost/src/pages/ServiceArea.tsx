import { Link, useParams } from 'react-router-dom';
import { Container, Section } from '@ledge/ui';
import { areas, services } from '@/data/content';
import { PageHeader } from '@/components/PageHeader';
import { QuickEstimateForm } from '@/components/QuickEstimateForm';
import { ServiceCard } from '@/components/ServiceCard';

export default function ServiceArea() {
  const { slug } = useParams();
  const area = areas.find((a) => a.slug === slug);

  if (!area) {
    return (
      <Container>
        <div className="py-24">
          <h1 className="text-3xl">Area not found</h1>
          <Link to="/areas" className="mt-4 inline-block font-semibold text-brand hover:underline">
            ← See all areas
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={`Serving ${area.city}`}
        title={`Lawn care & landscaping in ${area.city}, TX`}
        intro={area.blurb}
      />
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div>
              <h2 className="text-2xl">Neighborhoods we serve in {area.city}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {area.neighborhoods.map((n) => (
                  <li key={n} className="rounded-pill border border-line px-3 py-1 text-sm text-muted">
                    {n}
                  </li>
                ))}
              </ul>

              <h2 className="mt-12 text-2xl">Popular services in {area.city}</h2>
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                {services.slice(0, 4).map((s) => (
                  <ServiceCard key={s.slug} service={s} />
                ))}
              </div>
            </div>

            <div className="lg:pt-1">
              <QuickEstimateForm title={`Free estimate in ${area.city}`} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
