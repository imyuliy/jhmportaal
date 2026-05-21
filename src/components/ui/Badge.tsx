import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "info" | "success" | "warning" | "danger" | "flame";

export const Badge = ({
  tone = "neutral",
  className,
  children,
  ...props
}: { tone?: Tone } & React.HTMLAttributes<HTMLSpanElement>) => {
  const tones: Record<Tone, string> = {
    neutral: "bg-ink-100 text-ink-700",
    info: "bg-sky-100 text-sky-700",
    success: "bg-sage-100 text-sage-700",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-red-100 text-red-700",
    flame: "bg-flame-100 text-flame-700",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
        tones[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
