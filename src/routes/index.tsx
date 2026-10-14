
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
  EventCard,
  SectionTitle,
} from "@/components/fest";

import { events, gallery } from "@/lib/festival";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Blitzschlag — MNIT Jaipur's Cultural Festival" },
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
        content: "MNIT Jaipur's annual cultural festival, reimagined.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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

// Deterministic sparkle positions and speeds
const sparkles = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  left: `${(i * 37.7) % 100}%`,
  size: `${1 + (i % 3)}px`,
  delay: `${-((i * 1.7) % 12)}s`,
  duration: `${5 + (i % 6)}s`,
  drift: `${(i % 2 === 0 ? 1 : -1) * (10 + (i % 5) * 7)}px`,
}));

function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative h-[86vh] min-h-[560px] overflow-hidden">
        <img
          src="/blitz-hero.png"
          alt="Blitzschlag concert"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark gradient for text readability */}
        <div className="absolute inset-0 bg-scrim-fade" />

        {/* Falling sparkles */}
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
                } as React.CSSProperties
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

          <h1 className="font-display text-[clamp(28px,9vw,44px)] leading-tight text-white whitespace-nowrap">
            BLITZSCHLAG
          </h1>

          <p className="mt-3 text-lg text-gradient font-semibold">
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

      {/* EXPLORE CATEGORIES */}
      <section className="mt-2">
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
              <span className="text-xs font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED EXPERIENCES */}
      <section className="mt-10">
        <SectionTitle
          title="Featured experiences"
          action={
            <Link to="/events" className="text-sm text-primary">
              See all
            </Link>
          }
        />

        <div className="no-scrollbar flex snap-x gap-4 overflow-x-auto px-5 pb-2">
          {events.map((event) => (
            <div key={event.id} className="snap-start">
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </section>

      {/* FESTIVAL HIGHLIGHTS */}
      <section className="mt-10">
        <SectionTitle
          title="Festival highlights"
          action={
            <Link to="/past-events" className="text-sm text-primary">
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
                  i === 0 ? "aspect-[16/9]" : "aspect-square"
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
          Blitzschlag is the annual cultural festival of Malaviya National
          Institute of Technology, Jaipur — days of music, dance, fashion,
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
