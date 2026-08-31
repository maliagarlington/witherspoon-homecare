"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { ServiceCard } from "@/components/ServiceCard";
import { VideoHero } from "@/components/VideoHero";
import { ServiceAreaBand } from "@/components/ServiceAreaBand";
import { PhoneIcon, CheckCircleIcon } from "@/components/icons";
import { toPhoneHref } from "@/lib/phone";
import type { HomeQuery, SettingsQuery, ServicesQuery } from "@tina/__generated__/types";

type HighlightService = NonNullable<
  NonNullable<ServicesQuery["services"]["services"]>[number]
>;

export function HomePageClient(props: {
  homeQuery: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  homeVariables: any;
  homeData: HomeQuery;
  settings: SettingsQuery["settings"];
  highlightServices: HighlightService[];
}) {
  const { data } = useTina({
    query: props.homeQuery,
    variables: props.homeVariables,
    data: props.homeData,
  });
  const home = data.home;
  const { settings, highlightServices } = props;
  const phoneHref = toPhoneHref(settings.phone ?? "");

  return (
    <>
      <VideoHero
        headline={home.heroHeadline ?? ""}
        headlineAccent={home.heroHeadlineAccent ?? ""}
        subheadline={home.heroSubheadline ?? ""}
        buttonText={home.heroButtonText ?? "Schedule a Free Consultation"}
        videoUrl={home.heroVideoUrl}
        posterUrl={home.heroPoster ?? "/images/hero-poster.jpg"}
        posterAlt="A caregiver sharing a warm moment with a senior client and her family at home"
        fieldAttrs={{
          headline: tinaField(home, "heroHeadline"),
          subheadline: tinaField(home, "heroSubheadline"),
          buttonText: tinaField(home, "heroButtonText"),
          poster: tinaField(home, "heroPoster"),
        }}
      />

      <ServiceAreaBand
        heading={home.areasHeading ?? ""}
        description={home.areasDescription ?? ""}
        primaryCity={settings.primaryCity ?? ""}
        counties={(settings.serviceCounties ?? []).filter(
          (c): c is string => !!c,
        )}
        fieldAttrs={{
          heading: tinaField(home, "areasHeading"),
          description: tinaField(home, "areasDescription"),
        }}
      />

      <section className="bg-brand-pink-deep py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              data-tina-field={tinaField(home, "whyChooseHeading")}
              className="font-heading text-3xl font-extrabold text-white sm:text-4xl"
            >
              {home.whyChooseHeading}
            </h2>
          </div>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
            {(home.whyChooseReasons ?? []).map((item, index) =>
              item ? (
                <li
                  key={`${item.title}-${index}`}
                  data-tina-field={tinaField(item)}
                  className="flex gap-3 rounded-2xl border border-brand-pink-tint-2 bg-white p-6 shadow-sm"
                >
                  <CheckCircleIcon className="mt-0.5 h-6 w-6 shrink-0 text-brand-pink-deep" />
                  <span className="text-brand-ink">
                    <span className="font-bold">{item.title}.</span>{" "}
                    <span className="text-brand-slate">{item.description}</span>
                  </span>
                </li>
              ) : null,
            )}
          </ul>
        </Container>
      </section>

      <section aria-label="Trust signals" className="border-y border-brand-pink-tint-2 bg-white py-8">
        <Container className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-center">
          <p className="font-heading text-lg font-bold text-brand-ink">
            Family-Owned &amp; Operated
          </p>
          <p className="font-heading text-lg font-bold text-brand-ink">
            Personalized One-on-One Care
          </p>
          <p className="font-heading text-lg font-bold text-brand-ink">
            Serving {(settings.serviceCounties ?? []).length} NC Counties
          </p>
        </Container>
      </section>

      <section className="bg-brand-pink-tint py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              data-tina-field={tinaField(home, "howWeHelpIntro")}
              className="font-heading text-3xl font-extrabold text-brand-ink sm:text-4xl"
            >
              How We Help
            </h2>
            <p className="mt-3 text-lg text-brand-slate">
              {home.howWeHelpIntro} See{" "}
              <Link
                href="/services"
                className="font-bold text-brand-pink-deep underline underline-offset-4"
              >
                our full list of home care services across North Carolina
              </Link>
              , or read about{" "}
              <Link
                href="/about"
                className="font-bold text-brand-pink-deep underline underline-offset-4"
              >
                our family-owned home care agency
              </Link>
              .
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlightServices.map((service) => (
              <ServiceCard key={service.title} service={service} compact />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/services" variant="secondary">
              See All Services
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-extrabold text-brand-ink sm:text-4xl">
            Hear From Families We&rsquo;ve Helped
          </h2>
          <p
            data-tina-field={tinaField(home, "testimonialsTeaser")}
            className="mt-4 text-lg text-brand-slate"
          >
            {home.testimonialsTeaser}
          </p>
          <div className="mt-6">
            <Link
              href="/testimonials"
              className="text-lg font-bold text-brand-pink-deep underline underline-offset-4"
            >
              Visit our Testimonials page
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-brand-pink-tint py-16 sm:py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2
            data-tina-field={tinaField(home, "finalCtaHeading")}
            className="font-heading text-3xl font-extrabold text-brand-ink sm:text-4xl"
          >
            {home.finalCtaHeading}
          </h2>
          <p
            data-tina-field={tinaField(home, "finalCtaText")}
            className="max-w-xl text-lg text-brand-slate"
          >
            {home.finalCtaText}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href="/contact" variant="gold">
              Request a Consultation
            </Button>
            <Button href={phoneHref} variant="secondary" icon={<PhoneIcon className="h-5 w-5" />}>
              Call {settings.phone}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
