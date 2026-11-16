import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { z } from "zod";
import resume from "@/assets/resume.pdf.asset.json";
import photo from "@/assets/nikhil.jpg";
import imgGame from "@/assets/project-game.jpg";
import imgApp from "@/assets/project-app.jpg";
import imgAi from "@/assets/project-ai.jpg";

const TITLE = "Nikhil Revuru — Software & Game Developer (C#, Unity) | B.Tech CSE";
const DESC =
  "Nikhil Revuru is a B.Tech Computer Science student at GRIET, Hyderabad, seeking software and game development internships. Skilled in C, C#, Unity.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Nikhil Revuru",
          jobTitle: "Software Developer Intern",
          alumniOf: "Gokaraju Ranga Raju Institute of Engineering and Technology",
          address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressRegion: "Telangana" },
          sameAs: [LINKEDIN],
        }),
      },
    ],
  }),
  component: Index,
});

const EMAIL = "nikhil.revuru@example.com"; // TODO: replace with real email
const LINKEDIN = "https://www.linkedin.com/in/nikhil-r-50335a393/";
const GITHUB = "https://github.com/"; // TODO: replace with real GitHub
const PHONE = "+91 9347997515";

const NAV = ["About", "Skills", "Projects", "Experience", "Education", "Contact"];

const SKILLS: { group: string; items: { name: string; level: number }[] }[] = [
  { group: "Programming Languages", items: [{ name: "C#", level: 80 }, { name: "C", level: 75 }] },
  { group: "Frameworks & Engines", items: [{ name: "Unity", level: 75 }, { name: ".NET Basics", level: 50 }] },
  { group: "Tools & Technologies", items: [{ name: "AutoCAD", level: 65 }, { name: "MS Office", level: 85 }, { name: "Git & GitHub", level: 55 }] },
  { group: "Core & Soft Skills", items: [{ name: "Problem-Solving", level: 85 }, { name: "Communication", level: 85 }, { name: "Teamwork", level: 90 }, { name: "Time Management", level: 80 }] },
];

const PROJECTS = [
  { title: "Crystal Caverns — 3D Platformer", img: imgGame, desc: "A low-poly 3D platformer built in Unity with C# scripts for player movement, collectibles, moving platforms and a health system.", tech: ["C#", "Unity", "Game Design"] },
  { title: "StudyFlow — Task Planner", img: imgApp, desc: "A desktop productivity app to organise assignments, deadlines and study streaks, with subject-wise progress tracking.", tech: ["C#", "WinForms", "SQLite"] },
  { title: "Intro to Modern AI — Concept Explorer", img: imgAi, desc: "Notes and interactive demos summarising core AI concepts learned through the Cisco Networking Academy course.", tech: ["AI Basics", "Python", "Visualization"] },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("is-visible"), io.unobserve(e.target))),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Section({ id, title, kicker, children }: { id: string; title: string; kicker: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20">
      <p className="reveal text-sm font-medium uppercase tracking-[0.2em] text-primary">{kicker}</p>
      <h2 id={`${id}-h`} className="reveal mt-2 mb-10 text-3xl font-bold md:text-4xl">{title}</h2>
      {children}
    </section>
  );
}

const btn = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5";
const btnPrimary = `${btn} bg-gradient-brand text-primary-foreground shadow-glow`;
const btnGhost = `${btn} glass text-foreground hover:border-primary`;

