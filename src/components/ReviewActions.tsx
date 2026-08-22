import { useState } from "react";
import type { ReviewCandidate, ReviewStatus } from "@/lib/types";

type DeviceCode = {
  user_code: string;
  verification_uri: string;
  verification_uri_complete?: string;
  device_code: string;
  interval?: number;
};

const apiBase = (import.meta.env.VITE_REVIEW_API_BASE ?? "").replace(/\/$/, "");
const tokenKey = "watchbrief-review-github-token";

export function ReviewActions({ candidate }: { candidate: ReviewCandidate }) {
  const [token, setToken] = useState(() => sessionStorage.getItem(tokenKey));
  const [device, setDevice] = useState<DeviceCode | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  if (candidate.status === "published" || candidate.status === "rejected") return null;

  if (!apiBase) {
    return <p className="review-action-note">Publication sécurisée en cours de raccordement.</p>;
  }

  async function connect() {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(`${apiBase}/auth/device-code`, { method: "POST" });
      const result = await response.json() as DeviceCode & { error?: string };
      if (!response.ok || result.error) throw new Error(result.error ?? "Connexion GitHub indisponible");
      setDevice(result);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Connexion GitHub indisponible");
    } finally {
      setBusy(false);
    }
  }

  async function finishConnect() {
    if (!device) return;
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(`${apiBase}/auth/device-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device_code: device.device_code }),
      });
      const result = await response.json() as { access_token?: string; error?: string };
      if (!response.ok || !result.access_token) throw new Error(result.error ?? "Autorisation encore en attente");
      sessionStorage.setItem(tokenKey, result.access_token);
      setToken(result.access_token);
      setDevice(null);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Autorisation encore en attente");
    } finally {
      setBusy(false);
    }
  }

  async function decide(status: Extract<ReviewStatus, "published" | "rejected">) {
    if (!token) return;
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(`${apiBase}/candidates/${candidate.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
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

  if (!token) {
    return (
      <div className="review-actions">
        {!device ? <button type="button" onClick={connect} disabled={busy}>Connecter GitHub</button> : (
          <div className="device-login">
            <span>Entre le code <strong>{device.user_code}</strong> sur GitHub, puis reviens ici.</span>
            <a href={device.verification_uri_complete ?? device.verification_uri} target="_blank" rel="noreferrer">Autoriser GitHub ↗</a>
            <button type="button" onClick={finishConnect} disabled={busy}>J’ai autorisé</button>
          </div>
        )}
        {message && <p className="review-action-note">{message}</p>}
      </div>
    );
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
