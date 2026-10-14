
import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import {
  ArrowRight,
  Music,
  Footprints,
  Shirt,
  Drama,
  Palette,
  Sparkles,
} from "lucide-react";

import {
  TopBar,
  FestImage,
  SectionTitle,
} from "@/components/fest";

import { events, gallery } from "@/lib/festival";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Blitzschlag — MNIT Jaipur's Cultural Festival",
      },
      {
        name: "description",
        content:
          "Discover Blitzschlag, the annual cultural festival of MNIT Jaipur: music, dance, fashion, drama and more.",
      },
      {
        property: "og:title",
        content: "Blitzschlag — Experience the Extraordinary",
      },
      {
        property: "og:description",
        content:
          "MNIT Jaipur's annual cultural festival, reimagined.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),
  component: Home,
});

const cats = [
  { label: "Music", icon: Music },
  { label: "Dance", icon: Footprints },
  { label: "Fashion", icon: Shirt },
  { label: "Drama", icon: Drama },
  { label: "Art", icon: Palette },
  { label: "Cultural", icon: Sparkles },
] as const;

// Subtle pink-purple falling sparkles
const sparkles = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  left: `${(i * 37.7) % 100}%`,
  size: `${1 + (i % 3)}px`,
  delay: `${-((i * 1.7) % 12)}s`,
  duration: `${5 + (i % 6)}s`,
  drift: `${
    (i % 2 === 0 ? 1 : -1) * (10 + (i % 5) * 7)
  }px`,
}));

