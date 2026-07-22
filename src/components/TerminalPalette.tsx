import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, CornerDownLeft } from "lucide-react";
import { scrollToSection, SECTIONS } from "./Nav";
import { trpc } from "@/providers/trpc";

type Line = { kind: "in" | "out" | "ok" | "err"; text: string };

const HELP = [
  "available commands:",
  "  go <section>   jump to: " + SECTIONS.map((s) => s.id).join(", "),
  "  tour           restart the guided tour",
  "  stats          live site stats from the database",
  "  whoami         who is jeffrey martin?",
  "  contact        print contact details",
  "  hire --jeffrey initiate hiring protocol",
  "  clear          wipe the terminal",
  "  exit           close this panel",
];

export default function TerminalPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "jm-os interactive shell — type 'help' to begin." },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const utils = trpc.useUtils();

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "`" && !open) {
        e.preventDefault();
        onClose(); // parent toggles
      }
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const push = (items: Line[]) => setLines((prev) => [...prev, ...items].slice(-80));

  const run = async (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    push([{ kind: "in", text: `visitor@jm-os:~$ ${cmd}` }]);
    const [head, ...args] = cmd.toLowerCase().split(/\s+/);
    const arg = args.join(" ");

    switch (head) {
      case "help":
        push(HELP.map((t) => ({ kind: "out", text: t })));
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
      case "quit":
      case "close":
        onClose();
        break;
      case "go":
      case "goto":
      case "cd": {
        const target = SECTIONS.find((s) => s.id === arg);
        if (target) {
          push([{ kind: "ok", text: `navigating to /${target.id} ...` }]);
          scrollToSection(target.id);
          setTimeout(onClose, 500);
        } else {
          push([{ kind: "err", text: `unknown section: '${arg || "(empty)"}' — try: ${SECTIONS.map((s) => s.id).join(", ")}` }]);
        }
        break;
      }
      case "tour":
        localStorage.removeItem("jm_onboarded");
        push([{ kind: "ok", text: "rebooting guide module... reload to launch JM-01." }]);
        setTimeout(() => window.location.reload(), 900);
        break;
      case "stats": {
        push([{ kind: "out", text: "querying live database..." }]);
        try {
          const data = await utils.stats.overview.fetch();
          push([
            { kind: "ok", text: `  total visits     : ${data.visits}` },
            { kind: "ok", text: `  guestbook signals: ${data.signals}` },
            { kind: "ok", text: `  tours completed  : ${data.tours}` },
          ]);
        } catch {
          push([{ kind: "err", text: "database unreachable — try again shortly." }]);
        }
        break;
      }
      case "whoami":
        push([
          { kind: "out", text: "Jeffrey Martin — AI Solutions Architect | Full Stack Developer | Technical Project Lead." },
          { kind: "out", text: "Dubai, UAE · 8+ yrs · ships LLM-powered applications, custom MCP servers and bespoke SaaS." },
        ]);
        break;
      case "contact":
        push([
          { kind: "out", text: "  email    : martin.jeffrey44@gmail.com" },
          { kind: "out", text: "  phone    : +971 50 286 8620" },
          { kind: "out", text: "  linkedin : linkedin.com/in/jeffrey-martin-dubai" },
        ]);
        break;
      case "sudo":
        if (arg.includes("hire")) {
          push([
            { kind: "ok", text: "[sudo] permission granted. initiating hiring protocol..." },
            { kind: "ok", text: "redirecting to /contact — he's open to remote AI engineering roles." },
          ]);
          setTimeout(() => {
            scrollToSection("contact");
            onClose();
          }, 800);
        } else {
          push([{ kind: "err", text: "[sudo] unknown directive. did you mean: sudo hire --jeffrey ?" }]);
        }
        break;
      case "hire":
        push([{ kind: "ok", text: "nice try — this shell requires sudo. 'sudo hire --jeffrey'" }]);
        break;
      default:
        push([{ kind: "err", text: `command not found: '${head}' — type 'help'` }]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-background/70 p-4 backdrop-blur-sm md:items-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 30, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 30, scale: 0.97 }}
            onClick={(e) => e.stopPropagation()}
            className="glass scanline relative w-full max-w-lg overflow-hidden rounded-2xl border-primary/30 shadow-[0_0_60px_-10px_hsl(var(--primary)/0.45)]"
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <Terminal className="h-4 w-4 text-primary" />
              <span className="font-mono text-xs text-muted-foreground">jm-os shell — visitor mode</span>
              <button onClick={onClose} className="ml-auto font-mono text-xs text-muted-foreground hover:text-foreground">
                [esc]
              </button>
            </div>
            <div ref={scrollRef} className="h-56 space-y-1 overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed">
              {lines.map((l, i) => (
                <p
                  key={i}
                  className={
                    l.kind === "in"
                      ? "text-foreground/90"
                      : l.kind === "ok"
                        ? "text-emerald-400"
                        : l.kind === "err"
                          ? "text-red-400"
                          : "text-muted-foreground"
                  }
                >
                  {l.text}
                </p>
              ))}
            </div>
            <form
              className="flex items-center gap-2 border-t border-border px-4 py-3"
              onSubmit={(e) => {
                e.preventDefault();
                run(input);
                setInput("");
              }}
            >
              <span className="font-mono text-sm text-primary">❯</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="type a command..."
                className="flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground/50"
              />
              <button type="submit" aria-label="Run command">
                <CornerDownLeft className="h-4 w-4 text-muted-foreground" />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
