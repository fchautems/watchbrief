import { useState } from "react";
import type { ReviewCandidate, ReviewStatus } from "@/lib/types";

const apiBase = (import.meta.env.VITE_REVIEW_API_BASE ?? "https://watchbrief-review.fchautems.workers.dev").replace(/\/$/, "");

export function ReviewActions({ candidate }: { candidate: ReviewCandidate }) {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  if (candidate.status === "published" || candidate.status === "rejected") return null;

  if (!apiBase) {
    return <p className="review-action-note">Publication sécurisée en cours de raccordement.</p>;
  }

  async function decide(status: Extract<ReviewStatus, "published" | "rejected">) {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(`${apiBase}/candidates/${candidate.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const result = await response.json() as { message?: string; error?: string };
      if (!response.ok) throw new Error(result.error ?? "Mise à jour impossible");
      setMessage(status === "published" ? "Publiée : GitHub Pages déploie maintenant la mise à jour." : "Refusée : la candidate reste archivée hors site public.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Mise à jour impossible");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="review-actions">
      <button type="button" className="publish-action" onClick={() => decide("published")} disabled={busy || candidate.status === "needs-review"}>Publier</button>
      <button type="button" className="reject-action" onClick={() => decide("rejected")} disabled={busy}>Refuser</button>
      {candidate.status === "needs-review" && <p className="review-action-note">Cette candidate doit d’abord être complétée.</p>}
      {message && <p className="review-action-note">{message}</p>}
    </div>
  );
}
