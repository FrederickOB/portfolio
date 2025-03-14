"use client";

import { createContext, useContext, useState } from "react";

// Define the color theme type
export interface ColorTheme {
  bg: string;
  text: string;
  hoverText: string;
  border: string;
  glow: string;
  softGlow: string;
  hex: string;
}

// Define the context type
interface ThemeColorContextType {
  color: ColorTheme;
  setColor: (color: ColorTheme) => void;
}

// Create context with proper typing and default values
const ThemeColorContext = createContext<ThemeColorContextType>({
  color: {
    bg: "bg-indigo-500",
    text: "text-indigo-500",
    hoverText: "hover:text-indigo-500",
    border: "border-indigo-500",
    glow: "drop-shadow-[0_0_2rem_#6366F190]",
    softGlow: "drop-shadow-[0_0_0.75rem_#6366F190]",
    hex: "6366F1",
  },
  setColor: () => {},
});

export const useThemeColor = () => useContext(ThemeColorContext);

export const ColorThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [color, setColor] = useState<ColorTheme>({
    bg: "bg-indigo-500",
    text: "text-indigo-500",
    hoverText: "hover:text-indigo-500",
    border: "border-indigo-500",
    glow: "drop-shadow-[0_0_2rem_#6366F190]",
    softGlow: "drop-shadow-[0_0_0.75rem_#6366F190]",
    hex: "6366F1",
  });

  return (
    <ThemeColorContext.Provider value={{ color, setColor }}>
      {children}
    </ThemeColorContext.Provider>
  );
};
