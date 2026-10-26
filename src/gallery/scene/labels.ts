import type { Work } from "@/content/types";
import { caption, type StackLine } from "./type";

export const SECTION_LABEL: Record<Work["section"], string> = {
  "case-study": "Case study",
  freelance: "Client work",
  personal: "Personal",
};

/**
 * The lines of a museum label: number, title, who it was for, a caption, and
 * the medium. `scale` enlarges everything for labels read from further away.
 */
export function labelLines(
  work: Work,
  number: string,
  colors: { ink: string; muted: string; accent: string },
  scale = 1,
): StackLine[] {
  const credit = work.context ?? work.period;
  const lines: StackLine[] = [
    { text: `${number} · ${SECTION_LABEL[work.section]}`, style: "eyebrow", size: 0.024 * scale, color: colors.accent },
    { text: work.title, style: "display", size: 0.085 * scale, color: colors.ink, gap: 0.45 },
  ];
  if (credit) lines.push({ text: credit, style: "italic", size: 0.034 * scale, color: colors.muted, gap: 0.35 });
  const summary = caption(work.summary ?? work.body);
  if (summary) lines.push({ text: summary, style: "body", size: 0.03 * scale, color: colors.ink, gap: 1.1 });
  lines.push({ text: `Medium: ${work.tags.join(", ")}`, style: "label", size: 0.026 * scale, color: colors.muted, gap: 1.1 });
  return lines;
}
