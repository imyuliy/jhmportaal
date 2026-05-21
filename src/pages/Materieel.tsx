import { useMemo, useState } from "react";
import { Car, Wrench, Truck, KeyRound, Ruler, Filter, Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { materieel, findUser, findProject } from "@/lib/mockData";
import { formatDate, cn } from "@/lib/utils";

const iconMap = {
  voertuig: Car,
  aanhanger: Truck,
  gereedschap: Wrench,
  meetapparatuur: Ruler,
  sleutel: KeyRound,
} as const;

const statusTone: Record<string, "neutral" | "success" | "warning" | "danger" | "info"> = {
  beschikbaar: "success",
  in_gebruik: "info",
  onderhoud: "warning",
  vermist: "danger",
};

const types = ["alle", "voertuig", "aanhanger", "gereedschap", "meetapparatuur", "sleutel"] as const;

export default function Materieel() {
  const [type, setType] = useState<(typeof types)[number]>("alle");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    return materieel.filter((m) => {
      if (type !== "alle" && m.type !== type) return false;
      if (!q) return true;
      return [m.naam, m.identifier ?? ""].join(" ").toLowerCase().includes(q.toLowerCase());
    });
  }, [type, q]);

  return (
    <>
      <PageHeader
        title="Materieel & middelen"
        description="Bedrijfswagens, aanhangers, gereedschap, meetapparatuur en sleutels — voorkom verlies, dubbele inzet en gemis."
        actions={<>
          <Button variant="outline"><Filter className="h-4 w-4" /> Filter</Button>
          <Button><Plus className="h-4 w-4" /> Item toevoegen</Button>
        </>}
      />

      <div className="flex flex-col lg:flex-row gap-3 mb-4">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" placeholder="Zoek op naam of kenteken/serienummer…" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium border capitalize",
                type === t
                  ? "bg-ink-900 text-white border-ink-900"
                  : "bg-white text-ink-700 border-ink-200 hover:bg-ink-50"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((m) => {
          const Icon = iconMap[m.type];
          const user = findUser(m.toegewezen_aan);
          const project = findProject(m.toegewezen_project_id);
          return (
            <Card key={m.id} className="hover:shadow-pop transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div className="h-10 w-10 rounded-lg bg-ink-100 text-ink-700 inline-flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge tone={statusTone[m.status]}>{m.status.replace("_", " ")}</Badge>
                </div>
                <div className="mt-3 font-display font-semibold text-ink-900">{m.naam}</div>
                {m.identifier && <div className="text-xs font-mono text-ink-500">{m.identifier}</div>}

                <div className="mt-3 space-y-1 text-sm">
                  {user && (
                    <div className="flex items-center gap-2 text-ink-700">
                      <Avatar name={user.name} size={22} />
                      <span>{user.name}</span>
                    </div>
                  )}
                  {project && (
                    <div className="text-ink-500 text-xs">Op project {project.nummer} — {project.naam}</div>
                  )}
                  {m.apk_tot && (
                    <div className="text-xs text-ink-500">APK tot {formatDate(m.apk_tot)}</div>
                  )}
                  {m.laatste_keuring && (
                    <div className="text-xs text-ink-500">Laatste keuring {formatDate(m.laatste_keuring)}</div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
