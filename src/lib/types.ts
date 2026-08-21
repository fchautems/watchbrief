export type VerificationStatus = "seed" | "verified" | "needs-review";

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
  limitedEdition: boolean;
  limitedQty?: number | null;
  summary?: string;
  productUrl?: string;
  imageUrl?: string;
  imageFallbacks?: string[];
  imageSource?: string;
  imageSourceUrl?: string;
  sources?: string[];
  notes?: string;
  sourceNotes?: string;
  verified: boolean;
  verificationStatus: VerificationStatus;
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
