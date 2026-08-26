import fs from "node:fs";

const seed = JSON.parse(fs.readFileSync("src/data/watchbrief_seed.json", "utf8"));
const candidates = JSON.parse(fs.readFileSync("src/data/review-candidates.json", "utf8"));
const allowedStatuses = new Set(["review", "approved", "needs-review", "published", "rejected", "duplicate"]);
const failures = [];

function uniqueIds(items, label) {
  const seen = new Set();
  for (const item of items) {
    if (!item.id) failures.push(`${label}: id manquant`);
    else if (seen.has(item.id)) failures.push(`${label}: id dupliqué ${item.id}`);
    seen.add(item.id);
  }
}

function validUrl(value) {
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

function slugify(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/&/g, " and ").replace(/[^a-zA-Z0-9]+/g, "-").replace(/(^-|-$)/g, "").toLowerCase();
}

uniqueIds(seed.watches, "seed");
uniqueIds(candidates, "candidates");

for (const candidate of candidates) {
  const watch = candidate.watch ?? {};
  if (!allowedStatuses.has(candidate.status)) failures.push(`${candidate.id}: statut inconnu ${candidate.status}`);
  if (candidate.id !== watch.id) failures.push(`${candidate.id}: candidate.id et watch.id diffèrent`);
  if (watch.slug !== slugify(watch.id)) failures.push(`${candidate.id}: watch.slug incohérent`);
  // A brand can deliberately keep a short canonical slug even when its display\n  // name contains a location or a legal suffix (for example ArtyA Genève → artya).\n  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(watch.brandSlug ?? "")) failures.push(`${candidate.id}: watch.brandSlug invalide`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(candidate.detectedAt ?? "")) failures.push(`${candidate.id}: detectedAt invalide`);
  for (const field of ["slug", "brand", "brandSlug", "model", "date", "lugToLug"]) {
    if (!watch[field]) failures.push(`${candidate.id}: watch.${field} manquant`);
  }
  if (["review", "approved", "published"].includes(candidate.status)) {
    for (const field of ["summary", "productUrl", "imageUrl", "price"]) {
      if (!watch[field]) failures.push(`${candidate.id}: ${field} requis pour ${candidate.status}`);
    }
    if (watch.editorialStatus !== "publishable") failures.push(`${candidate.id}: editorialStatus doit être publishable`);
  }
  for (const field of ["productUrl", "imageUrl", "priceSourceUrl", "imageSourceUrl"]) {
    if (watch[field] && !validUrl(watch[field])) failures.push(`${candidate.id}: ${field} n'est pas une URL HTTP valide`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

const publicIds = new Set(seed.watches.map((watch) => watch.id));
candidates.filter((candidate) => candidate.status === "published").forEach((candidate) => publicIds.add(candidate.id));
console.log(`${seed.watches.length} entrées seed · ${candidates.length} candidates · ${publicIds.size} fiches publiques uniques`);
