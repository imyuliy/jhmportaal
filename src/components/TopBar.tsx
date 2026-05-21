import { useState } from "react";
import { Bell, Menu, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { notifications, users } from "@/lib/mockData";
import { relativeFromNow } from "@/lib/utils";

export const TopBar = ({ onOpenMenu }: { onOpenMenu: () => void }) => {
  const [openNotif, setOpenNotif] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;
  const me = users[1]; // Lisa, projectleider

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-ink-100">
      <div className="h-16 px-4 sm:px-6 flex items-center gap-3">
        <button
          onClick={onOpenMenu}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-ink-100"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5 text-ink-700" />
        </button>
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
          <Input className="pl-9" placeholder="Zoek projecten, medewerkers, werkbonnen…" />
        </div>
        <div className="flex-1" />
        <Button size="md" className="hidden sm:inline-flex">
          <Plus className="h-4 w-4" />
          Nieuw project
        </Button>
        <div className="relative">
          <button
            onClick={() => setOpenNotif((v) => !v)}
            className="relative h-10 w-10 inline-flex items-center justify-center rounded-lg hover:bg-ink-100"
            aria-label="Meldingen"
          >
            <Bell className="h-5 w-5 text-ink-700" />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-flame-500 ring-2 ring-white" />
            )}
          </button>
          {openNotif && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-ink-100 shadow-pop overflow-hidden">
              <div className="px-4 py-3 border-b border-ink-100 font-display font-semibold">
                Meldingen
              </div>
              <ul className="max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <li key={n.id} className="px-4 py-3 border-b border-ink-50 last:border-0 hover:bg-ink-50">
                    <div className="flex items-start gap-2">
                      <div
                        className={`mt-1 h-2 w-2 rounded-full ${
                          n.read ? "bg-ink-300" : "bg-flame-500"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-ink-900">{n.titel}</div>
                        <div className="text-xs text-ink-500">{n.body}</div>
                        <div className="text-[11px] text-ink-400 mt-1">
                          {relativeFromNow(n.created_at)}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 pl-1">
          <Avatar name={me.name} size={36} />
          <div className="hidden sm:block leading-tight">
            <div className="text-sm font-medium text-ink-900">{me.name}</div>
            <div className="text-xs text-ink-500 capitalize">{me.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
};
