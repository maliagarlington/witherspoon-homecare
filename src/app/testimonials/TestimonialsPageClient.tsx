"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { TestimonialCard } from "@/components/TestimonialCard";
import { PhoneIcon } from "@/components/icons";
import { toPhoneHref } from "@/lib/phone";
import type { TestimonialsQuery, SettingsQuery } from "@tina/__generated__/types";

export function TestimonialsPageClient(props: {
  query: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables: any;
  data: TestimonialsQuery;
  settings: SettingsQuery["settings"];
}) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  const page = data.testimonials;
  const { settings } = props;
  const phoneHref = toPhoneHref(settings.phone ?? "");
  const list = (page.testimonials ?? []).filter(
    (t): t is NonNullable<typeof t> => t !== null,
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
            {page.pageIntro}
          </p>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          {list.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((t, index) => (
                <TestimonialCard
                  key={`${t.author}-${index}`}
                  quote={t.quote ?? ""}
                  author={t.author ?? ""}
                  fieldAttrs={tinaField(t)}
                />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-2xl rounded-2xl border-2 border-dashed border-brand-pink-tint-2 bg-brand-pink-tint p-8 text-center">
              <h2 className="font-heading text-2xl font-bold text-brand-ink">
                We&rsquo;re Collecting Our First Family Stories
              </h2>
              <p className="mt-4 text-lg text-brand-slate">
                Testimonials from the families we serve will be posted here
                soon. In the meantime, give us a call. We&rsquo;re happy to
                talk through our approach directly, or connect you with a
                reference.
              </p>
              <div className="mt-6 flex justify-center">
                <Button href={phoneHref} icon={<PhoneIcon className="h-5 w-5" />}>
                  Call {settings.phone}
                </Button>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
