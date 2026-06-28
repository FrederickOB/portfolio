import { useEffect, useState } from "react";
import { collection, onSnapshot, type DocumentData } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/config/firebase";
import type { PortfolioType, ProjectSection } from "@/lib/portfolio-sections";

export interface Project {
  id: string;
  title: string;
  description?: string;
  stack?: string[];
  image?: string;
  video?: string;
  githubLink?: string;
  liveLink?: string;
  portfolio?: PortfolioType;
  section?: ProjectSection;
  order?: number;
}

function mapDoc(id: string, data: DocumentData, overrides?: Partial<Project>): Project {
  return {
    id,
    title: data.title ?? "",
    description: data.description,
    stack: data.stack,
    image: data.image,
    video: data.video,
    githubLink: data.githubLink,
    liveLink: data.liveLink,
    portfolio: data.portfolio,
    section: data.section,
    order: data.order,
    ...overrides,
  };
}

export function useProjects(portfolio: PortfolioType) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      setError("Firebase is not configured. Copy .env.sample to .env.local and add your keys.");
      return;
    }

    const projectMap = new Map<string, Project>();

    const publish = () => {
      const list = Array.from(projectMap.values()).sort(
        (a, b) => (a.order ?? 999) - (b.order ?? 999),
      );
      setProjects(list);
      setLoading(false);
    };

    const unsubscribers: (() => void)[] = [];

    if (portfolio === "frontend") {
      unsubscribers.push(
        onSnapshot(
          collection(db, "projects"),
          (snapshot) => {
            Array.from(projectMap.keys())
              .filter((k) => k.startsWith("project-"))
              .forEach((k) => projectMap.delete(k));

            snapshot.docs.forEach((doc) => {
              const data = doc.data();
              if (data.portfolio === "data") return;
              projectMap.set(`project-${doc.id}`, mapDoc(doc.id, data, {
                portfolio: "frontend",
                section: (data.section as ProjectSection) ?? "webapp",
              }));
            });
            publish();
          },
          (err) => {
            setError(err.message);
            setLoading(false);
          },
        ),
      );

      unsubscribers.push(
        onSnapshot(collection(db, "uiux"), (snapshot) => {
          Array.from(projectMap.keys())
            .filter((k) => k.startsWith("uiux-"))
            .forEach((k) => projectMap.delete(k));

          snapshot.docs.forEach((doc) => {
            projectMap.set(`uiux-${doc.id}`, mapDoc(doc.id, doc.data(), {
              portfolio: "frontend",
              section: "uiux",
            }));
          });
          publish();
        }),
      );
    } else {
      unsubscribers.push(
        onSnapshot(
          collection(db, "projects"),
          (snapshot) => {
            Array.from(projectMap.keys())
              .filter((k) => k.startsWith("project-"))
              .forEach((k) => projectMap.delete(k));

            snapshot.docs.forEach((doc) => {
              const data = doc.data();
              if (data.portfolio !== "data") return;
              projectMap.set(`project-${doc.id}`, mapDoc(doc.id, data, {
                portfolio: "data",
                section: (data.section as ProjectSection) ?? "analytics",
              }));
            });
            publish();
          },
          (err) => {
            setError(err.message);
            setLoading(false);
          },
        ),
      );

      unsubscribers.push(
        onSnapshot(collection(db, "data"), (snapshot) => {
          Array.from(projectMap.keys())
            .filter((k) => k.startsWith("data-"))
            .forEach((k) => projectMap.delete(k));

          snapshot.docs.forEach((doc) => {
            const data = doc.data();
            projectMap.set(`data-${doc.id}`, mapDoc(doc.id, data, {
              portfolio: "data",
              section: (data.section as ProjectSection) ?? "analytics",
            }));
          });
          publish();
        }),
      );
    }

    return () => unsubscribers.forEach((unsub) => unsub());
  }, [portfolio]);

  return { projects, loading, error };
}

export function groupProjectsBySection<T extends { section?: ProjectSection }>(
  projects: T[],
  sections: readonly { value: ProjectSection }[],
): Record<ProjectSection, T[]> {
  const grouped = {} as Record<ProjectSection, T[]>;
  for (const section of sections) {
    grouped[section.value] = projects.filter(
      (p) => p.section === section.value,
    );
  }
  return grouped;
}
