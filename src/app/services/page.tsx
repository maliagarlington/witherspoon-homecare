import type { Metadata } from "next";
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
  title: "Our Home Care Services in Forsyth County, NC",
  description:
    "Companion care, medication reminders, meal prep, rehab support, errands, and light housekeeping for seniors in Forsyth County, NC — from Witherspoon Home Care.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-brand-pink-tint py-14 sm:py-20">
        <Container className="max-w-3xl">
          <h1 className="font-heading text-4xl font-extrabold text-brand-ink sm:text-5xl">
            Our Home Health Support Services
          </h1>
          <p className="mt-6 text-xl text-brand-ink">
            We provide non-medical in-home care throughout {business.serviceArea}
            {" "}— helping your loved one stay safe, comfortable, and independent
            at home.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-pink-tint py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-heading text-3xl font-extrabold text-brand-ink">
            Frequently Asked Questions
          </h2>
          <div className="mt-8">
            <FAQAccordion items={faq} />
          </div>
        </Container>
      </section>

      <section className="bg-brand-plum py-16 sm:py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
            Not Sure Which Service Fits Your Family?
          </h2>
          <p className="max-w-xl text-lg text-white/85">
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
