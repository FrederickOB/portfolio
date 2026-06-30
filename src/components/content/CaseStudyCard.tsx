import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import type { CaseStudy } from "@/content/site-copy";
import { useThemeColor } from "@/context/ColorThemeContext";
import { cn } from "@/lib/utils";

const BODY_PREVIEW_LENGTH = 280;

function parseTagPills(tags: string): string[] {
  return tags
    .split(/[·,]/)
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 4);
}

function CaseStudyImagePlaceholder({ label }: { label: string }) {
  const { color } = useThemeColor();

  return (
    <div className="flex h-full min-h-48 items-end bg-gradient-to-br from-gray-100 to-gray-200 p-6 dark:from-gray-800 dark:to-gray-900 md:min-h-56">
      <span
        className={`text-xs font-medium uppercase tracking-wider ${color.text}`}
      >
        {label}
      </span>
    </div>
  );
}

function CaseStudyImage({
  src,
  alt,
  onError,
}: {
  src: string;
  alt: string;
  onError: () => void;
}) {
  return (
    <div className="group relative h-full min-h-48  overflow-hidden md:min-h-full">
      <img
        src={src}
        alt={alt}
        className="h-full min-h-48 w-full object-cover aspect-video object-top transition duration-500 group-hover:scale-105 md:min-h-56 lg:min-h-full"
        onError={onError}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition group-hover:opacity-80" />
    </div>
  );
}

export function CaseStudyCard({
  study,
  index = 0,
  alternate = false,
}: {
  study: CaseStudy;
  index?: number;
  alternate?: boolean;
}) {
  const { color } = useThemeColor();
  const [imageFailed, setImageFailed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const showImage = study.image && !imageFailed;
  const isLongBody = study.body.length > BODY_PREVIEW_LENGTH;
  const bodyPreview = isLongBody
    ? `${study.body.slice(0, BODY_PREVIEW_LENGTH).trim()}…`
    : study.body;
  const tagPills = parseTagPills(study.tags);
  const reversed = alternate && index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="glass overflow-hidden rounded-2xl border"
    >
      <div
        className={cn(
          "grid md:grid-cols-2 md:items-stretch",
          reversed && "[&>*:first-child]:md:order-2",
        )}
      >
        {showImage ? (
          <CaseStudyImage
            src={study.image!}
            alt={study.title}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <CaseStudyImagePlaceholder label="Case Study" />
        )}

        <div className="flex flex-col justify-center space-y-4 p-6 md:p-8">
          <div className="flex flex-wrap gap-2">
            {tagPills.map((tag) => (
              <span
                key={tag}
                className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${color.border} bg-white/40 dark:bg-black/20`}
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
            {study.title}
          </h3>

          {study.metrics && study.metrics.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {study.metrics.map((metric) => (
                <span
                  key={metric}
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold ${color.bg} text-white`}
                >
                  {metric}
                </span>
              ))}
            </div>
          )}

          <p className="text-sm leading-relaxed text-foreground/90 md:text-base">
            {expanded || !isLongBody ? study.body : bodyPreview}
          </p>

          {isLongBody && (
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className={`inline-flex items-center gap-1 text-sm font-medium ${color.text} hover:underline`}
            >
              {expanded ? (
                <>
                  Show less <FiChevronUp />
                </>
              ) : (
                <>
                  Read more <FiChevronDown />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
