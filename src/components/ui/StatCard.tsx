import * as React from "react";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";

export const StatCard = ({
  label,
  value,
  delta,
  icon: Icon,
  tone = "neutral",
}: {
  label: string;
  value: string | number;
  delta?: number;
  icon?: React.ComponentType<{ className?: string }>;
  tone?: "neutral" | "flame" | "sage" | "ink";
}) => {
  const tones = {
    neutral: "bg-ink-100 text-ink-700",
    flame: "bg-flame-100 text-flame-700",
    sage: "bg-sage-100 text-sage-700",
    ink: "bg-ink-900 text-white",
  } as const;
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-ink-500">{label}</div>
          <div className="mt-1.5 text-2xl font-display font-bold text-ink-900">{value}</div>
        </div>
        {Icon && (
          <div
            className={cn(
              "h-9 w-9 rounded-lg flex items-center justify-center",
              tones[tone]
            )}
          >
            <Icon className="h-4.5 w-4.5" />
          </div>
        )}
      </div>
      {typeof delta === "number" && (
        <div
          className={cn(
            "mt-3 inline-flex items-center gap-1 text-xs font-medium",
            delta >= 0 ? "text-sage-700" : "text-red-600"
          )}
        >
          {delta >= 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
          {Math.abs(delta)}% t.o.v. vorige week
        </div>
      )}
    </div>
  );
};
