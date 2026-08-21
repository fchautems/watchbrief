"use client";

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { brands } from "@/lib/data";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function BrandsView() {
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState<string | null>(null);

  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("fr");
    return brands.filter((brand) => {
      const matchesQuery = needle
        ? brand.name.toLocaleLowerCase("fr").includes(needle)
        : true;
      const matchesLetter = letter
        ? brand.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").startsWith(letter)
        : true;
      return matchesQuery && matchesLetter;
    });
  }, [letter, query]);

  return (
    <>
      <section className="intro-block compact-intro">
        <p className="kicker">Watchlist</p>
        <h1>Toutes les marques.</h1>
        <p className="intro-copy">
          De la grande manufacture à la micro-marque : 229 maisons surveillées.
        </p>
      </section>
      <label className="brand-search search-wrap">
        <span className="sr-only">Rechercher une marque</span>
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4 4" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher une marque"
        />
      </label>
      <div className="alphabet" aria-label="Index alphabétique">
        <button
          type="button"
          className={letter === null ? "active" : ""}
          onClick={() => setLetter(null)}
        >
          Toutes
        </button>
        {alphabet.map((item) => (
          <button
            type="button"
            key={item}
            className={letter === item ? "active" : ""}
            onClick={() => setLetter(letter === item ? null : item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="brands-heading">
        <span>{visible.length} marques</span>
        {letter && <span>Lettre {letter}</span>}
      </div>
      <section className="brand-grid" aria-live="polite">
        {visible.map((brand) => (
          <Link to={`/brand/${brand.slug}`} className="brand-card" key={brand.slug}>
            <strong>{brand.name}</strong>
            <span>
              {brand.count > 0
                ? `${brand.count} nouveauté${brand.count > 1 ? "s" : ""}`
                : "Surveillée"}
            </span>
            <span className="brand-arrow" aria-hidden="true">↗</span>
          </Link>
        ))}
      </section>
    </>
  );
}
