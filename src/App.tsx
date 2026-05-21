import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Projecten from "@/pages/Projecten";
import ProjectDetail from "@/pages/ProjectDetail";
import Planning from "@/pages/Planning";
import Werkbonnen from "@/pages/Werkbonnen";
import Uren from "@/pages/Uren";
import Dossiers from "@/pages/Dossiers";
import Materieel from "@/pages/Materieel";
import Incidenten from "@/pages/Incidenten";
import AIAssistent from "@/pages/AIAssistent";
import Medewerkers from "@/pages/Medewerkers";
import MobilePreview from "@/pages/MobilePreview";
import Instellingen from "@/pages/Instellingen";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="projecten" element={<Projecten />} />
        <Route path="projecten/:id" element={<ProjectDetail />} />
        <Route path="planning" element={<Planning />} />
        <Route path="werkbonnen" element={<Werkbonnen />} />
        <Route path="uren" element={<Uren />} />
        <Route path="dossiers" element={<Dossiers />} />
        <Route path="materieel" element={<Materieel />} />
        <Route path="incidenten" element={<Incidenten />} />
        <Route path="ai" element={<AIAssistent />} />
        <Route path="medewerkers" element={<Medewerkers />} />
        <Route path="mobile" element={<MobilePreview />} />
        <Route path="instellingen" element={<Instellingen />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
