import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { collection, getDocs, type DocumentData } from "firebase/firestore/lite";
import { db, isFirebaseConfigured } from "@/config/firebase";
import { sortByOrder } from "@/content/selectors";
import {
  COLLECTIONS,
  type Achievement,
  type AchievementKind,
  type Experience,
  type Side,
  type Work,
  type WorkSection,
} from "@/content/types";

type ContentStatus = "loading" | "ready" | "error";

interface ContentContextType {
  works: Work[];
  achievements: Achievement[];
  experience: Experience[];
  status: ContentStatus;
}

const EMPTY_CONTENT: ContentContextType = {
  works: [],
  achievements: [],
  experience: [],
  status: "loading",
};

const ContentContext = createContext<ContentContextType>(EMPTY_CONTENT);

export const useContent = () => useContext(ContentContext);

const SIDES: readonly unknown[] = ["frontend", "data"] satisfies Side[];
const SECTIONS: readonly unknown[] = ["case-study", "freelance", "personal"] satisfies WorkSection[];
const KINDS: readonly unknown[] = ["degree", "certification", "award"] satisfies AchievementKind[];

function strings(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

// Documents can be added by hand in the Firebase console, so check the fields
// the pages rely on and skip anything that would break rendering.

function parseWork(id: string, data: DocumentData): Work | null {
  if (!data.title || !SIDES.includes(data.side) || !SECTIONS.includes(data.section)) {
    return null;
  }
  return {
    ...data,
    id,
    tags: strings(data.tags),
    metrics: data.metrics ? strings(data.metrics) : undefined,
  } as Work;
}

function parseAchievement(id: string, data: DocumentData): Achievement | null {
  if (!data.title || !data.issuer || !KINDS.includes(data.kind)) return null;
  return {
    ...data,
    id,
    sides: strings(data.sides).filter((side) => SIDES.includes(side)) as Side[],
  } as Achievement;
}

function parseExperience(id: string, data: DocumentData): Experience | null {
  if (!data.role || !data.company || !SIDES.includes(data.side)) return null;
  return { ...data, id } as Experience;
}

async function fetchCollection<T extends { order?: number }>(
  name: string,
  parse: (id: string, data: DocumentData) => T | null,
): Promise<T[]> {
  const snapshot = await getDocs(collection(db, name));
  const items: T[] = [];
  for (const doc of snapshot.docs) {
    const item = parse(doc.id, doc.data());
    if (item) items.push(item);
    else console.warn(`Skipping ${name}/${doc.id}: missing or invalid fields.`);
  }
  return sortByOrder(items);
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentContextType>(EMPTY_CONTENT);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      console.error(
        "Firebase is not configured. Add the VITE_FIREBASE_* settings to .env.local (or Netlify's environment variables) and rebuild.",
      );
      setContent((prev) => ({ ...prev, status: "error" }));
      return;
    }

    let cancelled = false;

    Promise.all([
      fetchCollection(COLLECTIONS.works, parseWork),
      fetchCollection(COLLECTIONS.achievements, parseAchievement),
      fetchCollection(COLLECTIONS.experience, parseExperience),
    ])
      .then(([works, achievements, experience]) => {
        if (!cancelled) setContent({ works, achievements, experience, status: "ready" });
      })
      .catch((error) => {
        console.error("Failed to load portfolio content from Firestore.", error);
        if (!cancelled) setContent((prev) => ({ ...prev, status: "error" }));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}
