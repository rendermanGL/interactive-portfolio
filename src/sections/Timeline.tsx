import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronDown, CircleDot, History } from "lucide-react";
import { trpc } from "@/providers/trpc";

export default function Timeline() {
  const experience = trpc.portfolio.experience.useQuery();
  const [openId, setOpenId] = useState<number | null>(null);
  const [showEarlier, setShowEarlier] = useState(false);

  const main = experience.data?.filter((e) => e.era === "main") ?? [];
  const earlier = experience.data?.filter((e) => e.era === "earlier") ?? [];

  const renderNode = (job: NonNullable<typeof experience.data>[number], i: number) => {
    const open = openId === job.id;
    return (
      <motion.div
        key={job.id}
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: i * 0.06 }}
        className="relative pl-10 md:pl-14"
      >
        {/* node */}
        <span
          className={`absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 md:left-2 ${
            job.current
              ? "animate-pulse-ring border-primary bg-primary/20"
              : "border-border bg-card"
          }`}
        >
          <span className={`h-2 w-2 rounded-full ${job.current ? "bg-primary" : "bg-muted-foreground/50"}`} />
        </span>

        <button
          onClick={() => setOpenId(open ? null : job.id)}
          className={`card-glow glass w-full rounded-2xl p-4 text-left md:p-5 ${
            job.current ? "border-primary/40" : ""
          }`}
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-mono text-[11px] text-primary">{job.period}</span>
            {job.current && (
              <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
                CURRENT
              </span>
            )}
          </div>
          <h3 className="mt-1.5 font-bold leading-snug md:text-lg">{job.role}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            <span className="text-foreground/80">{job.company}</span>
            {job.companyDesc ? ` — ${job.companyDesc}` : ""}
          </p>
          <p className="mt-1 flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
            <MapPin className="h-3 w-3" /> {job.location}
          </p>

          <AnimatePresence>
            {open && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-3 space-y-2 border-t border-border pt-3">
                  {job.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                      <CircleDot className="mt-1 h-3 w-3 shrink-0 text-primary/70" />
                      {b}
                    </li>
                  ))}
                </div>
              </motion.ul>
            )}
          </AnimatePresence>

          <p className="mt-3 flex items-center gap-1 font-mono text-[10px] text-muted-foreground/70">
            <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
            {open ? "less" : "details"}
          </p>
        </button>
      </motion.div>
    );
  };

  return (
    <section id="timeline" className="relative px-5 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-tag">// 02 — git log --career</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
            The <span className="text-gradient">journey</span>
          </h2>
          <p className="mt-3 font-mono text-xs text-muted-foreground">
            8+ years · 600+ properties · 15,000+ platform users · 1,000+ students
          </p>
        </motion.div>

        <div className="relative mt-12">
          {/* rail */}
          <div className="absolute bottom-0 left-[11px] top-0 w-px bg-gradient-to-b from-primary/60 via-border to-transparent md:left-[19px]" />
          <div className="space-y-5 md:space-y-6">{main.map(renderNode)}</div>

          {earlier.length > 0 && (
            <div className="mt-8 pl-10 md:pl-14">
              <button
                onClick={() => setShowEarlier(!showEarlier)}
                className="flex items-center gap-2 rounded-xl border border-dashed border-border px-4 py-2.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <History className="h-3.5 w-3.5" />
                {showEarlier ? "hide earlier commits" : `load earlier commits (${earlier.length})`}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showEarlier ? "rotate-180" : ""}`} />
              </button>
            </div>
          )}

          <AnimatePresence>
            {showEarlier && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 space-y-5 md:space-y-6"
              >
                {earlier.map(renderNode)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
