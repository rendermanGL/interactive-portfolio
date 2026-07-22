import { motion } from "framer-motion";
import { Brain, Code2, Cloud, KanbanSquare, Award, GraduationCap } from "lucide-react";
import { trpc } from "@/providers/trpc";

const ICONS: Record<string, typeof Brain> = {
  brain: Brain,
  code: Code2,
  cloud: Cloud,
  kanban: KanbanSquare,
};

const CERTS = [
  "AWS Solutions Architect Associate",
  "HashiCorp Terraform Associate",
  "Cisco CCNA",
  "Cisco CCNP Enterprise",
];

const EDUCATION = [
  { title: "B.Sc (Hons) Computer Science", org: "SAE Institute of Technology" },
  { title: "Full Stack Development Certification", org: "FreeCodeCamp" },
  { title: "BFA Graphic Design", org: "Regents American University" },
];

export default function Skills() {
  const groups = trpc.portfolio.skillGroups.useQuery();

  return (
    <section id="skills" className="relative px-5 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-tag">// 03 — system.capabilities</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
            The stack <span className="text-gradient">matrix</span>
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {groups.data?.map((g, i) => {
            const Icon = ICONS[g.icon] ?? Brain;
            return (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-glow glass rounded-2xl p-5"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/15">
                    <Icon className="h-4.5 w-4.5 h-5 w-5 text-secondary" />
                  </div>
                  <h3 className="font-mono text-sm font-bold">{g.title}</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="chip transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* marquee strip */}
        <div className="glass mt-8 overflow-hidden rounded-2xl border-border py-3">
          <div className="animate-marquee flex w-max gap-8 whitespace-nowrap font-mono text-xs text-muted-foreground">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex gap-8">
                {groups.data?.flatMap((g) => g.items).slice(0, 24).map((item, i) => (
                  <span key={`${dup}-${i}`}>
                    <span className="text-primary">▸</span> {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* education + in-progress certs */}
        <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-5 md:p-6"
          >
            <div className="flex items-center gap-2.5">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h3 className="font-mono text-sm font-bold">education</h3>
            </div>
            <div className="mt-4 space-y-3">
              {EDUCATION.map((e) => (
                <div key={e.title} className="border-l-2 border-primary/30 pl-3.5">
                  <p className="text-sm font-medium">{e.title}</p>
                  <p className="font-mono text-xs text-muted-foreground">{e.org}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-2xl p-5 md:p-6"
          >
            <div className="flex items-center gap-2.5">
              <Award className="h-5 w-5 text-amber-300" />
              <h3 className="font-mono text-sm font-bold">
                certifications <span className="text-muted-foreground">— in progress</span>
              </h3>
            </div>
            <div className="mt-4 space-y-2.5">
              {CERTS.map((c, i) => (
                <div key={c} className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-muted-foreground">0{i + 1}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${55 + i * 10}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                      className="h-full rounded-full bg-gradient-to-r from-amber-400/70 to-amber-300"
                    />
                  </div>
                  <span className="w-40 truncate text-xs text-muted-foreground sm:w-auto">{c}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 font-mono text-[10px] text-muted-foreground/70">
              $ uptime --learning → continuous
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
