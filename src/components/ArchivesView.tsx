"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Filters, type FilterKey, type SortKey } from "@/components/Filters";
import { WatchCard } from "@/components/WatchCard";
import { formatDate, watches } from "@/lib/data";
import type { Watch } from "@/lib/types";

const PAGE_SIZE = 24;

function matchesFilter(watch: Watch, filter: FilterKey) {
  if (filter === "limited") return watch.limitedEdition;
  if (filter === "permanent") return !watch.limitedEdition;
  return true;
}

export function ArchivesView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const edition = searchParams.get("edition");
  const filter: FilterKey = edition === "limited" || edition === "permanent" ? edition : "all";
  const sortParam = searchParams.get("sort");
  const sort: SortKey = sortParam === "brand" || sortParam === "diameter" ? sortParam : "newest";
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [view, setView] = useState<"cards" | "list">("cards");

  const updateSearch = (nextQuery: string, nextFilter: FilterKey, nextSort: SortKey) => {
    const next = new URLSearchParams();
    if (nextQuery.trim()) next.set("q", nextQuery);
    if (nextFilter !== "all") next.set("edition", nextFilter);
    if (nextSort !== "newest") next.set("sort", nextSort);
    setSearchParams(next, { replace: true });
    setLimit(PAGE_SIZE);
  };

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("fr");
    const results = watches.filter((watch) => {
      const matchesQuery = needle
        ? `${watch.brand} ${watch.model}`.toLocaleLowerCase("fr").includes(needle)
        : true;
      return matchesQuery && matchesFilter(watch, filter);
    });
    if (sort === "brand") return results.sort((a, b) => a.brand.localeCompare(b.brand, "fr"));
    if (sort === "diameter") {
      return results.sort((a, b) => (a.diameterMm ?? Number.POSITIVE_INFINITY) - (b.diameterMm ?? Number.POSITIVE_INFINITY));
    }
    return results;
  }, [filter, query, sort]);

  const grouped = useMemo(() => {
    return filtered.slice(0, limit).reduce<Record<string, Watch[]>>((result, watch) => {
      const group = sort === "newest" ? watch.date : "all";
      (result[group] ??= []).push(watch);
      return result;
    }, {});
  }, [filtered, limit, sort]);

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
        onQueryChange={(value) => updateSearch(value, filter, sort)}
        active={filter}
        onFilterChange={(value) => updateSearch(query, value, sort)}
        sort={sort}
        onSortChange={(value) => updateSearch(query, filter, value)}
      />
      <div className="archive-count">
        <div>
          <span>{filtered.length} nouveautés</span>
          <span>{filtered.filter((watch) => watch.editorialStatus === "publishable").length} enrichies</span>
        </div>
        <div className="view-toggle" aria-label="Mode d’affichage">
          <button type="button" className={view === "cards" ? "active" : ""} onClick={() => setView("cards")}>Cartes</button>
          <button type="button" className={view === "list" ? "active" : ""} onClick={() => setView("list")}>Liste</button>
        </div>
      </div>
      <section className={`archive-list ${view === "cards" ? "card-view" : "list-view"}`} aria-live="polite">
        {Object.entries(grouped).map(([date, items]) => (
          <div className="archive-group" key={date}>
            <h2>{date === "all" ? "Toutes les dates" : formatDate(date)}</h2>
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
                        <small className={watch.editorialStatus === "publishable" ? "is-verified" : ""}>
                          {watch.editorialStatus === "publishable"
                            ? "Enrichie"
                            : watch.editorialStatus === "researching"
                              ? "Source trouvée"
                              : watch.editorialStatus === "broken-link"
                                ? "Lien à corriger"
                                : "À rechercher"}
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
