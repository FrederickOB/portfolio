import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { getAdinkraIcons } from "@/lib/adinkra";
import { useThemeColor } from "@/context/ColorThemeContext";

export function AdinkraBackground() {
  const { color } = useThemeColor();
  const { resolvedTheme } = useTheme();
  const [index, setIndex] = useState(0);

  const opacity = resolvedTheme === "dark" ? "0.15" : "0.08";
  const icons = getAdinkraIcons(color.hex, opacity);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(Math.floor(Math.random() * icons.length));
    }, 15000);
    return () => clearInterval(interval);
  }, [icons.length]);

  return (
    <div
      className="fixed inset-0 -z-10 bg-white dark:bg-black bg-fixed transition-[background-image] duration-[1500ms] ease-in-out"
      style={{
        backgroundImage: `url("${icons[index]}")`,
      }}
      aria-hidden
    />
  );
}
