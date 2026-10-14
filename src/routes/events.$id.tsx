import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, ExternalLink, Info } from "lucide-react";
import { FestImage } from "@/components/fest";
import { events } from "@/lib/festival";

export const Route = createFileRoute("/events/$id")({
  loader: ({ params }) => {
    const event = events.find((e) => e.id === params.id);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.event.name} — Blitzschlag` },
          { name: "description", content: loaderData.event.description },
          { property: "og:title", content: `${loaderData.event.name} — Blitzschlag` },
          { property: "og:description", content: loaderData.event.description },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Event not found — Blitzschlag" }, { name: "robots", content: "noindex" }],
  }),
  component: EventDetail,
});

function EventDetail() {
  const { event } = Route.useLoaderData();
  return (
    <div>
      <div className="relative">
        <FestImage photo={event.photo} eager className="aspect-[4/5]" />
        <div className="absolute inset-0 bg-scrim-fade" />
        <Link
  to="/events"
  search={{ category: "" }}
  aria-label="Back to events"
          className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-scrim/60 backdrop-blur"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div className="absolute inset-x-0 bottom-0 px-5 pb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">{event.category}</span>
          <h1 className="mt-1 text-4xl font-extrabold">{event.name}</h1>
          <p className="text-muted-foreground">{event.tagline}</p>
        </div>
      </div>
      <div className="space-y-5 px-5 pt-6">
        <p className="leading-relaxed text-muted-foreground">{event.description}</p>
        <div className="flex gap-3 rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
          <Info className="h-5 w-5 shrink-0 text-primary" />
          Past festival highlight. Dates and registration for the upcoming edition haven't been announced here yet.
        </div>
        {event.registrationUrl && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-gradient-accent py-3 font-semibold shadow-glow"
          >
            Register <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}
