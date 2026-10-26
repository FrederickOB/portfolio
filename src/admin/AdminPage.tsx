import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { User } from "firebase/auth";
import { FiExternalLink, FiLogOut, FiPlus } from "react-icons/fi";
import { PageMeta } from "@/components/seo/PageMeta";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  checkAdmin,
  deleteEntry,
  describeError,
  loadEntries,
  saveEntry,
  signIn,
  signOutOfAdmin,
  watchUser,
  type CollectionName,
  type Entry,
} from "./api";
import { FieldInput } from "./FieldInput";
import { FORMS, idProblem, slugify } from "./forms";

const TABS: CollectionName[] = ["works", "achievements", "experience"];

/** /admin: sign in with Google, then add, edit and remove what the site shows. */
export function AdminPage() {
  // undefined while Firebase works out whether someone is signed in.
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [admin, setAdmin] = useState<boolean | null>(null);
  const [problem, setProblem] = useState<string | null>(null);

  useEffect(
    () =>
      watchUser(async (next) => {
        setUser(next);
        setAdmin(null);
        setProblem(null);
        if (!next) return;
        try {
          setAdmin(await checkAdmin());
        } catch (error) {
          setProblem(describeError(error) ?? "Couldn’t check your access.");
        }
      }),
    [],
  );

  const startSignIn = () => {
    setProblem(null);
    signIn().catch((error) => setProblem(describeError(error)));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageMeta title="Admin | Frederick Ofori-Boadu" description="Edit the portfolio." />
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <p className="font-display text-lg font-semibold">Portfolio admin</p>
            <p className="text-xs text-muted-foreground">Changes appear on the site the next time a page loads.</p>
          </div>
          <nav className="flex flex-wrap items-center gap-2 text-sm">
            <Link to="/" className="rounded-full px-3 py-1.5 hover:bg-muted">
              Gallery
            </Link>
            <Link to="/catalogue" className="rounded-full px-3 py-1.5 hover:bg-muted">
              Catalogue
            </Link>
            {user && (
              <button type="button" onClick={() => void signOutOfAdmin()} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 hover:bg-muted">
                <FiLogOut /> Sign out
              </button>
            )}
          </nav>
        </div>
      </header>

      {user === undefined || (user && admin === null && !problem) ? (
        <Notice title="Checking your access…" />
      ) : !user ? (
        <Notice title="Sign in to edit the portfolio">
          <Button onClick={startSignIn}>Sign in with Google</Button>
          {problem && <ProblemText>{problem}</ProblemText>}
        </Notice>
      ) : problem ? (
        <Notice title="Couldn’t check your access">
          <ProblemText>{problem}</ProblemText>
        </Notice>
      ) : !admin ? (
        <Notice title="This account can’t edit the portfolio">
          <p className="text-sm text-muted-foreground">
            Signed in as <strong>{user.email}</strong>. To allow it, run{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">bun run admin:add {user.email}</code> and sign in again.
          </p>
        </Notice>
      ) : (
        <Editor />
      )}
    </div>
  );
}

function Notice({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="mx-auto mt-24 max-w-md space-y-4 px-4 text-center">
      <h1 className="font-display text-2xl font-semibold">{title}</h1>
      {children}
    </div>
  );
}

function ProblemText({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="text-sm text-red-600 dark:text-red-400">
      {children}
    </p>
  );
}

type Status = { kind: "idle" } | { kind: "working"; message: string } | { kind: "done"; message: string } | { kind: "error"; message: string };

interface Draft {
  entry: Entry;
  isNew: boolean;
  /** Once the id is typed by hand, stop suggesting it from the title. */
  idTouched: boolean;
  /** Remounts the form when a different entry is opened. */
  key: number;
}

function Editor() {
  const [tab, setTab] = useState<CollectionName>("works");
  const [entries, setEntries] = useState<Record<CollectionName, Entry[]>>({ works: [], achievements: [], experience: [] });
  const [draft, setDraft] = useState<Draft | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "working", message: "Loading…" });
  const form = FORMS[tab];

  const reload = useCallback(async () => {
    const [works, achievements, experience] = await Promise.all(TABS.map(loadEntries));
    setEntries({ works, achievements, experience });
  }, []);

  useEffect(() => {
    reload()
      .then(() => setStatus({ kind: "idle" }))
      .catch((error: Error) => setStatus({ kind: "error", message: error.message }));
  }, [reload]);

  /** Works and achievements share gallery addresses, so their ids must be unique across both. */
  const takenIds = useMemo(() => {
    const ids = tab === "experience" ? entries.experience : [...entries.works, ...entries.achievements];
    return new Set(ids.map((entry) => entry.id));
  }, [entries, tab]);

  const open = (entry: Entry, isNew = false) => {
    setDraft({ entry: { ...entry }, isNew, idTouched: !isNew, key: Date.now() });
    setErrors({});
    setStatus({ kind: "idle" });
  };

  const startNew = () => {
    const highest = Math.max(0, ...entries[tab].map((entry) => entry.order ?? 0));
    open({ id: "", ...form.blank(), order: highest + 1 }, true);
  };

  const change = (name: string, value: unknown) => {
    setDraft((current) => {
      if (!current) return current;
      const entry = { ...current.entry, [name]: value };
      if (current.isNew && !current.idTouched && name === form.titleField) entry.id = slugify(String(value ?? ""));
      return { ...current, entry, idTouched: current.idTouched || name === "id" };
    });
  };

  const save = async () => {
    if (!draft) return;
    const problems: Record<string, string> = {};
    for (const field of form.fields) {
      const value = draft.entry[field.name];
      const empty = value === undefined || value === "" || (Array.isArray(value) && value.length === 0);
      if (field.required && empty) problems[field.name] = "Required.";
    }
    if (draft.isNew) {
      const problem = idProblem(draft.entry.id, takenIds);
      if (problem) problems.id = problem;
    }
    setErrors(problems);
    if (Object.keys(problems).length) {
      setStatus({ kind: "error", message: "Fix the highlighted fields." });
      return;
    }
    setStatus({ kind: "working", message: "Saving…" });
    try {
      await saveEntry(tab, draft.entry);
      await reload();
      setDraft({ ...draft, isNew: false, idTouched: true });
      setStatus({ kind: "done", message: "Saved." });
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "Couldn’t save." });
    }
  };

  const remove = async () => {
    if (!draft || draft.isNew) return;
    const { title } = form.summary(draft.entry);
    if (!window.confirm(`Delete “${title}”? This can’t be undone.`)) return;
    setStatus({ kind: "working", message: "Deleting…" });
    try {
      await deleteEntry(tab, draft.entry.id);
      await reload();
      setDraft(null);
      setStatus({ kind: "done", message: "Deleted." });
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "Couldn’t delete." });
    }
  };

  return (
    <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[320px_1fr]">
      <aside className="space-y-4">
        <div className="flex rounded-full border border-border p-1" role="tablist">
          {TABS.map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={tab === name}
              onClick={() => {
                setTab(name);
                setDraft(null);
              }}
              className={cn(
                "flex-1 rounded-full px-3 py-1.5 text-sm font-medium transition",
                tab === name ? "bg-foreground text-background" : "hover:bg-muted",
              )}
            >
              {FORMS[name].label}
            </button>
          ))}
        </div>
        <Button variant="outline" className="w-full" onClick={startNew}>
          <FiPlus /> New {form.singular}
        </Button>
        <ul className="divide-y divide-border rounded-xl border border-border">
          {entries[tab].map((entry) => {
            const { title, detail } = form.summary(entry);
            return (
              <li key={entry.id}>
                <button
                  type="button"
                  onClick={() => open(entry)}
                  className={cn(
                    "w-full px-4 py-3 text-left transition hover:bg-muted",
                    draft && !draft.isNew && draft.entry.id === entry.id && "bg-muted",
                  )}
                >
                  <span className="block text-sm font-medium">{title}</span>
                  <span className="block text-xs text-muted-foreground">{detail}</span>
                </button>
              </li>
            );
          })}
          {entries[tab].length === 0 && <li className="px-4 py-6 text-center text-sm text-muted-foreground">Nothing here yet.</li>}
        </ul>
      </aside>

      <section className="rounded-xl border border-border p-5">
        {!draft ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Pick something on the left to edit, or add a new {form.singular}.
          </p>
        ) : (
          <div key={draft.key} className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="font-display text-xl font-semibold">
                {draft.isNew ? `New ${form.singular}` : form.summary(draft.entry).title}
              </h1>
              {form.inGallery && !draft.isNew && (
                <Link to={`/${draft.entry.id}`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                  View in gallery <FiExternalLink />
                </Link>
              )}
            </div>

            <label className="block space-y-1.5">
              <span className="text-sm font-medium">Address</span>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span>/</span>
                <input
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground disabled:opacity-70"
                  value={draft.entry.id}
                  disabled={!draft.isNew}
                  onChange={(event) => change("id", event.target.value)}
                />
              </div>
              {errors.id ? (
                <span className="text-xs text-red-600 dark:text-red-400">{errors.id}</span>
              ) : (
                <span className="text-xs text-muted-foreground">
                  {draft.isNew ? "Suggested from the title. It can’t be changed after saving." : "Addresses can’t change once saved."}
                </span>
              )}
            </label>

            {form.fields.map((field) => (
              <div key={field.name} className="space-y-1.5">
                <label htmlFor={`field-${field.name}`} className="text-sm font-medium">
                  {field.label}
                  {field.required && <span className="text-red-600 dark:text-red-400"> *</span>}
                </label>
                <FieldInput field={field} value={draft.entry[field.name]} onChange={(value) => change(field.name, value)} />
                {errors[field.name] ? (
                  <p className="text-xs text-red-600 dark:text-red-400">{errors[field.name]}</p>
                ) : (
                  field.help && <p className="text-xs text-muted-foreground">{field.help}</p>
                )}
              </div>
            ))}

            <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
              <Button onClick={() => void save()} disabled={status.kind === "working"}>
                {draft.isNew ? `Add ${form.singular}` : "Save changes"}
              </Button>
              {!draft.isNew && (
                <Button variant="ghost" className="text-red-600 dark:text-red-400" onClick={() => void remove()}>
                  Delete
                </Button>
              )}
              <StatusLine status={status} />
            </div>
          </div>
        )}
        {!draft && status.kind !== "idle" && <StatusLine status={status} />}
      </section>
    </main>
  );
}

function StatusLine({ status }: { status: Status }) {
  if (status.kind === "idle") return null;
  return (
    <p
      role="status"
      className={cn(
        "text-sm",
        status.kind === "error" ? "text-red-600 dark:text-red-400" : "text-muted-foreground",
      )}
    >
      {status.message}
    </p>
  );
}
