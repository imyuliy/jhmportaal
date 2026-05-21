import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Users,
  FileDown,
  Camera,
  AlertTriangle,
  ClipboardList,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { PageHeader } from "@/components/ui/Section";
import { Tabs } from "@/components/ui/Tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";
import { Avatar, AvatarStack } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import {
  projects,
  findUser,
  taken,
  dagrapporten,
  fotos,
  werkbonnen,
  incidenten,
} from "@/lib/mockData";
import { formatDate, formatTime } from "@/lib/utils";

const labels: Record<string, string> = {
  in_uitvoering: "In uitvoering",
  gepland: "Gepland",
  opgeleverd: "Opgeleverd",
  gefactureerd: "Gefactureerd",
  offerte: "Offerte",
  gepauzeerd: "Gepauzeerd",
};

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const [tab, setTab] = useState<"overzicht" | "planning" | "dagrapporten" | "foto" | "werkbonnen" | "incidenten" | "dossier">("overzicht");

  if (!project) {
    return (
      <div className="text-center py-20">
        <div className="text-ink-500">Project niet gevonden.</div>
        <Link to="/app/projecten" className="text-flame-600 mt-3 inline-block">Terug naar projecten</Link>
      </div>
    );
  }

  const pl = findUser(project.projectleider_id);
  const team = project.team_ids.map((id) => findUser(id)).filter(Boolean);
  const teamNames = team.map((t) => t!.name);

  const projectTaken = taken.filter((t) => t.project_id === project.id);
  const projectRapporten = dagrapporten.filter((d) => d.project_id === project.id);
  const projectFotos = fotos.filter((f) => f.project_id === project.id);
  const projectBonnen = werkbonnen.filter((w) => w.project_id === project.id);
  const projectIncidenten = incidenten.filter((i) => i.project_id === project.id);

  return (
    <>
      <Link to="/app/projecten" className="inline-flex items-center gap-1 text-sm text-ink-500 hover:text-ink-700 mb-3">
        <ArrowLeft className="h-4 w-4" /> Alle projecten
      </Link>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-ink-500">{project.nummer}</span>
            <Badge tone={project.status === "in_uitvoering" ? "flame" : "neutral"}>{labels[project.status]}</Badge>
          </div>
          <h1 className="text-3xl font-display font-bold text-ink-900 tracking-tight">{project.naam}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-500">
            <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {project.adres}, {project.plaats}</span>
            <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" /> {formatDate(project.start_datum)} – {formatDate(project.eind_datum)}</span>
            <span className="inline-flex items-center gap-1"><Users className="h-4 w-4" /> {project.team_ids.length} medewerkers</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline"><FileDown className="h-4 w-4" /> Exporteer dossier</Button>
          <Button>Nieuwe taak</Button>
        </div>
      </div>

      {/* Stat strip */}
      <div className="grid sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-5">
            <div className="text-sm text-ink-500">Voortgang</div>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-2xl font-display font-bold text-ink-900">{project.voortgang}%</span>
            </div>
            <Progress value={project.voortgang} className="mt-3" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-sm text-ink-500">Uren</div>
            <div className="mt-2 text-2xl font-display font-bold text-ink-900">
              {project.geschreven_uren}<span className="text-ink-400 text-lg">/{project.budget_uren}</span>
            </div>
            <div className="mt-1 text-xs text-ink-500">{Math.round((project.geschreven_uren / project.budget_uren) * 100)}% verbruikt</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-sm text-ink-500">Projectleider</div>
            <div className="mt-2 flex items-center gap-2">
              <Avatar name={pl?.name ?? ""} size={32} />
              <div>
                <div className="font-medium text-ink-900 text-sm">{pl?.name}</div>
                <div className="text-xs text-ink-500">{pl?.email}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-sm text-ink-500">Team</div>
            <div className="mt-3"><AvatarStack names={teamNames} /></div>
          </CardContent>
        </Card>
      </div>

      <Tabs
        value={tab}
        onChange={(v) => setTab(v as typeof tab)}
        tabs={[
          { id: "overzicht", label: "Overzicht" },
          { id: "planning", label: "Planning", count: projectTaken.length },
          { id: "dagrapporten", label: "Dagrapporten", count: projectRapporten.length },
          { id: "foto", label: "Foto's", count: projectFotos.length },
          { id: "werkbonnen", label: "Werkbonnen", count: projectBonnen.length },
          { id: "incidenten", label: "Incidenten", count: projectIncidenten.length },
          { id: "dossier", label: "Dossier" },
        ]}
        className="mb-6"
      />

      {tab === "overzicht" && (
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Beschrijving</CardTitle></CardHeader>
            <CardContent>
              <p className="text-ink-700">{project.beschrijving ?? "Geen beschrijving toegevoegd."}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>AI-samenvatting</CardTitle><Sparkles className="h-4 w-4 text-flame-500" /></CardHeader>
            <CardContent>
              <p className="text-sm text-ink-700">
                Project ligt op koers met {project.voortgang}% voortgang.{" "}
                {projectIncidenten.length > 0
                  ? `Let op: ${projectIncidenten.length} open incident(en) — direct opvolgen.`
                  : "Geen openstaande incidenten."}{" "}
                Laatste dagrapport: {projectRapporten[0] ? formatDate(projectRapporten[0].datum) : "–"}.
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "planning" && (
        <Card>
          <CardContent className="p-0">
            {projectTaken.length === 0 ? (
              <div className="p-8 text-center text-ink-500">Nog geen taken gepland.</div>
            ) : (
              projectTaken.map((t) => {
                const names = t.toegewezen_aan.map((id) => findUser(id)?.name ?? "").filter(Boolean);
                return (
                  <div key={t.id} className="flex items-start gap-3 px-5 py-4 border-b border-ink-50 last:border-0">
                    <ClipboardList className="h-5 w-5 text-ink-400 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-ink-900">{t.titel}</span>
                        <Badge tone={t.status === "probleem" ? "danger" : t.status === "bezig" ? "flame" : t.status === "afgerond" ? "success" : "neutral"}>
                          {t.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-ink-500 mt-1">
                        {formatDate(t.datum)} {t.begin_tijd && `· ${t.begin_tijd}–${t.eind_tijd}`} {t.locatie && `· ${t.locatie}`}
                      </div>
                      {t.beschrijving && <div className="text-sm text-ink-600 mt-1">{t.beschrijving}</div>}
                    </div>
                    <AvatarStack names={names} size={24} />
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      )}

      {tab === "dagrapporten" && (
        <div className="space-y-4">
          {projectRapporten.map((d) => {
            const u = findUser(d.user_id);
            return (
              <Card key={d.id}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar name={u?.name ?? ""} size={32} />
                    <div>
                      <div className="font-medium text-ink-900">{u?.name}</div>
                      <div className="text-xs text-ink-500">{formatDate(d.datum)} · {d.fotos_count} foto's</div>
                    </div>
                    <div className="ml-auto"><Badge tone={d.stemming === "stress" ? "danger" : d.stemming === "neutraal" ? "warning" : "success"}>{d.stemming}</Badge></div>
                  </div>
                  <div className="text-sm space-y-2">
                    <div><div className="text-xs font-semibold text-ink-500 uppercase">Uitgevoerd</div>{d.uitgevoerd}</div>
                    {d.belemmeringen && <div><div className="text-xs font-semibold text-ink-500 uppercase">Belemmeringen</div>{d.belemmeringen}</div>}
                    {d.morgen && <div><div className="text-xs font-semibold text-ink-500 uppercase">Morgen</div>{d.morgen}</div>}
                  </div>
                  {d.ai_samenvatting && (
                    <div className="mt-3 rounded-lg bg-ink-50 border border-ink-100 px-4 py-3 flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-flame-500 mt-0.5" />
                      <div className="text-sm text-ink-700">{d.ai_samenvatting}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
          {projectRapporten.length === 0 && (
            <Card><CardContent className="p-8 text-center text-ink-500">Nog geen dagrapporten.</CardContent></Card>
          )}
        </div>
      )}

      {tab === "foto" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {projectFotos.map((f) => (
            <div key={f.id} className="rounded-lg overflow-hidden bg-ink-100 aspect-square relative group">
              <img src={f.url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute bottom-1 left-1 right-1 flex items-center gap-1">
                <Badge tone={f.type === "schade" ? "danger" : f.type === "oplevering" ? "success" : "flame"} className="text-[10px]">{f.type}</Badge>
              </div>
            </div>
          ))}
          {projectFotos.length === 0 && <Card><CardContent className="p-8 text-center text-ink-500 col-span-full">Nog geen foto's.</CardContent></Card>}
        </div>
      )}

      {tab === "werkbonnen" && (
        <Card>
          <CardContent className="p-0">
            {projectBonnen.map((wb) => {
              const u = findUser(wb.uitvoerder_id);
              return (
                <div key={wb.id} className="px-5 py-4 border-b border-ink-50 last:border-0 flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-ink-100 text-ink-600 flex items-center justify-center"><ClipboardList className="h-5 w-5" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono text-ink-500">{wb.nummer}</span>
                      <Badge tone={wb.status === "akkoord_klant" ? "success" : wb.status === "geweigerd" ? "danger" : wb.status === "ingediend" ? "warning" : "neutral"}>{wb.status}</Badge>
                    </div>
                    <div className="text-sm text-ink-900 mt-1">{wb.omschrijving}</div>
                    <div className="text-xs text-ink-500 mt-1">{u?.name} · {formatDate(wb.datum)} · {wb.uren} u</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-ink-400 mt-2" />
                </div>
              );
            })}
            {projectBonnen.length === 0 && <div className="p-8 text-center text-ink-500">Nog geen werkbonnen.</div>}
          </CardContent>
        </Card>
      )}

      {tab === "incidenten" && (
        <div className="space-y-3">
          {projectIncidenten.map((inc) => {
            const u = findUser(inc.melder_id);
            return (
              <Card key={inc.id}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge tone={inc.prioriteit === "hoog" || inc.prioriteit === "kritiek" ? "danger" : "warning"}>{inc.prioriteit}</Badge>
                    <Badge tone="neutral">{inc.type}</Badge>
                    <Badge tone={inc.status === "open" ? "danger" : inc.status === "in_behandeling" ? "warning" : "success"}>{inc.status}</Badge>
                  </div>
                  <div className="text-ink-900">{inc.beschrijving}</div>
                  <div className="text-xs text-ink-500 mt-1">Gemeld door {u?.name} · {formatTime(inc.datum)}</div>
                </CardContent>
              </Card>
            );
          })}
          {projectIncidenten.length === 0 && <Card><CardContent className="p-8 text-center text-ink-500">Geen incidenten op dit project.</CardContent></Card>}
        </div>
      )}

      {tab === "dossier" && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-flame-100 text-flame-600 flex items-center justify-center">
              <FileDown className="h-7 w-7" />
            </div>
            <div className="font-display font-semibold text-ink-900 text-lg">Automatisch opgebouwd dossier</div>
            <p className="text-ink-500 mt-1 max-w-md mx-auto text-sm">
              Het systeem bouwt automatisch een compleet opleverdossier: dagrapporten, foto's, werkbonnen,
              uren, incidenten en revisies — exporteerbaar als PDF.
            </p>
            <div className="mt-5 flex items-center justify-center gap-2">
              <Button><FileDown className="h-4 w-4" /> Exporteer PDF</Button>
              <Button variant="outline">Preview dossier</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
