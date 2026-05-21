import { useState } from "react";
import { Camera, FileDown, Filter, Upload } from "lucide-react";
import { PageHeader } from "@/components/ui/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { fotos, projects, findProject, findUser } from "@/lib/mockData";
import { cn, formatDate } from "@/lib/utils";

export default function Dossiers() {
  const [active, setActive] = useState<string | "alle">("alle");
  const filtered = fotos.filter((f) => active === "alle" || f.project_id === active);

  return (
    <>
      <PageHeader
        title="Dossiers & foto's"
        description="Automatisch opgebouwde projectdossiers met fotologboeken, exporteerbaar als PDF."
        actions={<>
          <Button variant="outline"><Upload className="h-4 w-4" /> Foto's uploaden</Button>
          <Button><FileDown className="h-4 w-4" /> Exporteer dossier</Button>
        </>}
      />

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Project filter */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader><CardTitle>Projecten</CardTitle><Filter className="h-4 w-4 text-ink-400" /></CardHeader>
          <CardContent className="space-y-1">
            <button
              onClick={() => setActive("alle")}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between",
                active === "alle" ? "bg-ink-900 text-white" : "hover:bg-ink-50 text-ink-700"
              )}
            >
              <span>Alle projecten</span>
              <span className="text-xs opacity-70">{fotos.length}</span>
            </button>
            {projects.map((p) => {
              const count = fotos.filter((f) => f.project_id === p.id).length;
              if (count === 0) return null;
              return (
                <button
                  key={p.id}
                  onClick={() => setActive(p.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between",
                    active === p.id ? "bg-ink-900 text-white" : "hover:bg-ink-50 text-ink-700"
                  )}
                >
                  <div className="min-w-0">
                    <div className="font-mono text-[11px] opacity-70">{p.nummer}</div>
                    <div className="truncate">{p.naam}</div>
                  </div>
                  <span className="text-xs opacity-70 ml-2">{count}</span>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Photo grid */}
        <div className="lg:col-span-3">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm text-ink-500">{filtered.length} foto's</div>
            <div className="flex items-center gap-2">
              <Badge tone="flame">voortgang</Badge>
              <Badge tone="success">oplevering</Badge>
              <Badge tone="danger">schade</Badge>
              <Badge tone="warning">veiligheid</Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((f) => {
              const p = findProject(f.project_id);
              const u = findUser(f.user_id);
              return (
                <div key={f.id} className="rounded-xl overflow-hidden bg-white border border-ink-100 shadow-card">
                  <div className="aspect-square bg-ink-100 relative">
                    <img src={f.url} alt="" className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2">
                      <Badge tone={f.type === "schade" ? "danger" : f.type === "oplevering" ? "success" : f.type === "veiligheid" ? "warning" : "flame"} className="text-[10px]">
                        {f.type}
                      </Badge>
                    </div>
                    <button className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/90 inline-flex items-center justify-center shadow">
                      <Camera className="h-3.5 w-3.5 text-ink-700" />
                    </button>
                  </div>
                  <div className="px-3 py-2">
                    <div className="text-xs font-mono text-ink-500 truncate">{p?.nummer}</div>
                    <div className="text-sm font-medium text-ink-900 truncate">{p?.naam}</div>
                    <div className="text-[11px] text-ink-500 truncate">
                      {u?.name} · {formatDate(f.taken_at)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dossier export card */}
      <Card className="mt-8 bg-gradient-to-br from-ink-50 to-flame-50 border-flame-100">
        <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-flame-500 text-white inline-flex items-center justify-center shrink-0">
            <FileDown className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="font-display font-semibold text-ink-900">Automatisch projectdossier</div>
            <p className="text-sm text-ink-600">
              Het systeem bouwt zelfstandig oplever- en revisiedossiers: foto's, dagrapporten,
              werkbonnen en uren — gebundeld in één PDF, klaar voor claim, verzekering of klant.
            </p>
          </div>
          <Button>Exporteer PDF</Button>
        </CardContent>
      </Card>
    </>
  );
}
