import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ResumeUploadForm } from "@/components/ResumeUploadForm";
import { CheckCircleIcon } from "@/components/icons";
import { careers, business } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Caregiver Opportunities Across 8 NC Counties",
  description:
    "Join Witherspoon Home Care as a caregiver serving Forsyth, Guilford, Davie, Davidson, Surry, Stokes, Rockingham, and Yadkin Counties, NC. We're always hiring compassionate, reliable home health aides. Apply today.",
};

export default function CareersPage() {
  return (
    <>
      <section className="bg-brand-pink-tint py-14 sm:py-20">
        <Container className="max-w-3xl text-center">
          <h1 className="font-heading text-4xl font-extrabold text-brand-ink sm:text-5xl">
            Caregiver Jobs Across North Carolina
          </h1>
          <p className="mt-6 text-xl text-brand-ink">{careers.intro}</p>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-extrabold text-brand-ink">
              Why Work With Us
            </h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {careers.culture.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-brand-pink-tint-2 bg-white p-6 shadow-sm"
              >
                <CheckCircleIcon className="h-7 w-7 text-brand-pink-deep" />
                <h3 className="mt-3 font-heading text-xl font-bold text-brand-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-brand-slate">{item.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-base text-brand-slate">{careers.openingsNote}</p>
        </Container>
      </section>

      <section className="bg-brand-pink-tint py-16 sm:py-20">
        <Container className="max-w-2xl">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-extrabold text-brand-ink">
              Apply Now
            </h2>
            <p className="mt-3 text-lg text-brand-slate">
              Fill out your details and upload your resume, and we&rsquo;ll
              be in touch. You can also call us directly at {business.phone}.
            </p>
          </div>
          {/* No white-card wrapper needed here: the form's labels are
              text-brand-ink, which already has strong contrast directly on
              this light-pink section (unlike the dark-pink version this
              replaced, which needed the extra wrapper). */}
          <div className="mt-8">
            <ResumeUploadForm />
          </div>
        </Container>
      </section>
    </>
  );
}
