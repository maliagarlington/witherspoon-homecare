import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { CheckCircleIcon, PhoneIcon } from "@/components/icons";
import { about, business } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Family-Owned Home Care Across 8 NC Counties",
  description:
    "Witherspoon Home Care is a family-owned home care agency serving Forsyth, Guilford, Davie, Davidson, Surry, Stokes, Rockingham, and Yadkin Counties, NC. Learn about our story, our mission, and how we screen every caregiver.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-brand-pink-tint py-14 sm:py-20">
        <Container className="max-w-3xl text-center">
          <h1 className="font-heading text-4xl font-extrabold text-brand-ink sm:text-5xl">
            About Our North Carolina Home Care Agency
          </h1>
          <p className="mt-6 text-xl text-brand-ink">{about.intro}</p>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container className="max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-extrabold text-brand-ink">
            Our Story
          </h2>
          <p className="mx-auto mt-4 rounded-2xl border-2 border-dashed border-brand-pink-tint-2 bg-brand-pink-tint p-6 text-lg text-brand-slate">
            {about.founderStoryPlaceholder}
          </p>
        </Container>
      </section>

      <section className="bg-brand-pink-tint py-16 sm:py-20">
        <Container className="max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-extrabold text-brand-ink">
            Our Mission
          </h2>
          <p className="mt-4 text-lg text-brand-ink">{about.mission}</p>
          <p className="mt-4 text-lg text-brand-ink">
            See how this plays out day to day in{" "}
            <Link
              href="/services"
              className="font-bold text-brand-pink-deep underline underline-offset-4"
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
            <h2 className="font-heading text-3xl font-extrabold text-brand-ink">
              How We Choose Our Caregivers
            </h2>
            <p className="mt-4 text-lg text-brand-slate">
              Families trust us with the people they love most, so we take
              hiring seriously.
            </p>
          </div>
          <ul className="mt-6 flex flex-col gap-4">
            {about.hiringProcess.map((step) => (
              <li key={step} className="flex gap-3">
                <CheckCircleIcon className="mt-0.5 h-6 w-6 shrink-0 text-brand-pink-deep" />
                <span className="text-lg text-brand-ink">{step}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-base text-brand-slate">{about.hiringNote}</p>
        </Container>
      </section>

      <section className="bg-brand-pink-tint py-16 sm:py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-3xl font-extrabold text-brand-ink sm:text-4xl">
            Have Questions About Our Team?
          </h2>
          <Button
            href={business.phoneHref}
            variant="gold"
            icon={<PhoneIcon className="h-5 w-5" />}
          >
            Call {business.phone}
          </Button>
        </Container>
      </section>
    </>
  );
}
