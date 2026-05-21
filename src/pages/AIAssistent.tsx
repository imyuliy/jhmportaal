import { useState } from "react";
import { Mic, Send, Sparkles, FileText, ClipboardList, MailOpen } from "lucide-react";
import { PageHeader } from "@/components/ui/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const presets = [
  "Maak van mijn dagrapport een nette uitwerking voor de klant",
  "Vat de week samen voor de directie",
  "Schrijf een statusmail voor de gemeente over project 2026-031",
  "Genereer een opleverbrief op basis van het dossier",
];

const example_in = "Vandaag 40 meter straatwerk afgerond op Kerkstraat. Vertraging door regen vanaf 13:30. Morgen verder met aansluitingen.";
const example_out_rapport = `Datum: vandaag
Project: 2026-031 Kerkstraat
Uitgevoerd:
• 40 meter straatwerk gelegd (Noord-zijde)
• Voorbereidende werkzaamheden aansluitingen 22-26
Belemmeringen:
• Vanaf 13:30 regen — werk stilgelegd, materiaal afgedekt
Plan morgen:
• Doorgaan met huisaansluitingen 22-26
• Inwassen voegen vandaag aangelegde strook
Stemming: neutraal`;
const example_out_kantoor =
  "Korte stand van zaken voor kantoor: op Kerkstraat is vandaag 40m straatwerk geleverd. Door regen vanaf 13:30 stagnatie van ca. 2 uur. Planning blijft op koers, morgen verder met aansluitingen.";

export default function AIAssistent() {
  const [input, setInput] = useState(example_in);
  const [output, setOutput] = useState<{ rapport: string; kantoor: string } | null>(null);

  return (
    <>
      <PageHeader
        title="AI-assistent"
        description="Spreek of typ in spreektaal — de assistent maakt er nette rapportages, mails en samenvattingen van."
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Wat heb je nodig?</CardTitle>
            <Sparkles className="h-4 w-4 text-flame-500" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-3">
              {presets.map((p) => (
                <button
                  key={p}
                  onClick={() => setInput(p)}
                  className="text-xs px-2.5 py-1 rounded-full bg-ink-100 text-ink-700 hover:bg-ink-200"
                >
                  {p}
                </button>
              ))}
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Spreek of typ je input…"
              className="min-h-[160px]"
            />
            <div className="mt-3 flex items-center justify-between">
              <Button variant="outline">
                <Mic className="h-4 w-4" />
                Spreek in
              </Button>
              <Button
                onClick={() =>
                  setOutput({ rapport: example_out_rapport, kantoor: example_out_kantoor })
                }
              >
                <Send className="h-4 w-4" />
                Genereer
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* What it can do */}
        <Card>
          <CardHeader><CardTitle>Wat de assistent doet</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <ClipboardList className="h-4 w-4 text-flame-500 mt-0.5" />
              <div>
                <div className="font-medium text-ink-900">Nette dagrapportage</div>
                <div className="text-ink-500">Spreektaal → gestructureerd verslag.</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 text-flame-500 mt-0.5" />
              <div>
                <div className="font-medium text-ink-900">Projectnotities</div>
                <div className="text-ink-500">Automatisch gekoppeld aan project en dossier.</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MailOpen className="h-4 w-4 text-flame-500 mt-0.5" />
              <div>
                <div className="font-medium text-ink-900">Kantoor-samenvatting</div>
                <div className="text-ink-500">Kort, in zakelijke toon, voor projectleiding.</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {output && (
        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Dagrapportage</CardTitle>
              <Badge tone="flame">AI</Badge>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-sm text-ink-800 font-sans">{output.rapport}</pre>
              <div className="mt-4 flex gap-2">
                <Button size="sm">Opslaan bij project</Button>
                <Button size="sm" variant="outline">Kopieer</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Kantoor-samenvatting</CardTitle>
              <Badge tone="flame">AI</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-ink-800">{output.kantoor}</p>
              <div className="mt-4 flex gap-2">
                <Button size="sm">Stuur naar kantoor</Button>
                <Button size="sm" variant="outline">Kopieer</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
