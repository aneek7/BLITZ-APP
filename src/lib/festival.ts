import hero from "@/assets/hero.jpg";
import dance from "@/assets/dance.jpg";
import fashion from "@/assets/fashion.jpg";
import drama from "@/assets/drama.jpg";
import day from "@/assets/day.jpg";
import band from "@/assets/band.jpg";

/**
 * All imagery below is AI-generated PREVIEW photography.
 * Replace `src` values with authentic Blitzschlag photos when available —
 * set `preview: false` once a real photo is used.
 */
export type Photo = { src: string; alt: string; preview: boolean };
const p = (src: string, alt: string): Photo => ({ src, alt, preview: true });

export const photos = {
  hero: p(hero, "Night concert crowd under purple stage lights"),
  dance: p(dance, "Group dance performance on stage"),
  fashion: p(fashion, "Fashion show runway under spotlights"),
  drama: p(drama, "Theatre performance under a single spotlight"),
  day: p(day, "Festival campus decor during the day"),
  band: p(band, "Student band performing live"),
};

export const categories = ["Music", "Dance", "Fashion", "Drama", "Art", "Cultural"] as const;
export type Category = (typeof categories)[number];

export type FestEvent = {
  id: string;
  name: string;
  category: Category;
  tagline: string;
  description: string;
  photo: Photo;
  /** Only set when a verified registration link exists. */
  registrationUrl?: string;
};

export const events: FestEvent[] = [
  {
    id: "pronites",
    name: "Pronites",
    category: "Music",
    tagline: "The nights Blitzschlag is remembered for",
    description:
      "Pronites are the headline night concerts of Blitzschlag, where the whole campus gathers in front of the main stage for performances by professional artists.",
    photo: photos.hero,
  },
  {
    id: "panache",
    name: "Panache",
    category: "Fashion",
    tagline: "The fashion showcase",
    description:
      "Panache is Blitzschlag's fashion event — teams take the runway with themed collections, choreography and styling.",
    photo: photos.fashion,
  },
  {
    id: "ramba-samba",
    name: "Ramba Samba",
    category: "Dance",
    tagline: "Rhythm, energy and crews",
    description:
      "Ramba Samba brings dance groups to the stage to compete with synchronised, high-energy group performances.",
    photo: photos.dance,
  },
  {
    id: "rangbhoomi",
    name: "Rangbhoomi",
    category: "Drama",
    tagline: "Stage plays and storytelling",
    description:
      "Rangbhoomi is the dramatics stage of the fest, home to stage plays and theatrical storytelling.",
    photo: photos.drama,
  },
  {
    id: "tamasha",
    name: "Tamasha",
    category: "Cultural",
    tagline: "Street performance, out in the open",
    description:
      "Tamasha takes performance into the open — street plays and acts performed among the crowd.",
    photo: photos.day,
  },
  {
    id: "battle-of-bands",
    name: "Battle of Bands",
    category: "Music",
    tagline: "Amps up, bands on",
    description:
      "Battle of Bands sees student bands go head to head with original songs and covers.",
    photo: photos.band,
  },
  {
    id: "mnit-hustle",
    name: "MNIT Hustle",
    category: "Dance",
    tagline: "Solo and duo dance face-off",
    description: "MNIT Hustle is the dance face-off where individual dancers show their style.",
    photo: photos.dance,
  },
];

export const galleryFilters = [
  "All",
  "Concerts",
  "Dance",
  "Fashion",
  "Moments",
  "Day Events",
  "Night Events",
] as const;
export type GalleryFilter = (typeof galleryFilters)[number];

export const gallery: { photo: Photo; tags: GalleryFilter[]; featured?: boolean }[] = [
  { photo: photos.hero, tags: ["Concerts", "Night Events"], featured: true },
  { photo: photos.dance, tags: ["Dance", "Night Events"] },
  { photo: photos.fashion, tags: ["Fashion", "Night Events"] },
  { photo: photos.day, tags: ["Moments", "Day Events"], featured: true },
  { photo: photos.band, tags: ["Concerts", "Night Events"] },
  { photo: photos.drama, tags: ["Moments", "Day Events"] },
];
