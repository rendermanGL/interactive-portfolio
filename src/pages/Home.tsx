import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";
import Starfield from "@/components/Starfield";
import Nav from "@/components/Nav";
import Onboarding from "@/components/Onboarding";
import TerminalPalette from "@/components/TerminalPalette";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import Timeline from "@/sections/Timeline";
import Skills from "@/sections/Skills";
import Guestbook from "@/sections/Guestbook";
import Contact from "@/sections/Contact";
import { trpc } from "@/providers/trpc";

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const track = trpc.stats.track.useMutation();

  useEffect(() => {
    if (!sessionStorage.getItem("jm_visited")) {
      sessionStorage.setItem("jm_visited", "1");
      track.mutate({ kind: "visit", meta: navigator.userAgent.slice(0, 200) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <Starfield />
      <div className="relative z-10">
        <Nav onOpenTerminal={() => setTerminalOpen(true)} />
        <main>
          <Hero />
          <Projects />
          <Timeline />
          <Skills />
          <Guestbook />
          <Contact />
        </main>
      </div>

      <Onboarding />
      <TerminalPalette open={terminalOpen} onClose={() => setTerminalOpen(false)} />

      {/* Mobile terminal FAB */}
      <button
        onClick={() => setTerminalOpen(true)}
        className="glass fixed bottom-20 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border-primary/40 text-primary shadow-[0_0_24px_-4px_hsl(var(--primary)/0.5)] md:hidden"
        aria-label="Open terminal"
      >
        <Terminal className="h-5 w-5" />
      </button>
    </div>
  );
}
