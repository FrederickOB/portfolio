import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useThemeColor } from "@/context/ColorThemeContext";
import { cn } from "@/lib/utils";

interface CTAButton {
  label: string;
  href: string;
  internal?: boolean;
  external?: boolean;
}

interface CTABandProps {
  headline: string;
  subtext?: string;
  buttons: readonly CTAButton[];
}

export function CTABand({ headline, subtext, buttons }: CTABandProps) {
  const { color } = useThemeColor();

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl border p-8 text-center md:p-12"
    >
      <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {headline}
      </h2>
      {subtext && (
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{subtext}</p>
      )}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {buttons.map((btn, i) => {
          const className = cn(
            "inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition",
            i === 0
              ? `${color.bg} text-white`
              : `border ${color.border} ${color.text} hover:bg-white/40 dark:hover:bg-black/30`,
          );

          if (btn.external) {
            return (
              <a
                key={btn.label}
                href={btn.href}
                target="_blank"
                rel="noreferrer noopener"
                className={className}
              >
                {btn.label}
              </a>
            );
          }

          if (btn.internal || btn.href.startsWith("/")) {
            return (
              <Link key={btn.label} to={btn.href} className={className}>
                {btn.label}
              </Link>
            );
          }

          return (
            <a key={btn.label} href={btn.href} className={className}>
              {btn.label}
            </a>
          );
        })}
      </div>
    </motion.section>
  );
}
