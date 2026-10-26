import { useEffect, useState } from "react";
import { Text } from "@react-three/drei";
import serifItalic from "@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff?url";
import serif from "@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff?url";
import sansMedium from "@fontsource/inter/files/inter-latin-500-normal.woff?url";
import sansSemiBold from "@fontsource/inter/files/inter-latin-600-normal.woff?url";
import sans from "@fontsource/inter/files/inter-latin-400-normal.woff?url";

/**
 * The gallery's typography: a serif for names, titles and figures, spaced
 * capitals for small headings, and Inter for reading. Sizes are in metres.
 */
export const STYLES = {
  display: { font: serif, lineHeight: 1.04, letterSpacing: -0.005 },
  italic: { font: serifItalic, lineHeight: 1.2, letterSpacing: 0 },
  eyebrow: { font: sansSemiBold, lineHeight: 1.3, letterSpacing: 0.22, uppercase: true },
  label: { font: sansMedium, lineHeight: 1.4, letterSpacing: 0.01 },
  body: { font: sans, lineHeight: 1.55, letterSpacing: 0 },
} as const;

export type TextStyle = keyof typeof STYLES;

/** The Latin font subsets have no "→", so spell it out instead of fetching a fallback font. */
export function glyphSafe(text: string) {
  return text.replace(/\s*→\s*/g, " to ");
}

export interface StackLine {
  text: string;
  style: TextStyle;
  size: number;
  color: string;
  /** Space above this block, as a multiple of its size. */
  gap?: number;
}

interface TroikaText {
  textRenderInfo?: { blockBounds: [number, number, number, number] };
}

/**
 * Blocks of text set one under another. Each block is measured once it has
 * been laid out, so long and short content both keep even spacing.
 */
export function TextStack({
  lines,
  width,
  align = "left",
  anchor = "top",
  onMeasure,
}: {
  lines: StackLine[];
  width: number;
  align?: "left" | "center";
  /** Which edge of the stack sits at the group's origin. */
  anchor?: "top" | "middle" | "bottom";
  onMeasure?: (height: number) => void;
}) {
  const [heights, setHeights] = useState<number[]>([]);

  const measure = (index: number) => (text: TroikaText) => {
    const bounds = text.textRenderInfo?.blockBounds;
    if (!bounds) return;
    const height = bounds[3] - bounds[1];
    setHeights((previous) => {
      if (Math.abs((previous[index] ?? -1) - height) < 1e-4) return previous;
      const next = [...previous];
      next[index] = height;
      return next;
    });
  };

  let cursor = 0;
  const tops = lines.map((line, index) => {
    if (index > 0) cursor += (line.gap ?? 0.7) * line.size;
    const top = cursor;
    cursor += heights[index] ?? line.size * STYLES[line.style].lineHeight;
    return top;
  });
  const total = cursor;
  useEffect(() => onMeasure?.(total), [onMeasure, total]);

  const shift = anchor === "top" ? 0 : anchor === "middle" ? total / 2 : total;
  const x = align === "left" ? -width / 2 : 0;

  return (
    <group position-y={shift}>
      {lines.map((line, index) => {
        const style = STYLES[line.style];
        const text = glyphSafe(line.text);
        return (
          <Text
            key={index}
            font={style.font}
            fontSize={line.size}
            lineHeight={style.lineHeight}
            letterSpacing={style.letterSpacing}
            maxWidth={width}
            textAlign={align}
            anchorX={align}
            anchorY="top"
            color={line.color}
            position={[x, -tops[index], 0]}
            onSync={measure(index)}
          >
            {"uppercase" in style ? text.toUpperCase() : text}
          </Text>
        );
      })}
    </group>
  );
}

/** A TextStack on a card that grows to fit it. The card's top edge sits at the origin. */
export function TextCard({
  lines,
  width,
  padding,
  color,
  bottomAligned = false,
}: {
  lines: StackLine[];
  width: number;
  padding: number;
  color: string;
  /** Put the card's bottom edge at the origin instead, so it can line up with a frame. */
  bottomAligned?: boolean;
}) {
  const [height, setHeight] = useState(0);
  const outer = height + padding * 2;
  return (
    <group position-y={bottomAligned ? outer : 0}>
      <mesh position={[0, -outer / 2, -0.002]} visible={height > 0}>
        <planeGeometry args={[width + padding * 2, outer]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <group position-y={-padding}>
        <TextStack lines={lines} width={width} onMeasure={setHeight} />
      </group>
    </group>
  );
}

/** First sentence of a longer text, trimmed to a label-sized caption. */
export function caption(text: string | undefined, limit = 150) {
  if (!text) return "";
  const sentence = text.match(/^.*?[.!?](\s|$)/)?.[0].trim() ?? text;
  if (sentence.length <= limit) return sentence;
  return `${sentence.slice(0, sentence.lastIndexOf(" ", limit))}…`;
}
