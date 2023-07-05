"use client";

import { ThemeColorContextProvider } from "@/context/ColorThemeContext";
import Index from ".";

export default function Home() {
  return (
    <ThemeColorContextProvider>
      <Index />
    </ThemeColorContextProvider>
  );
}
