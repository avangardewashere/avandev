import type { Metadata } from "next";
import { ABOUT, CONTACT, HERO, SKILLS, STATS, TIMELINE } from "@/features/portfolio/data";

export const metadata: Metadata = {
  title: "Avel Panaligan — Résumé",
  robots: { index: false, follow: false },
};

/**
 * Print-optimised one-pager. Reads from the same `data.ts` as the
 * landing page so the source of truth stays single. Open `/print`
 * and Cmd/Ctrl-P to export to PDF.
 */
export default function PrintResume() {
  return (
    <main className="print">
      <header className="print__head">
        <div>
          <h1 className="print__name">Avel Panaligan</h1>
          <div className="print__title">Frontend Engineer · Metro Manila</div>
        </div>
        <div className="print__contact">
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <a href={CONTACT.github}>{CONTACT.githubLabel}</a>
          <span>{CONTACT.linkedinLabel}</span>
        </div>
      </header>

      <section className="print__section">
        <h2>Profile</h2>
        <p>{HERO.sub}</p>
        <p>{ABOUT.body[0]}</p>
      </section>

      <section className="print__section">
        <h2>At a glance</h2>
        <ul className="print__stats">
          {STATS.map((s, i) => (
            <li key={i}>
              <b>
                {s.count}
                {s.suffix ?? ""}
              </b>{" "}
              <span>{s.label.replace(/\n/g, " ")}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="print__section">
        <h2>Skills</h2>
        <dl className="print__skills">
          {SKILLS.map((row) => (
            <div key={row.title}>
              <dt>{row.title}</dt>
              <dd>{row.pills.map((p) => p.label).join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="print__section">
        <h2>Experience</h2>
        <ul className="print__timeline">
          {[...TIMELINE].reverse().map((stop) => (
            <li key={stop.company}>
              <div className="print__timeline-row">
                <b>{stop.company}</b>
                <span>{stop.year}</span>
              </div>
              <div className="print__timeline-role">{stop.role}</div>
            </li>
          ))}
        </ul>
      </section>

      <section className="print__section">
        <h2>Currently</h2>
        <p>{ABOUT.current}</p>
      </section>
    </main>
  );
}
