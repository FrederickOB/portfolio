import { PropsWithChildren } from "react";

const { createContext, useContext, useState } = require("react");

const ThemeColorContext = createContext({});

export const useThemeColor = () => useContext(ThemeColorContext);
export const ThemeColorContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [color, setColor] = useState({
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
