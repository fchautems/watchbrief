import rawSeed from "@/data/watchbrief_seed.json";
import {
  editorialOverrides,
  independentBrands,
} from "@/data/editorial";
import type { SeedWatch, Watch, WatchSeed } from "@/lib/types";

const seed = rawSeed as WatchSeed;
const overrides = new Map(editorialOverrides.map((item) => [item.id, item]));

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .toLowerCase();
}

function firstDiameter(value?: string) {
  if (!value) return null;
  const match = value.replace(",", ".").match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function normalizeWatch(item: SeedWatch): Watch {
  const override = overrides.get(item.id);
  const merged = { ...item, ...override };

  return {
    ...merged,
    slug: slugify(item.id),
    brandSlug: slugify(item.brand),
    diameterMm: firstDiameter(merged.diameter),
    verified: override?.verified ?? false,
    verificationStatus: override?.verificationStatus ?? "seed",
    independent: independentBrands.has(item.brand),
  };
}

export const watches = seed.watches
  .map(normalizeWatch)
  .sort((a, b) => b.date.localeCompare(a.date) || a.brand.localeCompare(b.brand));

export const brands = seed.brandWatchlist
  .map((name) => ({
    name,
    slug: slugify(name),
    count: watches.filter((watch) => watch.brand === name).length,
  }))
  .sort((a, b) => a.name.localeCompare(b.name, "fr"));

export const verifiedWatches = watches.filter(
  (watch) => watch.verified && watch.imageUrl,
);

export function getWatch(slug: string) {
  return watches.find((watch) => watch.slug === slug);
}

export function getBrand(slug: string) {
  return brands.find((brand) => brand.slug === slug);
}

export function formatDate(date: string, long = true) {
  return new Intl.DateTimeFormat("fr-CH", {
    day: "numeric",
    month: long ? "long" : "short",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00Z`));
}

export const seedMeta = {
  generatedAt: seed.generatedAt,
  watchCount: watches.length,
  brandCount: brands.length,
};
