import { PhoneIcon } from "./icons";
import { toPhoneHref } from "@/lib/phone";
import type { SettingsQuery } from "@tina/__generated__/types";

export function MobileCallBar({ settings }: { settings: SettingsQuery["settings"] }) {
  const phoneHref = toPhoneHref(settings.phone ?? "");

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-pink-tint-2 bg-brand-pink-deep lg:hidden">
      <a
        href={phoneHref}
        className="flex min-h-[60px] w-full items-center justify-center gap-2 whitespace-nowrap px-4 font-heading text-base font-bold text-white sm:gap-2.5 sm:text-lg"
      >
        <PhoneIcon className="h-5 w-5 shrink-0" />
        Call Now: {settings.phone}
      </a>
    </div>
  );
}
