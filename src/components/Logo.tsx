export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M32 6 L58 27 L58 27 L50 27 L50 54 L14 54 L14 27 L6 27 Z"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M32 42 C32 42 22 35.5 22 28.5 C22 24.9 24.8 22 28.2 22 C30.1 22 31.7 22.9 32 24.4 C32.3 22.9 33.9 22 35.8 22 C39.2 22 42 24.9 42 28.5 C42 35.5 32 42 32 42 Z"
        fill="currentColor"
      />
    </svg>
  );
}

type LogoSize = "default" | "large";

// LogoMark is always sized with matching h-*/w-* utilities against its
// square (0 0 64 64) viewBox, so it scales without ever stretching.
const markSizes: Record<LogoSize, string> = {
  default: "h-9 w-9",
  large: "h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16",
};

// The two text lines are sized in `em`s off this base, so bumping it scales
// both "WITHERSPOON" and "Home Care" together proportionally. Kept modest
// on mobile (only the icon grows there) so the header never gets tight
// against the hamburger button at 320px; grows further from `sm` up.
const textSizes: Record<LogoSize, string> = {
  default: "",
  large: "text-lg sm:text-xl",
};

export function Logo({
  className,
  size = "default",
}: {
  className?: string;
  size?: LogoSize;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark
        className={`${markSizes[size]} shrink-0 text-brand-pink-deep`}
      />
      <span
        className={`font-heading font-bold leading-tight text-brand-ink ${textSizes[size]}`}
      >
        <span className="block text-[0.7em] uppercase tracking-wide text-brand-pink-deep">
          Witherspoon
        </span>
        <span className="block text-[1em]">Home Care</span>
      </span>
    </span>
  );
}
