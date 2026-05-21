import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Filter, LayoutGrid, List, Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/ui/Section";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { AvatarStack } from "@/components/ui/Avatar";
import { projects, findUser } from "@/lib/mockData";
import { formatDate, cn } from "@/lib/utils";
import type { ProjectStatus } from "@/types";

const statusLabel: Record<ProjectStatus, string> = {
  in_uitvoering: "In uitvoering",
  gepland: "Gepland",
  opgeleverd: "Opgeleverd",
  gefactureerd: "Gefactureerd",
  offerte: "Offerte",
  gepauzeerd: "Gepauzeerd",
};

const statusTone: Record<ProjectStatus, "neutral" | "info" | "success" | "warning" | "flame"> = {
  in_uitvoering: "flame",
  gepland: "info",
  opgeleverd: "success",
  gefactureerd: "success",
  offerte: "neutral",
  gepauzeerd: "warning",
};

const filters: { id: ProjectStatus | "alle"; label: string }[] = [
  { id: "alle", label: "Alle" },
  { id: "in_uitvoering", label: "In uitvoering" },
  { id: "gepland", label: "Gepland" },
  { id: "offerte", label: "Offerte" },
  { id: "gepauzeerd", label: "Gepauzeerd" },
  { id: "opgeleverd", label: "Opgeleverd" },
];

export default function Projecten() {
  const [filter, setFilter] = useState<ProjectStatus | "alle">("alle");
  const [view, setView] = useState<"grid" | "list">("list");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesFilter = filter === "alle" || p.status === filter;
      const matchesQ =
        q.length === 0 ||
        p.naam.toLowerCase().includes(q.toLowerCase()) ||
        p.klant.toLowerCase().includes(q.toLowerCase()) ||
        p.nummer.toLowerCase().includes(q.toLowerCase());
      return matchesFilter && matchesQ;
    });
  }, [filter, q]);

  return (
    <>
      <PageHeader
        title="Projecten"
        description={`${projects.length} projecten in het portaal — filter, zoek en open details.`}
        actions={
          <>
            <Button variant="outline">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button>
              <Plus className="h-4 w-4" />
              Nieuw project
            </Button>
          </>
        }
      />

      <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-9"
            placeholder="Zoek op nummer, naam of klant…"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium border",
                filter === f.id
                  ? "bg-ink-900 text-white border-ink-900"
                  : "bg-white text-ink-700 border-ink-200 hover:bg-ink-50"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="ml-auto inline-flex border border-ink-200 rounded-lg bg-white p-0.5">
          <button
            onClick={() => setView("list")}
            className={cn("h-8 w-8 inline-flex items-center justify-center rounded-md", view === "list" ? "bg-ink-100" : "")}
          >
            <List className="h-4 w-4 text-ink-700" />
          </button>
          <button
            onClick={() => setView("grid")}
            className={cn("h-8 w-8 inline-flex items-center justify-center rounded-md", view === "grid" ? "bg-ink-100" : "")}
          >
            <LayoutGrid className="h-4 w-4 text-ink-700" />
          </button>
        </div>
      </div>

      {view === "list" ? (
        <div className="bg-white rounded-xl2 border border-ink-100 shadow-card overflow-hidden">
          <div className="grid grid-cols-12 px-5 py-3 border-b border-ink-100 text-xs font-semibold text-ink-500 uppercase tracking-wider">
            <div className="col-span-5">Project</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Voortgang</div>
            <div className="col-span-2">Team</div>
            <div className="col-span-1 text-right">Levering</div>
          </div>
          {filtered.map((p) => {
            const teamNames = p.team_ids.map((id) => findUser(id)?.name ?? "").filter(Boolean);
            return (
              <Link
                key={p.id}
                to={`/app/projecten/${p.id}`}
                className="grid grid-cols-12 px-5 py-4 border-b border-ink-50 last:border-0 items-center hover:bg-ink-50/60"
              >
                <div className="col-span-5">
                  <div className="text-xs font-mono text-ink-500">{p.nummer}</div>
                  <div className="font-display font-semibold text-ink-900 truncate">{p.naam}</div>
                  <div className="text-sm text-ink-500 truncate">{p.klant} · {p.plaats}</div>
                </div>
                <div className="col-span-2">
                  <Badge tone={statusTone[p.status]}>{statusLabel[p.status]}</Badge>
                </div>
                <div className="col-span-2 pr-4">
                  <Progress value={p.voortgang} />
                  <div className="text-xs text-ink-500 mt-1">{p.voortgang}%</div>
                </div>
                <div className="col-span-2">
                  <AvatarStack names={teamNames} />
                </div>
                <div className="col-span-1 text-right text-sm text-ink-700">
                  {formatDate(p.eind_datum, { day: "2-digit", month: "short" })}
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => {
            const teamNames = p.team_ids.map((id) => findUser(id)?.name ?? "").filter(Boolean);
            return (
              <Link
                key={p.id}
                to={`/app/projecten/${p.id}`}
                className="bg-white rounded-xl2 border border-ink-100 shadow-card p-5 hover:shadow-pop transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-ink-500">{p.nummer}</span>
                  <Badge tone={statusTone[p.status]}>{statusLabel[p.status]}</Badge>
                </div>
                <div className="font-display font-semibold text-ink-900">{p.naam}</div>
                <div className="text-sm text-ink-500 truncate">{p.klant} · {p.plaats}</div>
                <div className="mt-4">
                  <Progress value={p.voortgang} />
                  <div className="flex items-center justify-between text-xs text-ink-500 mt-1">
                    <span>{p.voortgang}%</span>
                    <span>{p.geschreven_uren}/{p.budget_uren} u</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <AvatarStack names={teamNames} />
                  <span className="text-xs text-ink-500">
                    Levering {formatDate(p.eind_datum, { day: "2-digit", month: "short" })}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
