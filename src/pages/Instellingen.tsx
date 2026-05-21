import { useState } from "react";
import { Plug, Bell, Building2, Shield, Database } from "lucide-react";
import { PageHeader } from "@/components/ui/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { isSupabaseConfigured } from "@/lib/supabase";

const integraties = [
  { naam: "Exact", body: "Boekhouding & facturatie", aangesloten: false, color: "bg-red-100 text-red-700" },
  { naam: "AFAS", body: "ERP & HRM", aangesloten: false, color: "bg-blue-100 text-blue-700" },
  { naam: "Moneybird", body: "Boekhouding kleinere bedrijven", aangesloten: true, color: "bg-emerald-100 text-emerald-700" },
  { naam: "Outlook", body: "E-mail & agenda", aangesloten: true, color: "bg-sky-100 text-sky-700" },
  { naam: "Google Calendar", body: "Agenda's", aangesloten: false, color: "bg-amber-100 text-amber-700" },
];

const tabs = [
  { id: "organisatie", label: "Organisatie", icon: Building2 },
  { id: "integraties", label: "Integraties", icon: Plug },
  { id: "meldingen", label: "Meldingen", icon: Bell },
  { id: "supabase", label: "Database", icon: Database },
  { id: "rechten", label: "Rechten", icon: Shield },
] as const;

export default function Instellingen() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("integraties");

  return (
    <>
      <PageHeader title="Instellingen" description="Beheer organisatie, integraties, meldingen en rechten." />

      <div className="grid lg:grid-cols-4 gap-6">
        <Card className="h-fit">
          <CardContent className="p-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center gap-3 ${tab === t.id ? "bg-ink-900 text-white" : "hover:bg-ink-50 text-ink-700"}`}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          {tab === "organisatie" && (
            <Card>
              <CardHeader><CardTitle>Organisatie</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <Field label="Bedrijfsnaam" defaultValue="JHM groep B.V." />
                <Field label="KvK-nummer" defaultValue="12345678" />
                <Field label="BTW-nummer" defaultValue="NL001234567B01" />
                <Field label="E-mail" defaultValue="info@jhm.nl" />
                <Field label="Telefoon" defaultValue="+31 33 123 45 67" />
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline">Annuleren</Button>
                  <Button>Opslaan</Button>
                </div>
              </CardContent>
            </Card>
          )}
          {tab === "integraties" && (
            <Card>
              <CardHeader><CardTitle>Integraties</CardTitle><span className="text-sm text-ink-500">Koppel je administratie & agenda</span></CardHeader>
              <CardContent className="space-y-2">
                {integraties.map((i) => (
                  <div key={i.naam} className="flex items-center gap-4 rounded-lg border border-ink-100 px-4 py-3">
                    <div className={`h-10 w-10 rounded-lg ${i.color} inline-flex items-center justify-center font-display font-bold`}>
                      {i.naam[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-ink-900">{i.naam}</div>
                      <div className="text-sm text-ink-500">{i.body}</div>
                    </div>
                    {i.aangesloten ? (
                      <Badge tone="success">aangesloten</Badge>
                    ) : (
                      <Button size="sm">Verbinden</Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
          {tab === "meldingen" && (
            <Card>
              <CardHeader><CardTitle>Meldingen</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                {["Incidenten met prioriteit hoog/kritiek", "Nieuwe werkbonnen ter goedkeuring", "Dagrapport ontvangen", "VCA bijna verlopen", "Materieel APK bijna verlopen"].map((m) => (
                  <div key={m} className="flex items-center justify-between border border-ink-100 rounded-lg px-4 py-3">
                    <span className="text-ink-800">{m}</span>
                    <input type="checkbox" defaultChecked className="h-5 w-5 accent-flame-500" />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
          {tab === "supabase" && (
            <Card>
              <CardHeader><CardTitle>Database (Supabase)</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="rounded-lg bg-ink-50 border border-ink-100 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-ink-900">Verbinding</div>
                      <div className="text-ink-500">{isSupabaseConfigured() ? "Verbonden met Supabase" : "Nog niet geconfigureerd — draait op mock data."}</div>
                    </div>
                    <Badge tone={isSupabaseConfigured() ? "success" : "warning"}>
                      {isSupabaseConfigured() ? "online" : "mock"}
                    </Badge>
                  </div>
                </div>
                <Field label="VITE_SUPABASE_URL" placeholder="https://xxxxxxxx.supabase.co" />
                <Field label="VITE_SUPABASE_ANON_KEY" placeholder="ey…" />
                <p className="text-xs text-ink-500">
                  Lovable koppelt automatisch wanneer je dit project via Supabase deployt.
                  Voor lokaal: maak <code className="px-1 bg-ink-100 rounded">.env.local</code> aan met deze variabelen.
                </p>
              </CardContent>
            </Card>
          )}
          {tab === "rechten" && (
            <Card>
              <CardHeader><CardTitle>Rechten per rol</CardTitle></CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs uppercase tracking-wider text-ink-500">
                    <tr><th className="text-left py-2">Recht</th><th>Directie</th><th>Projectleider</th><th>Buitendienst</th><th>Kantoor</th></tr>
                  </thead>
                  <tbody className="text-center text-ink-700">
                    {[
                      ["Project aanmaken", true, true, false, false],
                      ["Uren goedkeuren", true, true, false, false],
                      ["Werkbon indienen", false, true, true, false],
                      ["Foto's uploaden", false, true, true, false],
                      ["Dossier exporteren", true, true, false, true],
                      ["Incident melden", true, true, true, true],
                    ].map((row, i) => (
                      <tr key={i} className="border-t border-ink-50">
                        <td className="text-left py-2">{row[0]}</td>
                        {row.slice(1).map((v, j) => (
                          <td key={j}>{v ? "✓" : "—"}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

function Field({ label, defaultValue, placeholder }: { label: string; defaultValue?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold text-ink-500 uppercase tracking-wider">{label}</label>
      <Input defaultValue={defaultValue} placeholder={placeholder} className="mt-1" />
    </div>
  );
}
