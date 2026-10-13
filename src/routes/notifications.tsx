import { createFileRoute } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { PageHeader, ComingSoon } from "@/components/fest";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Blitzschlag" },
      { name: "description", content: "Festival updates and announcements — coming soon." },
      { property: "og:title", content: "Blitzschlag Notifications" },
      { property: "og:description", content: "Festival updates coming soon." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <div>
      <PageHeader title="Notifications" back />
      <ComingSoon icon={<Bell className="h-7 w-7" />} title="Stay tuned" text="Announcements and event reminders will appear here." />
    </div>
  ),
});
