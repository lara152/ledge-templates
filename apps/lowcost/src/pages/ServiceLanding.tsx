import { Link, useParams } from 'react-router-dom';
import { Container, Gallery, Section } from '@ledge/ui';
import { services } from '@/data/content';
import { PhoneButton } from '@/components/PhoneButton';
import { QuickEstimateForm } from '@/components/QuickEstimateForm';

export default function ServiceLanding() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <Container>
        <div className="py-24">
          <h1 className="text-3xl">Service not found</h1>
          <Link to="/services" className="mt-4 inline-block font-semibold text-brand hover:underline">
            ← See all services
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <>
      <section className="border-b border-line bg-surface-2">
        <Container>
          <div className="grid gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow mb-3">Service</p>
              <h1 className="text-4xl sm:text-5xl">{service.name}</h1>
              <p className="mt-4 text-lg text-muted">{service.tagline}</p>
              <p className="mt-6 text-2xl font-extrabold text-brand">{service.priceRange}</p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {service.includes.map((i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-xs text-brand-fg">
                      ✓
                    </span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <PhoneButton variant="solid" />
                <span className="text-sm text-muted">or get a free estimate →</span>
              </div>
            </div>

            <div className="lg:pl-6">
              <QuickEstimateForm title={`Free ${service.name.toLowerCase()} estimate`} />
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <h2 className="text-2xl sm:text-3xl">Recent {service.name.toLowerCase()}</h2>
          <p className="mt-2 text-muted">Real jobs, real yards — never stock photos.</p>
          <div className="mt-8">
            <Gallery images={service.gallery} columns={3} ratio="4/3" />
          </div>
        </Container>
      </Section>
    </>
  );
}
