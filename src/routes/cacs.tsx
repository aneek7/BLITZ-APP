import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, FestImage } from "@/components/fest";
import { photos } from "@/lib/festival";

export const Route = createFileRoute("/cacs")({
  head: () => ({
    meta: [
      { title: "CACS — Cultural Affairs at MNIT Jaipur" },
      { name: "description", content: "About the Cultural Affairs Committee behind Blitzschlag at MNIT Jaipur." },
      { property: "og:title", content: "CACS — MNIT Jaipur" },
      { property: "og:description", content: "The Cultural Affairs Committee behind Blitzschlag." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Cacs,
});

const areas = [
  { title: "Music", photo: photos.band },
  { title: "Dance", photo: photos.dance },
  { title: "Fashion", photo: photos.fashion },
  { title: "Dramatics", photo: photos.drama },
];

function Cacs() {
  return (
    <div>
      <PageHeader title="CACS" subtitle="Cultural Affairs Committee · MNIT Jaipur" back />
      <div className="px-5">
        <FestImage photo={photos.day} className="aspect-[16/9] rounded-3xl" />
        <h2 className="mt-6 text-xl font-bold">About the committee</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The Cultural Affairs Committee looks after cultural life at MNIT Jaipur and brings Blitzschlag to life
          each year. Official committee details and members will appear here once provided.
        </p>
        <h2 className="mt-8 text-xl font-bold">Cultural activities</h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {areas.map((a) => (
            <div key={a.title} className="relative overflow-hidden rounded-2xl">
              <FestImage photo={a.photo} className="aspect-square" showBadge={false} />
              <div className="absolute inset-0 bg-scrim-fade" />
              <span className="absolute bottom-3 left-3 font-display font-bold">{a.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
