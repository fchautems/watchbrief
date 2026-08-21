export type FilterKey = "all" | "verified" | "limited" | "permanent";

type FiltersProps = {
  query: string;
  onQueryChange: (value: string) => void;
  active: FilterKey;
  onFilterChange: (value: FilterKey) => void;
  compact?: boolean;
  showVerified?: boolean;
};

const baseFilters: Array<{ key: FilterKey; label: string }> = [
  { key: "all", label: "Toutes" },
  { key: "limited", label: "Éditions limitées" },
  { key: "permanent", label: "Collection permanente" },
];

export function Filters({
  query,
  onQueryChange,
  active,
  onFilterChange,
  compact = false,
  showVerified = false,
}: FiltersProps) {
  const filters = showVerified
    ? [baseFilters[0], { key: "verified" as const, label: "Vérifiées" }, ...baseFilters.slice(1)]
    : baseFilters;

  return (
    <div className={`filter-bar${compact ? " compact" : ""}`}>
      <label className="search-wrap">
        <span className="sr-only">Rechercher une marque ou un modèle</span>
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4 4" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Rechercher une marque ou un modèle"
        />
      </label>
      <div className="filter-chips" aria-label="Filtres">
        {filters.map((filter) => (
          <button
            key={filter.key}
            className={active === filter.key ? "active" : ""}
            type="button"
            aria-pressed={active === filter.key}
            onClick={() => onFilterChange(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
