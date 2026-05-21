import { Link } from "react-router-dom";
import {
  ArrowRight,
  Smartphone,
  LayoutDashboard,
  ShieldCheck,
  Bot,
  Truck,
  AlertTriangle,
  Plug,
  Camera,
  Clock,
  Hammer,
  CheckCircle2,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const modules = [
  {
    icon: Smartphone,
    titel: "Personeels-app",
    body:
      "Eén app voor planning, navigatie, werkbonnen, urenregistratie, foto's en dagrapport. Foto maken en werk afronden binnen 5 seconden.",
    color: "from-flame-500/20 to-flame-500/0",
    iconColor: "text-flame-500",
  },
  {
    icon: LayoutDashboard,
    titel: "Realtime projectdashboard",
    body:
      "Live inzicht in voortgang, actieve medewerkers, openstaande problemen, vertragingen en kwaliteit.",
    color: "from-sky-500/20 to-sky-500/0",
    iconColor: "text-sky-600",
  },
  {
    icon: ShieldCheck,
    titel: "Slimme bewijsvoering",
    body:
      "Elke actie automatisch gekoppeld aan project, medewerker, tijd, locatie en foto. Oplever- en revisiedossiers bouwen zichzelf.",
    color: "from-sage-500/20 to-sage-500/0",
    iconColor: "text-sage-600",
  },
  {
    icon: Bot,
    titel: "AI-assistent",
    body:
      "Inspreken: \"40 meter straatwerk afgerond. Vertraging door regen.\" → nette dagrapportage, projectnotitie en kantoorsamenvatting.",
    color: "from-violet-500/20 to-violet-500/0",
    iconColor: "text-violet-600",
  },
  {
    icon: Truck,
    titel: "Materieel & middelen",
    body:
      "Bedrijfswagens, aanhangers, gereedschap, sleutels en meetapparatuur — geen verlies, geen verwarring, geen dubbele inzet.",
    color: "from-amber-500/20 to-amber-500/0",
    iconColor: "text-amber-600",
  },
  {
    icon: AlertTriangle,
    titel: "Incident- & schade-module",
    body:
      "Direct melden van schade, onveilige situaties, klachten of afwijkingen — met foto, locatie en opvolging.",
    color: "from-red-500/20 to-red-500/0",
    iconColor: "text-red-600",
  },
  {
    icon: Plug,
    titel: "Administratiekoppelingen",
    body:
      "Integraties met Exact, AFAS, Moneybird, Outlook en Google Calendar. Niet vervangen, maar verbinden.",
    color: "from-emerald-500/20 to-emerald-500/0",
    iconColor: "text-emerald-600",
  },
  {
    icon: Camera,
    titel: "Automatische dossiers",
    body:
      "Fotologboeken, opleverdossiers en PDF-exporten. Klaar voor claims, discussies, verzekeringen en kwaliteitsborging.",
    color: "from-cyan-500/20 to-cyan-500/0",
    iconColor: "text-cyan-600",
  },
];

const problemen = [
  "WhatsApp-groepen die elke week ontploffen",
  "Excels die niemand bijhoudt",
  "Telefonische afstemming die verloren gaat",
  "Foto's zonder structuur of context",
  "Handmatige opleverdossiers",
  "Versnipperde planning",
];

const gevolgen = [
  { label: "Faalkosten", icon: TrendingUp },
  { label: "Miscommunicatie", icon: AlertTriangle },
  { label: "Geen bewijsvoering", icon: ShieldCheck },
  { label: "Tijdverlies", icon: Clock },
  { label: "Stress op kantoor", icon: AlertTriangle },
  { label: "Onprofessionele overdracht", icon: Hammer },
];

const mvp = [
  { stap: "1", titel: "Planning", body: "Dagplanning voor alle medewerkers, inzichtelijk voor kantoor." },
  { stap: "2", titel: "Foto-upload", body: "Voortgang vastleggen — automatisch gekoppeld aan project en taak." },
  { stap: "3", titel: "Dagrapportages", body: "Inspreken of typen — AI maakt er een nette rapportage van." },
  { stap: "4", titel: "Urenregistratie", body: "Per project, per dag, met goedkeuringsflow." },
  { stap: "5", titel: "Opleverdossier export", body: "Eén knop → compleet PDF-dossier voor de klant." },
];

const lange_termijn = [
  "AI voortgangsanalyse via fotoherkenning",
  "Automatische kwaliteitscontrole",
  "Calculatie-integraties",
  "Predictive planning",
  "Realtime projectanalyse",
  "Klantportalen",
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-ink-50">
      {/* Nav */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-ink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-ink-900 flex items-center justify-center">
              <span className="font-display font-bold text-flame-500">J</span>
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-ink-900">JHM Flow</div>
              <div className="text-[11px] text-ink-500 -mt-0.5">Portal</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-ink-600">
            <a href="#oplossing" className="hover:text-ink-900">Oplossing</a>
            <a href="#modules" className="hover:text-ink-900">Modules</a>
            <a href="#mvp" className="hover:text-ink-900">MVP</a>
            <a href="#visie" className="hover:text-ink-900">Visie</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">Inloggen</Button>
            </Link>
            <Link to="/app">
              <Button size="sm">
                Open portaal
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-faint bg-[size:32px_32px] opacity-60" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-flame-300/30 blur-3xl" />
        <div className="absolute top-40 -left-32 h-96 w-96 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-20">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 animate-fade-in">
              <Badge tone="flame" className="mb-5">
                <Sparkles className="h-3.5 w-3.5" /> Voor bouw, infra en installatie
              </Badge>
              <h1 className="font-display font-bold tracking-tight text-ink-900 text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
                Eén portaal voor{" "}
                <span className="bg-gradient-to-r from-flame-500 to-flame-700 bg-clip-text text-transparent">
                  planning, uitvoering en bewijs
                </span>
                .
              </h1>
              <p className="mt-5 text-lg text-ink-600 max-w-2xl">
                JHM Flow Portal brengt buitendienst, projectleiding en directie samen in één
                praktische werkomgeving. Geen los ERP, geen WhatsApp-chaos — wel realtime grip
                op projecten, personeel en kwaliteit.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link to="/app">
                  <Button size="lg">
                    Probeer het portaal
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a href="#modules">
                  <Button size="lg" variant="outline">
                    Bekijk de modules
                  </Button>
                </a>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-500">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-sage-600" /> Mobiele-first
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-sage-600" /> Automatisch dossier
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-sage-600" /> Koppelt met Exact, AFAS, Moneybird
                </span>
              </div>
            </div>

            {/* Hero mockup */}
            <div className="lg:col-span-5">
              <HeroMockup />
            </div>
          </div>
        </div>
      </section>

      {/* KERNPROBLEEM */}
      <section className="py-16 sm:py-24 bg-white border-y border-ink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-flame-600 font-semibold text-sm">KERNPROBLEEM</div>
            <h2 className="mt-2 font-display font-bold text-ink-900 text-3xl sm:text-4xl tracking-tight">
              Veel bedrijven werken nog met losse bouwsteentjes
            </h2>
            <p className="mt-3 text-ink-600">
              De praktijk: tools die niet met elkaar praten, kennis die in iemands hoofd zit,
              en bewijsvoering die pas gemaakt wordt als het misgaat.
            </p>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-8">
            <div>
              <div className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-3">
                Hoe het nu vaak gaat
              </div>
              <ul className="space-y-2">
                {problemen.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 bg-ink-50 rounded-lg px-4 py-3 border border-ink-100"
                  >
                    <div className="mt-0.5 h-5 w-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">
                      ✕
                    </div>
                    <span className="text-ink-700">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-3">
                Het gevolg
              </div>
              <div className="grid grid-cols-2 gap-3">
                {gevolgen.map((g) => (
                  <div
                    key={g.label}
                    className="bg-ink-900 text-white rounded-xl p-4 flex items-center gap-3"
                  >
                    <div className="h-9 w-9 rounded-lg bg-flame-500/20 text-flame-400 flex items-center justify-center">
                      <g.icon className="h-4.5 w-4.5" />
                    </div>
                    <span className="font-medium text-sm">{g.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPLOSSING */}
      <section id="oplossing" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-flame-600 font-semibold text-sm">DE OPLOSSING</div>
          <h2 className="mt-2 font-display font-bold text-ink-900 text-3xl sm:text-4xl tracking-tight max-w-3xl mx-auto">
            Een mobiele-first portaal dat planning, uitvoering en bewijs samenbrengt
          </h2>
          <p className="mt-3 text-ink-600 max-w-2xl mx-auto">
            Niet nóg een ingewikkeld ERP-systeem — wel een praktisch dagelijks gereedschap.
          </p>
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" className="pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {modules.map((m) => (
              <div
                key={m.titel}
                className="relative rounded-xl2 bg-white border border-ink-100 p-5 shadow-card overflow-hidden group hover:shadow-pop transition-shadow"
              >
                <div className={`absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br ${m.color} blur-2xl`} />
                <div className={`relative inline-flex h-10 w-10 items-center justify-center rounded-lg bg-ink-100 ${m.iconColor} mb-3`}>
                  <m.icon className="h-5 w-5" />
                </div>
                <h3 className="relative font-display font-semibold text-ink-900">{m.titel}</h3>
                <p className="relative mt-1 text-sm text-ink-600">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MVP */}
      <section id="mvp" className="py-16 sm:py-24 bg-ink-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <Badge tone="flame" className="mb-4">MVP</Badge>
              <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight">
                Vijf stappen, directe waarde
              </h2>
              <p className="mt-3 text-ink-300 max-w-md">
                De eerste versie levert al meetbaar minder faalkosten en meer rust op kantoor.
                Daar bouwen we vervolgens slim op door.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ol className="space-y-3">
                {mvp.map((s) => (
                  <li
                    key={s.stap}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="h-9 w-9 rounded-lg bg-flame-500 text-ink-900 font-display font-bold flex items-center justify-center shrink-0">
                      {s.stap}
                    </div>
                    <div>
                      <div className="font-display font-semibold">{s.titel}</div>
                      <div className="text-sm text-ink-300">{s.body}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* POSITIONERING */}
      <section id="visie" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="text-flame-600 font-semibold text-sm">POSITIONERING</div>
              <h2 className="mt-2 font-display font-bold text-ink-900 text-3xl sm:text-4xl tracking-tight">
                Dit is geen CRM. Dit is operationele controle.
              </h2>
              <p className="mt-4 text-ink-600">
                Bewijsvoering, kwaliteitsborging en rust in de organisatie — zonder de
                complexiteit van traditionele ERP-systemen.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {["Operationele controle", "Bewijsvoering", "Kwaliteitsborging", "Rust"].map((t) => (
                  <div
                    key={t}
                    className="rounded-lg bg-white border border-ink-100 px-4 py-3 text-sm font-medium text-ink-900"
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-flame-600 font-semibold text-sm">LANGE TERMIJN VISIE</div>
              <h3 className="mt-2 font-display font-bold text-ink-900 text-2xl">
                Wat er komt na de MVP
              </h3>
              <ul className="mt-4 space-y-2">
                {lange_termijn.map((l) => (
                  <li
                    key={l}
                    className="flex items-center gap-3 bg-white rounded-lg border border-ink-100 px-4 py-3"
                  >
                    <Sparkles className="h-4 w-4 text-flame-500" />
                    <span className="text-ink-800">{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-ink-900 to-ink-800 text-white p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-flame-500/30 blur-3xl" />
            <h3 className="font-display font-bold text-3xl sm:text-4xl tracking-tight relative">
              Klaar om de chaos te vervangen door grip?
            </h3>
            <p className="mt-3 text-ink-300 max-w-xl mx-auto relative">
              Open het portaal en bekijk hoe planning, uitvoering en bewijsvoering in één
              omgeving samenkomen.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 relative">
              <Link to="/app">
                <Button size="lg">
                  Open portaal
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="ghost" className="text-white hover:bg-white/10">
                  Inloggen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-ink-500">
          <div>© {new Date().getFullYear()} JHM groep — JHM Flow Portal</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-ink-700">Privacy</a>
            <a href="#" className="hover:text-ink-700">Voorwaarden</a>
            <a href="#" className="hover:text-ink-700">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HeroMockup() {
  return (
    <div className="relative">
      {/* Desktop dashboard card */}
      <div className="rounded-2xl bg-white border border-ink-100 shadow-pop p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-flame-500 animate-pulse-soft" />
            <div className="text-xs font-semibold text-ink-500 uppercase tracking-wider">
              Realtime dashboard
            </div>
          </div>
          <div className="text-xs text-ink-400">Vandaag</div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { l: "Actieve projecten", v: "12" },
            { l: "Op locatie", v: "27" },
            { l: "Open incidenten", v: "3" },
          ].map((s) => (
            <div key={s.l} className="bg-ink-50 rounded-lg p-3 border border-ink-100">
              <div className="text-[10px] uppercase tracking-wider text-ink-500">{s.l}</div>
              <div className="font-display font-bold text-xl text-ink-900 mt-1">{s.v}</div>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {[
            { naam: "Riolering Kerkstraat", voortgang: 68, status: "in_uitvoering" },
            { naam: "Parkeerterrein Noord", voortgang: 34, status: "in_uitvoering" },
            { naam: "Bestrating De Kraak", voortgang: 52, status: "gepauzeerd" },
          ].map((p) => (
            <div key={p.naam} className="bg-ink-50 rounded-lg p-3 border border-ink-100">
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium text-ink-900 truncate">{p.naam}</div>
                <div className="text-xs text-ink-500">{p.voortgang}%</div>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-ink-200 overflow-hidden">
                <div
                  className={`h-full rounded-full ${p.status === "gepauzeerd" ? "bg-amber-500" : "bg-flame-500"}`}
                  style={{ width: `${p.voortgang}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating phone */}
      <div className="hidden sm:block absolute -bottom-8 -left-8 w-44 rounded-3xl bg-ink-900 p-2 shadow-pop rotate-[-6deg]">
        <div className="rounded-2xl bg-white p-3 h-72">
          <div className="text-[10px] uppercase tracking-wider text-ink-500">Vandaag</div>
          <div className="font-display font-bold text-ink-900 text-sm mt-1">Riolering Kerkstraat</div>
          <div className="text-[11px] text-ink-500">07:00 — 15:30</div>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 rounded-lg bg-sage-100 text-sage-700 px-2 py-1.5 text-[11px] font-medium">
              <CheckCircle2 className="h-3.5 w-3.5" /> Gestart
            </div>
            <div className="rounded-lg bg-ink-50 border border-ink-100 px-2 py-1.5 text-[11px] text-ink-700">
              <div className="font-semibold">Taak</div>
              <div className="text-ink-500">Sleuf 24m verdiepen</div>
            </div>
            <div className="rounded-lg bg-flame-50 border border-flame-200 px-2 py-2 text-[11px] text-flame-800">
              <div className="flex items-center gap-1.5 font-semibold">
                <Camera className="h-3.5 w-3.5" /> Foto toevoegen
              </div>
              <div className="text-flame-700/80 mt-0.5">14 vandaag</div>
            </div>
          </div>
          <button className="mt-3 w-full rounded-lg bg-flame-500 text-white text-[11px] font-semibold py-2">
            Dag afronden
          </button>
        </div>
      </div>
    </div>
  );
}
