import { Link } from "react-router-dom";
import { formatDate, watches } from "@/lib/data";

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
        <section className="archive-list brand-archive">
          <div className="archive-group">
            <h2>2026</h2>
            <div>
              {entries.map((watch) => (
                <Link className="archive-row" to={`/watch/${watch.slug}`} key={watch.id}>
                  <span className="archive-main">
                    <span className="archive-brand">{formatDate(watch.date)}</span>
                    <strong>{watch.model}</strong>
                    <span className="archive-specs">
                      {[watch.diameter, watch.material, watch.waterResistance]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </span>
                  <span className="archive-side">
                    <strong>{watch.price ?? "Prix non communiqué"}</strong>
                    <small className={watch.verified ? "is-verified" : ""}>
                      {watch.verified ? "Vérifiée" : "Seed à vérifier"}
                    </small>
                  </span>
                  <span className="row-arrow" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
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
