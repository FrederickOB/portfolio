import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCode, FiTrendingUp, FiZap } from "react-icons/fi";
import { useThemeColor } from "@/context/ColorThemeContext";
import { cn } from "@/lib/utils";

interface FeaturedProject {
  title: string;
  description: string;
  href: string;
  category: string;
  image?: string;
}

const categoryIcons: Record<string, typeof FiCode> = {
  Frontend: FiCode,
  Data: FiTrendingUp,
};

export function FeaturedWorkBento({
  projects,
}: {
  projects: readonly FeaturedProject[];
}) {
  const { color } = useThemeColor();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => {
        const Icon = categoryIcons[project.category] ?? FiZap;
        const isHero = index === 0;

        return (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className={cn(isHero && "md:col-span-2 lg:col-span-2")}
          >
            <Link
              to={project.href}
              className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/30 backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-black/30"
            >
              {project.image ? (
                <>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
                </>
              ) : (
                <div
                  className="absolute inset-0 opacity-95"
                  style={{
                    background: `linear-gradient(135deg, #${color.hex}cc 0%, #0f172a 100%)`,
                  }}
                />
              )}

              <div className="relative mt-auto flex flex-col gap-3 p-6 text-white">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                  <Icon className="text-sm" />
                  {project.category}
                </span>
                <h3 className="font-display text-xl font-bold md:text-2xl">
                  {project.title}
                </h3>
                <p className="max-w-lg text-sm text-white/85">{project.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-white/90 transition group-hover:gap-3">
                  View work <FiArrowRight />
                </span>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
