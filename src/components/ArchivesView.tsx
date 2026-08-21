"use client";

import { useMemo, useState } from "react";
import { Filters, type FilterKey } from "@/components/Filters";
import { WatchCard } from "@/components/WatchCard";
import { formatDate, watches } from "@/lib/data";
import type { Watch } from "@/lib/types";

const PAGE_SIZE = 24;

function matchesFilter(watch: Watch, filter: FilterKey) {
  if (filter === "verified") return watch.verified;
  if (filter === "limited") return watch.limitedEdition;
  if (filter === "permanent") return !watch.limitedEdition;
  return true;
}

export function ArchivesView() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [view, setView] = useState<"cards" | "list">("cards");

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("fr");
    return watches.filter((watch) => {
      const matchesQuery = needle
        ? `${watch.brand} ${watch.model}`.toLocaleLowerCase("fr").includes(needle)
        : true;
      return matchesQuery && matchesFilter(watch, filter);
    });
  }, [filter, query]);

  const grouped = useMemo(() => {
    return filtered.slice(0, limit).reduce<Record<string, Watch[]>>((result, watch) => {
      (result[watch.date] ??= []).push(watch);
      return result;
    }, {});
  }, [filtered, limit]);

  return (
    <>
      <section className="intro-block compact-intro">
        <p className="kicker">Historique complet</p>
        <h1>Archives.</h1>
        <p className="intro-copy">
          Toutes les nouveautés enregistrées, de la plus récente à la plus ancienne.
        </p>
      </section>
      <Filters
        compact
        showVerified
        query={query}
        onQueryChange={(value) => {
          setQuery(value);
          setLimit(PAGE_SIZE);
        }}
        active={filter}
        onFilterChange={(value) => {
          setFilter(value);
          setLimit(PAGE_SIZE);
        }}
      />
      <div className="archive-count">
        <div>
          <span>{filtered.length} nouveautés</span>
          <span>{filtered.filter((watch) => watch.verified).length} vérifiées</span>
        </div>
        <div className="view-toggle" aria-label="Mode d’affichage">
          <button type="button" className={view === "cards" ? "active" : ""} onClick={() => setView("cards")}>Cartes</button>
          <button type="button" className={view === "list" ? "active" : ""} onClick={() => setView("list")}>Liste</button>
        </div>
      </div>
      <section className={`archive-list ${view === "cards" ? "card-view" : "list-view"}`} aria-live="polite">
        {Object.entries(grouped).map(([date, items]) => (
          <div className="archive-group" key={date}>
            <h2>{formatDate(date)}</h2>
            <div className="archive-items">
              {view === "cards"
                ? items.map((watch) => <WatchCard compact key={watch.id} watch={watch} />)
                : items.map((watch) => (
                    <article className="archive-row" key={watch.id}>
                      <span className="archive-main">
                        <span className="archive-brand">{watch.brand}</span>
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
                          {watch.verified ? "Vérifiée" : "À vérifier"}
                        </small>
                      </span>
                      {watch.productUrl ? (
                        <a className="row-arrow" href={watch.productUrl} target="_blank" rel="noreferrer" aria-label={`Voir ${watch.brand} ${watch.model} sur le site officiel`}>↗</a>
                      ) : (
                        <span className="row-arrow muted" aria-hidden="true">—</span>
                      )}
                    </article>
                  ))}
            </div>
          </div>
        ))}
        {!filtered.length && <div className="empty-state">Aucun résultat.</div>}
      </section>
      {limit < filtered.length && (
        <button className="load-more" type="button" onClick={() => setLimit((value) => value + PAGE_SIZE)}>
          Afficher plus
        </button>
      )}
    </>
  );
}
