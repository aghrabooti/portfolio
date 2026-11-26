import Image from "next/image";
import { Github } from "lucide-react";
import DynamicGridGallery from "@/components/DynamicGridGallery";
import LaptopMockup from "@/components/LaptopMockup";
import NovaSweep from "@/components/backgrounds/NovaSweep";
import HeroAtlas from "@/components/HeroAtlas";
import ParsiChinDemo from "@/components/ParsiChinDemo";
import TelegramDemo from "@/components/TelegramDemo";
import { profile, projects } from "@/data/portfolio";

export default function HomePage() {
  return (
    <>
      <a className="skip" href="#main">Skip to main content</a>
      <header className="rail">
        <a className="monogram" href="#intro" aria-label="Home">PA<span>.</span></a>
        <nav aria-label="Main navigation">
          <a href="#projects">Work</a>
          <a href="#skills">Skills</a>
          <a href="#about">About</a>
        </nav>
        <a className="social" href={profile.github} aria-label="GitHub"><Github size={20} /></a>
      </header>

      <main id="main">
        <section className="hero" id="intro" aria-labelledby="hero-title">
          <NovaSweep className="section-sweep section-sweep--hero" color="#35d5ee" backgroundColor="#111111" rotation={-38} speed={0.26} resolutionScale={0.55} />
          <HeroAtlas />
          <div className="shell hero-copy">
            <p className="label">{profile.name}</p>
            <h1 id="hero-title">Software<br /><span>Developer</span></h1>
            <p className="intro">I design and build websites and Telegram bots.</p>
          </div>
          <a className="scroll-link" href="#projects">Selected work <span aria-hidden="true">↓</span></a>
        </section>

        <section className="shell work" id="projects" aria-label="Selected work">
          <NovaSweep className="section-sweep section-sweep--work" color="#38bad8" backgroundColor="#111111" rotation={-72} speed={0.18} resolutionScale={0.5} />
          {projects.map((project, index) => (
            <article className={`project project--${project.id}`} id={project.id} key={project.id}>
              <div className="project-copy">
                <p className="chapter"><span>{String(index + 1).padStart(2, "0")}</span> {project.category}</p>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <ul className="stack" aria-label="Technologies">
                  {project.stack.map((tech) => <li key={tech}>{tech}</li>)}
                </ul>
              </div>
              {project.id === "telegram-systems" ? (
                <div className="project-visual"><TelegramDemo /></div>
              ) : project.id === "parsichin" ? (
                <div className="project-visual"><ParsiChinDemo /></div>
              ) : (
                <LaptopMockup>
                  <Image
                    className="project-screenshot"
                    {...project.screenshot}
                    sizes="(max-width: 760px) calc(100vw - 64px), 50vw"
                  />
                </LaptopMockup>
              )}
            </article>
          ))}
        </section>

        <DynamicGridGallery />

        <section className="shell about" id="about" aria-labelledby="about-title">
          <h2 id="about-title">About me</h2>
          <div>
            <p>I’m {profile.name}, a web and Telegram bot developer. I’ve worked with {profile.experience.join(" and ")}.</p>
            <dl className="profile-details">
              <div><dt>Education</dt><dd>{profile.education}</dd></div>
              <div><dt>Born</dt><dd>{profile.born}</dd></div>
            </dl>
            <a className="contact-link" href={profile.github}><Github size={18} aria-hidden="true" /> @{profile.handle}</a>
          </div>
        </section>
      </main>

      <footer className="shell footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href="https://hamishw.com/">Design reference by Hamish Williams</a>
      </footer>
    </>
  );
}
