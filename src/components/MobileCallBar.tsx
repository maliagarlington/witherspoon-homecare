import { PhoneIcon } from "./icons";
import { business } from "@/content/site-content";

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-pink-tint-2 bg-brand-pink-deep lg:hidden">
      <a
        href={business.phoneHref}
        className="flex min-h-[60px] w-full items-center justify-center gap-2.5 px-4 font-heading text-lg font-bold text-white"
      >
        <PhoneIcon className="h-5 w-5 shrink-0" />
        Call Now: {business.phone}
      </a>
    </div>
  );
}
