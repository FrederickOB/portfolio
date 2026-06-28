import { motion } from "framer-motion";
import { useThemeColor } from "@/context/ColorThemeContext";
import type { Project } from "@/hooks/useProjects";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Skeleton } from "@/components/ui/skeleton";

interface PortfolioSectionProps {
  sectionId: string;
  title: string;
  description?: string;
  projects: Project[];
  loading?: boolean;
}

export function PortfolioSection({
  sectionId,
  title,
  description,
  projects,
  loading,
}: PortfolioSectionProps) {
  const { color } = useThemeColor();

  return (
    <section id={sectionId} className="scroll-mt-32 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className={`text-3xl font-bold md:text-4xl ${color.text}`}>{title}</h2>
        {description && (
          <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
        )}
      </motion.div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-96 rounded-2xl" />
          ))}
        </div>
      ) : projects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl border border-dashed p-12 text-center text-muted-foreground">
          Projects coming soon in this section.
        </div>
      )}
    </section>
  );
}
