# JHM Flow Portal

**Slim operationeel portaal voor bouw-, infra- en installatiebedrijven.**

Eén centraal systeem waarin planning, uitvoering, bewijsvoering en communicatie samenkomen. Niet nóg een ingewikkeld ERP-systeem — wel een praktische werkomgeving waarmee buitendienst, projectleiding en directie realtime grip krijgen op projecten, personeel en kwaliteit.

---

## Snel starten

```bash
npm install
npm run dev
```

De app draait dan op http://localhost:5173.

Het portaal werkt out-of-the-box op **mock data** — geen database of inloggegevens nodig. Wanneer Supabase via Lovable gekoppeld wordt, vult `.env.local` zich met de juiste keys en schakelt de app automatisch over op live data.

## Beschikbare scripts

- `npm run dev` — Start de Vite dev-server op port 5173.
- `npm run build` — TypeScript-typecheck + productie-build naar `dist/`.
- `npm run preview` — Serveer de gebouwde versie lokaal.
- `npm run lint` — ESLint draaien over de bron.

## Stack

- **Vite + React 18 + TypeScript** — snelle build & DX, Lovable-compatibel.
- **Tailwind CSS** met aangepaste palette (`ink` = donkergrijs/blauw, `flame` = oranje, `sage` = groen).
- **React Router v6** voor routing.
- **lucide-react** voor iconen.
- **@supabase/supabase-js** als clientskelet (lui geïnitialiseerd, valt automatisch terug op mock data).

## Mappenstructuur

```
src/
├── main.tsx                 # entrypoint
├── App.tsx                  # routes
├── index.css                # Tailwind & globals
├── vite-env.d.ts            # Vite env types
├── types/index.ts           # Domeintypes (gespiegeld op Supabase schema)
├── lib/
│   ├── utils.ts             # cn, formatDate, initials
│   ├── supabase.ts          # Supabase client skeleton
│   └── mockData.ts          # Seed data
├── components/
│   ├── Layout.tsx
│   ├── Sidebar.tsx
│   ├── TopBar.tsx
│   └── ui/                  # Button, Card, Badge, Input, Avatar, Progress, Tabs, StatCard, Section
└── pages/
    ├── Landing.tsx          # Publieke marketing-pagina (frontpage)
    ├── Login.tsx
    ├── Dashboard.tsx
    ├── Projecten.tsx
    ├── ProjectDetail.tsx
    ├── Planning.tsx
    ├── Werkbonnen.tsx
    ├── Uren.tsx
    ├── Dossiers.tsx
    ├── Materieel.tsx
    ├── Incidenten.tsx
    ├── AIAssistent.tsx
    ├── Medewerkers.tsx
    ├── MobilePreview.tsx
    └── Instellingen.tsx
```

## Routes

| pad                       | view                              |
| ------------------------- | --------------------------------- |
| `/`                       | Publieke landing (marketing)      |
| `/login`                  | Inloggen                          |
| `/app`                    | Dashboard                         |
| `/app/projecten`          | Projecten lijst                   |
| `/app/projecten/:id`      | Project detail                    |
| `/app/planning`           | Weekplanning                      |
| `/app/werkbonnen`         | Werkbonnen                        |
| `/app/uren`               | Urenregistratie                   |
| `/app/dossiers`           | Foto's & dossiers                 |
| `/app/materieel`          | Materieel & middelen              |
| `/app/incidenten`         | Incidenten                        |
| `/app/ai`                 | AI-assistent                      |
| `/app/medewerkers`        | Medewerkers                       |
| `/app/mobile`             | Mobile preview (telefoon mockup)  |
| `/app/instellingen`       | Instellingen                      |

## Datalaag

Alle domeintypes staan in `src/types/index.ts` en zijn opgezet om 1-op-1 te matchen met Supabase-tabellen. De `mockData.ts` levert volledige seed-data zodat alle views direct met realistische content te zien zijn.

Zodra Supabase via Lovable gekoppeld is:

1. `.env.local` krijgt `VITE_SUPABASE_URL` en `VITE_SUPABASE_ANON_KEY`.
2. `getSupabase()` in `src/lib/supabase.ts` levert dan een live client.
3. Vervang importen van `@/lib/mockData` per page door Supabase-queries (bv. via een `useProjects()`-hook).

## Roadmap

**MVP (deze versie scaffold)**
1. Planning
2. Foto-upload
3. Dagrapportages
4. Urenregistratie
5. Opleverdossier export

**Lange termijn**
- AI voortgangsanalyse via fotoherkenning
- Automatische kwaliteitscontrole
- Calculatie-integraties
- Predictive planning
- Realtime projectanalyse
- Klantportalen

## Integraties (placeholders)

Exact · AFAS · Moneybird · Outlook · Google Calendar — knoppen staan al in `/app/instellingen → Integraties`, klaar om bedraad te worden via Lovable connectors of een eigen edge function.

## Veiligheid

- Tokens en secrets zijn uitgesloten via `.gitignore`.
- Authenticatie loopt straks via Supabase Auth, gekoppeld aan rollen (`directie`, `projectleider`, `buitendienst`, `kantoor`).

## Licentie

Privébezit JHM groep B.V. — niet voor publieke distributie.
