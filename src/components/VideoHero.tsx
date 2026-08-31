"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "./Button";
import { business } from "@/content/site-content";

// Split hero for the homepage: a light-pink (brand-pink-tint, same token
// the footer uses) text panel on the left, the autoplay video filling the
// right edge-to-edge (below `lg` it stacks: text on top, video underneath,
// full width). A gradient overlay on the video's left edge, fading from
// that same light pink to transparent, dissolves it into the panel's
// color instead of a hard vertical seam.
//
// Layering inside the video panel (back to front): poster <Image> -> <video>
// -> seam-blend overlay. The poster is always rendered, so it doubles as
// the fallback for every failure mode, with no layout shift:
//   1. Before the video can play: the poster shows through underneath it.
//   2. prefers-reduced-motion is on: the video is never shown (CSS-only,
//      via the `hidden motion-safe:block` classes below), so there's no
//      flash of motion even for a moment.
//   3. The video errors out (network/unsupported format): onError removes
//      the <video> element entirely and the poster is revealed.
// The source footage reads as slow motion at its native 1x speed. Playing
// it back faster is a one-line, instantly-tunable fix (vs. re-encoding the
// two video files), and doesn't affect anything else since the video is
// muted and looping anyway.
const PLAYBACK_RATE = 1.5;

export function VideoHero() {
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
  }, []);

  return (
    <section className="flex flex-col lg:flex-row lg:min-h-[560px]">
      {/* Text panel: light-pink brand background (the same brand-pink-tint
          token the footer uses), full width below `lg`, ~46% of it from
          `lg` up. Solid rather than a two-stop gradient now, since there's
          only one panel color to carry through to the seam blend below. */}
      <div className="flex flex-col justify-center gap-6 bg-brand-pink-tint px-5 py-14 sm:px-8 sm:py-20 lg:w-[46%] lg:px-12 xl:px-16">
        <h1 className="max-w-[600px] text-balance font-heading text-4xl font-bold leading-[1.08] text-brand-ink sm:text-5xl lg:text-6xl">
          Compassionate Care that Feels{" "}
          <span className="text-brand-pink-deep">Like Home</span>
        </h1>
        <p className="max-w-[550px] text-lg leading-relaxed text-brand-ink sm:text-xl">
          {business.heroLine}
        </p>
        <div>
          {/* "Schedule a Free Consultation Today" is a long, fixed label
              (35 characters). whitespace-nowrap (already baked into
              Button's base classes) guarantees it never wraps, but at a
              320px viewport there isn't room for it at Button's normal
              text-base size even with full-width padding, so this instance
              overrides Button's size/spacing (via `!` so it reliably wins
              over Button's own classes) down to a small, still-legible
              13px/full-width button below `sm`, sizing back up once there's
              room. This is deliberately more aggressive than any other
              button on the site because no other CTA label is this long;
              shortening the label would be the cleaner fix if the 320px
              size ever reads as too small in practice. */}
          <Button
            href="/contact"
            variant="gold"
            className="!w-full !justify-center !px-3 !text-[13px] !tracking-tight sm:!w-auto sm:!px-6 sm:!text-base lg:!text-lg"
          >
            Schedule a Free Consultation Today
          </Button>
        </div>
      </div>

      {/* Video panel: fills the remaining width edge-to-edge, no overlay
          across the footage itself (per the redesign brief, video stays
          bright/unobstructed), just the seam-blend gradient confined to a
          strip on its left edge. */}
      <div className="relative aspect-video w-full overflow-hidden lg:aspect-auto lg:w-[54%]">
        {/* Almost certainly the page's LCP element, so it's loaded via
            next/image with priority (skips lazy-loading) and gets an
            automatically optimized/responsive srcset. */}
        <Image
          src="/images/hero-poster.jpg"
          alt="A caregiver sharing a warm moment with a senior client and her family at home"
          fill
          priority
          sizes="(min-width: 1024px) 54vw, 100vw"
          className="object-cover"
        />

        {!videoFailed && (
          <video
            ref={videoRef}
            className="absolute inset-0 hidden h-full w-full object-cover motion-safe:block"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/hero-poster.jpg"
            aria-hidden="true"
            tabIndex={-1}
            onError={() => setVideoFailed(true)}
          >
            {/* Mobile-optimized source for narrow viewports: 960x540,
                ~700KB, vs. ~4MB for the 1080p desktop source below. */}
            <source
              src="/videos/hero-placeholder-mobile.mp4"
              type="video/mp4"
              media="(max-width: 639px)"
            />
            {/* TODO: swap both placeholder sources for the real
                Witherspoon Home Care hero footage once it's shot or
                sourced (re-export at the same two resolutions/bitrates). */}
            <source src="/videos/hero-placeholder.mp4" type="video/mp4" />
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
