import { useState } from "react";
import {
  Camera,
  Clock,
  ClipboardList,
  CheckCircle2,
  AlertTriangle,
  Mic,
  ChevronRight,
  Home,
  CalendarRange,
  Wrench,
  User,
} from "lucide-react";
import { PageHeader } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

type Tab = "home" | "planning" | "werk" | "profiel";

export default function MobilePreview() {
  const [tab, setTab] = useState<Tab>("home");

  return (
    <>
      <PageHeader
        title="Mobile preview"
        description="Zo werkt de personeels-app op de bouwplaats. Mobiele-first, in 5 seconden klaar."
      />

      <div className="flex flex-col items-center">
        <div className="relative w-[360px] max-w-full rounded-[2.5rem] bg-ink-900 p-3 shadow-pop">
          <div className="rounded-[2rem] overflow-hidden bg-ink-50 h-[720px] flex flex-col">
            {/* Status bar */}
            <div className="bg-white px-5 pt-3 pb-2 flex items-center justify-between text-xs text-ink-700">
              <span>09:14</span>
              <div className="flex items-center gap-1">
                <span className="font-semibold">JHM Flow</span>
              </div>
              <span>100%</span>
            </div>

            {tab === "home" && <HomeView />}
            {tab === "planning" && <PlanningView />}
            {tab === "werk" && <WerkView />}
            {tab === "profiel" && <ProfielView />}

            {/* Bottom nav */}
            <div className="border-t border-ink-100 bg-white px-2 pt-2 pb-3 grid grid-cols-4 gap-1">
              {[
                { id: "home", label: "Vandaag", icon: Home },
                { id: "planning", label: "Planning", icon: CalendarRange },
                { id: "werk", label: "Werk", icon: Wrench },
                { id: "profiel", label: "Profiel", icon: User },
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setTab(b.id as Tab)}
                  className={cn(
                    "flex flex-col items-center gap-0.5 py-1 rounded-lg text-[11px] font-medium",
                    tab === b.id ? "text-flame-600" : "text-ink-500"
                  )}
                >
                  <b.icon className="h-5 w-5" />
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-6 text-sm text-ink-500 max-w-md text-center">
          De medewerker moet binnen 5 seconden een foto kunnen maken, werk kunnen afronden en uren kunnen invullen — daar is alles op ingericht.
        </p>
      </div>
    </>
  );
}

function HomeView() {
  return (
    <div className="flex-1 overflow-y-auto bg-ink-50">
      <div className="bg-white px-5 pt-3 pb-5">
        <div className="text-xs text-ink-500">Goedemorgen</div>
        <div className="font-display font-bold text-xl text-ink-900">Marco</div>
        <div className="mt-3 rounded-xl bg-flame-500 text-white px-4 py-3 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-white/20 inline-flex items-center justify-center">
            <Camera className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="font-semibold leading-tight">Foto maken</div>
            <div className="text-xs opacity-90">Direct gekoppeld aan jouw taak</div>
          </div>
          <ChevronRight className="h-5 w-5 opacity-80" />
        </div>
      </div>

      <div className="px-5 pt-5">
        <div className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2">
          Vandaag
        </div>
        <div className="space-y-3">
          <div className="bg-white rounded-xl p-4 shadow-card border border-ink-100">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono text-ink-500">2026-031</span>
              <span className="text-[11px] text-flame-600 font-semibold">07:00 – 15:30</span>
            </div>
            <div className="font-display font-semibold text-ink-900">Sleuf verdiepen Noord-zijde</div>
            <div className="text-sm text-ink-500">Kerkstraat 22, Utrecht</div>
            <div className="mt-3 flex items-center gap-2">
              <button className="flex-1 rounded-lg bg-sage-100 text-sage-700 text-xs font-semibold py-2 inline-flex items-center justify-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Gestart
              </button>
              <button className="flex-1 rounded-lg bg-ink-100 text-ink-700 text-xs font-semibold py-2">
                Pauze
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-card border border-ink-100">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-xs font-semibold text-red-600">Probleem</span>
            </div>
            <div className="text-sm text-ink-900">Onbekende kabel in sleuf — werk opgeschort</div>
            <button className="mt-2 w-full rounded-lg bg-ink-900 text-white text-xs font-semibold py-2">
              Open melding
            </button>
          </div>
        </div>

        <div className="mt-5">
          <div className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2">Snel doen</div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Clock, label: "Uren" },
              { icon: ClipboardList, label: "Werkbon" },
              { icon: Mic, label: "Dagrapport" },
            ].map((s) => (
              <button key={s.label} className="bg-white rounded-xl border border-ink-100 p-3 inline-flex flex-col items-center gap-1 text-ink-700">
                <s.icon className="h-5 w-5" />
                <span className="text-[11px] font-medium">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PlanningView() {
  return (
    <div className="flex-1 overflow-y-auto bg-ink-50 px-5 pt-4">
      <div className="font-display font-bold text-lg text-ink-900">Mijn week</div>
      <div className="mt-3 space-y-2">
        {["Ma 20 mei", "Di 21 mei", "Wo 22 mei", "Do 23 mei", "Vr 24 mei"].map((d, i) => (
          <div key={d} className="bg-white rounded-xl border border-ink-100 p-3">
            <div className="text-xs text-ink-500">{d}</div>
            <div className="font-medium text-ink-900 text-sm mt-0.5">
              {i === 0 ? "Sleuf verdiepen Noord" : i === 1 ? "Buis leggen 30m" : "Aansluiten 4 huisaansluitingen"}
            </div>
            <div className="text-xs text-ink-500">07:00 – 15:30 · Kerkstraat, Utrecht</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WerkView() {
  return (
    <div className="flex-1 overflow-y-auto bg-ink-50 px-5 pt-4">
      <div className="font-display font-bold text-lg text-ink-900">Werkbon</div>
      <div className="text-xs text-ink-500">WB-2026-0142 · Concept</div>

      <div className="mt-3 bg-white rounded-xl border border-ink-100 p-4">
        <label className="text-xs text-ink-500">Wat heb je gedaan?</label>
        <div className="mt-1 text-sm text-ink-900">Sleuf 24m verdiept, riool Ø250 gelegd, deksels gesteld.</div>
      </div>
      <div className="mt-3 bg-white rounded-xl border border-ink-100 p-4">
        <label className="text-xs text-ink-500">Materialen</label>
        <ul className="mt-2 text-sm text-ink-900 space-y-1">
          <li className="flex justify-between"><span>PVC buis Ø250</span><span>24m</span></li>
          <li className="flex justify-between"><span>Aansluitstuk 45°</span><span>4 st</span></li>
          <li className="flex justify-between"><span>Stelmortel</span><span>6 zak</span></li>
        </ul>
      </div>
      <div className="mt-3 bg-white rounded-xl border border-ink-100 p-4">
        <label className="text-xs text-ink-500">Uren</label>
        <div className="mt-1 text-2xl font-display font-bold text-ink-900">8,5 u</div>
      </div>

      <button className="mt-4 w-full bg-flame-500 text-white font-semibold rounded-xl py-3">
        Indienen
      </button>
    </div>
  );
}

function ProfielView() {
  return (
    <div className="flex-1 overflow-y-auto bg-ink-50 px-5 pt-4">
      <div className="flex flex-col items-center text-center">
        <div className="h-20 w-20 rounded-full bg-ink-900 text-white inline-flex items-center justify-center font-display font-bold text-2xl">
          MJ
        </div>
        <div className="mt-3 font-display font-bold text-ink-900">Marco Janssen</div>
        <div className="text-sm text-ink-500">Buitendienst</div>
      </div>
      <div className="mt-5 space-y-2">
        {[
          { label: "Certificaten", value: "VCA Basis, Heftruck" },
          { label: "VCA geldig tot", value: "01-09-2026" },
          { label: "Telefoon", value: "+31 6 12 34 56 78" },
          { label: "Wagen", value: "Iveco Daily L3H2 — VK-123-J" },
        ].map((r) => (
          <div key={r.label} className="bg-white rounded-xl border border-ink-100 px-4 py-3">
            <div className="text-xs text-ink-500">{r.label}</div>
            <div className="text-sm text-ink-900 font-medium">{r.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
