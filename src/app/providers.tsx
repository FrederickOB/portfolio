import { ThemeProvider } from "next-themes";
import { ColorThemeProvider } from "@/context/ColorThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ColorThemeProvider>{children}</ColorThemeProvider>
    </ThemeProvider>
  );
}
