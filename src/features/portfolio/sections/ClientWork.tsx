import { EMPLOYMENT } from "../data";

export function ClientWork() {
  return (
    <section className="clientwork" id="clientwork" data-screen-label="05 Client work">
      <div className="container clientwork__heading">
        <div className="section-eyebrow gs-reveal">Employment & client work</div>
        <h2 className="gs-reveal">
          Eight shipped engagements across casino, fintech, mini programs and reservations.
        </h2>
        <p className="gs-reveal">
          Most of this is under NDA, so each panel is a short credentials plate — what shipped, what
          it ran on, what I owned. Scroll horizontally to walk the wall.
        </p>
      </div>

      <div className="clientwork__pin" id="clientworkPin">
        <div className="clientwork__track" id="clientworkTrack">
          {/* Intro panel */}
          <article className="clientwork__panel clientwork__panel--intro">
            <div className="clientwork__panel-num">
              Wall <small>· Drag or scroll →</small>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 520 }}>
              <div className="section-eyebrow" style={{ color: "var(--color-emerald)" }}>
                Production work · NDA-friendly
              </div>
              <h3
                style={{
                  fontSize: "clamp(2rem, 3.4vw, 2.75rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  margin: 0,
                }}
              >
                Eight engagements.
                <br />
                <span style={{ color: "var(--color-emerald)" }}>Each one a different ship date.</span>
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--color-stone)", margin: 0 }}>
                From casino webs to a Swedish booking site, a Telegram payments bot, and the legacy
                PHP that quietly powered ExpressPay branches nationwide — short, credentialed plates
                rather than long write-ups.
              </p>
            </div>
          </article>

          {/* Employment panels */}
          {EMPLOYMENT.map((proj) => (
            <article
              key={proj.name}
              className="clientwork__panel"
              data-accent={proj.accent ?? "emerald"}
            >
              <div className="clientwork__panel-num">
                {proj.index}
                {proj.year ? <small>· {proj.year}</small> : null}
              </div>
              <div className="project-info">
                <div className="project-info__year">{proj.kicker}</div>
                <h3 className="project-info__title">
                  {proj.name}
                  <span
                    className={
                      proj.accent === "blue"
                        ? "dot dot--blue"
                        : proj.accent === "stone"
                        ? "dot dot--stone"
                        : "dot"
                    }
                  />
                </h3>
                <p className="project-info__hook">{proj.hook}</p>
                <div className="project-info__chips">
                  {proj.chips.map((c) => (
                    <span key={c} className="chip">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="client-stage">
                <div className="client-card" data-client-card>
                  <div className="client-card__stripe" />
                  <div className="client-card__mark">{proj.name}</div>
                  <div className="client-card__kicker">{proj.kicker}</div>
                  <ul className="client-card__bullets">
                    {proj.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <div className="client-card__corner" aria-hidden>
                    {proj.index.split(" ")[0]}
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* Outro panel */}
          <article className="clientwork__panel clientwork__panel--outro">
            <div className="clientwork__outro">
              <div
                className="section-eyebrow"
                style={{
                  color: "var(--color-emerald)",
                  justifyContent: "center",
                  display: "inline-flex",
                }}
              >
                That's the wall
              </div>
              <h3>The personal bench is where the architectural decisions stay legible.</h3>
              <p>
                Production work is under NDA — the patterns behind these eight engagements live in
                the two personal projects above and in the case studies. Want to dig in?
              </p>
              <a href="#contact" className="nav__cta" style={{ display: "inline-block" }}>
                Talk about a project →
              </a>
            </div>
          </article>
        </div>

        <div className="h-rail">
          <div className="h-rail__fill" id="hRailFillClient" />
          <div className="h-rail__labels">
            <span>Wall</span>
            <span>OKFUN</span>
            <span>Casino+</span>
            <span>GCash</span>
            <span>Web</span>
            <span>Mini</span>
            <span>Migration</span>
            <span>Malmö</span>
            <span>ExpressPay</span>
            <span>End</span>
          </div>
        </div>
      </div>
    </section>
  );
}
