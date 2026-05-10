import { SKILLS } from "../data";

export function Skills() {
  return (
    <section className="skills" id="skills" data-screen-label="03 Skills">
      <div className="container">
        <div className="section-eyebrow gs-reveal">Skills</div>
        <h2
          className="gs-reveal"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            margin: "0 0 80px",
            maxWidth: 720,
          }}
        >
          Grouped by what I actually use them for. Hiring managers think in
          systems — so do I.
        </h2>
        <div className="skills__rows">
          {SKILLS.map((row) => (
            <div key={row.title} className="skill-row gs-reveal">
              <div className="skill-row__title">
                {row.title}
                <small>{row.small}</small>
              </div>
              <div className="skill-row__pills">
                {row.pills.map((p) => (
                  <span
                    key={p.label}
                    className={p.accent ? "pill pill--accent" : "pill"}
                  >
                    {p.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
