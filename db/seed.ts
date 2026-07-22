import { getDb } from "../api/queries/connection";
import { projects, experience, skillGroups, guestbookEntries } from "./schema";

async function seed() {
  const db = getDb();

  const existingProjects = await db.select().from(projects);
  if (existingProjects.length === 0) {
    await db.insert(projects).values([
      {
        slug: "lutron-visualizer",
        title: "Lutron HomeWorks Visualizer",
        tagline: "Plain text → pixel-perfect wiring topology",
        description:
          "Production tool with a custom MCP server that turns plain-text cable mapping into a one-to-one visual topology against Lutron Designer. What used to be a manual, error-prone drafting exercise now renders in seconds — straight from an LLM conversation.",
        outcome: "In production use · Published on GitHub",
        techStack: ["Claude API", "Custom MCP Server", "Python", "Lutron Designer"],
        status: "in_production",
        accent: "cyan",
        sortOrder: 1,
      },
      {
        slug: "hurst-first-pm",
        title: "Hurst First PM SaaS",
        tagline: "An AI-native PM platform for a non-technical team",
        description:
          "Bespoke AI-native project management platform with a custom MCP linking Tradify scheduling data into a unified high-level project view. The team talks to the system in plain English; the platform does the cross-referencing.",
        outcome: "Used daily by a non-technical operations team",
        techStack: ["Claude", "Custom MCP", "Tradify Integration", "SaaS Architecture"],
        status: "in_production",
        accent: "violet",
        sortOrder: 2,
      },
      {
        slug: "deepstream-audience",
        title: "NVIDIA DeepStream Audience Detection",
        tagline: "Real-time CV + LLM classification for OOH advertising",
        description:
          "Real-time video pipeline with LLM object classification, measuring billboard viewership for out-of-home advertising buyers. Edge inference on NVIDIA DeepStream, semantic classification by an LLM layer.",
        outcome: "Live commercial pilot with a Dubai ad agency",
        techStack: ["NVIDIA DeepStream", "TensorFlow", "LLM Classification", "Computer Vision"],
        status: "live_pilot",
        accent: "lime",
        sortOrder: 3,
      },
      {
        slug: "exohabit",
        title: "ExoHabit",
        tagline: "Ranking exoplanets by habitability with an LLM co-pilot",
        description:
          "LLM-driven educational application that ingests NASA's exoplanetary database and ranks planetary bodies by habitability. Built as a live demo of AI-accelerated learning in an unfamiliar domain — astrophysics.",
        outcome: "Demo of AI-accelerated learning in unfamiliar domains",
        techStack: ["ChatGPT", "Codex", "NASA Open API", "RAG"],
        status: "demo",
        accent: "amber",
        sortOrder: 4,
      },
    ]);
  }

  const existingExperience = await db.select().from(experience);
  if (existingExperience.length === 0) {
    await db.insert(experience).values([
      {
        role: "Lead Network & Infrastructure Architect / Principal Partner",
        company: "Hurst First",
        companyDesc: "Home Automation & Technology Solutions",
        location: "Dubai, UAE",
        period: "Oct 2023 — Present",
        bullets: [
          "Architected and deployed network and smart-systems infrastructure across 600+ residential and commercial properties — WLAN, VLAN segmentation, integrated security, Control4/Lutron IP control planes.",
          "Led end-to-end project execution across high-net-worth residential and commercial engagements, including network security incident response and post-deployment audits.",
          "Introduced AI-driven internal tooling (custom SaaS + MCP integrations) to streamline operations for a non-technical team.",
        ],
        current: true,
        era: "main",
        sortOrder: 1,
      },
      {
        role: "Independent Technology Consultant",
        company: "Freelance",
        companyDesc: "Software, Web & Smart Systems",
        location: "Dubai, UAE",
        period: "Sep 2022 — Oct 2023",
        bullets: [
          "Delivered freelance full-stack web, API integration, and smart-home engagements for residential and SME clients.",
          "Self-directed deep dive into AI/LLM application design — the foundation for everything that followed.",
        ],
        current: false,
        era: "main",
        sortOrder: 2,
      },
      {
        role: "Head Educator & Co-Founder, Abiliti Program",
        company: "Cordoba Institute",
        companyDesc: "Education & EdTech",
        location: "Dubai, UAE",
        period: "Oct 2020 — Sep 2022",
        bullets: [
          "Co-founded and led the Abiliti EdTech program (ages 6–16), scaling to 1,000+ active users with 90% adoption within six months; owned the full product development lifecycle.",
          "Delivered IGCSE/AS/A-Level CS tutoring with an 85% performance improvement rate; tailored learning programs contributed to 90% college acceptance.",
        ],
        current: false,
        era: "main",
        sortOrder: 3,
      },
      {
        role: "Full Stack Developer",
        company: "LA Digital",
        companyDesc: "Web Development Agency",
        location: "Dubai, UAE",
        period: "Sep 2019 — Sep 2020",
        bullets: [
          "LMS integration across 10+ schools; automation reduced manual tasks by 20%.",
        ],
        current: false,
        era: "earlier",
        sortOrder: 4,
      },
      {
        role: "Co-Founder & Full Stack Developer",
        company: "Gylow",
        companyDesc: "E-Sports Community Platform",
        location: "Dubai, UAE",
        period: "2019",
        bullets: [
          "Real-time stat-tracking platform that grew to 15,000+ users; hosted 3 UAE-wide tournaments.",
        ],
        current: false,
        era: "earlier",
        sortOrder: 5,
      },
      {
        role: "IT Project Manager",
        company: "The One Group",
        companyDesc: "Financial Social Platform",
        location: "Dubai, UAE",
        period: "2017 — 2019",
        bullets: [
          "Reduced project turnaround by 20%+ via Agile governance; led zero-downtime migrations.",
        ],
        current: false,
        era: "earlier",
        sortOrder: 6,
      },
      {
        role: "Technical Support Engineer",
        company: "BoGolf Pvt. Ltd.",
        companyDesc: "Golf Simulator Company",
        location: "Bangalore, India",
        period: "2015 — 2017",
        bullets: [
          "VBScript automation cut response times by 50%; Unity 4→5 migration across 100+ assets.",
        ],
        current: false,
        era: "earlier",
        sortOrder: 7,
      },
    ]);
  }

  const existingSkills = await db.select().from(skillGroups);
  if (existingSkills.length === 0) {
    await db.insert(skillGroups).values([
      {
        title: "AI & LLMs",
        icon: "brain",
        items: [
          "Anthropic Claude API",
          "OpenAI GPT",
          "Model Context Protocol",
          "Custom MCP Servers",
          "Prompt Engineering",
          "RAG",
          "Agentic Workflows",
          "Claude Code",
          "Cursor",
          "n8n",
        ],
        sortOrder: 1,
      },
      {
        title: "Engineering",
        icon: "code",
        items: [
          "Python",
          "JavaScript",
          "React.js",
          "Node.js",
          "REST APIs",
          "SaaS Architecture",
          "NVIDIA DeepStream",
          "TensorFlow",
          "Computer Vision",
        ],
        sortOrder: 2,
      },
      {
        title: "Infrastructure & Cloud",
        icon: "cloud",
        items: [
          "AWS (in progress)",
          "Hybrid Cloud",
          "SD-WAN",
          "VPN",
          "Network Segmentation",
          "Server Infrastructure",
          "Terraform (lab)",
          "CI/CD",
        ],
        sortOrder: 3,
      },
      {
        title: "Delivery",
        icon: "kanban",
        items: [
          "Agile / Scrum / Kanban",
          "Jira",
          "Trello",
          "Stakeholder Management",
          "Cross-Functional Leadership",
        ],
        sortOrder: 4,
      },
    ]);
  }

  const existingGuestbook = await db.select().from(guestbookEntries);
  if (existingGuestbook.length === 0) {
    await db.insert(guestbookEntries).values([
      { name: "System", message: "Guestbook initialized. Leave Jeffrey a signal — it persists in a real database." },
    ]);
  }

  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
