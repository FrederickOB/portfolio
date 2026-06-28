import { motion } from "framer-motion";
import { useThemeColor } from "@/context/ColorThemeContext";

interface TechSnapshotTableProps {
  frontend: readonly string[];
  data: readonly string[];
}

function TechPillGroup({
  label,
  items,
}: {
  label: string;
  items: readonly string[];
}) {
  const { color } = useThemeColor();

  return (
    <div className="space-y-4">
      <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
        {label}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium md:text-sm ${color.border} bg-white/50 text-muted-foreground dark:bg-black/30`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechSnapshotTable({ frontend, data }: TechSnapshotTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="section-panel space-y-8"
    >
      <div className="grid gap-8 md:grid-cols-2">
        <TechPillGroup label="Frontend" items={frontend} />
        <TechPillGroup label="Data" items={data} />
      </div>
    </motion.div>
  );
}
