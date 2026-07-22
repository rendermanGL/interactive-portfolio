-- Seed data for the portfolio (already applied to production Supabase).
-- Safe to re-run reference: rows will duplicate unless the tables are empty.

insert into public.projects (slug, title, tagline, description, outcome, "techStack", status, accent, "sortOrder") values
('lutron-visualizer', 'Lutron HomeWorks Visualizer', 'Plain text → pixel-perfect wiring topology',
 'Production tool with a custom MCP server that turns plain-text cable mapping into a one-to-one visual topology against Lutron Designer. What used to be a manual, error-prone drafting exercise now renders in seconds — straight from an LLM conversation.',
 'In production use · Published on GitHub',
 '["Claude API", "Custom MCP Server", "Python", "Lutron Designer"]'::jsonb, 'in_production', 'cyan', 1),
('hurst-first-pm', 'Hurst First PM SaaS', 'An AI-native PM platform for a non-technical team',
 'Bespoke AI-native project management platform with a custom MCP linking Tradify scheduling data into a unified high-level project view. The team talks to the system in plain English; the platform does the cross-referencing.',
 'Used daily by a non-technical operations team',
 '["Claude", "Custom MCP", "Tradify Integration", "SaaS Architecture"]'::jsonb, 'in_production', 'violet', 2),
('deepstream-audience', 'NVIDIA DeepStream Audience Detection', 'Real-time CV + LLM classification for OOH advertising',
 'Real-time video pipeline with LLM object classification, measuring billboard viewership for out-of-home advertising buyers. Edge inference on NVIDIA DeepStream, semantic classification by an LLM layer.',
 'Live commercial pilot with a Dubai ad agency',
 '["NVIDIA DeepStream", "TensorFlow", "LLM Classification", "Computer Vision"]'::jsonb, 'live_pilot', 'lime', 3),
('exohabit', 'ExoHabit', 'Ranking exoplanets by habitability with an LLM co-pilot',
 'LLM-driven educational application that ingests NASA''s exoplanetary database and ranks planetary bodies by habitability. Built as a live demo of AI-accelerated learning in an unfamiliar domain — astrophysics.',
 'Demo of AI-accelerated learning in unfamiliar domains',
 '["ChatGPT", "Codex", "NASA Open API", "RAG"]'::jsonb, 'demo', 'amber', 4);

insert into public.experience (role, company, "companyDesc", location, period, bullets, current, era, "sortOrder") values
('Lead Network & Infrastructure Architect / Principal Partner', 'Hurst First', 'Home Automation & Technology Solutions', 'Dubai, UAE', 'Oct 2023 — Present',
 '["Architected and deployed network and smart-systems infrastructure across 600+ residential and commercial properties — WLAN, VLAN segmentation, integrated security, Control4/Lutron IP control planes.", "Led end-to-end project execution across high-net-worth residential and commercial engagements, including network security incident response and post-deployment audits.", "Introduced AI-driven internal tooling (custom SaaS + MCP integrations) to streamline operations for a non-technical team."]'::jsonb,
 true, 'main', 1),
('Independent Technology Consultant', 'Freelance', 'Software, Web & Smart Systems', 'Dubai, UAE', 'Sep 2022 — Oct 2023',
 '["Delivered freelance full-stack web, API integration, and smart-home engagements for residential and SME clients.", "Self-directed deep dive into AI/LLM application design — the foundation for everything that followed."]'::jsonb,
 false, 'main', 2),
('Head Educator & Co-Founder, Abiliti Program', 'Cordoba Institute', 'Education & EdTech', 'Dubai, UAE', 'Oct 2020 — Sep 2022',
 '["Co-founded and led the Abiliti EdTech program (ages 6–16), scaling to 1,000+ active users with 90% adoption within six months; owned the full product development lifecycle.", "Delivered IGCSE/AS/A-Level CS tutoring with an 85% performance improvement rate; tailored learning programs contributed to 90% college acceptance."]'::jsonb,
 false, 'main', 3),
('Full Stack Developer', 'LA Digital', 'Web Development Agency', 'Dubai, UAE', 'Sep 2019 — Sep 2020',
 '["LMS integration across 10+ schools; automation reduced manual tasks by 20%."]'::jsonb,
 false, 'earlier', 4),
('Co-Founder & Full Stack Developer', 'Gylow', 'E-Sports Community Platform', 'Dubai, UAE', '2019',
 '["Real-time stat-tracking platform that grew to 15,000+ users; hosted 3 UAE-wide tournaments."]'::jsonb,
 false, 'earlier', 5),
('IT Project Manager', 'The One Group', 'Financial Social Platform', 'Dubai, UAE', '2017 — 2019',
 '["Reduced project turnaround by 20%+ via Agile governance; led zero-downtime migrations."]'::jsonb,
 false, 'earlier', 6),
('Technical Support Engineer', 'BoGolf Pvt. Ltd.', 'Golf Simulator Company', 'Bangalore, India', '2015 — 2017',
 '["VBScript automation cut response times by 50%; Unity 4→5 migration across 100+ assets."]'::jsonb,
 false, 'earlier', 7);

insert into public.skill_groups (title, icon, items, "sortOrder") values
('AI & LLMs', 'brain', '["Anthropic Claude API", "OpenAI GPT", "Model Context Protocol", "Custom MCP Servers", "Prompt Engineering", "RAG", "Agentic Workflows", "Claude Code", "Cursor", "n8n"]'::jsonb, 1),
('Engineering', 'code', '["Python", "JavaScript", "React.js", "Node.js", "REST APIs", "SaaS Architecture", "NVIDIA DeepStream", "TensorFlow", "Computer Vision"]'::jsonb, 2),
('Infrastructure & Cloud', 'cloud', '["AWS (in progress)", "Hybrid Cloud", "SD-WAN", "VPN", "Network Segmentation", "Server Infrastructure", "Terraform (lab)", "CI/CD"]'::jsonb, 3),
('Delivery', 'kanban', '["Agile / Scrum / Kanban", "Jira", "Trello", "Stakeholder Management", "Cross-Functional Leadership"]'::jsonb, 4);

insert into public.guestbook_entries (name, message) values
('System', 'Guestbook initialized. Leave Jeffrey a signal — it persists in a real database.');
