import { useEffect } from "react";
import { Link, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { ArchivesView } from "@/components/ArchivesView";
import { BrandView } from "@/components/BrandView";
import { BrandsView } from "@/components/BrandsView";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HomeView } from "@/components/HomeView";
import { getBrand, getWatch } from "@/lib/data";

function Shell({ children, active }: { children: React.ReactNode; active?: "news" | "brands" | "archives" }) {
  return (
    <>
      <Header active={active} />
      <main className="page-shell">{children}</main>
      <Footer />
    </>
  );
}

function PageTitle({ title }: { title?: string }) {
  useEffect(() => {
    document.title = title
      ? `${title} · WatchBrief`
      : "WatchBrief — Nouveautés horlogères sélectionnées";
  }, [title]);
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0 }), [pathname]);
  return null;
}

function HomePage() {
  return <Shell active="news"><PageTitle /><HomeView /></Shell>;
}

function BrandsPage() {
  return <Shell active="brands"><PageTitle title="Marques" /><BrandsView /></Shell>;
}

function ArchivesPage() {
  return <Shell active="archives"><PageTitle title="Archives" /><ArchivesView /></Shell>;
}

function BrandPage() {
  const { slug = "" } = useParams();
  const brand = getBrand(slug);
  if (!brand) return <Navigate to="/not-found" replace />;
  return <Shell active="brands"><PageTitle title={brand.name} /><BrandView name={brand.name} slug={brand.slug} /></Shell>;
}

function LegacyWatchRedirect() {
  const { slug = "" } = useParams();
  const watch = getWatch(slug);
  useEffect(() => {
    if (watch?.productUrl) window.location.replace(watch.productUrl);
  }, [watch]);

  if (!watch) return <Navigate to="/not-found" replace />;
  if (!watch.productUrl) return <Navigate to="/archives" replace />;
  return null;
}

function NotFoundPage() {
  return (
    <Shell>
      <PageTitle title="Page introuvable" />
      <section className="brand-empty">
        <span className="empty-orbit" aria-hidden="true">W</span>
        <h1>Page introuvable.</h1>
        <p>Cette montre ou cette marque n’existe pas dans WatchBrief.</p>
        <Link to="/">Revenir aux nouveautés</Link>
      </section>
    </Shell>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/brand/:slug" element={<BrandPage />} />
        <Route path="/archives" element={<ArchivesPage />} />
        <Route path="/watch/:slug" element={<LegacyWatchRedirect />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </>
  );
}
