import { useThemeColor } from "@/context/ColorThemeContext";
import React from "react";
export default function Heading({ text }: { text: string }) {
  const { color } = useThemeColor();
  return (
    <div
      className={`w-full text-xl font-extrabold ${color.text} underline md:text-4xl`}
    >
      {text}
    </div>
  );
}
