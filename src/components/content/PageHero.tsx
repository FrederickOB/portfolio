import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useThemeColor } from "@/context/ColorThemeContext";
import { cn } from "@/lib/utils";

interface CTA {
  label: string;
  href: string;
  internal?: boolean;
  external?: boolean;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subhead: string;
  highlights?: readonly string[];
  ctas?: CTA[];
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  subhead,
  highlights,
  ctas,
  className,
}: PageHeroProps) {
  const { color } = useThemeColor();

  const renderCta = (cta: CTA) => {
    const className = cn(
      "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition",
      cta.label.toLowerCase().includes("talk") ||
        cta.label.toLowerCase().includes("touch")
        ? `${color.bg} text-white shadow-lg shadow-black/10 hover:opacity-90`
        : `border ${color.border} ${color.text} hover:bg-white/40 dark:hover:bg-black/30`,
    );

    if (cta.external) {
      return (
        <a
          key={cta.label}
          href={cta.href}
          target="_blank"
          rel="noreferrer noopener"
          className={className}
        >
          {cta.label}
        </a>
      );
    }

    if (cta.internal || cta.href.startsWith("/")) {
      return (
        <Link key={cta.label} to={cta.href} className={className}>
          {cta.label}
        </Link>
      );
    }

    return (
      <a key={cta.label} href={cta.href} className={className}>
        {cta.label}
      </a>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("space-y-5", className)}
    >
      {eyebrow && (
        <p className={`text-sm font-semibold uppercase tracking-wider ${color.text}`}>
          {eyebrow}
        </p>
      )}
      <h1 className="font-display max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
        {subhead}
      </p>
      {highlights && highlights.length > 0 && (
        <ul className="flex flex-wrap gap-2 pt-1">
          {highlights.map((item) => (
            <li
              key={item}
              className={`rounded-full border px-3 py-1 text-xs font-medium md:text-sm ${color.border} bg-white/50 dark:bg-black/30`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      {ctas && ctas.length > 0 && (
        <div className="flex flex-wrap gap-3 pt-1">{ctas.map(renderCta)}</div>
      )}
    </motion.div>
  );
}
