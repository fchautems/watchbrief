import { useState } from "react";
import { Link } from "react-router-dom";
import { ReviewActions } from "@/components/ReviewActions";
import { WatchCard } from "@/components/WatchCard";
import { reviewCandidates, reviewStatusLabel } from "@/lib/review";

const apiBase = (import.meta.env.VITE_REVIEW_API_BASE ?? "https://watchbrief-review.fchautems.workers.dev").replace(/\/$/, "");
const passwordKey = "watchbrief-review-password";

function savedPassword() {
  const persistent = localStorage.getItem(passwordKey);
  const previousSession = sessionStorage.getItem(passwordKey);
  if (!persistent && previousSession) localStorage.setItem(passwordKey, previousSession);
  return persistent ?? previousSession ?? "";
}

export function ReviewView() {
  const [password, setPassword] = useState(savedPassword);
  const [draftPassword, setDraftPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [checkingPassword, setCheckingPassword] = useState(false);
  const ready = reviewCandidates.filter((candidate) => candidate.status === "approved").length;
  const pending = reviewCandidates.filter((candidate) => candidate.status === "review" || candidate.status === "needs-review").length;

  async function rememberPassword() {
    setCheckingPassword(true);
    setAuthMessage("");
    try {
      const response = await fetch(`${apiBase}/auth/check`, { headers: { "X-Review-Password": draftPassword } });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Mot de passe invalide");
      localStorage.setItem(passwordKey, draftPassword);
      sessionStorage.removeItem(passwordKey);
      setPassword(draftPassword);
      setDraftPassword("");
    } catch (error) {
      setAuthMessage(error instanceof Error ? error.message : "Validation impossible");
    } finally {
      setCheckingPassword(false);
    }
  }

  function forgetPassword() {
    localStorage.removeItem(passwordKey);
    sessionStorage.removeItem(passwordKey);
    setPassword("");
  }

  return (
    <section className="review-view">
      <Link className="back-link" to="/">← Site public</Link>
      <header className="review-hero">
        <p className="kicker">Bureau éditorial</p>
        <h1>Validation des nouveautés.</h1>
        <p>Ces fiches ne sont pas publiques. Une publication ajoute immédiatement la montre aux nouveautés après le déploiement GitHub Pages.</p>
        <div className="review-counters"><span>{ready} prêtes à publier</span><span>{pending} à compléter ou décider</span></div>
        <div className="review-auth">
          {password ? (
            <><span>Validation mémorisée sur cet appareil.</span><button type="button" onClick={forgetPassword}>Oublier</button></>
          ) : (
            <><input type="password" autoComplete="current-password" placeholder="Mot de passe de validation" value={draftPassword} onChange={(event) => setDraftPassword(event.target.value)} /><button type="button" onClick={rememberPassword} disabled={!draftPassword || checkingPassword}>Mémoriser</button></>
          )}
          {authMessage && <span className="review-auth-error">{authMessage}</span>}
        </div>
      </header>
      <div className="review-grid">
        {reviewCandidates.map((candidate) => (
          <article className="review-candidate" key={candidate.id}>
            <div className="review-status"><span className={`review-pill is-${candidate.status}`}>{reviewStatusLabel[candidate.status]}</span>{candidate.issueNumber && <a href={`https://github.com/fchautems/watchbrief/issues/${candidate.issueNumber}`} target="_blank" rel="noreferrer">Dossier #{candidate.issueNumber} ↗</a>}</div>
            <WatchCard watch={candidate.watch} compact />
            {candidate.blockers?.length ? <ul className="review-blockers">{candidate.blockers.map((blocker) => <li key={blocker}>{blocker}</li>)}</ul> : null}
            <ReviewActions candidate={candidate} password={password} />
          </article>
        ))}
      </div>
    </section>
  );
}
