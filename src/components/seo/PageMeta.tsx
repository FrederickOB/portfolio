import { useEffect } from "react";
import { SITE_LINKS } from "@/content/site-copy";

interface PageMetaProps {
  title: string;
  description: string;
  image?: string;
}

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let meta = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

export function PageMeta({ title, description, image }: PageMetaProps) {
  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    if (image) {
      setMeta("property", "og:image", image);
      setMeta("name", "twitter:image", image);
    }
  }, [title, description, image]);

  return null;
}

export const DEFAULT_OG_IMAGE = SITE_LINKS.memoji;
