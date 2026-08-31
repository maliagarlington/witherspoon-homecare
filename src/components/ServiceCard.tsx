import Link from "next/link";
import { CheckCircleIcon } from "./icons";

export interface ServiceCardData {
  title?: string | null;
  tagline?: string | null;
  description?: string | null;
}

// Anchor slugs used to be a hand-maintained field on each service. Now
// that services are a Tina list an editor can freely add/remove/reorder,
// deriving the slug from the title instead means there's one less field
// to keep in sync, and no risk of a duplicate/missing slug.
export function slugifyServiceTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ServiceCard({
  service,
  compact = false,
  className = "",
  fieldAttrs,
}: {
  service: ServiceCardData;
  compact?: boolean;
  className?: string;
  fieldAttrs?: string;
}) {
  const slug = slugifyServiceTitle(service.title ?? "");

  return (
    <div
      id={compact ? undefined : slug}
      data-tina-field={fieldAttrs}
      className={`scroll-mt-24 rounded-2xl border border-brand-pink-tint-2 bg-white p-6 shadow-sm sm:p-8 ${className}`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-pink-tint">
        <CheckCircleIcon className="h-7 w-7 text-brand-pink-deep" />
      </div>
      <h3 className="mt-4 font-heading text-xl font-bold text-brand-ink sm:text-2xl">
        {service.title}
      </h3>
      <p className="mt-1 font-semibold text-brand-pink-deep">
        {service.tagline}
      </p>
      <p className="mt-3 text-brand-slate">{service.description}</p>
      {compact && (
        <Link
          href={`/services#${slug}`}
          className="mt-4 inline-block min-h-[44px] py-2 font-bold text-brand-pink-deep underline underline-offset-4"
        >
          Learn more
        </Link>
      )}
    </div>
  );
}