const spotlightEvents = events.slice(0, 6);

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const changeSlide = (direction: number) => {
    if (spotlightEvents.length === 0) return;

    setActiveSlide(
      (current) =>
        (current + direction + spotlightEvents.length) %
        spotlightEvents.length
    );
  };

  const handleTouchStart = (
    e: React.TouchEvent<HTMLDivElement>
  ) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (
    e: React.TouchEvent<HTMLDivElement>
  ) => {
    if (
      touchStartX.current === null ||
      touchStartY.current === null
    ) {
      return;
    }

    const differenceX =
      e.changedTouches[0].clientX - touchStartX.current;

    const differenceY =
      e.changedTouches[0].clientY - touchStartY.current;

    if (
      Math.abs(differenceX) > 45 &&
      Math.abs(differenceX) > Math.abs(differenceY)
    ) {
      changeSlide(differenceX < 0 ? 1 : -1);
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div className="pb-32">
      {/* HERO SECTION */}
      <section className="relative h-[86vh] min-h-[560px] overflow-hidden">
        {/* Concert background image */}
        <img
          src="/blitz-hero.webp"
          alt="Blitzschlag concert"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />

        {/* Dark gradient for text readability */}
        <div className="absolute inset-0 bg-scrim-fade" />

        {/* Falling pink-purple sparkles */}
        <div
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
          aria-hidden="true"
        >
          {sparkles.map((sparkle) => (
            <span
              key={sparkle.id}
              className="blitz-sparkle"
              style={
                {
                  left: sparkle.left,
                  width: sparkle.size,
                  height: sparkle.size,
                  animationDelay: sparkle.delay,
                  animationDuration: sparkle.duration,
                  "--sparkle-drift": sparkle.drift,
                } as CSSProperties
              }
            />
          ))}
        </div>

        {/* Header */}
        <div className="relative z-30">
          <TopBar overlay />
        </div>

        {/* Hero text and button */}
        <div className="absolute inset-x-0 bottom-0 z-20 animate-rise px-5 pb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            MNIT Jaipur · Annual Cultural Fest
          </p>

          <h1 className="font-display text-[clamp(36px,11vw,54px)] leading-none tracking-tight text-white whitespace-nowrap">
            BLITZSCHLAG
          </h1>

          <p className="mt-3 text-lg font-semibold text-gradient">
            Experience the Extraordinary
          </p>

          <Link
            to="/events"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-accent px-6 py-3 text-sm font-semibold shadow-glow transition hover:opacity-90"
          >
            Explore Events
            <ArrowRight className="h-4 w-4" />
          </Link>

          <p className="mt-4 text-[10px] uppercase tracking-widest text-muted-foreground">
            Preview imagery
          </p>
        </div>
      </section>

      {/* IN THE SPOTLIGHT - 3D COVERFLOW CAROUSEL */}
      <section className="mt-6 overflow-hidden">
        <div className="mb-5 flex items-end justify-between gap-3 px-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
              THE BLITZSCHLAG EXPERIENCE
            </p>

            <h2 className="mt-1 font-display text-3xl text-white">
              IN THE SPOTLIGHT
            </h2>
          </div>

          <Link
            to="/events"
            search={{ category: "" }}
            className="shrink-0 pb-1 text-xs font-semibold text-primary"
          >
            View all →
          </Link>
        </div>

        {/* Coverflow cards */}
        <div
          className="relative h-[420px] w-full overflow-hidden touch-pan-y select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {spotlightEvents.map((event, index) => {
            const total = spotlightEvents.length;

            const offset =
              (index - activeSlide + total) % total;

            const position =
              offset > total / 2
                ? offset - total
                : offset;

            const isActive = position === 0;

            // Only render center, previous and next
            if (Math.abs(position) > 1) {
              return null;
            }

            return (
              <div
                key={event.id}
                className="absolute left-1/2 top-0 h-[390px] w-[72%] max-w-[310px] transition-all duration-500 ease-out"
                style={{
                  transform: `translateX(calc(-50% + ${
                    position * 80
                  }%)) scale(${isActive ? 1 : 0.82})`,
                  opacity: isActive ? 1 : 0.55,
                  filter: isActive
                    ? "brightness(1)"
                    : "brightness(0.65)",
                  zIndex: isActive ? 20 : 10,
                }}
              >
                <Link
                  to="/events/$id"
                  params={{ id: event.id }}
                  onClick={(e) => {
                    if (!isActive) {
                      e.preventDefault();
                      setActiveSlide(index);
                    }
                  }}
                  className="group relative block h-full overflow-hidden rounded-3xl border border-white/10 bg-card shadow-2xl"
                >
                  <FestImage
                    photo={event.photo}
                    className="h-full w-full"
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

                  {/* Event information */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pink-300">
                      {event.category}
                    </span>

                    <h3 className="mt-2 font-display text-3xl leading-tight text-white">
                      {event.name}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-xs text-white/75">
                      {event.tagline}
                    </p>

                    {isActive && (
                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                        Explore event
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Carousel navigation dots */}
        <div className="mt-1 flex items-center justify-center gap-2">
          {spotlightEvents.map((event, index) => (
            <button
              key={event.id}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Show ${event.name}`}
              aria-current={
                activeSlide === index ? "true" : undefined
              }
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeSlide === index
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-white/25"
              }`}
            />
          ))}
        </div>

        {/* Swipe hint */}
        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          Swipe to discover more →
        </p>
      </section>

      {/* EXPLORE CATEGORIES */}
      <section className="mt-6">
        <SectionTitle title="Explore categories" />

        <div className="no-scrollbar flex gap-3 overflow-x-auto px-5">
          {cats.map(({ label, icon: Icon }) => (
            <Link
              key={label}
              to="/events"
              search={{ category: label }}
              className="flex shrink-0 flex-col items-center gap-2 rounded-2xl border border-border bg-card px-5 py-4 transition hover:bg-accent"
            >
              <Icon className="h-6 w-6 text-primary" />

              <span className="text-xs font-medium">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FESTIVAL HIGHLIGHTS */}
      <section className="mt-10">
        <SectionTitle
          title="Festival highlights"
          action={
            <Link
              to="/past-events"
              className="text-sm text-primary"
            >
              Past editions
            </Link>
          }
        />

        <div className="grid grid-cols-2 gap-3 px-5">
          {gallery.slice(0, 4).map((item, i) => (
            <Link
              to="/gallery"
              key={i}
              className={i === 0 ? "col-span-2" : ""}
            >
              <FestImage
                photo={item.photo}
                className={`rounded-2xl ${
                  i === 0
                    ? "aspect-[16/9]"
                    : "aspect-square"
                }`}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="mx-5 mt-10 rounded-3xl border border-border bg-card p-6">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">
          About
        </span>

        <h2 className="mt-2 text-2xl font-bold">
          The spirit of MNIT Jaipur
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Blitzschlag is the annual cultural festival of
          Malaviya National Institute of Technology,
          Jaipur — days of music, dance, fashion,
          theatre and art that bring the campus together.
        </p>

        <Link
          to="/cacs"
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
        >
          Read more
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
