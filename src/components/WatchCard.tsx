import { Link } from "react-router-dom";
import { formatDate } from "@/lib/data";
import type { Watch } from "@/lib/types";

function WatchImage({ watch }: { watch: Watch }) {
  if (!watch.imageUrl) {
    return (
      <div className="image-placeholder" aria-label="Photo en cours de vérification">
        <span>Photo en cours de vérification</span>
      </div>
    );
  }

  return (
    <img
      src={watch.imageUrl}
      alt={`${watch.brand} ${watch.model}`}
      loading="lazy"
      onError={(event) => {
        const image = event.currentTarget;
        const fallback = watch.imageFallbacks?.find((item) => item !== image.src);
        if (fallback) image.src = fallback;
      }}
    />
  );
}

export function WatchCard({ watch, featured = false }: { watch: Watch; featured?: boolean }) {
  const edition = watch.limitedEdition
    ? watch.limitedQty
      ? `Limitée · ${watch.limitedQty}`
      : "Édition limitée"
    : "Collection permanente";

  const specs = [
    watch.diameter,
    watch.thickness,
    watch.lugToLug ? `L2L ${watch.lugToLug}` : undefined,
    watch.waterResistance,
    watch.powerReserve,
  ].filter(Boolean);

  return (
    <article className={`watch-card${featured ? " featured" : ""}`}>
      <Link className="watch-visual" to={`/watch/${watch.slug}`}>
        <WatchImage watch={watch} />
        <span className={`edition-badge${watch.limitedEdition ? " limited" : ""}`}>
          {edition}
        </span>
        {watch.verified && <span className="verified-badge">Vérifiée</span>}
      </Link>
      <div className="watch-card-body">
        <div className="watch-meta">
          <Link to={`/brand/${watch.brandSlug}`}>{watch.brand}</Link>
          <span aria-hidden="true">·</span>
          <time dateTime={watch.date}>{formatDate(watch.date)}</time>
        </div>
        <h2>
          <Link to={`/watch/${watch.slug}`}>{watch.model}</Link>
        </h2>
        <div className="spec-list" aria-label="Caractéristiques principales">
          {specs.map((spec) => (
            <span key={spec}>{spec}</span>
          ))}
        </div>
        <p className="watch-summary">
          {watch.summary ??
            "Entrée importée depuis la veille WatchBrief. Vérification éditoriale en cours."}
        </p>
        <div className="watch-card-footer">
          <div>
            <strong>{watch.price ?? "Prix non communiqué"}</strong>
            <small>{edition}</small>
          </div>
          <Link className="detail-link" to={`/watch/${watch.slug}`}>
            Voir la fiche <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
