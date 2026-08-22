import rawCandidates from "@/data/review-candidates.json";
import type { ReviewCandidate } from "@/lib/types";

export const reviewCandidates = rawCandidates as ReviewCandidate[];

export const reviewStatusLabel = {
  review: "À décider",
  approved: "Prête à publier",
  published: "Publiée",
  rejected: "Refusée",
  "needs-review": "À compléter",
} as const;
