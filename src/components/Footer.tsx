import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <span className="footer-brand">WatchBrief</span>
        <span>Nouveautés horlogères, sans le bruit.</span>
      </div>
      <div className="footer-links">
        <Link to="/brands">229 marques surveillées</Link>
        <Link to="/archives">Archives</Link>
      </div>
    </footer>
  );
}
