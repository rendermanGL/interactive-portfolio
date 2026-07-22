import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SendHorizonal, RadioTower, Database } from "lucide-react";
import { trpc } from "@/providers/trpc";

function timeAgo(date: Date | string) {
  const d = new Date(date);
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export default function Guestbook() {
  const utils = trpc.useUtils();
  const entries = trpc.guestbook.list.useQuery();
  const post = trpc.guestbook.post.useMutation({
    onSuccess: () => {
      utils.guestbook.list.invalidate();
      utils.stats.overview.invalidate();
      setMessage("");
    },
  });
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    post.mutate({ name: name.trim(), message: message.trim() });
  };

  return (
    <section id="guestbook" className="relative px-5 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-tag">// 04 — signal_tower</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
            Leave a <span className="text-gradient">signal</span>
          </h2>
          <p className="mt-3 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Database className="h-3.5 w-3.5 text-primary" />
            INSERT INTO guestbook_entries — your message persists in the live database
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            onSubmit={submit}
            className="glass h-fit rounded-2xl p-5 md:p-6"
          >
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <RadioTower className="h-4 w-4 text-primary" />
              transmit_signal.sh
            </div>
            <div className="mt-4 space-y-3">
              <div>
                <label className="mb-1.5 block font-mono text-[11px] text-muted-foreground">
                  --name <span className="text-muted-foreground/50">(max 80)</span>
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={80}
                  placeholder="e.g. Ada from RecruiterCo"
                  className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-primary/60"
                />
              </div>
              <div>
                <label className="mb-1.5 block font-mono text-[11px] text-muted-foreground">
                  --message <span className="text-muted-foreground/50">({280 - message.length} left)</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={280}
                  rows={4}
                  placeholder="Say hi, leave feedback, or start a conversation..."
                  className="w-full resize-none rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-primary/60"
                />
              </div>
              <button
                type="submit"
                disabled={post.isPending || !name.trim() || !message.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-mono text-sm font-bold text-primary-foreground transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <SendHorizonal className="h-4 w-4" />
                {post.isPending ? "TRANSMITTING..." : "TRANSMIT →"}
              </button>
              <AnimatePresence>
                {post.isSuccess && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center font-mono text-xs text-emerald-400"
                  >
                    ✓ signal committed to database
                  </motion.p>
                )}
                {post.isError && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center font-mono text-xs text-red-400">
                    ✗ transmission failed — retry
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.form>

          {/* feed */}
          <div className="space-y-3">
            {entries.isLoading &&
              [...Array(3)].map((_, i) => <div key={i} className="glass h-20 animate-pulse rounded-2xl" />)}
            <AnimatePresence initial={false}>
              {entries.data?.map((e) => (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass rounded-2xl p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="flex items-center gap-2 font-mono text-xs font-bold text-primary">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-[10px] text-primary">
                        {e.name.slice(0, 2).toUpperCase()}
                      </span>
                      {e.name}
                    </p>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {timeAgo(e.createdAt)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.message}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
