import { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { sizedImage } from "@/lib/images";
import { uploadImage } from "./api";
import type { Field } from "./forms";

const control =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

/** One form control for a field, by its type. */
export function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const id = `field-${field.name}`;
  switch (field.type) {
    case "textarea":
      return (
        <textarea
          id={id}
          rows={field.name === "body" ? 9 : 3}
          className={control}
          value={String(value ?? "")}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      );
    case "select":
      return (
        <select id={id} className={control} value={String(value ?? "")} onChange={(event) => onChange(event.target.value || undefined)}>
          {!field.required && <option value="">Not set</option>}
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    case "number":
      return (
        <input
          id={id}
          type="number"
          className={control}
          value={typeof value === "number" ? value : ""}
          onChange={(event) => onChange(event.target.value === "" ? undefined : Number(event.target.value))}
        />
      );
    case "tags":
      return <ListInput id={id} value={value} separator="," placeholder={field.placeholder} onChange={onChange} />;
    case "lines":
      return <ListInput id={id} value={value} separator={"\n"} placeholder={field.placeholder} onChange={onChange} />;
    case "checks": {
      const selected = Array.isArray(value) ? (value as string[]) : [];
      return (
        <div className="flex flex-wrap gap-4">
          {field.options?.map((option) => (
            <label key={option.value} className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selected.includes(option.value)}
                onChange={(event) =>
                  onChange(
                    event.target.checked
                      ? [...selected, option.value]
                      : selected.filter((item) => item !== option.value),
                  )
                }
              />
              {option.label}
            </label>
          ))}
        </div>
      );
    }
    case "image":
      return <ImageInput id={id} value={typeof value === "string" ? value : ""} onChange={onChange} />;
    default:
      return (
        <input
          id={id}
          type={field.type === "url" ? "url" : field.type === "month" ? "month" : "text"}
          className={control}
          value={String(value ?? "")}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      );
  }
}

/**
 * A list typed as text: comma-separated tags or one item per line. The text is
 * kept as typed, so "React, " doesn't lose its comma mid-word.
 */
function ListInput({
  id,
  value,
  separator,
  placeholder,
  onChange,
}: {
  id: string;
  value: unknown;
  separator: string;
  placeholder?: string;
  onChange: (value: string[]) => void;
}) {
  const joiner = separator === "," ? ", " : "\n";
  const [text, setText] = useState(() => (Array.isArray(value) ? value.join(joiner) : ""));
  const update = (next: string) => {
    setText(next);
    onChange(next.split(separator).map((item) => item.trim()).filter(Boolean));
  };
  return separator === "\n" ? (
    <textarea id={id} rows={3} className={control} value={text} placeholder={placeholder} onChange={(event) => update(event.target.value)} />
  ) : (
    <input id={id} className={control} value={text} placeholder={placeholder} onChange={(event) => update(event.target.value)} />
  );
}

function ImageInput({ id, value, onChange }: { id: string; value: string; onChange: (value: string) => void }) {
  const file = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (picked: File) => {
    setUploading(true);
    setError(null);
    try {
      onChange(await uploadImage(picked));
    } catch (problem) {
      setError(problem instanceof Error ? problem.message : "The upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {value && (
        <img src={sizedImage(value, 640)} alt="" className="max-h-52 rounded-lg border border-border object-contain" />
      )}
      <div className="flex gap-2">
        <input
          id={id}
          type="url"
          className={control}
          value={value}
          placeholder="Upload a file, or paste an image link"
          onChange={(event) => onChange(event.target.value)}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => file.current?.click()}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted disabled:opacity-60"
        >
          <FiUpload />
          {uploading ? "Uploading…" : "Upload"}
        </button>
        <input
          ref={file}
          type="file"
          accept="image/*"
          hidden
          onChange={(event) => {
            const picked = event.target.files?.[0];
            if (picked) void upload(picked);
            event.target.value = "";
          }}
        />
      </div>
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
