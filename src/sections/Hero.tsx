import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ChevronDown, Database, Radio, Eye, MessageSquare, CheckCircle2 } from "lucide-react";
import { trpc } from "@/providers/trpc";
import { scrollToSection } from "@/components/Nav";

const ROLES = ["AI Solutions Architect", "Full Stack Developer", "Technical Project Lead", "MCP Server Builder"];

function useRotatingWord(words: string[], holdMs = 2200) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting) {
      if (text.length < word.length) {
        t = setTimeout(() => setText(word.slice(0, text.length + 1)), 55);
      } else {
        t = setTimeout(() => setDeleting(true), holdMs);
      }
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(word.slice(0, text.length - 1)), 28);
      } else {
        setDeleting(false);
        setIndex((i) => i + 1);
      }
    }
    return () => clearTimeout(t);
  }, [text, deleting, index, words, holdMs]);

  return text;
}

function StatChip({ icon: Icon, label, value }: { icon: typeof Eye; label: string; value: string | number }) {
  return (
    <div className="glass flex items-center gap-2.5 rounded-xl px-3.5 py-2.5">
      <Icon className="h-4 w-4 shrink-0 text-primary" />
      <div className="leading-tight">
        <p className="font-mono text-sm font-bold text-foreground">{value}</p>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export default function Hero() {
  const role = useRotatingWord(ROLES);
  const stats = trpc.stats.overview.useQuery(undefined, { refetchInterval: 30000 });

  return (
    <section id="hero" className="relative flex min-h-[100svh] flex-col justify-center px-5 pb-24 pt-24 md:pb-16">
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-xs text-emerald-300">open to remote AI engineering roles</span>
          </div>

          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
            JEFFREY
            <br />
            <span className="text-gradient neon-text animate-flicker">MARTIN</span>
          </h1>

          <p className="mt-5 flex h-8 items-center font-mono text-base text-primary sm:text-lg md:text-xl">
            <span className="mr-2 text-muted-foreground">❯</span>
            {role}
            <span className="animate-blink ml-1">▊</span>
          </p>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            8+ years building scalable software, infrastructure and AI-driven solutions. Currently
            shipping LLM-powered applications with Claude, GPT and MCP — custom MCP servers,
            computer-vision pipelines and bespoke SaaS platforms, live in production.
          </p>

          <div className="mt-4 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            Dubai, UAE · GMT+4
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => scrollToSection("projects")}
              className="rounded-xl bg-primary px-6 py-3.5 font-mono text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95"
            >
              VIEW_AI_PROJECTS →
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="rounded-xl border border-border bg-muted/30 px-6 py-3.5 font-mono text-sm text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              ./contact --jeffrey
            </button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap md:gap-3">
            <StatChip icon={Eye} label="site visits" value={stats.data?.visits ?? "…"} />
            <StatChip icon={MessageSquare} label="signals logged" value={stats.data?.signals ?? "…"} />
            <StatChip icon={CheckCircle2} label="tours completed" value={stats.data?.tours ?? "…"} />
            <div className="glass flex items-center gap-2.5 rounded-xl px-3.5 py-2.5">
              <Database className="h-4 w-4 shrink-0 text-secondary" />
              <div className="leading-tight">
                <p className="flex items-center gap-1.5 font-mono text-sm font-bold text-foreground">
                  LIVE <Radio className="h-3 w-3 animate-pulse text-emerald-400" />
                </p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">real database</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollToSection("projects")}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 text-muted-foreground md:bottom-8"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        aria-label="Scroll down"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.button>
    </section>
  );
}
