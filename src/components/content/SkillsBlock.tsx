import { motion } from "framer-motion";
import type { SkillGroup } from "@/content/site-copy";
import { useThemeColor } from "@/context/ColorThemeContext";

export function SkillsBlock({ groups }: { groups: readonly SkillGroup[] }) {
  const { color } = useThemeColor();

  return (
    <div className="space-y-6">
      {groups.map((group, groupIndex) => (
        <motion.div
          key={group.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: groupIndex * 0.05 }}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {group.label}
          </p>
          <div className="flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <span
                key={skill}
                className={`rounded-full border px-3 py-1 text-sm ${color.border} bg-white/40 dark:bg-black/20`}
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
