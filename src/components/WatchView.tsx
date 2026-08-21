import { Link } from "react-router-dom";
import { formatDate } from "@/lib/data";
import type { Watch } from "@/lib/types";

export function WatchView({ watch }: { watch: Watch }) {
  const specs = [
    ["Mouvement", watch.movement],
    ["Diamètre", watch.diameter],
    ["Épaisseur", watch.thickness ?? "Non communiquée"],
    ["Lug-to-lug", watch.lugToLug ?? "Non communiqué"],
    ["Matériau", watch.material],
    ["Étanchéité", watch.waterResistance],
    ["Réserve de marche", watch.powerReserve],
    ["Prix", watch.price ?? "Non communiqué"],
  ];
  const edition = watch.limitedEdition
    ? watch.limitedQty
      ? `Édition limitée à ${watch.limitedQty} pièces`
      : "Édition limitée — quantité non communiquée"
    : "Collection permanente";

  return (
    <article className="watch-detail">
      <Link className="back-link" to="/">← Nouveautés</Link>
      <div className="detail-grid">
        <div className="detail-media">
          {watch.imageUrl ? (
            <img src={watch.imageUrl} alt={`${watch.brand} ${watch.model}`} />
          ) : (
            <div className="image-placeholder large">
              <span>Photo exacte en cours de vérification</span>
            </div>
          )}
          {watch.imageSourceUrl && (
            <a className="image-credit" href={watch.imageSourceUrl} target="_blank" rel="noreferrer">
              Photo : {watch.imageSource} ↗
            </a>
          )}
        </div>
        <div className="detail-copy">
          <div className="detail-topline">
            <Link to={`/brand/${watch.brandSlug}`}>{watch.brand}</Link>
            <time dateTime={watch.date}>{formatDate(watch.date)}</time>
          </div>
          <h1>{watch.model}</h1>
          <div className="detail-statuses">
            <span className={watch.limitedEdition ? "limited" : ""}>{edition}</span>
            <span className={watch.verified ? "verified" : "seed"}>
              {watch.verified ? "Données vérifiées" : "Seed à vérifier"}
            </span>
          </div>
          <p className="detail-summary">
            {watch.summary ??
              "Cette entrée provient de l’historique WatchBrief. Sa vérification éditoriale et sa photo exacte doivent encore être complétées avant mise en avant."}
          </p>
          <dl className="detail-specs">
            {specs.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value ?? "Non communiqué"}</dd>
              </div>
            ))}
          </dl>
          {watch.productUrl && (
            <a className="official-button" href={watch.productUrl} target="_blank" rel="noreferrer">
              Fiche officielle <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
      {(watch.sources?.length || watch.sourceNotes || watch.notes) && (
        <section className="source-panel">
          <div>
            <p className="kicker">Traçabilité</p>
            <h2>Sources et vérification</h2>
          </div>
          <div>
            {watch.sourceNotes && <p>{watch.sourceNotes}</p>}
            {!watch.sourceNotes && watch.notes && <p>{watch.notes}</p>}
            {watch.sources?.map((source, index) => (
              <a key={source} href={source} target="_blank" rel="noreferrer">
                Source {index + 1} ↗
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
