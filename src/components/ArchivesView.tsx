"use client";

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Filters, type FilterKey } from "@/components/Filters";
import { formatDate, watches } from "@/lib/data";
import type { Watch } from "@/lib/types";

const PAGE_SIZE = 24;

function matchesFilter(watch: Watch, filter: FilterKey) {
  if (filter === "limited") return watch.limitedEdition;
  if (filter === "compact")
    return watch.diameterMm !== null && watch.diameterMm !== undefined && watch.diameterMm <= 40;
  if (filter === "independent") return watch.independent;
  return true;
}

export function ArchivesView() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [limit, setLimit] = useState(PAGE_SIZE);

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
        <span>{filtered.length} nouveautés</span>
        <span>{filtered.filter((watch) => watch.verified).length} vérifiées</span>
      </div>
      <section className="archive-list" aria-live="polite">
        {Object.entries(grouped).map(([date, items]) => (
          <div className="archive-group" key={date}>
            <h2>{formatDate(date)}</h2>
            <div>
              {items.map((watch) => (
                <Link className="archive-row" to={`/watch/${watch.slug}`} key={watch.id}>
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
                      {watch.verified ? "Vérifiée" : "Seed à vérifier"}
                    </small>
                  </span>
                  <span className="row-arrow" aria-hidden="true">→</span>
                </Link>
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
