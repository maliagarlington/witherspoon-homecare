import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { PhoneIcon, MailIcon, MapPinIcon } from "./icons";
import { business, nav } from "@/content/site-content";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-brand-pink-tint-2 bg-brand-pink-tint pb-24 pt-12 lg:pb-12">
      <Container className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-base text-brand-slate">
            {business.tagline}
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
            href={business.phoneHref}
            className="flex min-h-[44px] items-center gap-2 text-base font-medium text-brand-ink hover:text-brand-pink-deep"
          >
            <PhoneIcon className="h-5 w-5 shrink-0 text-brand-pink-deep" />
            {business.phone}
          </a>
          <a
            href={`mailto:${business.email}`}
            className="flex min-h-[44px] items-center gap-2 break-all text-base font-medium text-brand-ink hover:text-brand-pink-deep"
          >
            <MailIcon className="h-5 w-5 shrink-0 text-brand-pink-deep" />
            {business.email}
          </a>
          <p className="flex items-center gap-2 text-base font-medium text-brand-ink">
            <MapPinIcon className="h-5 w-5 shrink-0 text-brand-pink-deep" />
            Serving {business.serviceArea}
          </p>
        </div>
      </Container>

      <Container className="mt-10 border-t border-brand-pink-tint-2 pt-6">
        <p className="text-sm text-brand-slate">
          &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
