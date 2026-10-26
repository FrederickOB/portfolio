import type { Achievement, Experience, Side, Work, WorkSection } from "./types";

export function sortByOrder<T extends { order?: number }>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export function worksIn(works: readonly Work[], side: Side, section: WorkSection): Work[] {
  return works.filter((work) => work.side === side && work.section === section);
}

export function featuredWorks(works: readonly Work[]): Work[] {
  return works
    .filter((work) => work.featuredRank !== undefined)
    .sort((a, b) => a.featuredRank! - b.featuredRank!);
}

export function achievementsFor(achievements: readonly Achievement[], side: Side): Achievement[] {
  return achievements.filter((achievement) => achievement.sides.includes(side));
}

export function experienceFor(experience: readonly Experience[], side: Side): Experience[] {
  return experience.filter((entry) => entry.side === side);
}

/** "2019-2025" → 2019 to 2025; "2023" → 2023 to 2023; "2026-present" ends this year. */
export function periodYears(period: string) {
  const [first, last = first] = period.split(/[-–]/).map((part) => part.trim());
  const year = (part: string) => (/present|now/i.test(part) ? new Date().getFullYear() : Number(part));
  return { start: year(first), end: year(last) };
}

/** Roles with the most recent first: latest end year, then latest start. */
export function latestFirst(experience: readonly Experience[]): Experience[] {
  return [...experience].sort((a, b) => {
    const x = periodYears(a.period);
    const y = periodYears(b.period);
    return y.end - x.end || y.start - x.start;
  });
}

/** "Data Science 101, IBM SkillsBuild", without repeating an issuer already in the title. */
export function achievementLabel({ title, issuer }: Achievement): string {
  return title.includes(issuer) ? title : `${title}, ${issuer}`;
}

/** "2026-01" → "Issued Jan 2026". */
export function formatIssued(date?: string): string | undefined {
  const match = date?.match(/^(\d{4})-(\d{2})$/);
  if (!match) return undefined;
  const month = new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(Date.UTC(Number(match[1]), Number(match[2]) - 1));
  return `Issued ${month}`;
}

/** ["A", "B", "C"] → "A, B, and C". */
export function formatList(items: readonly string[]): string {
  return new Intl.ListFormat("en", { type: "conjunction" }).format(items);
}
