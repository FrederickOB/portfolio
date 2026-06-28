import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Providers } from "@/app/providers";
import { PageShell } from "@/components/layout/PageShell";
import { DataPortfolioPage } from "@/pages/DataPortfolioPage";
import { FrontendPortfolioPage } from "@/pages/FrontendPortfolioPage";
import { HomePage } from "@/pages/HomePage";

export function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route element={<PageShell />}>
            <Route index element={<HomePage />} />
            <Route path="portfolio/frontend" element={<FrontendPortfolioPage />} />
            <Route path="portfolio/data" element={<DataPortfolioPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}
