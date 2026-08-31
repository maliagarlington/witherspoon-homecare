"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { CheckCircleIcon, PhoneIcon } from "@/components/icons";
import { toPhoneHref } from "@/lib/phone";
import type { AboutQuery, SettingsQuery } from "@tina/__generated__/types";

export function AboutPageClient(props: {
  query: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables: any;
  data: AboutQuery;
  settings: SettingsQuery["settings"];
}) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  const about = data.about;
  const { settings } = props;
  const phoneHref = toPhoneHref(settings.phone ?? "");

  return (
    <>
      <section className="bg-brand-pink-tint py-14 sm:py-20">
        <Container className="max-w-3xl text-center">
          <h1
            data-tina-field={tinaField(about, "pageHeading")}
            className="font-heading text-4xl font-extrabold text-brand-ink sm:text-5xl"
          >
            {about.pageHeading}
          </h1>
          <p
            data-tina-field={tinaField(about, "pageIntro")}
            className="mt-6 text-xl text-brand-ink"
          >
            {about.pageIntro}
          </p>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container className="max-w-3xl text-center">
          <h2
            data-tina-field={tinaField(about, "storyHeading")}
            className="font-heading text-3xl font-extrabold text-brand-ink"
          >
            {about.storyHeading}
          </h2>
          {about.founderPhoto && (
            <div
              data-tina-field={tinaField(about, "founderPhoto")}
              className="relative mx-auto mt-6 aspect-square w-40 overflow-hidden rounded-full border-4 border-brand-pink-tint-2 sm:w-48"
            >
              <Image
                src={about.founderPhoto}
                alt="Witherspoon Home Care founder"
                fill
                className="object-cover"
              />
            </div>
          )}
          <p
            data-tina-field={tinaField(about, "storyText")}
            className="mx-auto mt-4 rounded-2xl border-2 border-dashed border-brand-pink-tint-2 bg-brand-pink-tint p-6 text-lg text-brand-slate"
          >
            {about.storyText || "[Add your founder/owner story here.]"}
          </p>
        </Container>
      </section>

      <section className="bg-brand-pink-deep py-16 sm:py-20">
        <Container className="max-w-3xl text-center">
          <h2
            data-tina-field={tinaField(about, "missionHeading")}
            className="font-heading text-3xl font-extrabold text-white"
          >
            {about.missionHeading}
          </h2>
          <p
            data-tina-field={tinaField(about, "missionText")}
            className="mt-4 text-lg text-white/90"
          >
            {about.missionText}
          </p>
          <p className="mt-4 text-lg text-white/90">
            See how this plays out day to day in{" "}
            <Link
              href="/services"
              className="font-bold text-white underline underline-offset-4"
            >
              our home care services for North Carolina families
            </Link>
            .
          </p>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container className="max-w-3xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              data-tina-field={tinaField(about, "hiringHeading")}
              className="font-heading text-3xl font-extrabold text-brand-ink"
            >
              {about.hiringHeading}
            </h2>
            <p
              data-tina-field={tinaField(about, "hiringIntro")}
              className="mt-4 text-lg text-brand-slate"
            >
              {about.hiringIntro}
            </p>
          </div>
          <ul
            data-tina-field={tinaField(about, "hiringSteps")}
            className="mt-6 flex flex-col gap-4"
          >
            {(about.hiringSteps ?? []).map((step, index) =>
              step ? (
                <li key={index} className="flex gap-3">
                  <CheckCircleIcon className="mt-0.5 h-6 w-6 shrink-0 text-brand-pink-deep" />
                  <span className="text-lg text-brand-ink">{step}</span>
                </li>
              ) : null,
            )}
          </ul>
        </Container>
      </section>

      <section className="bg-brand-pink-tint py-16 sm:py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2
            data-tina-field={tinaField(about, "ctaHeading")}
            className="font-heading text-3xl font-extrabold text-brand-ink sm:text-4xl"
          >
            {about.ctaHeading}
          </h2>
          <Button href={phoneHref} variant="gold" icon={<PhoneIcon className="h-5 w-5" />}>
            Call {settings.phone}
          </Button>
        </Container>
      </section>
    </>
  );
}
