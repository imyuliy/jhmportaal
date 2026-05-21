// Domeintypes voor JHM Flow Portal.
// Deze types worden later 1-op-1 gespiegeld op de Supabase database schema.

export type ID = string;

export type Role = "directie" | "projectleider" | "buitendienst" | "kantoor";

export interface User {
  id: ID;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  certificaten?: string[];
  vca_geldig_tot?: string;
  avatar_url?: string;
}

export type ProjectStatus = "offerte" | "gepland" | "in_uitvoering" | "opgeleverd" | "gefactureerd" | "gepauzeerd";

export interface Project {
  id: ID;
  nummer: string;
  naam: string;
  klant: string;
  adres: string;
  plaats: string;
  status: ProjectStatus;
  start_datum: string;
  eind_datum: string;
  voortgang: number; // 0-100
  budget_uren: number;
  geschreven_uren: number;
  projectleider_id: ID;
  team_ids: ID[];
  beschrijving?: string;
  laatste_update?: string;
}

export type TaakStatus = "nieuw" | "bezig" | "afgerond" | "probleem";

export interface Taak {
  id: ID;
  project_id: ID;
  titel: string;
  beschrijving?: string;
  toegewezen_aan: ID[];
  datum: string;
  begin_tijd?: string;
  eind_tijd?: string;
  status: TaakStatus;
  locatie?: string;
}

export interface Urenregistratie {
  id: ID;
  user_id: ID;
  project_id: ID;
  datum: string;
  uren: number;
  type: "regulier" | "overuren" | "reisuren";
  omschrijving?: string;
  goedgekeurd: boolean;
}

export interface Werkbon {
  id: ID;
  nummer: string;
  project_id: ID;
  datum: string;
  uitvoerder_id: ID;
  omschrijving: string;
  materialen?: { naam: string; aantal: number; eenheid: string }[];
  uren: number;
  status: "concept" | "ingediend" | "akkoord_klant" | "geweigerd";
  klant_handtekening_url?: string;
}

export type DagrapportStemming = "goed" | "neutraal" | "stress";

export interface Dagrapport {
  id: ID;
  project_id: ID;
  user_id: ID;
  datum: string;
  stemming: DagrapportStemming;
  uitgevoerd: string;
  belemmeringen?: string;
  morgen?: string;
  fotos_count: number;
  ai_samenvatting?: string;
}

export interface Foto {
  id: ID;
  project_id: ID;
  user_id: ID;
  url: string; // placeholder of supabase storage path
  taak_id?: ID;
  type: "voortgang" | "oplevering" | "schade" | "veiligheid";
  geo?: { lat: number; lng: number };
  taken_at: string;
  bijschrift?: string;
}

export interface Incident {
  id: ID;
  project_id?: ID;
  type: "schade" | "onveilig" | "klacht" | "afwijking";
  prioriteit: "laag" | "midden" | "hoog" | "kritiek";
  status: "open" | "in_behandeling" | "gesloten";
  melder_id: ID;
  verantwoordelijke_id?: ID;
  beschrijving: string;
  fotos: string[];
  datum: string;
}

export interface MaterieelItem {
  id: ID;
  type: "voertuig" | "aanhanger" | "gereedschap" | "meetapparatuur" | "sleutel";
  naam: string;
  identifier?: string; // kenteken, serienummer, key tag
  status: "beschikbaar" | "in_gebruik" | "onderhoud" | "vermist";
  toegewezen_aan?: ID;
  toegewezen_project_id?: ID;
  apk_tot?: string;
  laatste_keuring?: string;
}

export interface Notification {
  id: ID;
  to_user_id: ID;
  titel: string;
  body: string;
  type: "info" | "actie" | "incident";
  read: boolean;
  created_at: string;
  link?: string;
}
