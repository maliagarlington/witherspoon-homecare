"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "./Button";

// Split hero for the homepage: a light-pink (brand-pink-tint, same token
// the footer uses) text panel on the left, the autoplay video filling the
// right edge-to-edge (below `lg` it stacks: text on top, video underneath,
// full width). A gradient overlay on the video's left edge, fading from
// that same light pink to transparent, dissolves it into the panel's
// color instead of a hard vertical seam.
//
// All content is passed in as props (headline, video, poster, etc.) rather
// than imported from static content, so it can come from Tina's "Home
// Page" document and update live while editing.
//
// Video resolution order:
//   1. `videoUrl` is a YouTube/Vimeo link (editor pasted one in Tina) ->
//      render an autoplay/muted/looping iframe embed.
//   2. `videoUrl` is any other link (a direct .mp4 from Cloudinary, etc.)
//      -> render it as a native <video> source.
//   3. `videoUrl` is empty -> fall back to the built-in placeholder video,
//      served locally with a separate compressed source for narrow
//      viewports.
// Layering (back to front): poster <Image> -> video/iframe -> seam-blend
// overlay. The poster is always rendered, so it doubles as the fallback
// for every failure mode, with no layout shift:
//   1. Before the video can play: the poster shows through underneath it.
//   2. prefers-reduced-motion is on: the video/iframe is never shown
//      (CSS-only, via the `hidden motion-safe:block` classes below), so
//      there's no flash of motion even for a moment.
//   3. A native <video> errors out (network/unsupported format): onError
//      removes it and the poster is revealed. (An iframe embed doesn't
//      have an equivalent reliable error signal; if a pasted YouTube/Vimeo
//      link is broken, the iframe itself will show that service's own
//      "video unavailable" state rather than falling back to the poster.)
//
// The default/placeholder footage reads as slow motion at its native 1x
// speed, so it's played back at PLAYBACK_RATE instead of 1x. This doesn't
// apply to external embeds (YouTube/Vimeo control their own playback
// speed).
const PLAYBACK_RATE = 1.5;

function getVideoEmbed(url: string): { embedUrl: string } | null {
  const youtube = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  if (youtube) {
    const id = youtube[1];
    return {
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&playsinline=1&modestbranding=1&rel=0&iv_load_policy=3`,
    };
  }
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) {
    const id = vimeo[1];
    return {
      embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&background=1`,
    };
  }
  return null;
}

