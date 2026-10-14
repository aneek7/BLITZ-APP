import { Link, useRouterState } from "@tanstack/react-router";

import {
  Images,
  CalendarDays,
  Palette,
  MessageCircle,
  Zap,
  Bell,
  User,
  Home,
  Music,
  ArrowRight,
  Image as ImageIcon,
  ChevronLeft,
  Link2,
} from "lucide-react";

import type { ReactNode } from "react";
import type { FestEvent, Photo } from "@/lib/festival";
import { cn } from "@/lib/utils";

export function FestImage({
  photo,
  className,
  eager,
  showBadge = true,
}: {
  photo: Photo;
  className?: string;
  eager?: boolean;
  showBadge?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-card", className)}>
      <img
        src={photo.src}
        alt={photo.alt}
        loading={eager ? "eager" : "lazy"}
        className="h-full w-full object-cover"
      />
      {photo.preview && showBadge && (
        <span className="absolute right-2 top-2 rounded-full bg-scrim/70 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur">
          Preview image
        </span>
      )}
    </div>
  );
}

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-accent shadow-glow">
        <Zap className="h-4 w-4 fill-current" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-sm font-extrabold tracking-widest">BLITZSCHLAG</span>
        <span className="block text-[10px] tracking-wider text-muted-foreground">MNIT JAIPUR</span>
      </span>
    </Link>
  );
}

export function TopBar({ overlay }: { overlay?: boolean }) {
  return (
    <header
      className={cn(
        "z-30 flex items-center justify-between px-5 py-4",
        overlay ? "absolute inset-x-0 top-0" : "sticky top-0 bg-background/85 backdrop-blur-xl",
      )}
    >
      <Logo />
      <div className="flex gap-2">
        <IconLink to="/notifications" label="Notifications"><Bell className="h-4 w-4" /></IconLink>
        <IconLink to="/profile" label="Profile"><User className="h-4 w-4" /></IconLink>
      </div>
    </header>
  );
}

function IconLink({ to, label, children }: { to: "/notifications" | "/profile"; label: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-border bg-scrim/40 backdrop-blur transition hover:bg-accent"
    >
      {children}
    </Link>
  );
}

export function PageHeader({ title, subtitle, back }: { title: string; subtitle?: string; back?: boolean }) {
  return (
    <header className="sticky top-0 z-30 bg-background/85 px-5 pb-4 pt-5 backdrop-blur-xl">
      {back && (
        <Link to="/" className="mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" /> Home
        </Link>
      )}
      <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
    </header>
  );
}

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/events", label: "Events", icon: CalendarDays },
  { to: "/gallery", label: "Gallery", icon: Images },
  { to: "/connect", label: "Connect", icon: Link2 },
  { to: "/profile", label: "Profile", icon: User },
] as const;


export function BottomNav() {
  const path = useRouterState({
    select: (s) => s.location.pathname,
  });

  const navItems = [
    { to: "/gallery", label: "Gallery", icon: Images },
    { to: "/past-events", label: "Past Events", icon: CalendarDays },
    { to: "/cacs", label: "CACS", icon: Palette },
    { to: "/connect", label: "Connect", icon: MessageCircle },
  ];

  // Change this to true when the official logo is available
  const hasOfficialLogo = true;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md px-4 pb-4">
      <div className="relative rounded-3xl border border-border bg-card/95 px-2 py-3 shadow-glow backdrop-blur-xl">

        {/* Raised center logo button */}
        <Link
          to="/"
          aria-label="Blitzschlag Home"
          className="absolute left-1/2 -top-10 z-20 flex h-24 w-24 -translate-x-1/2 items-center justify-center rounded-full border-[7px] border-black bg-gradient-to-b from-violet-600 to-indigo-950 shadow-xl"
        >
          {hasOfficialLogo ? (
            <img
              src="/blitz-logo.png"
              alt="Blitzschlag Logo"
              className="h-14 w-14 object-contain"
            />
          ) : (
            <Zap className="h-12 w-12 text-white" strokeWidth={2} />
          )}
        </Link>

        {/* Four navigation items */}
        <ul className="grid grid-cols-5 items-center">
          {navItems.map(({ to, label, icon: Icon }, index) => {
            const active = path.startsWith(to);

            return (
              <li
                key={to}
                className={index === 2 ? "col-start-4" : ""}
              >
                <Link
                  to={to}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-2xl py-2 text-center text-[10px] font-medium transition-all",
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="whitespace-nowrap">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}


export function SectionTitle({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-end justify-between px-5">
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      {action}
    </div>
  );
}

export function EventCard({ event, wide }: { event: FestEvent; wide?: boolean }) {
  return (
    <Link
      to="/events/$id"
      params={{ id: event.id }}
      className={cn("group block shrink-0 animate-rise", wide ? "w-full" : "w-64")}
    >
      <div className="relative overflow-hidden rounded-3xl">
        <FestImage
          photo={event.photo}
          className={cn("transition-transform duration-500 group-hover:scale-105", wide ? "aspect-[16/10]" : "aspect-[4/5]")}
        />
        <div className="pointer-events-none absolute inset-0 bg-scrim-fade" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">{event.category}</span>
          <h3 className="mt-1 text-xl font-bold">{event.name}</h3>
          <p className="text-xs text-muted-foreground">{event.tagline}</p>
        </div>
      </div>
    </Link>
  );
}

export function ComingSoon({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="mx-5 mt-6 flex flex-col items-center rounded-3xl border border-border bg-card px-6 py-14 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-accent shadow-glow">{icon}</div>
      <span className="mt-5 rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground">
        Coming soon
      </span>
      <h2 className="mt-3 text-2xl font-bold">{title}</h2>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
