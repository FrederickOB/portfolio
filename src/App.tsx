import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { Providers } from "@/app/providers";
import { PageShell } from "@/components/layout/PageShell";
import { DataPortfolioPage } from "@/pages/DataPortfolioPage";
import { FrontendPortfolioPage } from "@/pages/FrontendPortfolioPage";
import { HomePage } from "@/pages/HomePage";

// The 3D gallery and the admin page ship as their own bundles, so the catalogue
// pages never download them.
const GalleryPage = lazy(() =>
  import("@/gallery/GalleryPage").then((module) => ({ default: module.GalleryPage })),
);
const AdminPage = lazy(() => import("@/admin/AdminPage").then((module) => ({ default: module.AdminPage })));

/** Links shared before the gallery became the home page: /gallery/afap → /afap. */
function OldGalleryLink() {
  const { exhibitId } = useParams();
  return <Navigate to={`/${exhibitId ?? ""}`} replace />;
}

const galleryFallback = <div className="fixed inset-0 bg-[#1a120c]" />;

export function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route
            path=":exhibitId?"
            element={
              <Suspense fallback={galleryFallback}>
                <GalleryPage />
              </Suspense>
            }
          />
          <Route path="gallery/:exhibitId?" element={<OldGalleryLink />} />
          <Route
            path="admin"
            element={
              <Suspense fallback={null}>
                <AdminPage />
              </Suspense>
            }
          />
          <Route element={<PageShell />}>
            <Route path="catalogue" element={<HomePage />} />
            <Route path="portfolio/frontend" element={<FrontendPortfolioPage />} />
            <Route path="portfolio/data" element={<DataPortfolioPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}