function Index() {
  useReveal();
  const [sent, setSent] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const schema = z.object({
    name: z.string().trim().min(1, "Please enter your name").max(100),
    email: z.string().trim().email("Enter a valid email").max(255),
    message: z.string().trim().min(1, "Please write a message").max(1000),
  });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(data);
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    const subject = encodeURIComponent(`Portfolio enquiry from ${r.data.name}`);
    const body = encodeURIComponent(`${r.data.message}\n\n— ${r.data.name} (${r.data.email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent("Opening your email app…");
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
        <nav aria-label="Main" className="glass mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#top" className="font-display text-lg font-bold">NR<span className="text-primary">.</span></a>
          <ul className="hidden gap-6 text-sm text-muted-foreground md:flex">
            {NAV.map((n) => (
              <li key={n}><a className="transition-colors hover:text-primary" href={`#${n.toLowerCase()}`}>{n}</a></li>
            ))}
          </ul>
          <a href={resume.url} download="Nikhil-Revuru-Resume.pdf" className="rounded-full border border-primary/50 px-4 py-1.5 text-sm text-primary hover:bg-primary/10">Resume</a>
        </nav>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-5 pt-28 pb-16 md:grid-cols-[1.3fr_1fr]">
          <div className="reveal">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 px-3 py-1 text-xs text-primary">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" /> Open to internships · 2026
            </p>
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              Nikhil <span className="text-gradient">Revuru</span>
            </h1>
            <p className="mt-4 text-xl font-medium text-foreground/90 md:text-2xl">Software &amp; Game Developer · C# / Unity</p>
            <p className="mt-4 max-w-xl text-muted-foreground">
              B.Tech Computer Science student at GRIET, Hyderabad. I turn ideas into playable games and practical software — and I'm looking for my first internship to build real products with a great team.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={resume.url} download="Nikhil-Revuru-Resume.pdf" className={btnPrimary}>↓ Download Resume</a>
              <a href="#contact" className={btnGhost}>Contact Me</a>
            </div>
          </div>
          <div className="reveal relative mx-auto w-64 md:w-80">
            <div className="absolute -inset-4 rounded-full bg-gradient-brand opacity-30 blur-3xl" />
            <img src={photo} alt="Portrait of Nikhil Revuru" width={320} height={320} className="relative aspect-square w-full rounded-full border-4 border-primary/30 object-cover" />
          </div>
        </section>

        <Section id="about" kicker="01 · About" title="About Me">
          <div className="grid gap-6 md:grid-cols-3">
            <article className="glass reveal p-6">
              <h3 className="mb-2 text-lg font-semibold text-primary">Education</h3>
              <p>B.Tech, Computer Science</p>
              <p className="text-sm text-muted-foreground">Gokaraju Ranga Raju Institute of Engineering and Technology, Hyderabad · 2025 – 2029</p>
            </article>
            <article className="glass reveal p-6">
              <h3 className="mb-2 text-lg font-semibold text-primary">Career Objective</h3>
              <p className="text-sm text-muted-foreground">A motivated, detail-oriented Computer Science student seeking an internship or entry-level role to apply my skills, contribute to the organisation's success and keep growing my expertise.</p>
            </article>
            <article className="glass reveal p-6">
              <h3 className="mb-2 text-lg font-semibold text-primary">Technical Interests</h3>
              <ul className="flex flex-wrap gap-2 text-sm">
                {["Game Development", "Software Engineering", "Artificial Intelligence", "Networking", "Graphic Design"].map((t) => (
                  <li key={t} className="rounded-full bg-secondary px-3 py-1">{t}</li>
                ))}
              </ul>
            </article>
          </div>
        </Section>

        <Section id="skills" kicker="02 · Skills" title="Technical Skills">
          <div className="grid gap-6 md:grid-cols-2">
            {SKILLS.map((g) => (
              <article key={g.group} className="glass reveal p-6">
                <h3 className="mb-5 text-lg font-semibold">{g.group}</h3>
                <ul className="space-y-4">
                  {g.items.map((s) => (
                    <li key={s.name}>
                      <div className="mb-1.5 flex justify-between text-sm"><span>{s.name}</span><span className="text-muted-foreground">{s.level}%</span></div>
                      <div className="h-2 overflow-hidden rounded-full bg-secondary" role="progressbar" aria-label={s.name} aria-valuenow={s.level} aria-valuemin={0} aria-valuemax={100}>
                        <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${s.level}%` }} />
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section id="projects" kicker="03 · Work" title="Projects">
          <div className="grid gap-6 md:grid-cols-3">
            {PROJECTS.map((p) => (
              <article key={p.title} className="glass reveal group flex flex-col overflow-hidden transition-transform hover:-translate-y-1">
                <div className="overflow-hidden">
                  <img src={p.img} alt={`${p.title} screenshot`} loading="lazy" width={1024} height={640} className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.desc}</p>
                  <ul className="mt-4 flex flex-wrap gap-2 text-xs">
                    {p.tech.map((t) => <li key={t} className="rounded-full border border-primary/40 px-2.5 py-0.5 text-primary">{t}</li>)}
                  </ul>
                  <div className="mt-5 flex gap-4 text-sm font-medium">
                    <a href={GITHUB} target="_blank" rel="noreferrer" className="hover:text-primary">GitHub →</a>
                    <a href={GITHUB} target="_blank" rel="noreferrer" className="text-accent hover:underline">Live Demo →</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="experience" kicker="04 · Experience" title="Experience & Certifications">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="glass reveal p-6">
              <h3 className="mb-4 text-lg font-semibold text-primary">Leadership & Activities</h3>
              <ul className="space-y-3 text-sm">
                <li><strong>Member</strong>, Advanced Academic Center — GRIET</li>
                <li><strong>Deputy Class Representative</strong> — GRIET</li>
                <li><strong>Internships</strong> — <span className="text-muted-foreground">Actively seeking my first internship</span></li>
              </ul>
            </article>
            <article className="glass reveal p-6">
              <h3 className="mb-4 text-lg font-semibold text-primary">Certifications & Achievements</h3>
              <ul className="space-y-3 text-sm">
                <li>🏅 Introduction to Modern AI — Cisco Networking Academy</li>
                <li>🏅 Networking Basics — Cisco Networking Academy</li>
                <li>🏆 Selected for GRIET Advanced Academic Center</li>
              </ul>
            </article>
          </div>
        </Section>

        <Section id="education" kicker="05 · Education" title="Education Timeline">
          <ol className="relative ml-3 space-y-8 border-l border-primary/30">
            {[
              { when: "2025 – 2029", title: "B.Tech in Computer Science", where: "Gokaraju Ranga Raju Institute of Engineering and Technology, Hyderabad", note: "CGPA: 10 / 10" },
              { when: "2025", title: "Advanced Academic Center", where: "GRIET", note: "Selected as a member for academic excellence" },
              { when: "2025", title: "Cisco Networking Academy", where: "Online", note: "Completed Intro to Modern AI and Networking Basics" },
            ].map((e) => (
              <li key={e.title} className="reveal ml-6">
                <span className="absolute -left-[7px] mt-2 h-3.5 w-3.5 rounded-full bg-gradient-brand shadow-glow" />
                <div className="glass p-5">
                  <p className="text-xs uppercase tracking-wider text-accent">{e.when}</p>
                  <h3 className="mt-1 font-semibold">{e.title}</h3>
                  <p className="text-sm text-muted-foreground">{e.where}</p>
                  <p className="mt-2 text-sm text-primary">{e.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="contact" kicker="06 · Contact" title="Let's Work Together">
          <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
            <address className="glass reveal space-y-4 p-6 not-italic">
              <p className="text-muted-foreground">Have an internship or project in mind? I'd love to hear from you.</p>
              <p><span className="block text-xs text-muted-foreground">Email</span><a href={`mailto:${EMAIL}`} className="hover:text-primary">{EMAIL}</a></p>
              <p><span className="block text-xs text-muted-foreground">Phone</span><a href="tel:+919347997515" className="hover:text-primary">{PHONE}</a></p>
              <p><span className="block text-xs text-muted-foreground">LinkedIn</span><a href={LINKEDIN} target="_blank" rel="noreferrer" className="hover:text-primary">linkedin.com/in/nikhil-r-50335a393</a></p>
              <p><span className="block text-xs text-muted-foreground">GitHub</span><a href={GITHUB} target="_blank" rel="noreferrer" className="hover:text-primary">github.com</a></p>
              <p><span className="block text-xs text-muted-foreground">Location</span>Miyapur, Hyderabad, Telangana</p>
            </address>
            <form onSubmit={onSubmit} noValidate className="glass reveal space-y-4 p-6">
              {(["name", "email"] as const).map((f) => (
                <div key={f}>
                  <label htmlFor={f} className="mb-1 block text-sm capitalize">{f}</label>
                  <input id={f} name={f} type={f === "email" ? "email" : "text"} maxLength={f === "email" ? 255 : 100} className="w-full rounded-lg border border-input bg-background/40 px-4 py-2.5 outline-none focus:border-primary" />
                  {errors[f] && <p className="mt-1 text-xs text-destructive">{errors[f]}</p>}
                </div>
              ))}
              <div>
                <label htmlFor="message" className="mb-1 block text-sm">Message</label>
                <textarea id="message" name="message" rows={5} maxLength={1000} className="w-full rounded-lg border border-input bg-background/40 px-4 py-2.5 outline-none focus:border-primary" />
                {errors["message"] && <p className="mt-1 text-xs text-destructive">{errors["message"]}</p>}
              </div>
              <button type="submit" className={btnPrimary}>Send Message</button>
              {sent && <p className="text-sm text-primary">{sent}</p>}
            </form>
          </div>
        </Section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Nikhil Revuru · Built with care in Hyderabad
      </footer>
    </>
  );
}
