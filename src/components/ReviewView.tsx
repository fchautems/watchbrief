import { Link } from "react-router-dom";
import { ReviewActions } from "@/components/ReviewActions";
import { WatchCard } from "@/components/WatchCard";
import { reviewCandidates, reviewStatusLabel } from "@/lib/review";

export function ReviewView() {
  const ready = reviewCandidates.filter((candidate) => candidate.status === "approved").length;
  const pending = reviewCandidates.filter((candidate) => candidate.status === "review" || candidate.status === "needs-review").length;

  return (
    <section className="review-view">
      <Link className="back-link" to="/">← Site public</Link>
      <header className="review-hero">
        <p className="kicker">Bureau éditorial</p>
        <h1>Validation des nouveautés.</h1>
        <p>Ces fiches ne sont pas publiques. Une publication ajoute immédiatement la montre aux nouveautés après le déploiement GitHub Pages.</p>
        <div className="review-counters"><span>{ready} prêtes à publier</span><span>{pending} à compléter ou décider</span></div>
      </header>
      <div className="review-grid">
        {reviewCandidates.map((candidate) => (
          <article className="review-candidate" key={candidate.id}>
            <div className="review-status"><span className={`review-pill is-${candidate.status}`}>{reviewStatusLabel[candidate.status]}</span>{candidate.issueNumber && <a href={`https://github.com/fchautems/watchbrief/issues/${candidate.issueNumber}`} target="_blank" rel="noreferrer">Dossier #{candidate.issueNumber} ↗</a>}</div>
            <WatchCard watch={candidate.watch} compact />
            {candidate.blockers?.length ? <ul className="review-blockers">{candidate.blockers.map((blocker) => <li key={blocker}>{blocker}</li>)}</ul> : null}
            <ReviewActions candidate={candidate} />
          </article>
        ))}
      </div>
    </section>
  );
}
