/**
 * Shapes of the portfolio content stored in Firestore. Each collection's
 * document id becomes the `id` field; for works it doubles as the URL slug,
 * so keep it lowercase-with-dashes.
 */

export const COLLECTIONS = {
  works: "works",
  achievements: "achievements",
  experience: "experience",
} as const;

export type Side = "frontend" | "data";

/** Which block of a portfolio page a work appears in. */
export type WorkSection = "case-study" | "freelance" | "personal";

export interface Work {
  id: string;
  side: Side;
  section: WorkSection;
  title: string;
  /** Longer title for case-study cards. Falls back to `title`. */
  headline?: string;
  /** One or two sentences for home-page previews. Falls back to `body`. */
  summary?: string;
  /** Full write-up for portfolio pages. Falls back to `summary`. */
  body?: string;
  tags: string[];
  /** Client, funder or role, e.g. "sole frontend developer, Chale Card LLC". */
  context?: string;
  metrics?: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  period?: string;
  /** Position in the home page's featured grid. Leave unset to keep it off. */
  featuredRank?: number;
  order?: number;
}

export type AchievementKind = "degree" | "certification" | "award";

export type AchievementTopic =
  | "data"
  | "sql"
  | "ai"
  | "cloud"
  | "network"
  | "security"
  | "mobile"
  | "frontend"
  | "general";

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  kind: AchievementKind;
  topic?: AchievementTopic;
  /** Year and month issued, "YYYY-MM". */
  date?: string;
  /** Shown instead of the issue date, e.g. a thesis title. */
  note?: string;
  credentialUrl?: string;
  /** Portfolio pages that list it. */
  sides: Side[];
  order?: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  side: Side;
  order?: number;
}
