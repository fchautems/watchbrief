import rawSeed from "@/data/watchbrief_seed.json";
import {
  editorialOverrides,
  independentBrands,
} from "@/data/editorial";
import { reviewCandidates } from "@/lib/review";
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
    editorialStatus:
      override?.editorialStatus ?? (override?.verified ? "publishable" : "backlog"),
    independent: independentBrands.has(item.brand),
  };
}

const seedWatches = seed.watches.map(normalizeWatch);
const publishedCandidates = reviewCandidates
  .filter((candidate) => candidate.status === "published")
  .map((candidate) => candidate.watch);

// A published candidate is the editorially enriched version of a seed entry.
// Keep one public record per id and let the candidate replace the seed data.
const watchesById = new Map(seedWatches.map((watch) => [watch.id, watch]));
publishedCandidates.forEach((watch) => watchesById.set(watch.id, watch));

export const watches = [...watchesById.values()]
  .sort((a, b) => b.date.localeCompare(a.date) || a.brand.localeCompare(b.brand));

const brandNamesBySlug = new Map(
  seed.brandWatchlist.map((name) => [slugify(name), name]),
);
watches.forEach((watch) => {
  if (!brandNamesBySlug.has(watch.brandSlug)) {
    brandNamesBySlug.set(watch.brandSlug, watch.brand);
  }
});

export const brands = [...brandNamesBySlug]
  .map(([slug, name]) => ({
    name,
    slug,
    count: watches.filter((watch) => watch.brandSlug === slug).length,
  }))
  .sort((a, b) => a.name.localeCompare(b.name, "fr"));

export const publishableWatches = watches.filter(
  (watch) => watch.editorialStatus === "publishable" && watch.imageUrl,
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
  latestDate: watches[0]?.date ?? seed.generatedAt,
};
