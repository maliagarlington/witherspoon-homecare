"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import { Container } from "@/components/Container";
import { ResumeUploadForm } from "@/components/ResumeUploadForm";
import { CheckCircleIcon } from "@/components/icons";
import type { CareersQuery, SettingsQuery } from "@tina/__generated__/types";

export function CareersPageClient(props: {
  query: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables: any;
  data: CareersQuery;
  settings: SettingsQuery["settings"];
}) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  const page = data.careers;
  const { settings } = props;

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
          <div className="mx-auto max-w-2xl text-center">
            <h2
              data-tina-field={tinaField(page, "cultureHeading")}
              className="font-heading text-3xl font-extrabold text-brand-ink"
            >
              {page.cultureHeading}
            </h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {(page.cultureReasons ?? []).map((item, index) =>
              item ? (
                <div
                  key={`${item.title}-${index}`}
                  data-tina-field={tinaField(item)}
                  className="rounded-2xl border border-brand-pink-tint-2 bg-white p-6 shadow-sm"
                >
                  <CheckCircleIcon className="h-7 w-7 text-brand-pink-deep" />
                  <h3 className="mt-3 font-heading text-xl font-bold text-brand-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-brand-slate">{item.description}</p>
                </div>
              ) : null,
            )}
          </div>
          {page.openingsNote && (
            <p
              data-tina-field={tinaField(page, "openingsNote")}
              className="mt-8 text-base text-brand-slate"
            >
              {page.openingsNote}
            </p>
          )}
        </Container>
      </section>

      <section className="bg-brand-pink-tint py-16 sm:py-20">
        <Container className="max-w-2xl">
          <div className="text-center">
            <h2
              data-tina-field={tinaField(page, "applyHeading")}
              className="font-heading text-3xl font-extrabold text-brand-ink"
            >
              {page.applyHeading}
            </h2>
            <p
              data-tina-field={tinaField(page, "applyText")}
              className="mt-3 text-lg text-brand-slate"
            >
              {page.applyText} You can also call us directly at {settings.phone}.
            </p>
          </div>
          {/* No white-card wrapper needed here: the form's labels are
              text-brand-ink, which already has strong contrast directly on
              this light-pink section. */}
          <div className="mt-8">
            <ResumeUploadForm
              phone={settings.phone ?? ""}
              email={settings.email ?? ""}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
