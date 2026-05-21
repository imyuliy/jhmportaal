import * as React from "react";
import { cn } from "@/lib/utils";

export const PageHeader = ({
  title,
  description,
  actions,
  className,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6", className)}>
    <div>
      <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink-900 tracking-tight">{title}</h1>
      {description && <p className="mt-1 text-ink-500 max-w-2xl">{description}</p>}
    </div>
    {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
  </div>
);

export const Empty = ({
  title,
  description,
  icon: Icon,
  action,
}: {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: React.ReactNode;
}) => (
  <div className="text-center py-12 px-4 border-2 border-dashed border-ink-200 rounded-xl2 bg-white">
    {Icon && (
      <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-ink-100 text-ink-500 flex items-center justify-center">
        <Icon className="h-6 w-6" />
      </div>
    )}
    <div className="font-display font-semibold text-ink-900">{title}</div>
    {description && <div className="mt-1 text-sm text-ink-500 max-w-sm mx-auto">{description}</div>}
    {action && <div className="mt-4">{action}</div>}
  </div>
);
