import { motion } from "framer-motion";
import type { EducationEntry } from "@/content/site-copy";
import { useThemeColor } from "@/context/ColorThemeContext";

export function EducationList({
  entries,
}: {
  entries: readonly EducationEntry[];
}) {
  const { color } = useThemeColor();

  return (
    <ul className="space-y-4">
      {entries.map((entry, index) => (
        <motion.li
          key={entry.title}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="glass rounded-xl border p-5"
        >
          <p className={`font-medium ${color.text}`}>{entry.title}</p>
          {entry.detail && (
            <p className="mt-1 text-sm italic text-muted-foreground">
              {entry.detail}
            </p>
          )}
        </motion.li>
      ))}
    </ul>
  );
}
