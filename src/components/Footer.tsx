import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { PhoneIcon, MailIcon, MapPinIcon } from "./icons";
import { nav } from "@/content/site-content";
import { toPhoneHref } from "@/lib/phone";
import type { SettingsQuery } from "@tina/__generated__/types";

export function Footer({ settings }: { settings: SettingsQuery["settings"] }) {
  const phoneHref = toPhoneHref(settings.phone ?? "");
  const counties = (settings.serviceCounties ?? []).filter(
    (c): c is string => !!c,
  );

  return (
    <footer className="mt-20 border-t border-brand-pink-tint-2 bg-brand-pink-tint pb-24 pt-12 lg:pb-12">
      <Container className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col items-center text-center">
          <Logo size="large" imageSrc={settings.logoImage} />
          <p className="mt-4 max-w-xs text-base text-brand-slate">
            {settings.tagline}
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2">
          <h2 className="mb-1 font-heading text-lg font-bold text-brand-ink">
            Explore
          </h2>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="min-h-[44px] py-1.5 text-base font-medium text-brand-ink underline decoration-brand-pink-tint-2 underline-offset-4 hover:decoration-brand-pink-deep"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <h2 className="mb-1 font-heading text-lg font-bold text-brand-ink">
            Contact
          </h2>
          <a
            href={phoneHref}
            className="flex min-h-[44px] items-center gap-2 text-base font-medium text-brand-ink hover:text-brand-pink-deep"
          >
            <PhoneIcon className="h-5 w-5 shrink-0 text-brand-pink-deep" />
            {settings.phone}
          </a>
          <a
            href={`mailto:${settings.email}`}
            className="flex min-h-[44px] items-center gap-2 break-all text-base font-medium text-brand-ink hover:text-brand-pink-deep"
          >
            <MailIcon className="h-5 w-5 shrink-0 text-brand-pink-deep" />
            {settings.email}
          </a>
          {/* Counties served: a small label + a wrapped, dot-separated
              list rather than one long comma sentence, so it scans at a
              glance instead of reading as another paragraph. Kept visually
              quiet (small label, text-sm list) so it doesn't compete with
              the logo or the phone/email above it. */}
          <div className="flex items-start gap-2">
            <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-pink-deep" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-brand-pink-deep">
                Proudly Serving
              </p>
              <p className="mt-1 flex flex-wrap gap-x-1.5 gap-y-1 text-sm font-medium text-brand-ink">
                {counties.map((county, index) => (
                  <span key={county} className="inline-flex items-center gap-1.5">
                    {county}
                    {index < counties.length - 1 && (
                      <span aria-hidden="true" className="text-brand-pink-deep">
                        &middot;
                      </span>
                    )}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </Container>

      <Container className="mt-10 border-t border-brand-pink-tint-2 pt-6">
        <p className="text-sm text-brand-slate">
          &copy; {new Date().getFullYear()} {settings.businessName}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
