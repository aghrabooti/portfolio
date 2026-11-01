"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Github, Layers3, MoveUpRight, Radio, Terminal } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { notes, profile, projects, skillGroups, stats } from "@/data/portfolio";

const HeroAtlas = dynamic(() => import("@/components/HeroAtlas"), { ssr: false });

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow"><span className="eyebrow-line" />{children}</div>;
}

function SectionHeading({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="section-heading">
      <div>
        <Eyebrow>FIG. {number} — FIELD RECORD</Eyebrow>
        <h2>{title}</h2>
      </div>
      <p>{description}</p>
    </div>
  );
}

export default function HomePage() {
  const featured = projects.filter((project) => project.featured);

  return (
    <main>
      <div className="hero-shell blueprint-grid">
        <div className="container">
          <header className="topbar">
            <Link href="#" className="wordmark"><span className="wordmark-symbol">A/</span> SYSTEMS ATLAS</Link>
            <nav className="topnav" aria-label="Main navigation">
              <a href="#atlas">Atlas</a><a href="#projects">Projects</a><a href="#notes">Field notes</a><a href="#about">About</a>
            </nav>
            <a className="topbar-github" href={profile.github} target="_blank" rel="noreferrer"><Github size={14} /> SOURCE <ArrowUpRight size={13} /></a>
          </header>

          <section className="hero">
            <motion.div className="hero-copy" initial="hidden" animate="visible" variants={fadeUp}>
              <div className="availability"><span className="status-dot" /> {profile.role} <span className="slash">/</span> {profile.name}</div>
              <p className="hero-index">INDEPENDENT ENGINEERING PRACTICE · 2026</p>
              <h1>Software,<br />drawn as a <em>system.</em></h1>
              <p className="hero-description">
                I build web platforms, production Telegram bots, and browser tools — often for Persian-speaking users, where right-to-left layout, the Jalali calendar, and local payment rails are engineering constraints, not localization afterthoughts.
              </p>
              <div className="hero-actions">
                <a className="button-primary" href="#atlas">EXPLORE THE ATLAS <ArrowDown size={14} /></a>
                <a className="button-secondary" href="#projects">SELECTED PROJECTS <MoveUpRight size={14} /></a>
                <a className="button-quiet" href={profile.github} target="_blank" rel="noreferrer"><Github size={15} /> GITHUB</a>
              </div>
              <div className="hero-footnote"><span>01 / 04</span><span>SCROLL TO TRACE THE SYSTEMS</span></div>
            </motion.div>

            <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.15 }}>
              <div className="visual-frame"><HeroAtlas /></div>
              <div className="visual-caption"><span>PLATE 001</span><span>INTERCONNECTED SOFTWARE SYSTEMS</span><span>FIG. A</span></div>
            </motion.div>
          </section>

          <motion.div className="stats-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
            {stats.map((stat) => (
              <motion.div className="stat" key={stat.tag} variants={fadeUp}>
                <div className="stat-tag">{stat.tag}<span>↗</span></div>
                <strong>{stat.value}</strong><p>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <section id="atlas" className="section atlas-section">
        <div className="container">
          <SectionHeading number="01" title="The Systems Atlas" description="Not unrelated side projects. A small ecosystem of applications, tools, and shared engineering foundations." />
          <div className="atlas-panel">
            <div className="atlas-panel-head"><span><Layers3 size={14} /> SYSTEM RELATIONSHIP MAP</span><span>INTERACTIVE MODEL · 3D</span></div>
            <div className="atlas-map">
              <div className="atlas-center"><div className="atlas-center-ring"><Terminal size={24} /></div><strong>SHARED CORE</strong><small>AUTH · DATA · INTERFACES</small></div>
              {projects.slice(0, 4).map((project, i) => (
                <a key={project.id} className={`atlas-node atlas-node-${i + 1}`} href={`#${project.id}`}>
                  <span className={`node-indicator ${project.accent}`} /><span className="node-code">{project.code}</span><strong>{project.name}</strong><small>{project.category}</small>
                </a>
              ))}
              <div className="atlas-orbit orbit-one" /><div className="atlas-orbit orbit-two" />
              <span className="map-coord coord-a">31° 19' N</span><span className="map-coord coord-b">52° 40' E</span>
            </div>
            <div className="atlas-legend"><span><i className="legend-dot cyan" /> APPLICATIONS</span><span><i className="legend-dot blue" /> AUTOMATION</span><span><i className="legend-dot lime" /> LANGUAGE SYSTEMS</span><span className="legend-note">SELECT A NODE TO TRACE ITS CASE STUDY</span></div>
          </div>
        </div>
      </section>

      <section id="projects" className="section projects-section">
        <div className="container">
          <SectionHeading number="02" title="Selected projects" description="A closer look at the systems, the constraints they address, and the decisions behind their implementation." />
          <div className="project-list">
            {featured.map((project, index) => (
              <motion.article id={project.id} className="project-row" key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: index * 0.06 }}>
                <div className="project-number">{project.code}</div>
                <div className="project-main">
                  <div className="project-meta"><span>{project.category}</span><span className="project-status"><i className={`legend-dot ${project.accent}`} />{project.status}</span></div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="stack-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                </div>
                <div className="project-side"><span>{project.role}</span><a href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.name} source`}><ArrowUpRight size={19} /></a></div>
              </motion.article>
            ))}
          </div>
          <div className="all-projects"><span>MORE SYSTEMS IN THE REPOSITORY</span><a href={profile.github} target="_blank" rel="noreferrer">BROWSE ALL PROJECTS <ArrowUpRight size={14} /></a></div>
        </div>
      </section>

      <section className="section skills-section">
        <div className="container">
          <SectionHeading number="03" title="The engineering layers" description="Tools are useful when they solve a concrete problem. Each layer is connected to work shown in this atlas." />
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="skill-card" key={group.index}>
                <div className="skill-card-top"><span>{group.index} / LAYER</span><span>↗</span></div>
                <h3>{group.title}</h3><p>{group.detail}</p>
                <div className="skill-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="notes" className="section notes-section">
        <div className="container">
          <SectionHeading number="04" title="Engineering field notes" description="Short observations extracted from implementation work. Each note points back to a system, not an invented article archive." />
          <div className="notes-grid">
            {notes.map((note) => (
              <article className="note-card" key={note.id}>
                <span className="note-id">{note.id}</span><h3>{note.title}</h3><p>{note.body}</p>
                <a href={`#${note.project}`}>{note.source} <ArrowUpRight size={13} /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section about-section">
        <div className="container">
          <SectionHeading number="05" title="The operator" description="A concise introduction, grounded in the work above." />
          <div className="about-grid">
            <div className="about-copy">
              <p className="about-lead">I’m {profile.name}, a software developer focused on practical web systems, automation, and the details that make products work for real users.</p>
              <p>Much of this work serves Persian-speaking users. That makes bidirectional text, Jalali dates, localized data, SMS authentication, and regional payment workflows first-class design constraints.</p>
              <p>I prefer evidence over assertion: source code that can be inspected, tests that can be run, and engineering decisions that can be explained.</p>
              <div className="about-links"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={15} /> GITHUB PROFILE <ArrowUpRight size={13} /></a>{profile.email ? <a href={`mailto:${profile.email}`}>EMAIL <ArrowUpRight size={13} /></a> : null}</div>
            </div>
            <aside className="contact-card">
              <div className="contact-head"><Radio size={15} /> CONTACT / OPEN CHANNEL</div>
              <div className="contact-body"><span>NAME</span><strong>{profile.name}</strong></div>
              <div className="contact-body"><span>PRACTICE</span><strong>Web platforms · Bots · Browser tools</strong></div>
              <div className="contact-body"><span>GITHUB</span><strong>@{profile.handle}</strong></div>
              <a className="contact-cta" href={profile.github} target="_blank" rel="noreferrer">START A CONVERSATION <ArrowUpRight size={15} /></a>
            </aside>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner"><Link href="#" className="wordmark"><span className="wordmark-symbol">A/</span> SYSTEMS ATLAS</Link><span>DESIGNED AS A MAP. BUILT AS A SYSTEM.</span><span>© {new Date().getFullYear()} {profile.name}</span></div>
      </footer>
    </main>
  );
}
