import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import { PageHeader, EventCard } from "@/components/fest";
import { categories, events } from "@/lib/festival";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/events/")({
  validateSearch: (s: Record<string, unknown>): { category?: string } => ({
    category: typeof s["category"] === "string" ? (s["category"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Events — Blitzschlag MNIT Jaipur" },
      { name: "description", content: "Browse Blitzschlag experiences: Pronites, Panache, Ramba Samba, Rangbhoomi and more." },
      { property: "og:title", content: "Blitzschlag Events" },
      { property: "og:description", content: "Discover music, dance, fashion and drama at Blitzschlag." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Events,
});

function Events() {
  const { category } = Route.useSearch();
  const navigate = useNavigate({ from: "/events/" });
  const [q, setQ] = useState("");
  const list = events.filter(
    (e) =>
      (!category || e.category === category) &&
      (e.name + e.tagline).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div>
      <PageHeader title="Events" subtitle="Highlights from past editions · previews" />
      <div className="px-5">
        <label className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search events"
            aria-label="Search events"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>
      </div>
      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto px-5">
        {[undefined, ...categories].map((c) => (
          <button
            key={c ?? "all"}
            onClick={() => navigate({ search: { category: c } })}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition",
              category === c ? "border-transparent bg-gradient-accent" : "border-border bg-card text-muted-foreground",
            )}
          >
            {c ?? "All"}
          </button>
        ))}
      </div>
      <div className="mt-6 space-y-5 px-5">
        {list.map((e) => <EventCard key={e.id} event={e} wide />)}
        {list.length === 0 && (
          <p className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            No events match your search.
          </p>
        )}
      </div>
    </div>
  );
}
