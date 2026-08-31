"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { ServiceCard } from "@/components/ServiceCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { PhoneIcon } from "@/components/icons";
import { faq } from "@/content/faq";
import { toPhoneHref } from "@/lib/phone";
import type { ServicesQuery, SettingsQuery } from "@tina/__generated__/types";

export function ServicesPageClient(props: {
  query: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables: any;
  data: ServicesQuery;
  settings: SettingsQuery["settings"];
}) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  const page = data.services;
  const { settings } = props;
  const phoneHref = toPhoneHref(settings.phone ?? "");
  const serviceList = (page.services ?? []).filter(
    (s): s is NonNullable<typeof s> => s !== null,
  );

  return (
    <>
      <section className="bg-brand-pink-tint py-14 sm:py-20">
        <Container className="max-w-3xl text-center">
          <h1
            data-tina-field={tinaField(page, "pageHeading")}
            className="font-heading text-4xl font-extrabold text-brand-ink sm:text-5xl"
          >
            {page.pageHeading}
          </h1>
          <p
            data-tina-field={tinaField(page, "pageIntro")}
            className="mt-6 text-xl text-brand-ink"
          >
            {page.pageIntro}{" "}
            <Link href="/about" className="font-bold underline underline-offset-4">
              Learn more about our family-owned North Carolina home care team.
            </Link>
          </p>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          {/* flex-wrap + justify-center (rather than CSS grid) so the cards
              stay centered as a group at every width, including a shorter
              final row when the item count doesn't evenly divide into full
              rows. Grid would left-align that leftover card instead of
              centering it. */}
          <div className="flex flex-wrap justify-center gap-6">
            {serviceList.map((service, index) => (
              <ServiceCard
                key={`${service.title}-${index}`}
                service={service}
                className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                fieldAttrs={tinaField(service)}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-pink-deep py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="text-center font-heading text-3xl font-extrabold text-white">
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
          <p
            data-tina-field={tinaField(page, "ctaText")}
            className="max-w-xl text-lg text-brand-slate"
          >
            {page.ctaText}
          </p>
          <Button href={phoneHref} variant="gold" icon={<PhoneIcon className="h-5 w-5" />}>
            Call {settings.phone}
          </Button>
        </Container>
      </section>
    </>
  );
}
