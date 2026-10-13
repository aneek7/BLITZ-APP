import { createFileRoute } from "@tanstack/react-router";
import { User } from "lucide-react";
import { PageHeader, ComingSoon } from "@/components/fest";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Blitzschlag" },
      { name: "description", content: "Your Blitzschlag profile — coming soon." },
      { property: "og:title", content: "Blitzschlag Profile" },
      { property: "og:description", content: "Personal festival profile coming soon." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <div>
      <PageHeader title="Profile" />
      <ComingSoon icon={<User className="h-7 w-7" />} title="Your festival pass" text="Sign-in, saved events and your festival schedule will live here." />
    </div>
  ),
});
