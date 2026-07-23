import { Container, Section } from '@ledge/ui';
import { site } from '@/data/content';
import { PageHeader } from '@/components/PageHeader';
import { QuickEstimateForm } from '@/components/QuickEstimateForm';
import { PhoneButton } from '@/components/PhoneButton';

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get your free estimate"
        intro="Call us or send the short form — we reply within one business day."
      />
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-lg">The fastest way is to call — we actually pick up.</p>
              <div className="mt-5">
                <PhoneButton variant="solid" />
              </div>
              <ul className="mt-8 space-y-3 text-muted">
                <li>
                  Email:{' '}
                  <a href={`mailto:${site.email}`} className="font-medium text-brand hover:underline">
                    {site.email}
                  </a>
                </li>
                <li>Hours: {site.hours}</li>
                <li>Serving: {site.serviceAreaShort}</li>
              </ul>
            </div>

            <div>
              <QuickEstimateForm title="Request your free estimate" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
