export type VerificationStatus = "seed" | "verified" | "needs-review";
export type EditorialStatus = "backlog" | "researching" | "publishable" | "broken-link";
export type ReviewStatus = "review" | "approved" | "published" | "rejected" | "needs-review" | "duplicate";

export type Watch = {
  id: string;
  slug: string;
  brand: string;
  brandSlug: string;
  model: string;
  date: string;
  movement?: string;
  diameter?: string;
  diameterMm?: number | null;
  thickness?: string;
  lugToLug?: string;
  material?: string;
  waterResistance?: string;
  powerReserve?: string;
  price?: string;
  priceSourceUrl?: string;
  priceCheckedAt?: string;
  priceMarket?: string;
  priceTaxMode?: "incl-vat" | "excl-vat" | "unknown";
  limitedEdition: boolean;
  limitedQty?: number | null;
  summary?: string;
  productUrl?: string;
  linkLabel?: string;
  imageUrl?: string;
  imageFallbacks?: string[];
  imageSource?: string;
  imageSourceUrl?: string;
  sources?: string[];
  notes?: string;
  sourceNotes?: string;
  verified: boolean;
  verificationStatus: VerificationStatus;
  editorialStatus: EditorialStatus;
  verifiedAt?: string;
  independent: boolean;
};

export type SeedWatch = Omit<
  Watch,
  | "slug"
  | "brandSlug"
  | "diameterMm"
  | "verified"
  | "verificationStatus"
  | "editorialStatus"
  | "independent"
>;

export type WatchSeed = {
  schemaVersion: number;
  generatedAt: string;
  source: string;
  warning: string;
  watches: SeedWatch[];
  brandWatchlist: string[];
};

export type ReviewCandidate = {
  id: string;
  issueNumber?: number;
  status: ReviewStatus;
  detectedAt: string;
  reviewedAt?: string;
  blockers?: string[];
  watch: Watch;
};
