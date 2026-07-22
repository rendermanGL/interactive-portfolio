import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, MapPin, ArrowUpRight } from "lucide-react";

const CHANNELS = [
  {
    icon: Mail,
    label: "email",
    value: "martin.jeffrey44@gmail.com",
    href: "mailto:martin.jeffrey44@gmail.com",
  },
  {
    icon: Phone,
    label: "phone / whatsapp",
    value: "+971 50 286 8620",
    href: "tel:+971502868620",
  },
  {
    icon: Linkedin,
    label: "linkedin",
    value: "linkedin.com/in/jeffrey-martin-dubai",
    href: "https://linkedin.com/in/jeffrey-martin-dubai",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative px-5 pb-32 pt-20 md:pb-24 md:pt-28">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="section-tag">// 05 — final_transmission</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
            Let's build something <span className="text-gradient neon-text">intelligent</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
            Open to remote roles across AI engineering, full-stack development and technical
            solutions architecture. If you have a hard problem, I probably want to hear about it.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {CHANNELS.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-glow glass group rounded-2xl p-5"
            >
              <div className="flex items-center justify-between">
                <c.icon className="h-5 w-5 text-primary" />
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {c.label}
              </p>
              <p className="mt-1 break-all text-sm font-medium">{c.value}</p>
            </motion.a>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 flex items-center justify-center gap-2 font-mono text-xs text-muted-foreground"
        >
          <MapPin className="h-3.5 w-3.5 text-primary" />
          Dubai, UAE · available remotely worldwide
        </motion.p>

        <footer className="mt-16 border-t border-border pt-6 text-center">
          <p className="font-mono text-[11px] text-muted-foreground/70">
            <span className="text-primary">JM</span>://jeffrey.martin — designed & engineered as a
            full-stack app · react + trpc + drizzle + live db
          </p>
          <p className="mt-1 font-mono text-[10px] text-muted-foreground/40">
            © 2026 Jeffrey Martin · exit code 0
          </p>
        </footer>
      </div>
    </section>
  );
}
