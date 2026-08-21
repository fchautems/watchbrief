"use client";

import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Filters, type FilterKey } from "@/components/Filters";
import { WatchCard } from "@/components/WatchCard";
import { seedMeta, verifiedWatches } from "@/lib/data";
import type { Watch } from "@/lib/types";

function matchesFilter(watch: Watch, filter: FilterKey) {
  if (filter === "limited") return watch.limitedEdition;
  if (filter === "permanent") return !watch.limitedEdition;
  return true;
}

export function HomeView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const edition = searchParams.get("edition");
  const filter: FilterKey = edition === "limited" || edition === "permanent" ? edition : "all";

  const updateSearch = (nextQuery: string, nextFilter: FilterKey) => {
    const next = new URLSearchParams();
    if (nextQuery.trim()) next.set("q", nextQuery);
    if (nextFilter !== "all") next.set("edition", nextFilter);
    setSearchParams(next, { replace: true });
  };
  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("fr");
    return verifiedWatches
      .filter((watch) => matchesFilter(watch, filter))
      .filter((watch) =>
        needle
          ? `${watch.brand} ${watch.model}`.toLocaleLowerCase("fr").includes(needle)
          : true,
      )
      .slice(0, 10);
  }, [filter, query]);

  return (
    <>
      <section className="intro-block">
        <p className="kicker">Sélection quotidienne</p>
        <h1>Nouveautés horlogères sélectionnées.</h1>
        <p className="intro-copy">
          Les sorties qui valent le détour — photo exacte, dimensions utiles,
          prix, statut d’édition et lien officiel.
        </p>
        <div className="update-line">
          <span className="update-time">18:30</span>
          <span>21 août 2026</span>
          <span aria-hidden="true">·</span>
          <span>{verifiedWatches.length} fiches enrichies</span>
          <span className="seed-counter">{seedMeta.watchCount} nouveautés suivies</span>
        </div>
      </section>

      <Filters
        query={query}
        onQueryChange={(value) => updateSearch(value, filter)}
        active={filter}
        onFilterChange={(value) => updateSearch(query, value)}
      />

      <section className="section-block" aria-labelledby="latest-title">
        <div className="section-heading">
          <div>
            <p className="kicker">Édition du jour</p>
            <h2 id="latest-title">Dernières nouveautés</h2>
          </div>
          <span>{visible.length} sélectionnées</span>
        </div>
        {visible.length ? (
          <div className="watch-grid">
            {visible.map((watch, index) => (
              <WatchCard key={watch.id} watch={watch} featured={index === 0} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>Aucune montre ne correspond à cette recherche.</p>
            <button
              type="button"
              onClick={() => {
                setSearchParams({}, { replace: true });
              }}
            >
              Effacer les filtres
            </button>
          </div>
        )}
        <Link className="more-link" to="/archives">
          Voir les {seedMeta.watchCount} nouveautés <span aria-hidden="true">→</span>
        </Link>
      </section>
    </>
  );
}
