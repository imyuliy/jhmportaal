import { cn } from "@/lib/utils";

export const Progress = ({
  value,
  className,
  tone = "flame",
}: {
  value: number;
  className?: string;
  tone?: "flame" | "ink" | "sage";
}) => {
  const tones = {
    flame: "bg-flame-500",
    ink: "bg-ink-900",
    sage: "bg-sage-500",
  } as const;
  return (
    <div className={cn("h-2 w-full rounded-full bg-ink-100 overflow-hidden", className)}>
      <div
        className={cn("h-full rounded-full transition-all", tones[tone])}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
};
