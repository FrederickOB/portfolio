"use client";

import { ThemeProvider } from "next-themes";
import { ColorThemeProvider } from "@/context/ColorThemeContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem
      disableTransitionOnChange
    >
      <ColorThemeProvider>{children}</ColorThemeProvider>
    </ThemeProvider>
  );
}
