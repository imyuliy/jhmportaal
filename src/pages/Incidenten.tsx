import { useState } from "react";
import { AlertTriangle, Plus, Filter } from "lucide-react";
import { PageHeader } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { incidenten, findUser, findProject } from "@/lib/mockData";
import { formatDate, formatTime, cn } from "@/lib/utils";

const statusTabs = [
  { id: "open", label: "Open" },
  { id: "in_behandeling", label: "In behandeling" },
  { id: "gesloten", label: "Gesloten" },
  { id: "alle", label: "Alle" },
] as const;

export default function Incidenten() {
  const [tab, setTab] = useState<(typeof statusTabs)[number]["id"]>("open");
  const list = incidenten.filter((i) => tab === "alle" || i.status === tab);

  return (
    <>
      <PageHeader
        title="Incidenten"
        description="Schade, onveilige situaties, klachten en afwijkingen — met foto, locatie en opvolging."
        actions={<>
          <Button variant="outline"><Filter className="h-4 w-4" /> Filter</Button>
          <Button><Plus className="h-4 w-4" /> Nieuw incident</Button>
        </>}
      />

      <div className="flex items-center gap-2 mb-4">
        {statusTabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium border",
              tab === t.id ? "bg-ink-900 text-white border-ink-900" : "bg-white text-ink-700 border-ink-200 hover:bg-ink-50"
            )}
          >
            {t.label}
          </button>
        ))}
        <div className="ml-auto text-sm text-ink-500">{list.length} resultaten</div>
      </div>

      <div className="space-y-4">
        {list.map((inc) => {
          const melder = findUser(inc.melder_id);
          const verantwoordelijke = findUser(inc.verantwoordelijke_id);
          const project = findProject(inc.project_id);
          return (
            <Card key={inc.id}>
              <CardContent className="p-5">
                <div className="flex flex-col lg:flex-row gap-4">
                  {inc.fotos[0] && (
                    <img src={inc.fotos[0]} alt="" className="w-full lg:w-44 h-32 rounded-lg object-cover bg-ink-100" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <Badge tone={inc.prioriteit === "kritiek" ? "danger" : inc.prioriteit === "hoog" ? "danger" : inc.prioriteit === "midden" ? "warning" : "neutral"}>{inc.prioriteit}</Badge>
                      <Badge tone="neutral">{inc.type}</Badge>
                      <Badge tone={inc.status === "open" ? "danger" : inc.status === "in_behandeling" ? "warning" : "success"}>{inc.status}</Badge>
                      {project && <span className="text-xs font-mono text-ink-500">{project.nummer}</span>}
                    </div>
                    <div className="text-ink-900 font-medium">{inc.beschrijving}</div>
                    <div className="text-xs text-ink-500 mt-1">
                      Gemeld door {melder?.name} · {formatDate(inc.datum)} {formatTime(inc.datum)}
                    </div>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-ink-500">Verantwoordelijke:</span>
                        {verantwoordelijke ? (
                          <>
                            <Avatar name={verantwoordelijke.name} size={22} />
                            <span className="text-sm text-ink-900">{verantwoordelijke.name}</span>
                          </>
                        ) : (
                          <span className="text-sm text-ink-500">– nog toewijzen –</span>
                        )}
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        {inc.status !== "gesloten" && <Button size="sm" variant="outline">Status wijzigen</Button>}
                        <Button size="sm">Open ticket</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
