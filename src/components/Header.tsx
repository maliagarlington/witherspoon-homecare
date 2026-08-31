"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { MenuIcon, CloseIcon, PhoneIcon } from "./icons";
import { business, nav } from "@/content/site-content";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-brand-pink-tint-2 bg-white">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link
          href="/"
          className="rounded-md focus-visible:outline-3"
          onClick={() => setOpen(false)}
        >
          <Logo size="large" />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:flex"
        >
          {nav.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-[1.05rem] font-semibold transition-colors ${
                  isActive
                    ? "text-brand-pink-deep underline decoration-2 underline-offset-4"
                    : "text-brand-ink hover:text-brand-pink-deep"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center lg:flex">
          <Button href={business.phoneHref} variant="gold" icon={<PhoneIcon className="h-5 w-5" />}>
            {business.phone}
          </Button>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-md text-brand-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
        </button>
      </Container>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-brand-pink-tint-2 bg-white lg:hidden"
        >
          <Container className="flex flex-col py-2">
            {nav.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-[48px] items-center rounded-md px-2 text-lg font-semibold ${
                    isActive
                      ? "text-brand-pink-deep underline decoration-2 underline-offset-4"
                      : "text-brand-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={business.phoneHref}
              className="my-2 flex min-h-[48px] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-gold px-5 font-heading text-base font-bold text-brand-ink sm:px-6 sm:text-lg"
            >
              <PhoneIcon className="h-5 w-5" />
              Call {business.phone}
            </a>
          </Container>
        </nav>
      )}
    </header>
  );
}
