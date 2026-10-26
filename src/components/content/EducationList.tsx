import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { achievementLabel, formatIssued } from "@/content/selectors";
import type { Achievement } from "@/content/types";
import { useThemeColor } from "@/context/ColorThemeContext";

export function EducationList({
  entries,
}: {
  entries: readonly Achievement[];
}) {
  const { color } = useThemeColor();

  return (
    <ul className="space-y-4">
      {entries.map((entry, index) => {
        const detail = entry.note ?? formatIssued(entry.date);

        return (
          <motion.li
            key={entry.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="glass rounded-xl border p-5"
          >
            <p className={`font-medium ${color.text}`}>{achievementLabel(entry)}</p>
            {detail && (
              <p className="mt-1 text-sm italic text-muted-foreground">{detail}</p>
            )}
            {entry.credentialUrl && (
              <a
                href={entry.credentialUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={`mt-2 inline-flex items-center gap-1.5 text-xs font-medium ${color.text} hover:underline`}
              >
                <FiExternalLink className="text-sm" />
                Verify credential
              </a>
            )}
          </motion.li>
        );
      })}
    </ul>
  );
}
