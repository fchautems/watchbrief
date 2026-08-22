import { Link } from "react-router-dom";
import { WatchCard } from "@/components/WatchCard";
import { watches } from "@/lib/data";

export function BrandView({ name, slug }: { name: string; slug: string }) {
  const entries = watches.filter((watch) => watch.brandSlug === slug);

  return (
    <>
      <Link className="back-link" to="/brands">← Toutes les marques</Link>
      <section className="brand-hero">
        <div>
          <p className="kicker">Marque surveillée</p>
          <h1>{name}</h1>
        </div>
        <div className="brand-stat">
          <strong>{entries.length}</strong>
          <span>nouveauté{entries.length > 1 ? "s" : ""} enregistrée{entries.length > 1 ? "s" : ""}</span>
        </div>
      </section>
      {entries.length ? (
        <section className="brand-watch-section" aria-labelledby="brand-news-title">
          <div className="section-heading">
            <div>
              <p className="kicker">Dernières sorties</p>
              <h2 id="brand-news-title">Nouveautés {name}</h2>
            </div>
            <span>{entries.length} enregistrée{entries.length > 1 ? "s" : ""}</span>
          </div>
          <div className="watch-grid brand-watch-grid">
            {entries.map((watch) => <WatchCard key={watch.id} watch={watch} />)}
          </div>
        </section>
      ) : (
        <section className="brand-empty">
          <span className="empty-orbit" aria-hidden="true">W</span>
          <h2>Surveillance active.</h2>
          <p>Aucune nouveauté n’a encore été retenue pour cette marque.</p>
          <Link to="/">Revenir aux nouveautés</Link>
        </section>
      )}
    </>
  );
}
