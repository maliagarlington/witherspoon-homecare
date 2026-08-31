import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "gold" | "outline-light";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-pink-deep text-white hover:bg-[#93043f] focus-visible:bg-[#93043f]",
  secondary:
    "bg-white text-brand-pink-deep border-2 border-brand-pink-deep hover:bg-brand-pink-tint",
  gold: "bg-brand-gold text-brand-ink hover:bg-[#d99f1f]",
  "outline-light":
    "bg-transparent text-white border-2 border-white hover:bg-white/15",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  icon,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
}) {
  const classes = `inline-flex min-h-[52px] min-w-[44px] items-center justify-center gap-2.5 rounded-full px-7 py-3 font-heading text-lg font-bold shadow-sm transition-colors ${variants[variant]} ${className}`;

  const isExternal =
    href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http");

  if (isExternal) {
    return (
      <a href={href} className={classes}>
        {icon}
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {icon}
      {children}
    </Link>
  );
}
