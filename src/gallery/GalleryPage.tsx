import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import { PageMeta } from "@/components/seo/PageMeta";
import { GALLERY_COPY, HOME_COPY } from "@/content/site-copy";
import { useContent } from "@/context/ContentContext";
import { GalleryHud } from "./GalleryHud";
import { GalleryScene } from "./GalleryScene";
import { buildLayout } from "./layout";
import { useGallery } from "./store";

export function GalleryPage() {
  const { exhibitId } = useParams();
  const navigate = useNavigate();
  const { works, achievements, experience, status } = useContent();
  const layout = useMemo(
    () => (status === "ready" ? buildLayout(works, achievements) : null),
    [status, works, achievements],
  );
  const focusedId = useGallery((state) => state.focusedId);
  const [sceneReady, setSceneReady] = useState(false);
  const onSceneReady = useCallback(() => setSceneReady(true), []);

  // A deep link only decides where the visit starts; after that the URL follows the visitor.
  const startAt = useRef(exhibitId);
  const syncedId = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    if (!layout) return;
    useGallery.getState().enter(layout, startAt.current);
    syncedId.current = useGallery.getState().focusedId;
  }, [layout]);

  useEffect(() => {
    if (!layout || syncedId.current === undefined || focusedId === syncedId.current) return;
    syncedId.current = focusedId;
    navigate(focusedId ? `/${focusedId}` : "/", { replace: true });
  }, [focusedId, layout, navigate]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#1a120c] font-sans text-white">
      <PageMeta title={HOME_COPY.seo.title} description={HOME_COPY.seo.description} />
      {/* The gallery is a canvas, so search engines and screen readers get the essentials as text. */}
      <div className="sr-only">
        <h1>
          {GALLERY_COPY.exhibition.artist}: {GALLERY_COPY.exhibition.title}
        </h1>
        <p>{HOME_COPY.headline}</p>
        <p>{HOME_COPY.subhead}</p>
        <nav aria-label="Portfolio">
          <Link to="/catalogue">Read the catalogue</Link>
          <Link to="/portfolio/frontend">Frontend engineering work</Link>
          <Link to="/portfolio/data">Data and analytics work</Link>
        </nav>
      </div>
      {layout && <GalleryScene layout={layout} experience={experience} onReady={onSceneReady} />}
      <GalleryHud layout={layout} status={status} sceneReady={sceneReady} />
    </div>
  );
}
