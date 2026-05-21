import { Link } from "react-router-dom";
import {
  Activity,
  Users,
  ShieldAlert,
  Clock,
  FolderKanban,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Camera,
} from "lucide-react";
import { PageHeader } from "@/components/ui/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/Badge";
import { Avatar, AvatarStack } from "@/components/ui/Avatar";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import { projects, taken, dagrapporten, incidenten, fotos, users, findUser } from "@/lib/mockData";
import { formatDate, formatTime } from "@/lib/utils";

const statusToneMap = {
  in_uitvoering: "flame",
  gepland: "info",
  opgeleverd: "success",
  gefactureerd: "success",
  offerte: "neutral",
  gepauzeerd: "warning",
} as const;

const statusLabel: Record<string, string> = {
  in_uitvoering: "In uitvoering",
  gepland: "Gepland",
  opgeleverd: "Opgeleverd",
  gefactureerd: "Gefactureerd",
  offerte: "Offerte",
  gepauzeerd: "Gepauzeerd",
};

export default function Dashboard() {
  const actief = projects.filter((p) => p.status === "in_uitvoering");
  const opLocatie = new Set<string>();
  taken
    .filter((t) => t.status === "bezig" || t.status === "nieuw")
    .forEach((t) => t.toegewezen_aan.forEach((id) => opLocatie.add(id)));

  const openIncidents = incidenten.filter((i) => i.status !== "gesloten");
  const tegoedUren = 32;

  return (
    <>
      <PageHeader
        title="Goedemorgen, Lisa"
        description="Hier is wat er vandaag speelt in de organisatie."
        actions={
          <>
            <Button variant="outline">Exporteer dagrapport</Button>
            <Button>Nieuwe taak</Button>
          </>
        }
      />

      {/* KPI's */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Actieve projecten" value={actief.length} icon={FolderKanban} delta={8} tone="flame" />
        <StatCard label="Op locatie" value={opLocatie.size} icon={Users} delta={2} tone="ink" />
        <StatCard label="Open incidenten" value={openIncidents.length} icon={ShieldAlert} delta={-1} tone="flame" />
        <StatCard label="Uren goed te keuren" value={tegoedUren} icon={Clock} delta={4} tone="sage" />
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        {/* Actieve projecten */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Actieve projecten</CardTitle>
              <p className="text-sm text-ink-500">Live status — voortgang & team</p>
            </div>
            <Link to="/app/projecten" className="text-sm text-flame-600 hover:text-flame-700 inline-flex items-center gap-1">
              Alle projecten <ChevronRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {actief.map((p) => {
              const teamNames = p.team_ids
                .map((id) => findUser(id)?.name ?? "")
                .filter(Boolean);
              return (
                <Link
                  key={p.id}
                  to={`/app/projecten/${p.id}`}
                  className="block rounded-xl border border-ink-100 hover:border-ink-200 hover:shadow-card transition-all p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-ink-500">{p.nummer}</span>
                        <Badge tone={statusToneMap[p.status] as any}>{statusLabel[p.status]}</Badge>
                      </div>
                      <div className="font-display font-semibold text-ink-900 truncate">{p.naam}</div>
                      <div className="text-sm text-ink-500 truncate">
                        {p.klant} · {p.plaats}
                      </div>
                    </div>
                    <AvatarStack names={teamNames} />
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <Progress value={p.voortgang} className="flex-1" />
                    <span className="text-sm font-semibold text-ink-900 w-10 text-right">{p.voortgang}%</span>
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-xs text-ink-500">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {p.geschreven_uren}/{p.budget_uren} u
                    </span>
                    <span>Levering: {formatDate(p.eind_datum)}</span>
                  </div>
                </Link>
              );
            })}
          </CardContent>
        </Card>

        {/* Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Live activiteit</CardTitle>
            <Activity className="h-4 w-4 text-flame-500" />
          </CardHeader>
          <CardContent className="space-y-3">
            {dagrapporten.map((d) => {
              const u = findUser(d.user_id);
              const p = projects.find((x) => x.id === d.project_id);
              return (
                <div key={d.id} className="flex items-start gap-3">
                  <Avatar name={u?.name ?? ""} size={32} />
                  <div className="min-w-0">
                    <div className="text-sm">
                      <span className="font-medium text-ink-900">{u?.name}</span>{" "}
                      <span className="text-ink-500">leverde dagrapport in op</span>{" "}
                      <span className="font-medium text-ink-900">{p?.nummer}</span>
                    </div>
                    <div className="text-xs text-ink-500">{formatDate(d.datum)} · {d.fotos_count} foto's</div>
                  </div>
                </div>
              );
            })}
            <div className="border-t border-ink-100 pt-3">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-flame-100 text-flame-600 flex items-center justify-center">
                  <Camera className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm">
                    <span className="font-medium text-ink-900">22 foto's</span>{" "}
                    <span className="text-ink-500">geüpload in de afgelopen 24u</span>
                  </div>
                  <div className="text-xs text-ink-500">verspreid over 2 projecten</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        {/* Taken vandaag */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Taken vandaag</CardTitle>
            <span className="text-sm text-ink-500">{formatDate(new Date())}</span>
          </CardHeader>
          <CardContent className="space-y-2">
            {taken.map((t) => {
              const u = t.toegewezen_aan.map((id) => findUser(id)?.name ?? "").filter(Boolean);
              const tone =
                t.status === "afgerond"
                  ? "success"
                  : t.status === "probleem"
                  ? "danger"
                  : t.status === "bezig"
                  ? "flame"
                  : "neutral";
              const Icon =
                t.status === "afgerond"
                  ? CheckCircle2
                  : t.status === "probleem"
                  ? AlertTriangle
                  : Activity;
              return (
                <div
                  key={t.id}
                  className="flex items-start gap-3 rounded-lg border border-ink-100 px-4 py-3 hover:bg-ink-50/60"
                >
                  <div className="mt-0.5">
                    <Icon className={`h-4.5 w-4.5 ${tone === "danger" ? "text-red-600" : tone === "flame" ? "text-flame-500" : tone === "success" ? "text-sage-600" : "text-ink-500"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-ink-900">{t.titel}</span>
                      <Badge tone={tone as any}>{t.status}</Badge>
                    </div>
                    <div className="text-xs text-ink-500 mt-0.5 flex items-center gap-2 flex-wrap">
                      {t.begin_tijd && <span>{t.begin_tijd} – {t.eind_tijd}</span>}
                      {t.locatie && <span>· {t.locatie}</span>}
                    </div>
                  </div>
                  <AvatarStack names={u} size={24} />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Incidenten */}
        <Card>
          <CardHeader>
            <CardTitle>Open incidenten</CardTitle>
            <Link to="/app/incidenten" className="text-sm text-flame-600 inline-flex items-center gap-1">
              Alles <ChevronRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {openIncidents.map((inc) => {
              const u = findUser(inc.melder_id);
              return (
                <div key={inc.id} className="rounded-lg border border-ink-100 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge tone={inc.prioriteit === "hoog" || inc.prioriteit === "kritiek" ? "danger" : "warning"}>
                      {inc.prioriteit}
                    </Badge>
                    <Badge tone="neutral">{inc.type}</Badge>
                  </div>
                  <div className="text-sm text-ink-900">{inc.beschrijving}</div>
                  <div className="text-xs text-ink-500 mt-1">
                    Gemeld door {u?.name} · {formatTime(inc.datum)}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Bottom row: AI summary */}
      <Card className="mt-6 bg-gradient-to-br from-ink-900 to-ink-800 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-flame-500/20 text-flame-400 flex items-center justify-center shrink-0">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-ink-300">AI-samenvatting · vandaag</div>
              <p className="mt-1 text-white">
                Twee projecten draaien op planning. <strong>Kerkstraat</strong> heeft een
                veiligheidsmelding (onbekende kabel) — werk tijdelijk stilgelegd, projectleider
                geïnformeerd. Voor <strong>Bedrijvenpark Noord</strong> is materiaal vandaag op
                locatie en zijn alle drie de medewerkers ingecheckt. 22 foto's, 2 dagrapporten,
                1 werkbon nog te accorderen.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent fotos */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-semibold text-ink-900">Recente foto's</h2>
          <Link to="/app/dossiers" className="text-sm text-flame-600 inline-flex items-center gap-1">
            Naar dossiers <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
          {fotos.slice(0, 12).map((f) => (
            <div key={f.id} className="aspect-square rounded-lg overflow-hidden bg-ink-100 group relative">
              <img src={f.url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute bottom-1 left-1 right-1">
                <Badge tone={f.type === "schade" ? "danger" : f.type === "oplevering" ? "success" : "flame"} className="text-[10px]">
                  {f.type}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
