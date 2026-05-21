import * as React from "react";
import { cn } from "@/lib/utils";
import { initials } from "@/lib/utils";

export const Avatar = ({
  name,
  src,
  size = 36,
  className,
}: {
  name: string;
  src?: string;
  size?: number;
  className?: string;
}) => {
  const style = { width: size, height: size, fontSize: Math.max(11, size / 3) };
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={style}
        className={cn("rounded-full object-cover ring-2 ring-white", className)}
      />
    );
  }
  return (
    <div
      style={style}
      className={cn(
        "rounded-full bg-gradient-to-br from-ink-700 to-ink-900 text-white font-semibold flex items-center justify-center ring-2 ring-white",
        className
      )}
    >
      {initials(name)}
    </div>
  );
};

export const AvatarStack = ({
  names,
  max = 4,
  size = 28,
}: {
  names: string[];
  max?: number;
  size?: number;
}) => {
  const visible = names.slice(0, max);
  const extra = Math.max(0, names.length - max);
  return (
    <div className="flex -space-x-2">
      {visible.map((n) => (
        <Avatar key={n} name={n} size={size} />
      ))}
      {extra > 0 && (
        <div
          style={{ width: size, height: size, fontSize: Math.max(10, size / 3) }}
          className="rounded-full bg-ink-100 text-ink-700 font-semibold flex items-center justify-center ring-2 ring-white"
        >
          +{extra}
        </div>
      )}
    </div>
  );
};
