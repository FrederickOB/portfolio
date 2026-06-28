import { useState } from "react";
import { motion } from "framer-motion";
import { FiFigma } from "react-icons/fi";
import {
  FaCss3,
  FaExternalLinkAlt,
  FaGithub,
  FaHtml5,
  FaJs,
  FaReact,
} from "react-icons/fa";
import {
  SiFirebase,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { useThemeColor } from "@/context/ColorThemeContext";
import type { Project } from "@/hooks/useProjects";

function StackIcon({ tech }: { tech: string }) {
  switch (tech) {
    case "Next":
    case "Next.js":
      return <SiNextdotjs className="h-3.5 w-3.5" />;
    case "React":
      return <FaReact className="h-3.5 w-3.5" />;
    case "Tailwind":
    case "Tailwind CSS":
      return <SiTailwindcss className="h-3.5 w-3.5" />;
    case "Typescript":
    case "TypeScript":
      return <SiTypescript className="h-3.5 w-3.5" />;
    case "Firebase":
      return <SiFirebase className="h-3.5 w-3.5" />;
    case "figma":
    case "Figma":
      return <FiFigma className="h-3.5 w-3.5" />;
    case "Javascript":
    case "JavaScript":
      return <FaJs className="h-3.5 w-3.5" />;
    case "Html":
    case "HTML":
      return <FaHtml5 className="h-3.5 w-3.5" />;
    case "Css":
    case "CSS":
      return <FaCss3 className="h-3.5 w-3.5" />;
    default:
      return null;
  }
}

export function ProjectCard({ project }: { project: Project }) {
  const { color } = useThemeColor();
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl border-2 bg-gray-50 dark:border-0 dark:bg-gray-900"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layout
    >
      <div className="absolute inset-0 z-0 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm dark:from-black/5 dark:to-black/10" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="relative h-64 w-full overflow-hidden">
          {project.image ? (
            <motion.div
              className="relative h-full w-full"
              style={{
                y: isHovered ? -10 : 0,
                transition: "transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)",
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                animate={{ opacity: isHovered ? 1 : 0.3 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
              <span className="text-gray-400">No image available</span>
            </div>
          )}

          <motion.div
            className="absolute top-4 right-4 flex items-center gap-3"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white backdrop-blur-md"
              >
                <FaGithub className="h-5 w-5" />
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-10 w-10 items-center justify-center rounded-full ${color.bg} text-white`}
              >
                <FaExternalLinkAlt className="h-4 w-4" />
              </a>
            )}
          </motion.div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className={`text-2xl font-bold tracking-tight ${color.text}`}>
            {project.title}
          </h3>

          {project.stack && project.stack.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${color.bg} text-white`}
                >
                  <StackIcon tech={tech} />
                  {tech}
                </span>
              ))}
            </div>
          )}

          {project.description && (
            <div className="mt-4">
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isExpanded ? "max-h-[500px]" : "max-h-[4.5rem]"
                }`}
              >
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {project.description}
                </p>
              </div>
              {project.description.length > 150 && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={`mt-2 text-xs font-medium ${color.text}`}
                >
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
