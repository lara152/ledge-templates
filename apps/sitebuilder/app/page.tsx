import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Proof } from '@/components/Proof';
import { Faq } from '@/components/Faq';
import { ContactBand } from '@/components/ContactBand';
import { JsonLd } from '@/components/JsonLd';
import { StudioHero } from '@/components/studio/StudioHero';
import { StudioIntro } from '@/components/studio/StudioIntro';
import { StudioServices } from '@/components/studio/StudioServices';
import { StudioProcess } from '@/components/studio/StudioProcess';
import { StudioGallery } from '@/components/studio/StudioGallery';
import { StudioTestimonials } from '@/components/studio/StudioTestimonials';
import { StudioCta } from '@/components/studio/StudioCta';
import { MeridianHome } from '@/components/meridian/MeridianHome';
import { GreenLeafHome } from '@/components/greenleaf/GreenLeafHome';
import { faqSchema, serviceSchemas } from '@/lib/schema';
import { business, contact, template } from '@/lib/site';

export default function HomePage() {
  const area = contact.serviceArea?.trim();

  if (template === 'meridian') {
    return (
      <>
        <JsonLd data={[...serviceSchemas(), faqSchema()]} />
        <MeridianHome />
      </>
    );
  }

  if (template === 'greenleaf') {
    return (
      <>
        <JsonLd data={[...serviceSchemas(), faqSchema()]} />
        <GreenLeafHome />
      </>
    );
  }

  if (template === 'studio') {
    return (
      <>
        <JsonLd data={[...serviceSchemas(), faqSchema()]} />
        <StudioHero />
        <StudioIntro />
        <StudioServices
          title="Design & build services"
          intro={
            area
              ? `From first sketch to installed garden across ${area}.`
              : 'From first sketch to installed garden.'
          }
        />
        <StudioProcess />
        <StudioGallery />
        <StudioTestimonials />
        <Faq />
        <StudioCta />
      </>
    );
  }

  return (
    <>
      <JsonLd data={[...serviceSchemas(), faqSchema()]} />
      <Hero />
      <Services
        title="How we help"
        intro={
          area
            ? `The services ${business.name} provides across ${area} — clear scope, honest pricing.`
            : `The services ${business.name} provides — clear scope, honest pricing.`
        }
        variant="overview"
      />
      <Proof />
      <Faq />
      <ContactBand />
    </>
  );
}
