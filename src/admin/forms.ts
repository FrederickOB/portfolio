import { achievementLabel } from "@/content/selectors";
import type { Achievement } from "@/content/types";
import type { CollectionName, Entry } from "./api";

export type FieldType =
  | "text"
  | "textarea"
  | "select"
  | "number"
  | "tags"
  | "lines"
  | "checks"
  | "month"
  | "url"
  | "image";

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: readonly { value: string; label: string }[];
  help?: string;
  placeholder?: string;
}

export interface CollectionForm {
  name: CollectionName;
  label: string;
  singular: string;
  /** The field the URL id is suggested from when creating. */
  titleField: string;
  fields: Field[];
  blank: () => Record<string, unknown>;
  summary: (entry: Entry) => { title: string; detail: string };
  /** Whether entries hang in the gallery and can be linked to there. */
  inGallery: boolean;
}

const SIDES = [
  { value: "frontend", label: "Frontend (Interface room)" },
  { value: "data", label: "Data (Signal room)" },
] as const;

export const FORMS: Record<CollectionName, CollectionForm> = {
  works: {
    name: "works",
    label: "Works",
    singular: "work",
    titleField: "title",
    inGallery: true,
    blank: () => ({ side: "frontend", section: "case-study", tags: [] }),
    summary: (entry) => ({
      title: String(entry.title ?? entry.id),
      detail: `${entry.side} · ${entry.section}${entry.image ? "" : " · no image"}`,
    }),
    fields: [
      { name: "title", label: "Title", type: "text", required: true, help: "Short name for cards and wall labels." },
      { name: "side", label: "Room", type: "select", required: true, options: SIDES },
      {
        name: "section",
        label: "Section",
        type: "select",
        required: true,
        options: [
          { value: "case-study", label: "Case study" },
          { value: "freelance", label: "Client work" },
          { value: "personal", label: "Personal project" },
        ],
        help: "Case studies hang large; client and personal work share salon walls in Interface.",
      },
      { name: "image", label: "Image", type: "image", help: "A screenshot. Uploads go to Cloudinary." },
      { name: "headline", label: "Headline", type: "text", help: "Longer title for case-study cards. Optional." },
      { name: "summary", label: "Summary", type: "textarea", help: "One or two sentences for cards and wall labels." },
      { name: "body", label: "Story", type: "textarea", help: "The full write-up shown when someone opens the work." },
      { name: "tags", label: "Medium (tech stack)", type: "tags", required: true, placeholder: "React, TypeScript, Firebase" },
      { name: "context", label: "Client or role", type: "text", placeholder: "for African Fertilizer and Agribusiness Partnership (AFAP)" },
      { name: "metrics", label: "Metrics", type: "lines", help: "One per line, e.g. 40% credit uplift." },
      { name: "liveUrl", label: "Live site", type: "url" },
      { name: "githubUrl", label: "Code", type: "url" },
      { name: "period", label: "Year", type: "text", placeholder: "2024" },
      { name: "featuredRank", label: "Featured position", type: "number", help: "1–3 puts it in the catalogue's featured grid. Leave empty otherwise." },
      { name: "order", label: "Order", type: "number", help: "Lower numbers hang first." },
    ],
  },
  achievements: {
    name: "achievements",
    label: "Achievements",
    singular: "achievement",
    titleField: "title",
    inGallery: true,
    blank: () => ({ kind: "certification", sides: ["frontend", "data"] }),
    summary: (entry) => ({
      title: entry.title && entry.issuer ? achievementLabel(entry as unknown as Achievement) : String(entry.title ?? entry.id),
      detail: `${entry.kind}${entry.date ? ` · ${entry.date}` : ""}`,
    }),
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "issuer", label: "Issuer", type: "text", required: true, placeholder: "IBM SkillsBuild" },
      {
        name: "kind",
        label: "Kind",
        type: "select",
        required: true,
        options: [
          { value: "degree", label: "Degree (stands on a plinth)" },
          { value: "certification", label: "Certification (cup in a cabinet)" },
          { value: "award", label: "Award (medal in a cabinet)" },
        ],
      },
      {
        name: "topic",
        label: "Topic",
        type: "select",
        options: [
          { value: "data", label: "Data" },
          { value: "sql", label: "SQL" },
          { value: "ai", label: "AI" },
          { value: "cloud", label: "Cloud" },
          { value: "network", label: "Networking" },
          { value: "security", label: "Security" },
          { value: "mobile", label: "Mobile" },
          { value: "frontend", label: "Frontend" },
          { value: "general", label: "General" },
        ],
        help: "Chooses the emblem on top of the trophy.",
      },
      { name: "date", label: "Issued", type: "month" },
      { name: "credentialUrl", label: "Verify link", type: "url", help: "Shown as “Verify credential” to visitors." },
      { name: "note", label: "Note", type: "text", help: "Shown instead of the date, e.g. a thesis title." },
      {
        name: "sides",
        label: "List on",
        type: "checks",
        options: [
          { value: "frontend", label: "Frontend page" },
          { value: "data", label: "Data page" },
        ],
      },
      { name: "order", label: "Order", type: "number", help: "Lower numbers come first." },
    ],
  },
  experience: {
    name: "experience",
    label: "Career",
    singular: "role",
    titleField: "company",
    inGallery: false,
    blank: () => ({ side: "frontend" }),
    summary: (entry) => ({ title: `${entry.role ?? ""}, ${entry.company ?? ""}`, detail: String(entry.period ?? "") }),
    fields: [
      { name: "role", label: "Role", type: "text", required: true },
      { name: "company", label: "Company", type: "text", required: true },
      { name: "period", label: "Period", type: "text", required: true, placeholder: "2023-2024, 2023, or 2026-present" },
      { name: "side", label: "Side", type: "select", required: true, options: SIDES },
      { name: "order", label: "Order", type: "number" },
    ],
  },
};

/** "Chale Card LLC" → "chale-card-llc". */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Ids become gallery addresses (/afap), so they can't clash with the site's own
 * pages or the gallery's lobby exhibits.
 */
export function idProblem(id: string, taken: Set<string>) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) return "Use lowercase letters, numbers and single dashes.";
  if (["catalogue", "admin", "gallery", "portfolio", "api"].includes(id) || id.startsWith("lobby-") || id.endsWith("-intro")) {
    return "That id is reserved by the site.";
  }
  if (taken.has(id)) return "Something already uses that id.";
  return null;
}
