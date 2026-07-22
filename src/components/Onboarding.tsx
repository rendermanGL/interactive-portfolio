import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, Bot, Sparkles, Compass } from "lucide-react";
import { scrollToSection } from "./Nav";
import { trpc } from "@/providers/trpc";

const BOOT_LINES = [
  "> jm-os v8.2.1 — booting visitor interface...",
  "> mounting /career /projects /stack ... OK",
  "> connecting to live database ............ OK",
  "> loading guide module [JM-01] ........... OK",
  "> visitor detected. hello, human.",
];

const TOUR_STEPS = [
  {
    target: "hero",
    title: "The Command Deck",
    body: "This is Jeffrey's live feed — 8+ years of shipping software, infrastructure and AI systems, distilled into one interface. Those counters? Real numbers, served from a real database.",
  },
  {
    target: "projects",
    title: "AI Systems in Production",
    body: "Four flagship builds — custom MCP servers, a computer-vision ad pipeline, an AI-native SaaS. Every card is a database record. Tap one to open its full spec sheet.",
  },
  {
    target: "timeline",
    title: "The Journey",
    body: "From VBScript automation in Bangalore to architecting smart infrastructure across 600+ Dubai properties. Scroll the timeline — each node is a chapter.",
  },
  {
    target: "skills",
    title: "The Stack Matrix",
    body: "The full toolkit: LLM APIs and agentic tooling, engineering, cloud infrastructure, and delivery. This is what powers the projects you just saw.",
  },
  {
    target: "guestbook",
    title: "Signal Tower",
    body: "This guestbook writes straight to the live database — your message persists for every future visitor. Try it before you leave.",
  },
  {
    target: "contact",
    title: "Final Transmission",
    body: "That's the full tour. Jeffrey is open to remote roles in AI engineering, full-stack and solutions architecture. The controls are yours now, captain.",
  },
];

function useTypewriter(lines: string[], speed = 22, startDelay = 300) {
  const [state, setState] = useState({ line: 0, char: 0 });
  const [done, setDone] = useState(false);

  useEffect(() => {
    let line = 0;
    let char = 0;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const tick = () => {
      if (cancelled) return;
      if (line >= lines.length) {
        setDone(true);
        return;
      }
      char++;
      setState({ line, char });
      if (char >= lines[line].length) {
        line++;
        char = 0;
        timers.push(setTimeout(tick, 180));
      } else {
        timers.push(setTimeout(tick, speed));
      }
    };

    timers.push(setTimeout(tick, startDelay));
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [lines, speed, startDelay]);

  // Pure derivation — completed lines plus the current partial line
  const output =
    state.char === 0
      ? lines.slice(0, state.line)
      : [...lines.slice(0, state.line), lines[state.line]?.slice(0, state.char) ?? ""];

  return { output, done };
}

export default function Onboarding() {
  // phase: boot -> choice -> tour -> done
  const [phase, setPhase] = useState<"boot" | "choice" | "tour" | "done">(() =>
    localStorage.getItem("jm_onboarded") ? "done" : "boot",
  );
  const [step, setStep] = useState(0);
  const { output, done: bootDone } = useTypewriter(BOOT_LINES, 16);
  const track = trpc.stats.track.useMutation();
  const lastTarget = useRef<string | null>(null);

  useEffect(() => {
    if (phase === "boot" && bootDone) {
      const t = setTimeout(() => setPhase("choice"), 400);
      return () => clearTimeout(t);
    }
  }, [phase, bootDone]);

  useEffect(() => {
    if (phase !== "tour") return;
    const current = TOUR_STEPS[step];
    if (lastTarget.current) {
      document.getElementById(lastTarget.current)?.classList.remove("tour-spotlight");
    }
    document.getElementById(current.target)?.classList.add("tour-spotlight");
    lastTarget.current = current.target;
    scrollToSection(current.target);
  }, [phase, step]);

  const finish = (completed: boolean) => {
    if (lastTarget.current) {
      document.getElementById(lastTarget.current)?.classList.remove("tour-spotlight");
    }
    localStorage.setItem("jm_onboarded", "1");
    if (completed) track.mutate({ kind: "tour_complete" });
    else track.mutate({ kind: "tour_skipped" });
    setPhase("done");
  };

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      {/* Boot + choice overlay */}
      {(phase === "boot" || phase === "choice") && (
        <motion.div
          key="boot"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="scanline fixed inset-0 z-[70] flex items-center justify-center bg-background/95 p-5 backdrop-blur-md"
        >
          <div className="w-full max-w-md">
            <div className="glass rounded-2xl p-6">
              <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  visitor@jm-os:~$
                </span>
              </div>
              <div className="min-h-[130px] space-y-1.5 font-mono text-[13px] leading-relaxed">
                {output.map((line, i) => (
                  <p key={i} className={line?.includes("OK") ? "text-emerald-400" : "text-primary"}>
                    {line}
                  </p>
                ))}
                {!bootDone && <span className="animate-blink text-primary">▊</span>}
              </div>

              <AnimatePresence>
                {phase === "choice" && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 space-y-3"
                  >
                    <p className="text-sm text-muted-foreground">
                      First time here? <span className="text-foreground">JM-01</span>, the onboard
                      guide, can walk you through the site in under a minute.
                    </p>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <button
                        onClick={() => setPhase("tour")}
                        className="animate-pulse-ring flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-mono text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
                      >
                        <Sparkles className="h-4 w-4" />
                        START GUIDED TOUR
                      </button>
                      <button
                        onClick={() => finish(false)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 font-mono text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                      >
                        <Compass className="h-4 w-4" />
                        SKIP — EXPLORE FREELY
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tour HUD */}
      {phase === "tour" && (
        <>
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] bg-background/60 backdrop-blur-[2px]"
          />
          <motion.div
            key="hud"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 22 }}
            className="fixed bottom-20 left-4 right-4 z-[65] md:bottom-8 md:left-auto md:right-8 md:w-[400px]"
          >
            <div className="glass rounded-2xl border-primary/30 p-5 shadow-[0_0_50px_-10px_hsl(var(--primary)/0.4)]">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="animate-pulse-ring flex h-10 w-10 items-center justify-center rounded-full border border-primary/50 bg-primary/15">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-primary">JM-01 · GUIDE MODULE</p>
                    <p className="font-semibold">{TOUR_STEPS[step].title}</p>
                  </div>
                </div>
                <button
                  onClick={() => finish(false)}
                  className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Skip tour"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {TOUR_STEPS[step].body}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {TOUR_STEPS.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === step ? "w-5 bg-primary" : i < step ? "w-1.5 bg-primary/50" : "w-1.5 bg-muted"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => finish(false)}
                    className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    skip tour
                  </button>
                  <button
                    onClick={() => {
                      if (step < TOUR_STEPS.length - 1) setStep(step + 1);
                      else finish(true);
                    }}
                    className="flex items-center gap-1 rounded-lg bg-primary px-3.5 py-2 font-mono text-xs font-bold text-primary-foreground transition-transform hover:scale-105"
                  >
                    {step < TOUR_STEPS.length - 1 ? "NEXT" : "FINISH"}
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
