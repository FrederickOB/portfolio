import { useEffect, useState } from "react";
import { useThemeColor } from "@/context/ColorThemeContext";
import { cn } from "@/lib/utils";

interface SectionNavProps {
  sections: readonly { id: string; label: string }[];
}

export function SectionNav({ sections }: SectionNavProps) {
  const { color } = useThemeColor();
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  return (
    <nav className="sticky top-20 z-30 mb-10 flex flex-wrap gap-2 rounded-full glass p-2">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-all",
            activeId === section.id
              ? `${color.bg} text-white`
              : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
          )}
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}
