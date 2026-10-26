import { ThemeProvider } from "next-themes";
import { ColorThemeProvider } from "@/context/ColorThemeContext";
import { ContentProvider } from "@/context/ContentContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ColorThemeProvider>
        <ContentProvider>{children}</ContentProvider>
      </ColorThemeProvider>
    </ThemeProvider>
  );
}
