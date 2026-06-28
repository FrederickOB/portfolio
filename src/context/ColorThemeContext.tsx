import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_COLOR_THEME,
  loadStoredColorTheme,
  saveColorTheme,
  type ColorTheme,
} from "@/lib/theme-colors";

interface ThemeColorContextType {
  color: ColorTheme;
  setColor: (color: ColorTheme) => void;
}

const ThemeColorContext = createContext<ThemeColorContextType>({
  color: DEFAULT_COLOR_THEME,
  setColor: () => {},
});

export const useThemeColor = () => useContext(ThemeColorContext);

export function ColorThemeProvider({ children }: { children: ReactNode }) {
  const [color, setColorState] = useState<ColorTheme>(DEFAULT_COLOR_THEME);

  useEffect(() => {
    setColorState(loadStoredColorTheme());
  }, []);

  const setColor = (next: ColorTheme) => {
    setColorState(next);
    saveColorTheme(next);
  };

  return (
    <ThemeColorContext.Provider value={{ color, setColor }}>
      {children}
    </ThemeColorContext.Provider>
  );
}
