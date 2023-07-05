"use client";

import { ThemeColorContextProvider } from "@/context/ColorThemeContext";
import Index from ".";
import { ThemeProvider } from "next-themes";

export default function Home() {
  return (
    <ThemeProvider attribute="class">
      <ThemeColorContextProvider>
        <Index />
      </ThemeColorContextProvider>
    </ThemeProvider>
  );
}
