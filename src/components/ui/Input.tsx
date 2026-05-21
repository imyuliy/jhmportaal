import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-10 w-full rounded-lg border border-ink-200 bg-white px-3 text-sm text-ink-900",
        "placeholder:text-ink-400",
        "focus:outline-none focus:ring-2 focus:ring-flame-300 focus:border-flame-400",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-[88px] w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900",
      "placeholder:text-ink-400",
      "focus:outline-none focus:ring-2 focus:ring-flame-300 focus:border-flame-400",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
