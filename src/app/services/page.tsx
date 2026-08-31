import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { ServiceCard } from "@/components/ServiceCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { PhoneIcon } from "@/components/icons";
import { business } from "@/content/site-content";
import { services } from "@/content/services";
import { faq } from "@/content/faq";
import { faqSchema, jsonLdScript } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Home Care Services Across 8 NC Counties",
  description:
    "Companion care, medication reminders, meal prep, rehab support, errands, and light housekeeping for seniors across Forsyth, Guilford, Davie, Davidson, Surry, Stokes, Rockingham, and Yadkin Counties, NC, from Witherspoon Home Care.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-brand-pink-tint py-14 sm:py-20">
        <Container className="max-w-3xl text-center">
          <h1 className="font-heading text-4xl font-extrabold text-brand-ink sm:text-5xl">
            Non-Medical Home Care Services Across North Carolina
          </h1>
          <p className="mt-6 text-xl text-brand-ink">
            We provide non-medical in-home senior care and companion care
            throughout {business.serviceArea}, including Winston-Salem,
            helping your loved one stay safe, comfortable, and independent at
            home. Learn more about{" "}
            <Link href="/about" className="font-bold underline underline-offset-4">
              our family-owned North Carolina home care team
            </Link>
            .
          </p>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          {/* flex-wrap + justify-center (rather than CSS grid) so the cards
              stay centered as a group at every width, including a shorter
              final row when the item count doesn't evenly divide into full
              rows, e.g. 7 cards at 2 or 3 per row leaves 1 left over. Grid
              would left-align that leftover card instead of centering it. */}
          <div className="flex flex-wrap justify-center gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                service={service}
                className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-pink-tint py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="text-center font-heading text-3xl font-extrabold text-brand-ink">
            Frequently Asked Questions
          </h2>
          <div className="mt-8">
            <FAQAccordion items={faq} />
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-3xl font-extrabold text-brand-ink sm:text-4xl">
            Not Sure Which Service Fits Your Family?
          </h2>
          <p className="max-w-xl text-lg text-brand-slate">
            Call us and we&rsquo;ll help you figure out the right plan of
            support.
          </p>
          <Button
            href={business.phoneHref}
            variant="gold"
            icon={<PhoneIcon className="h-5 w-5" />}
          >
            Call {business.phone}
          </Button>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqSchema(faq))}
      />
    </>
  );
}
