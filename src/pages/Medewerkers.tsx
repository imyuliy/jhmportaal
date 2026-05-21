import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { users } from "@/lib/mockData";
import { formatDate } from "@/lib/utils";

export default function Medewerkers() {
  const [q, setQ] = useState("");
  const list = users.filter((u) =>
    [u.name, u.email, u.role].join(" ").toLowerCase().includes(q.toLowerCase())
  );
  return (
    <>
      <PageHeader
        title="Medewerkers"
        description="Personeel, rollen, certificaten en VCA-geldigheid."
        actions={<Button><Plus className="h-4 w-4" /> Medewerker toevoegen</Button>}
      />
      <div className="relative mb-4 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" placeholder="Zoek medewerker…" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((u) => (
          <Card key={u.id} className="hover:shadow-pop transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <Avatar name={u.name} size={48} />
                <div className="flex-1 min-w-0">
                  <div className="font-display font-semibold text-ink-900 truncate">{u.name}</div>
                  <div className="text-sm text-ink-500 truncate">{u.email}</div>
                </div>
                <Badge tone={u.role === "directie" ? "flame" : u.role === "projectleider" ? "info" : "neutral"} className="capitalize">{u.role}</Badge>
              </div>
              {u.phone && <div className="mt-3 text-sm text-ink-700">{u.phone}</div>}
              {u.certificaten && u.certificaten.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {u.certificaten.map((c) => (
                    <Badge key={c} tone="success">{c}</Badge>
                  ))}
                </div>
              )}
              {u.vca_geldig_tot && (
                <div className="mt-2 text-xs text-ink-500">VCA geldig tot {formatDate(u.vca_geldig_tot)}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
