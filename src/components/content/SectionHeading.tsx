import { useThemeColor } from "@/context/ColorThemeContext";
import { cn } from "@/lib/utils";

export function SectionHeading({
  children,
  index,
  className = "",
}: {
  children: React.ReactNode;
  index?: string;
  className?: string;
}) {
  const { color } = useThemeColor();

  return (
    <div className={cn("space-y-3", className)}>
      {index && (
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {index}
        </p>
      )}
      <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {children}
      </h2>
      <div className={cn("h-1 w-10 rounded-full", color.bg)} />
    </div>
  );
}
