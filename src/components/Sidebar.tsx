import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CalendarRange,
  ClipboardList,
  Clock,
  Camera,
  Truck,
  ShieldAlert,
  Bot,
  Users,
  Smartphone,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/app/projecten", label: "Projecten", icon: FolderKanban },
  { to: "/app/planning", label: "Planning", icon: CalendarRange },
  { to: "/app/werkbonnen", label: "Werkbonnen", icon: ClipboardList },
  { to: "/app/uren", label: "Urenregistratie", icon: Clock },
  { to: "/app/dossiers", label: "Dossiers & foto's", icon: Camera },
  { to: "/app/materieel", label: "Materieel", icon: Truck },
  { to: "/app/incidenten", label: "Incidenten", icon: ShieldAlert },
  { to: "/app/ai", label: "AI-assistent", icon: Bot },
  { to: "/app/medewerkers", label: "Medewerkers", icon: Users },
  { to: "/app/mobile", label: "Mobile preview", icon: Smartphone },
  { to: "/app/instellingen", label: "Instellingen", icon: Settings },
];

export const Sidebar = ({ onNavigate }: { onNavigate?: () => void }) => (
  <aside className="h-full flex flex-col bg-ink-900 text-ink-100">
    <div className="px-5 pt-5 pb-4 flex items-center gap-2">
      <div className="h-9 w-9 rounded-lg bg-flame-500 flex items-center justify-center font-display font-bold text-ink-900">
        J
      </div>
      <div>
        <div className="font-display font-bold leading-none">JHM Flow</div>
        <div className="text-xs text-ink-300">Portal</div>
      </div>
    </div>
    <nav className="flex-1 overflow-y-auto px-3 pb-4">
      <ul className="space-y-0.5">
        {nav.map((n) => (
          <li key={n.to}>
            <NavLink
              to={n.to}
              end={n.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-flame-500/15 text-white"
                    : "text-ink-300 hover:bg-ink-800 hover:text-white"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <n.icon className={cn("h-4.5 w-4.5", isActive ? "text-flame-400" : "text-ink-400 group-hover:text-ink-200")} />
                  <span>{n.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
    <div className="px-4 py-4 border-t border-ink-800 text-xs text-ink-400">
      <div>JHM groep B.V.</div>
      <div className="text-ink-500">v0.1 · prototype</div>
    </div>
  </aside>
);
