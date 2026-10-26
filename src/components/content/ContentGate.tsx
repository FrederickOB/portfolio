import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useContent } from "@/context/ContentContext";
import { cn } from "@/lib/utils";

/** Shows skeletons while Firestore content loads, and a notice if it fails. */
export function ContentGate({
  children,
  count = 3,
  className,
  itemClassName,
}: {
  children: ReactNode;
  count?: number;
  className?: string;
  itemClassName?: string;
}) {
  const { status } = useContent();

  if (status === "loading") {
    return (
      <div className={className} aria-busy>
        {Array.from({ length: count }, (_, index) => (
          <Skeleton key={index} className={cn("rounded-2xl", itemClassName)} />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <p className="glass rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">
        This section couldn&rsquo;t load. Please refresh the page.
      </p>
    );
  }

  return <>{children}</>;
}
