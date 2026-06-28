import { motion } from "framer-motion";
import { FiClock, FiCode, FiCpu, FiTrendingUp, FiUsers } from "react-icons/fi";
import { useThemeColor } from "@/context/ColorThemeContext";

interface ProofPoint {
  stat: string;
  detail: string;
}

const proofIcons = [FiCode, FiTrendingUp, FiUsers, FiClock, FiCpu];

export function StatStrip({ points }: { points: readonly ProofPoint[] }) {
  const { color } = useThemeColor();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {points.map((point, index) => {
        const Icon = proofIcons[index % proofIcons.length];

        return (
          <motion.div
            key={point.stat}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="glass group rounded-xl border p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className={`mb-4 inline-flex rounded-lg p-2.5 ${color.bg}/15`}>
              <Icon className={`text-lg ${color.text}`} />
            </div>
            <p className={`font-display text-xl font-bold tracking-tight ${color.text}`}>
              {point.stat}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {point.detail}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
