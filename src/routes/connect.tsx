import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram, Youtube, Linkedin, Globe, Mail, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/fest";

export const Route = createFileRoute("/connect")({
  head: () => ({
    meta: [
      { title: "Connect — Blitzschlag MNIT Jaipur" },
      { name: "description", content: "Follow Blitzschlag on social media, read FAQs and find contact info." },
      { property: "og:title", content: "Connect with Blitzschlag" },
      { property: "og:description", content: "Socials, FAQs and contact for Blitzschlag." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Connect,
});

// Placeholder: add verified official URLs here.
const socials = [
  { label: "Instagram", icon: Instagram, url: "" },
  { label: "YouTube", icon: Youtube, url: "" },
  { label: "LinkedIn", icon: Linkedin, url: "" },
  { label: "Official website", icon: Globe, url: "" },
];

const faqs = [
  { q: "What is Blitzschlag?", a: "Blitzschlag is the annual cultural festival of MNIT Jaipur." },
  { q: "When is the next edition?", a: "Dates will be shared here once officially announced." },
  { q: "How do I register for events?", a: "Registration links will appear on each event page once verified links are available." },
];

function Connect() {
  return (
    <div>
      <PageHeader title="Connect" subtitle="Stay in the loop" />
      <div className="space-y-3 px-5">
        {socials.map(({ label, icon: Icon, url }) => (
          <div key={label} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent"><Icon className="h-5 w-5 text-primary" /></span>
            <div className="flex-1">
              <p className="font-semibold">{label}</p>
              <p className="text-xs text-muted-foreground">{url || "Link placeholder — awaiting official URL"}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-10 px-5 text-xl font-bold">FAQs</h2>
      <div className="mt-4 space-y-3 px-5">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-2xl border border-border bg-card p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
              {f.q}
              <ChevronRight className="h-4 w-4 transition group-open:rotate-90" />
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="mx-5 mt-8 flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
        <Mail className="h-5 w-5 text-primary" />
        <p className="text-sm text-muted-foreground">Contact details placeholder — awaiting official info.</p>
      </div>
      <Link to="/cacs" className="mx-5 mt-3 flex items-center justify-between rounded-2xl border border-border bg-card p-4 text-sm font-medium">
        Cultural Affairs Committee <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
