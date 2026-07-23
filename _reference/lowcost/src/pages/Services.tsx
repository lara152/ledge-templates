import { Container, Section } from '@ledge/ui';
import { services } from '@/data/content';
import { PageHeader } from '@/components/PageHeader';
import { ServiceCard } from '@/components/ServiceCard';

export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything to keep your yard great"
        intro="From weekly mowing to full installs — clear pricing and a free estimate on any of it."
      />
      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
