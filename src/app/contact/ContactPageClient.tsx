"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import { Container } from "@/components/Container";
import { InquiryForm } from "@/components/InquiryForm";
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from "@/components/icons";
import { toPhoneHref } from "@/lib/phone";
import type { ContactQuery, SettingsQuery } from "@tina/__generated__/types";

export function ContactPageClient(props: {
  query: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables: any;
  data: ContactQuery;
  settings: SettingsQuery["settings"];
}) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  const page = data.contact;
  const { settings } = props;
  const phoneHref = toPhoneHref(settings.phone ?? "");

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
            {page.pageIntro}
          </p>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div className="flex flex-col gap-8">
            <a
              href={phoneHref}
              className="flex min-h-[44px] items-start gap-3 text-lg font-semibold text-brand-ink hover:text-brand-pink-deep"
            >
              <PhoneIcon className="mt-0.5 h-6 w-6 shrink-0 text-brand-pink-deep" />
              <span>
                <span className="block font-heading font-bold">Phone</span>
                {settings.phone}
              </span>
            </a>

            <a
              href={`mailto:${settings.email}`}
              className="flex min-h-[44px] items-start gap-3 break-all text-lg font-semibold text-brand-ink hover:text-brand-pink-deep"
            >
              <MailIcon className="mt-0.5 h-6 w-6 shrink-0 text-brand-pink-deep" />
              <span>
                <span className="block font-heading font-bold">Email</span>
                {settings.email}
              </span>
            </a>

            <div className="flex items-start gap-3 text-lg font-semibold text-brand-ink">
              <MapPinIcon className="mt-0.5 h-6 w-6 shrink-0 text-brand-pink-deep" />
              <span>
                <span className="block font-heading font-bold">Service Area</span>
                <span data-tina-field={tinaField(page, "serviceAreaText")}>
                  {page.serviceAreaText}
                </span>
              </span>
            </div>

            <div className="flex items-start gap-3 text-lg font-semibold text-brand-ink">
              <ClockIcon className="mt-0.5 h-6 w-6 shrink-0 text-brand-pink-deep" />
              <span>
                <span className="block font-heading font-bold">Hours</span>
                <span data-tina-field={tinaField(page, "hoursText")}>
                  {page.hoursText}
                </span>
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-brand-pink-tint-2 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-heading text-2xl font-bold text-brand-ink">
              Send Us a Message
            </h2>
            <div className="mt-6">
              <InquiryForm
                submitLabel="Send Message"
                phone={settings.phone ?? ""}
                email={settings.email ?? ""}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
