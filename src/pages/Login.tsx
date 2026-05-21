import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("lisa@jhm.nl");
  const [password, setPassword] = useState("••••••••");

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-ink-50">
      <div className="hidden lg:block relative bg-ink-900 overflow-hidden">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-flame-500/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-grid-faint bg-[size:32px_32px] opacity-20" />
        <div className="relative p-12 h-full flex flex-col">
          <Link to="/" className="flex items-center gap-2 text-white">
            <div className="h-9 w-9 rounded-lg bg-flame-500 flex items-center justify-center font-display font-bold text-ink-900">J</div>
            <span className="font-display font-bold">JHM Flow Portal</span>
          </Link>
          <div className="flex-1 flex items-center">
            <div>
              <div className="text-flame-400 text-sm font-semibold">PORTAAL</div>
              <h1 className="mt-2 font-display font-bold text-4xl text-white leading-tight max-w-md">
                Eén centrale werkomgeving voor je hele organisatie.
              </h1>
              <p className="mt-4 text-ink-300 max-w-md">
                Planning, uitvoering, bewijsvoering en communicatie. Geen versnipperde
                tools meer — wel realtime grip op projecten, personeel en kwaliteit.
              </p>
            </div>
          </div>
          <div className="text-xs text-ink-400">© JHM groep — prototype v0.1</div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-ink-500 hover:text-ink-700 mb-6">
            <ArrowLeft className="h-4 w-4" /> Terug
          </Link>
          <h2 className="font-display font-bold text-2xl text-ink-900">Inloggen</h2>
          <p className="text-ink-500 text-sm mt-1">Welkom terug. Log in om verder te gaan.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/app");
            }}
            className="mt-6 space-y-4"
          >
            <div>
              <label className="text-xs font-semibold text-ink-500 uppercase tracking-wider">E-mail</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-1" />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink-500 uppercase tracking-wider">Wachtwoord</label>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-1" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 text-ink-600">
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-flame-500" />
                Onthoud mij
              </label>
              <a href="#" className="text-flame-600 hover:text-flame-700">Wachtwoord vergeten?</a>
            </div>
            <Button size="lg" className="w-full" type="submit">
              Inloggen <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="text-xs text-ink-500 text-center">
              Authenticatie wordt straks via Supabase verbonden. Deze knop opent voor nu het portaal direct.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
