export interface ColorTheme {
  bg: string;
  text: string;
  hoverText: string;
  border: string;
  glow: string;
  softGlow: string;
  hex: string;
}

export interface ThemeColorOption {
  name: string;
  color: ColorTheme;
}

export const THEME_COLOR_OPTIONS: ThemeColorOption[] = [
  {
    name: "Indigo",
    color: {
      bg: "bg-indigo-500",
      text: "text-indigo-500",
      hoverText: "hover:text-indigo-500",
      border: "border-indigo-500",
      glow: "drop-shadow-[0_0_2rem_#6366F190]",
      softGlow: "drop-shadow-[0_0_0.75rem_#6366F190]",
      hex: "6366F1",
    },
  },
  {
    name: "Green",
    color: {
      bg: "bg-green-500",
      text: "text-green-500",
      hoverText: "hover:text-green-500",
      border: "border-green-500",
      glow: "drop-shadow-[0_0_2rem_#22C55E90]",
      softGlow: "drop-shadow-[0_0_0.75rem_#22C55E90]",
      hex: "22C55E",
    },
  },
  {
    name: "Blue",
    color: {
      bg: "bg-blue-500",
      text: "text-blue-500",
      hoverText: "hover:text-blue-500",
      border: "border-blue-500",
      glow: "drop-shadow-[0_0_2rem_#3B82F690]",
      softGlow: "drop-shadow-[0_0_0.75rem_#3B82F690]",
      hex: "3B82F6",
    },
  },
  {
    name: "Red",
    color: {
      bg: "bg-red-500",
      text: "text-red-500",
      hoverText: "hover:text-red-500",
      border: "border-red-500",
      glow: "drop-shadow-[0_0_2rem_#EF444490]",
      softGlow: "drop-shadow-[0_0_0.75rem_#EF444490]",
      hex: "EF4444",
    },
  },
  {
    name: "Orange",
    color: {
      bg: "bg-orange-500",
      text: "text-orange-500",
      hoverText: "hover:text-orange-500",
      border: "border-orange-500",
      glow: "drop-shadow-[0_0_2rem_#F9731690]",
      softGlow: "drop-shadow-[0_0_0.75rem_#F9731690]",
      hex: "F97316",
    },
  },
  {
    name: "Purple",
    color: {
      bg: "bg-purple-500",
      text: "text-purple-500",
      hoverText: "hover:text-purple-500",
      border: "border-purple-500",
      glow: "drop-shadow-[0_0_2rem_#A855F790]",
      softGlow: "drop-shadow-[0_0_0.75rem_#A855F790]",
      hex: "A855F7",
    },
  },
  {
    name: "Teal",
    color: {
      bg: "bg-teal-500",
      text: "text-teal-500",
      hoverText: "hover:text-teal-500",
      border: "border-teal-500",
      glow: "drop-shadow-[0_0_2rem_#14B8A690]",
      softGlow: "drop-shadow-[0_0_0.75rem_#14B8A690]",
      hex: "14B8A6",
    },
  },
  {
    name: "Pink",
    color: {
      bg: "bg-pink-500",
      text: "text-pink-500",
      hoverText: "hover:text-pink-500",
      border: "border-pink-500",
      glow: "drop-shadow-[0_0_2rem_#EC489990]",
      softGlow: "drop-shadow-[0_0_0.75rem_#EC489990]",
      hex: "EC4899",
    },
  },
  {
    name: "Amber",
    color: {
      bg: "bg-amber-500",
      text: "text-amber-500",
      hoverText: "hover:text-amber-500",
      border: "border-amber-500",
      glow: "drop-shadow-[0_0_2rem_#F59E0B90]",
      softGlow: "drop-shadow-[0_0_0.75rem_#F59E0B90]",
      hex: "F59E0B",
    },
  },
];

export const DEFAULT_COLOR_THEME = THEME_COLOR_OPTIONS[0].color;

const STORAGE_KEY = "portfolio-accent-color";

export function loadStoredColorTheme(): ColorTheme {
  if (typeof window === "undefined") return DEFAULT_COLOR_THEME;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_COLOR_THEME;
    const parsed = JSON.parse(stored) as ColorTheme;
    if (parsed.hex) return parsed;
  } catch {
    // ignore
  }
  return DEFAULT_COLOR_THEME;
}

export function saveColorTheme(color: ColorTheme) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(color));
}
