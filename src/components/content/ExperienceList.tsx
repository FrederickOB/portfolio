import { motion } from "framer-motion";
import type { ExperienceEntry } from "@/content/site-copy";
import { useThemeColor } from "@/context/ColorThemeContext";

export function ExperienceList({
  entries,
}: {
  entries: readonly ExperienceEntry[];
}) {
  const { color } = useThemeColor();

  return (
    <div className="space-y-4">
      {entries.map((entry, index) => (
        <motion.div
          key={`${entry.role}-${entry.company}`}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="glass flex flex-col gap-1 rounded-xl border p-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className={`font-semibold ${color.text}`}>{entry.role}</p>
            <p className="text-sm text-muted-foreground">{entry.company}</p>
          </div>
          <p className="text-sm font-medium text-muted-foreground">{entry.period}</p>
        </motion.div>
      ))}
    </div>
  );
}
