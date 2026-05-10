import { ABOUT, STATS } from "../data";

export function About() {
  return (
    <section className="about" id="about" data-screen-label="02 About">
      <div className="container">
        <div className="section-eyebrow gs-reveal">About</div>
        <div className="about__grid">
          <div>
            <p className="about__lede gs-reveal">
              I build software the way furniture is built —{" "}
              <em>slowly</em>, with the joints visible. Most of my work is web
              interfaces. Some of it is taking three tries to get there.
            </p>
            <div className="about__body gs-reveal">
              {ABOUT.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="about__current gs-reveal">
              <span className="pulse" />
              <span>
                <b>Currently:</b> {ABOUT.current}
              </span>
            </div>
          </div>

          <div className="stats" id="statsGrid">
            {STATS.map((s, i) => (
              <div
                key={i}
                className={s.accent ? "stat stat--accent" : "stat"}
              >
                <div className="stat__num">
                  <span data-count={s.count}>0</span>
                  {s.suffix && <span className="suffix">{s.suffix}</span>}
                </div>
                <div className="stat__label">
                  {s.label.split("\n").map((line, j, arr) => (
                    <span key={j}>
                      {line}
                      {j < arr.length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
