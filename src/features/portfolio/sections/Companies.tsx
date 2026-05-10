import { TIMELINE } from "../data";

export function Companies() {
  return (
    <section className="companies" id="companies" data-screen-label="05 Path">
      <div className="container">
        <div className="companies__head">
          <div className="section-eyebrow gs-reveal">The path so far</div>
          <h2 className="gs-reveal">
            Six years, six teams. Each one taught me something the next one could lean on.
          </h2>
          <p className="gs-reveal">
            From a junior dev role at an e-learning startup to leading a Vue-to-React migration in
            fintech-adjacent gaming — the line between them is the part I&apos;m proud of.
          </p>
        </div>
        <div className="timeline gs-reveal">
          <div className="timeline__line" />
          <div className="timeline__progress" id="timelineProgress" />
          <div className="timeline__stops">
            {TIMELINE.map((stop) => (
              <div key={stop.company} className={stop.isNow ? "stop is-now" : "stop"}>
                <div className="stop__year">{stop.year}</div>
                <div className="stop__node" />
                <div className="stop__company">{stop.company}</div>
                <div className="stop__role">{stop.role}</div>
                {stop.isNow && <div className="stop__tag">Currently</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
