import { SITE_LINKS } from "@/content/site-copy";

export type PortfolioType = "frontend" | "data";

export type FrontendSection = "webapp" | "mobile" | "uiux";
export type DataSection =
  | "analytics"
  | "engineering"
  | "automation"
  | "data-science";

export type ProjectSection = FrontendSection | DataSection;

export const FRONTEND_SECTIONS = [
  {
    id: "webapp",
    label: "Web App",
    value: "webapp" as const,
    description: "React, Next.js, and modern web applications",
  },
  {
    id: "mobile",
    label: "Mobile App",
    value: "mobile" as const,
    description: "React Native and cross-platform mobile experiences",
  },
  {
    id: "uiux",
    label: "UI/UX",
    value: "uiux" as const,
    description: "Figma prototypes, design systems, and case studies",
  },
] as const;

export const DATA_SECTIONS = [
  {
    id: "analytics",
    label: "Data Analytics",
    value: "analytics" as const,
    description: "Dashboards, BI reports, and SQL-driven insights",
  },
  {
    id: "engineering",
    label: "Engineering",
    value: "engineering" as const,
    description: "Pipelines, ETL, and data infrastructure",
  },
  {
    id: "automation",
    label: "Automation",
    value: "automation" as const,
    description: "Scripts, workflows, and process tooling",
  },
  {
    id: "data-science",
    label: "Data Science",
    value: "data-science" as const,
    description: "ML models, statistical analysis, and notebooks",
  },
] as const;

export const MEMOJI_URL = SITE_LINKS.memoji;
export const RESUME_URL = SITE_LINKS.resume;
