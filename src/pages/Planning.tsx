import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Calendar } from "lucide-react";
import { PageHeader } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { taken, users, projects, findUser, findProject } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const dagen = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];

function startOfWeek(d: Date) {
  const date = new Date(d);
  const day = (date.getDay() + 6) % 7; // mon=0
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - day);
  return date;
}

export default function Planning() {
  const [anchor, setAnchor] = useState(new Date());
  const weekStart = useMemo(() => startOfWeek(anchor), [anchor]);
  const days = useMemo(
    () => Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      return d;
    }),
    [weekStart]
  );

  const buitenDienst = users.filter((u) => u.role === "buitendienst");

  const items = (userId: string, day: Date) => {
    const ds = day.toISOString().slice(0, 10);
    return taken.filter((t) => t.toegewezen_aan.includes(userId) && t.datum.slice(0, 10) === ds);
  };

  const fmt = (d: Date) => d.toLocaleDateString("nl-NL", { day: "2-digit", month: "short" });
  const isToday = (d: Date) => d.toDateString() === new Date().toDateString();

  return (
    <>
      <PageHeader
        title="Planning"
        description="Weekplanning per medewerker — sleep taken, druk op + om in te plannen."
        actions={<>
          <Button variant="outline"><Calendar className="h-4 w-4" /> Vandaag</Button>
          <Button><Plus className="h-4 w-4" /> Inplannen</Button>
        </>}
      />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" onClick={() => {
            const n = new Date(anchor); n.setDate(n.getDate() - 7); setAnchor(n);
          }}><ChevronLeft className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon" onClick={() => {
            const n = new Date(anchor); n.setDate(n.getDate() + 7); setAnchor(n);
          }}><ChevronRight className="h-4 w-4" /></Button>
          <div className="ml-3 font-display font-semibold text-ink-900">
            Week van {fmt(weekStart)}
          </div>
        </div>
        <div className="text-sm text-ink-500">{buitenDienst.length} medewerkers</div>
      </div>

      <Card>
        <CardContent className="p-0 overflow-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-8 border-b border-ink-100 sticky top-0 bg-white z-10">
              <div className="px-4 py-3 text-xs font-semibold text-ink-500 uppercase tracking-wider">Medewerker</div>
              {days.map((d, i) => (
                <div
                  key={i}
                  className={cn("px-3 py-3 text-xs font-semibold uppercase tracking-wider border-l border-ink-100", isToday(d) ? "text-flame-600 bg-flame-50/60" : "text-ink-500")}
                >
                  <div>{dagen[i]}</div>
                  <div className={cn("text-sm font-bold", isToday(d) ? "text-flame-700" : "text-ink-900")}>{d.getDate()}</div>
                </div>
              ))}
            </div>
            {buitenDienst.map((u) => (
              <div key={u.id} className="grid grid-cols-8 border-b border-ink-50 last:border-0">
                <div className="px-4 py-3 flex items-center gap-2 bg-ink-50/30">
                  <Avatar name={u.name} size={28} />
                  <div>
                    <div className="text-sm font-medium text-ink-900">{u.name}</div>
                    <div className="text-[11px] text-ink-500">{u.role}</div>
                  </div>
                </div>
                {days.map((d, i) => {
                  const its = items(u.id, d);
                  return (
                    <div key={i} className={cn("border-l border-ink-100 p-2 min-h-[88px] space-y-1.5", isToday(d) && "bg-flame-50/30")}>
                      {its.map((t) => {
                        const p = findProject(t.project_id);
                        return (
                          <div
                            key={t.id}
                            className={cn(
                              "rounded-md px-2 py-1.5 text-[11px] leading-tight border",
                              t.status === "probleem"
                                ? "bg-red-50 border-red-200 text-red-800"
                                : t.status === "bezig"
                                ? "bg-flame-50 border-flame-200 text-flame-800"
                                : "bg-ink-50 border-ink-200 text-ink-800"
                            )}
                          >
                            <div className="font-semibold truncate">{p?.nummer}</div>
                            <div className="truncate">{t.titel}</div>
                            {t.begin_tijd && <div className="text-ink-500">{t.begin_tijd}–{t.eind_tijd}</div>}
                          </div>
                        );
                      })}
                      {its.length === 0 && (
                        <button className="w-full h-full min-h-[64px] rounded-md border border-dashed border-ink-200 text-ink-400 hover:border-flame-400 hover:text-flame-500 inline-flex items-center justify-center">
                          <Plus className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex items-center gap-4 text-xs text-ink-500">
        <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-ink-200" /> Gepland</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-flame-300" /> Bezig</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-red-300" /> Probleem</span>
        <span className="ml-auto">{projects.length} projecten in systeem</span>
      </div>
    </>
  );
}
