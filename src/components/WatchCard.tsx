import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "@/lib/data";
import type { Watch } from "@/lib/types";

function WatchImage({ watch }: { watch: Watch }) {
  const sources = [watch.imageUrl, ...(watch.imageFallbacks ?? [])].filter(
    (source, index, items): source is string => Boolean(source) && items.indexOf(source) === index,
  );
  const [sourceIndex, setSourceIndex] = useState(0);
  const source = sources[sourceIndex];

  if (!source) {
    return (
      <div className="image-placeholder" aria-label="Photo en cours de vérification">
        <span>{watch.editorialStatus === "researching" ? "Photo officielle à confirmer" : "Photo à rechercher"}</span>
      </div>
    );
  }

  return (
    <img
      src={source}
      alt={`${watch.brand} ${watch.model}`}
      loading="lazy"
      onError={() => setSourceIndex((index) => index + 1)}
    />
  );
}

export function WatchCard({
  watch,
  featured = false,
  compact = false,
}: {
  watch: Watch;
  featured?: boolean;
  compact?: boolean;
}) {
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
  const status = {
    publishable: { label: "Enrichie", className: "" },
    researching: { label: "Source trouvée", className: "pending" },
    backlog: { label: "À rechercher", className: "pending" },
    "broken-link": { label: "Lien à corriger", className: "broken" },
  }[watch.editorialStatus];

  return (
    <article className={`watch-card${featured ? " featured" : ""}${compact ? " compact-card" : ""}`}>
      {watch.productUrl ? (
        <a className="watch-visual" href={watch.productUrl} target="_blank" rel="noreferrer">
          <WatchImage watch={watch} />
          <span className={`edition-badge${watch.limitedEdition ? " limited" : ""}`}>
            {edition}
          </span>
          <span className={`verified-badge${status.className ? ` ${status.className}` : ""}`}>
            {status.label}
          </span>
        </a>
      ) : (
        <div className="watch-visual">
          <WatchImage watch={watch} />
          <span className={`edition-badge${watch.limitedEdition ? " limited" : ""}`}>
            {edition}
          </span>
          <span className={`verified-badge${status.className ? ` ${status.className}` : ""}`}>{status.label}</span>
        </div>
      )}
      <div className="watch-card-body">
        <div className="watch-meta">
          <Link to={`/brand/${watch.brandSlug}`}>{watch.brand}</Link>
          <span aria-hidden="true">·</span>
          <time dateTime={watch.date}>{formatDate(watch.date)}</time>
        </div>
        <h2>
          {watch.productUrl ? (
            <a href={watch.productUrl} target="_blank" rel="noreferrer">{watch.model}</a>
          ) : (
            watch.model
          )}
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
          {watch.productUrl ? (
            <a className="detail-link" href={watch.productUrl} target="_blank" rel="noreferrer">
              {watch.linkLabel ?? "Site officiel"} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="detail-link unavailable" aria-label="Source officielle à vérifier">
              Source à vérifier
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
