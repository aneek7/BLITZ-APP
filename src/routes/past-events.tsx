import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, FestImage } from "@/components/fest";
import { events } from "@/lib/festival";

export const Route = createFileRoute("/past-events")({
  head: () => ({
    meta: [
      { title: "Past Events — Blitzschlag MNIT Jaipur" },
      { name: "description", content: "A look back at Blitzschlag's signature events across past editions." },
      { property: "og:title", content: "Blitzschlag Past Events" },
      { property: "og:description", content: "Signature experiences from past editions of Blitzschlag." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Past,
});

function Past() {
  return (
    <div>
      <PageHeader title="Past events" subtitle="Signature experiences from previous editions" back />
      <div className="space-y-8 px-5">
        {events.map((e, i) => (
          <article key={e.id} className="animate-rise">
            <FestImage photo={e.photo} className="aspect-[16/10] rounded-3xl" />
            <div className="mt-4 flex gap-4">
              <span className="font-display text-3xl font-extrabold text-gradient">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">{e.category}</span>
                <h2 className="text-2xl font-bold">{e.name}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
