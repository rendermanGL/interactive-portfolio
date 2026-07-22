import { useEffect, useState } from "react";
import { Rocket, FolderGit2, Route, Cpu, MessageSquare, Mail, Terminal } from "lucide-react";

export const SECTIONS = [
  { id: "hero", label: "Home", icon: Rocket },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "timeline", label: "Journey", icon: Route },
  { id: "skills", label: "Stack", icon: Cpu },
  { id: "guestbook", label: "Signals", icon: MessageSquare },
  { id: "contact", label: "Contact", icon: Mail },
] as const;

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Nav({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop / iPad top nav */}
      <header className="fixed top-0 left-0 right-0 z-40 hidden md:block">
        <div className="glass mx-auto mt-4 flex max-w-5xl items-center justify-between rounded-2xl px-5 py-3">
          <button
            onClick={() => scrollToSection("hero")}
            className="font-mono text-sm font-bold tracking-wider"
          >
            <span className="text-primary">JM</span>
            <span className="text-muted-foreground">://</span>
            <span>jeffrey.martin</span>
          </button>
          <nav className="flex items-center gap-1">
            {SECTIONS.slice(1).map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  active === id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={onOpenTerminal}
              className="ml-2 flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">cmd</span>
              <kbd className="hidden rounded border border-border px-1 text-[10px] lg:inline">`</kbd>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="glass fixed bottom-0 left-0 right-0 z-40 flex items-stretch justify-around border-t border-border pb-[env(safe-area-inset-bottom)] md:hidden">
        {SECTIONS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] transition-colors ${
              active === id ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Icon className="h-5 w-5" strokeWidth={active === id ? 2.4 : 1.8} />
            {label}
          </button>
        ))}
      </nav>
    </>
  );
}
