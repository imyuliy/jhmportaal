import * as React from "react";
import { cn } from "@/lib/utils";

export const Tabs = ({
  tabs,
  value,
  onChange,
  className,
}: {
  tabs: { id: string; label: string; count?: number }[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
}) => (
  <div className={cn("border-b border-ink-100", className)}>
    <div className="flex gap-1 overflow-x-auto -mb-px">
      {tabs.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
              active
                ? "border-flame-500 text-ink-900"
                : "border-transparent text-ink-500 hover:text-ink-700 hover:border-ink-200"
            )}
          >
            {t.label}
            {typeof t.count === "number" && (
              <span
                className={cn(
                  "ml-2 inline-flex items-center justify-center text-xs px-1.5 rounded-full",
                  active ? "bg-flame-100 text-flame-700" : "bg-ink-100 text-ink-600"
                )}
              >
                {t.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  </div>
);
