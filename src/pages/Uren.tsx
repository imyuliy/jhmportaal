import { useState } from "react";
import { CheckCircle2, XCircle, Filter, Download, Search } from "lucide-react";
import { PageHeader } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { uren, findUser, findProject } from "@/lib/mockData";
import { formatDate } from "@/lib/utils";
import { Clock, TrendingUp } from "lucide-react";

export default function Uren() {
  const [q, setQ] = useState("");
  const list = uren.filter((u) => {
    if (!q) return true;
    const usr = findUser(u.user_id)?.name ?? "";
    const p = findProject(u.project_id)?.naam ?? "";
    return [usr, p, u.datum, u.type].join(" ").toLowerCase().includes(q.toLowerCase());
  });

  const totaal = uren.reduce((s, u) => s + u.uren, 0);
  const tegoed = uren.filter((u) => !u.goedgekeurd).length;
  const overuren = uren.filter((u) => u.type === "overuren").reduce((s, u) => s + u.uren, 0);

  return (
    <>
      <PageHeader
        title="Urenregistratie"
        description="Geschreven uren per medewerker, per project, per dag."
        actions={<>
          <Button variant="outline"><Filter className="h-4 w-4" /> Filter</Button>
          <Button variant="outline"><Download className="h-4 w-4" /> Export</Button>
          <Button>Periode afsluiten</Button>
        </>}
      />

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Totaal uren deze week" value={`${totaal} u`} icon={Clock} tone="flame" />
        <StatCard label="Te beoordelen" value={tegoed} icon={CheckCircle2} tone="ink" />
        <StatCard label="Overuren" value={`${overuren} u`} icon={TrendingUp} tone="sage" />
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" placeholder="Zoek op medewerker, project of datum…" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-ink-50 text-xs font-semibold text-ink-500 uppercase tracking-wider">
              <tr>
                <th className="text-left px-5 py-3">Medewerker</th>
                <th className="text-left px-5 py-3">Project</th>
                <th className="text-left px-5 py-3">Datum</th>
                <th className="text-left px-5 py-3">Type</th>
                <th className="text-right px-5 py-3">Uren</th>
                <th className="text-center px-5 py-3">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {list.map((u) => {
                const usr = findUser(u.user_id);
                const p = findProject(u.project_id);
                return (
                  <tr key={u.id} className="border-t border-ink-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={usr?.name ?? ""} size={28} />
                        <div className="text-ink-900 font-medium">{usr?.name}</div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-ink-700">
                      <div className="text-ink-900">{p?.naam}</div>
                      <div className="text-xs text-ink-500 font-mono">{p?.nummer}</div>
                    </td>
                    <td className="px-5 py-3 text-ink-700">{formatDate(u.datum)}</td>
                    <td className="px-5 py-3">
                      <Badge tone={u.type === "overuren" ? "warning" : u.type === "reisuren" ? "info" : "neutral"}>{u.type}</Badge>
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-ink-900">{u.uren} u</td>
                    <td className="px-5 py-3 text-center">
                      <Badge tone={u.goedgekeurd ? "success" : "warning"}>
                        {u.goedgekeurd ? "Goedgekeurd" : "Te beoordelen"}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-right">
                      {!u.goedgekeurd && (
                        <div className="inline-flex gap-1">
                          <Button size="sm" variant="ghost"><CheckCircle2 className="h-4 w-4 text-sage-600" /></Button>
                          <Button size="sm" variant="ghost"><XCircle className="h-4 w-4 text-red-600" /></Button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </>
  );
}
