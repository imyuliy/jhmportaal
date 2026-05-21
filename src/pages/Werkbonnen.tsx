import { useState } from "react";
import { CheckCircle2, ClipboardList, Download, Filter, Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { werkbonnen, findUser, findProject } from "@/lib/mockData";
import { formatDate, cn } from "@/lib/utils";

const statusTone: Record<string, "neutral" | "warning" | "success" | "danger"> = {
  concept: "neutral",
  ingediend: "warning",
  akkoord_klant: "success",
  geweigerd: "danger",
};

export default function Werkbonnen() {
  const [q, setQ] = useState("");
  const list = werkbonnen.filter((wb) => {
    if (!q) return true;
    const u = findUser(wb.uitvoerder_id)?.name ?? "";
    const p = findProject(wb.project_id)?.naam ?? "";
    return [wb.nummer, wb.omschrijving, u, p].join(" ").toLowerCase().includes(q.toLowerCase());
  });

  return (
    <>
      <PageHeader
        title="Werkbonnen"
        description="Vastgelegde uitvoering — materialen, uren, klantakkoord."
        actions={<>
          <Button variant="outline"><Filter className="h-4 w-4" /> Filter</Button>
          <Button><Plus className="h-4 w-4" /> Nieuwe werkbon</Button>
        </>}
      />

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" placeholder="Zoek op nummer, uitvoerder of project…" />
        </div>
        <Button variant="outline"><Download className="h-4 w-4" /> Export</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {list.map((wb) => {
            const u = findUser(wb.uitvoerder_id);
            const p = findProject(wb.project_id);
            return (
              <div key={wb.id} className="px-5 py-4 border-b border-ink-50 last:border-0 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-flame-100 text-flame-600 inline-flex items-center justify-center shrink-0">
                  <ClipboardList className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono text-ink-500">{wb.nummer}</span>
                    <Badge tone={statusTone[wb.status]}>{wb.status}</Badge>
                  </div>
                  <div className="font-display font-semibold text-ink-900 truncate">{wb.omschrijving}</div>
                  <div className="text-sm text-ink-500 truncate">{p?.naam} · {p?.plaats}</div>
                </div>
                <div className="flex items-center gap-4 text-sm text-ink-600">
                  <div className="text-right">
                    <div className="font-semibold text-ink-900">{wb.uren} u</div>
                    <div className="text-xs text-ink-500">{formatDate(wb.datum)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar name={u?.name ?? ""} size={28} />
                    <div className="text-xs text-ink-500 hidden md:block">{u?.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {wb.status === "ingediend" && (
                    <Button size="sm"><CheckCircle2 className="h-4 w-4" /> Akkoord</Button>
                  )}
                  <Button size="sm" variant="outline"><Download className="h-4 w-4" /> PDF</Button>
                </div>
              </div>
            );
          })}
          {list.length === 0 && <div className="p-8 text-center text-ink-500">Geen werkbonnen gevonden.</div>}
        </CardContent>
      </Card>
    </>
  );
}
