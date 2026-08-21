import { Link } from "react-router-dom";

type HeaderProps = {
  active?: "news" | "brands" | "archives";
};

export function Header({ active }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" to="/" aria-label="WatchBrief — Accueil">
          <span className="watchbrief-mark" aria-hidden="true">
            W
          </span>
          <span>WatchBrief</span>
        </Link>
        <nav className="primary-nav" aria-label="Navigation principale">
          <Link className={active === "news" ? "active" : ""} to="/">
            Nouveautés
          </Link>
          <Link
            className={active === "brands" ? "active" : ""}
            to="/brands"
          >
            Marques
          </Link>
          <Link
            className={active === "archives" ? "active" : ""}
            to="/archives"
          >
            Archives
          </Link>
        </nav>
      </div>
    </header>
  );
}
