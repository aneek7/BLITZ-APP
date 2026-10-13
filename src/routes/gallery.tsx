import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { PageHeader, FestImage } from "@/components/fest";
import { gallery, galleryFilters, type GalleryFilter } from "@/lib/festival";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Blitzschlag MNIT Jaipur" },
      { name: "description", content: "Concerts, dance, fashion and festival moments from Blitzschlag." },
      { property: "og:title", content: "Blitzschlag Gallery" },
      { property: "og:description", content: "Moments from MNIT Jaipur's cultural festival." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const [filter, setFilter] = useState<GalleryFilter>("All");
  const [open, setOpen] = useState<number | null>(null);
  const list = gallery.filter((g) => filter === "All" || g.tags.includes(filter));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div>
      <PageHeader title="Gallery" subtitle="Preview images — real festival photos coming soon" />
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5">
        {galleryFilters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition",
              filter === f ? "border-transparent bg-gradient-accent" : "border-border bg-card text-muted-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 px-5">
        {list.map((g, i) => (
          <button
            key={i}
            onClick={() => setOpen(i)}
            className={cn("animate-rise text-left", g.featured && "col-span-2")}
            aria-label={`Open ${g.photo.alt}`}
          >
            <FestImage photo={g.photo} className={cn("rounded-2xl", g.featured ? "aspect-[16/10]" : "aspect-[3/4]")} />
          </button>
        ))}
        {list.length === 0 && (
          <p className="col-span-2 rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            No photos in this category yet.
          </p>
        )}
      </div>

      {open !== null && list[open] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex animate-in fade-in items-center justify-center bg-scrim/95 p-4"
          onClick={() => setOpen(null)}
        >
          <button aria-label="Close" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-card">
            <X className="h-5 w-5" />
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="w-full max-w-md">
            <img src={list[open].photo.src} alt={list[open].photo.alt} className="w-full rounded-2xl" />
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              {list[open].photo.alt}{list[open].photo.preview && " · Preview image"}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
