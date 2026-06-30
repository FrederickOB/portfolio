import { motion } from "framer-motion";
import { useState } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import type { ProjectEntry } from "@/content/site-copy";
import { useThemeColor } from "@/context/ColorThemeContext";

function SideProjectCard({
  project,
  index,
}: {
  project: ProjectEntry;
  index: number;
}) {
  const { color } = useThemeColor();
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = project.image && !imageFailed;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="glass group flex h-full flex-col overflow-hidden rounded-2xl border transition hover:-translate-y-1 hover:shadow-lg"
    >
      {showImage ? (
        <div className="relative h-40 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover aspect-video object-top transition duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      ) : (
        <div className="flex h-28 items-end bg-gradient-to-br from-gray-100 to-gray-200 p-4 dark:from-gray-800 dark:to-gray-900">
          <span
            className={`text-xs font-medium uppercase tracking-wider ${color.text}`}
          >
            {project.kind === "freelance" ? "Freelance" : "Personal"}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
            {project.title}
          </h3>
          {project.period && (
            <span className="shrink-0 text-xs text-muted-foreground">
              {project.period}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full border px-2 py-0.5 text-xs ${color.border} bg-white/40 dark:bg-black/20`}
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {(project.liveUrl || project.githubUrl) && (
          <div className="flex gap-2 pt-1">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${color.border} ${color.text} hover:bg-white/40 dark:hover:bg-black/30`}
              >
                <FiExternalLink className="text-sm" />
                Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${color.border} ${color.text} hover:bg-white/40 dark:hover:bg-black/30`}
              >
                <FiGithub className="text-sm" />
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export function SideProjectGrid({
  projects,
}: {
  projects: readonly ProjectEntry[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <SideProjectCard key={project.title} project={project} index={index} />
      ))}
    </div>
  );
}
