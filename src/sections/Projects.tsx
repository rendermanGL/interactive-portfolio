import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, ChevronDown, Zap, CheckCircle2, FlaskConical, Rocket } from "lucide-react";
import { trpc } from "@/providers/trpc";

const ACCENTS: Record<string, { text: string; border: string; bg: string; glow: string }> = {
  cyan: {
    text: "text-cyan-300",
    border: "hover:border-cyan-400/50",
    bg: "bg-cyan-400/10",
    glow: "shadow-[0_0_50px_-15px_rgba(34,211,238,0.5)]",
  },
  violet: {
    text: "text-violet-300",
    border: "hover:border-violet-400/50",
    bg: "bg-violet-400/10",
    glow: "shadow-[0_0_50px_-15px_rgba(167,139,250,0.5)]",
  },
  lime: {
    text: "text-lime-300",
    border: "hover:border-lime-400/50",
    bg: "bg-lime-400/10",
    glow: "shadow-[0_0_50px_-15px_rgba(163,230,53,0.5)]",
  },
  amber: {
    text: "text-amber-300",
    border: "hover:border-amber-400/50",
    bg: "bg-amber-400/10",
    glow: "shadow-[0_0_50px_-15px_rgba(251,191,36,0.5)]",
  },
};

const STATUS_META: Record<string, { label: string; icon: typeof Zap; className: string }> = {
  in_production: { label: "IN PRODUCTION", icon: Zap, className: "text-cyan-300 border-cyan-400/40 bg-cyan-400/10" },
  live_pilot: { label: "LIVE PILOT", icon: Rocket, className: "text-lime-300 border-lime-400/40 bg-lime-400/10" },
  demo: { label: "DEMO BUILD", icon: FlaskConical, className: "text-amber-300 border-amber-400/40 bg-amber-400/10" },
};

export default function Projects() {
  const projects = trpc.portfolio.projects.useQuery();
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <section id="projects" className="relative px-5 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-tag">// 01 — selected_ai_projects</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
            Systems that <span className="text-gradient">ship</span>
          </h2>
          <p className="mt-3 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <FolderGit2 className="h-3.5 w-3.5 text-primary" />
            SELECT * FROM projects ORDER BY impact DESC — {projects.data?.length ?? "…"} rows returned
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5">
          {projects.data?.map((p, i) => {
            const accent = ACCENTS[p.accent] ?? ACCENTS.cyan;
            const status = STATUS_META[p.status] ?? STATUS_META.demo;
            const open = openSlug === p.slug;
            return (
              <motion.button
                key={p.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setOpenSlug(open ? null : p.slug)}
                className={`card-glow glass rounded-2xl p-5 text-left md:p-6 ${accent.border} ${open ? accent.glow : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent.bg}`}>
                    <FolderGit2 className={`h-5 w-5 ${accent.text}`} />
                  </div>
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] ${status.className}`}>
                    <status.icon className="h-3 w-3" />
                    {status.label}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold leading-snug md:text-xl">{p.title}</h3>
                <p className={`mt-1 font-mono text-xs ${accent.text}`}>{p.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.techStack.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div className={`mt-4 flex items-start gap-2.5 rounded-xl border border-border bg-background/50 p-4`}>
                        <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${accent.text}`} />
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">outcome</p>
                          <p className="mt-1 text-sm font-medium">{p.outcome}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-4 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
                  {open ? "collapse spec" : "expand spec"}
                </div>
              </motion.button>
            );
          })}
        </div>

        {projects.isLoading && (
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass h-64 animate-pulse rounded-2xl" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