export function VideoHero({
  headline,
  headlineAccent,
  subheadline,
  buttonText,
  videoUrl,
  posterUrl,
  posterAlt,
  fieldAttrs,
}: {
  headline: string;
  headlineAccent: string;
  subheadline: string;
  buttonText: string;
  videoUrl?: string | null;
  posterUrl: string;
  posterAlt: string;
  fieldAttrs?: {
    headline?: string;
    subheadline?: string;
    buttonText?: string;
    poster?: string;
  };
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = PLAYBACK_RATE;
    }

    // Belt-and-suspenders on top of the CSS-only reduced-motion handling:
    // if the browser started playback anyway, stop it so a reduced-motion
    // visitor isn't spending battery/data decoding a video they'll never
    // see.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      videoRef.current?.pause();
    }
  }, [videoUrl]);

  // Split the headline into the plain lead-in and the pink accent, e.g.
  // headline="Compassionate Care that Feels Like Home",
  // headlineAccent="Like Home" -> "Compassionate Care that Feels " + pink "Like Home".
  const accentIndex = headlineAccent
    ? headline.lastIndexOf(headlineAccent)
    : -1;
  const headlineLead =
    accentIndex > 0 ? headline.slice(0, accentIndex) : headline;
  const headlineAccentText = accentIndex > 0 ? headlineAccent : "";

  const embed = videoUrl ? getVideoEmbed(videoUrl) : null;
  const directVideoUrl = videoUrl && !embed ? videoUrl : null;

  return (
    <section className="flex flex-col lg:flex-row lg:min-h-[560px]">
      {/* Text panel: light-pink brand background (the same brand-pink-tint
          token the footer uses), full width below `lg`, ~46% of it from
          `lg` up. */}
      <div className="flex flex-col justify-center gap-6 bg-brand-pink-tint px-5 py-14 sm:px-8 sm:py-20 lg:w-[46%] lg:px-12 xl:px-16">
        <h1
          data-tina-field={fieldAttrs?.headline}
          className="max-w-[600px] text-balance font-heading text-4xl font-bold leading-[1.08] text-brand-ink sm:text-5xl lg:text-6xl"
        >
          {headlineLead}
          {headlineAccentText && (
            <span className="text-brand-pink-deep">{headlineAccentText}</span>
          )}
        </h1>
        <p
          data-tina-field={fieldAttrs?.subheadline}
          className="max-w-[550px] text-lg leading-relaxed text-brand-ink sm:text-xl"
        >
          {subheadline}
        </p>
        <div>
          {/* whitespace-nowrap (already baked into Button's base classes)
              guarantees this never wraps, but a long editor-typed label
              may not fit at Button's normal text-base size on a 320px
              screen, so this instance overrides Button's size/spacing
              (via `!` so it reliably wins over Button's own classes) down
              to a small, still-legible 13px/full-width button below `sm`,
              sizing back up once there's room. The character-limit warning
              on this field in Tina is what keeps labels short enough for
              this to hold up. */}
          <Button
            href="/contact"
            variant="gold"
            className="!w-full !justify-center !px-3 !text-[13px] !tracking-tight sm:!w-auto sm:!px-6 sm:!text-base lg:!text-lg"
          >
            <span data-tina-field={fieldAttrs?.buttonText}>{buttonText}</span>
          </Button>
        </div>
      </div>

      {/* Video panel: fills the remaining width edge-to-edge, no overlay
          across the footage itself, just the seam-blend gradient confined
          to a strip on its left edge. */}
      <div className="relative aspect-video w-full overflow-hidden lg:aspect-auto lg:w-[54%]">
        {/* Almost certainly the page's LCP element, so it's loaded via
            next/image with priority (skips lazy-loading) and gets an
            automatically optimized/responsive srcset. */}
        <Image
          data-tina-field={fieldAttrs?.poster}
          src={posterUrl}
          alt={posterAlt}
          fill
          priority
          sizes="(min-width: 1024px) 54vw, 100vw"
          className="object-cover"
        />

        {embed && (
          <iframe
            src={embed.embedUrl}
            title="Hero video"
            className="absolute inset-0 hidden h-full w-full motion-safe:block"
            style={{ border: 0 }}
            allow="autoplay; encrypted-media"
            tabIndex={-1}
            aria-hidden="true"
          />
        )}

        {!embed && !videoFailed && (
          <video
            ref={videoRef}
            className="absolute inset-0 hidden h-full w-full object-cover motion-safe:block"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={posterUrl}
            aria-hidden="true"
            tabIndex={-1}
            onError={() => setVideoFailed(true)}
          >
            {directVideoUrl ? (
              <source src={directVideoUrl} type="video/mp4" />
            ) : (
              <>
                {/* Mobile-optimized source for narrow viewports: 960x540,
                    ~700KB, vs. ~4MB for the 1080p desktop source below. */}
                <source
                  src="/videos/hero-placeholder-mobile.mp4"
                  type="video/mp4"
                  media="(max-width: 639px)"
                />
                {/* TODO: swap both placeholder sources for the real
                    Witherspoon Home Care hero footage once it's shot or
                    sourced (re-export at the same two resolutions/bitrates),
                    or set a "Hero Video Link" in Tina instead. */}
                <source src="/videos/hero-placeholder.mp4" type="video/mp4" />
              </>
            )}
          </video>
        )}

        {/* Seam blend: fades from the panel's exact color (opaque) to
            transparent, dissolving the hard vertical line between the two
            panels. Desktop-only, since below `lg` the video sits under the
            text rather than beside it. */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/5 bg-gradient-to-r from-brand-pink-tint to-transparent lg:block"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
