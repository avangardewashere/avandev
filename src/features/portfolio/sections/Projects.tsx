import { PhoneFrame } from "../components/PhoneFrame";
import { TallyMock } from "../components/TallyMock";
import { PlanMock } from "../components/PlanMock";

export function Projects() {
  return (
    <section className="projects" id="projects" data-screen-label="04 Projects">
      <div className="container projects__heading">
        <div className="section-eyebrow gs-reveal">Selected work</div>
        <h2 className="gs-reveal">
          Two recent projects from the personal bench. Built end-to-end, shipped, written about.
        </h2>
        <p className="gs-reveal">
          Scroll horizontally — each one earns its weight differently. The shared spine is MVVM with a
          swappable repository, strict TypeScript, one new technology per build.
        </p>
      </div>

      <div className="projects__pin" id="projectsPin">
        <div className="projects__track" id="projectsTrack">
          {/* Intro panel */}
          <article className="projects__panel projects__panel--intro">
            <div className="projects__panel-num">
              Gallery <small>· Drag or scroll →</small>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 520 }}>
              <div className="section-eyebrow" style={{ color: "var(--color-emerald)" }}>
                Curated, not exhaustive
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
                Two apps from the bench.
                <br />
                <span style={{ color: "var(--color-emerald)" }}>Each had something to teach me.</span>
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--color-stone)", margin: 0 }}>
                Production work for Technicare, SNSoft, Lottoplay and others is under NDA — the technical
                write-ups for those live in the longer case studies. Below: the two open projects that
                taught me the patterns I now lean on for everything else.
              </p>
            </div>
          </article>

          {/* Project 01 — TallyTappy */}
          <article className="projects__panel" id="panelTally">
            <div className="projects__panel-num">
              01 / 02 <small>· Shipped 2025</small>
            </div>
            <div className="project-info">
              <div className="project-info__year">v1.0.0 · Solo build · Personal</div>
              <h3 className="project-info__title">
                TallyTappy<span className="dot" />
              </h3>
              <p className="project-info__hook">
                A clean, focused, no-friction tally tracker. Splash → guest → list → tap. Five screens,
                full CRUD, fully offline.
              </p>
              <p className="project-info__body">
                The baseline project that locked in the architecture I now reuse — MVVM with a TypeScript
                repository interface, two Zustand slices, one form for create/edit, defensive Zod parsing
                on every localStorage read. Tap <code>+</code> updates state synchronously; persistence
                is invisible.
              </p>
              <div className="project-info__chips">
                {["Next.js 16", "React 19", "TypeScript", "Zustand", "Zod + RHF", "Tailwind 4"].map((c) => (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ))}
              </div>
              <div className="project-info__links">
                <a href="#">Read the case study</a>
                <a href="#">GitHub</a>
              </div>
            </div>
            <div className="device-stage">
              <PhoneFrame>
                <TallyMock />
              </PhoneFrame>
            </div>
          </article>

          {/* Project 02 — Plan.it */}
          <article className="projects__panel" id="panelPlan">
            <div className="projects__panel-num">
              02 / 02 <small>· Shipped 2025</small>
            </div>
            <div className="project-info">
              <div className="project-info__year">v1.0.0 · Solo build · Personal</div>
              <h3 className="project-info__title">
                Plan<span className="dot dot--blue" />it
              </h3>
              <p className="project-info__hook">
                A weekly time-blocking calendar. Drop blocks onto a 15-minute grid and let your day fall
                into place.
              </p>
              <p className="project-info__body">
                The follow-up to TallyTappy. Same architectural spine, plus the new tech I wanted to
                learn end-to-end: <code>@dnd-kit</code> for accessible drag-and-drop. Seven droppables
                instead of 448, a 6-pixel activation distance to keep tap and drag from fighting, and a
                form keyed on identity so re-opening the sheet always shows fresh defaults.
              </p>
              <div className="project-info__chips">
                {["Next.js 16", "React 19", "@dnd-kit", "date-fns", "Zustand", "Material 3 tokens"].map(
                  (c) => (
                    <span key={c} className="chip">
                      {c}
                    </span>
                  ),
                )}
              </div>
              <div className="project-info__links">
                <a href="#">Read the case study</a>
                <a href="#">GitHub</a>
              </div>
            </div>
            <div className="device-stage">
              <PhoneFrame timeColor="#0F2A1E">
                <PlanMock />
              </PhoneFrame>
            </div>
          </article>

          {/* Outro panel */}
          <article className="projects__panel projects__panel--outro">
            <div className="projects__outro">
              <div
                className="section-eyebrow"
                style={{
                  color: "var(--color-emerald)",
                  justifyContent: "center",
                  display: "inline-flex",
                }}
              >
                More on the way
              </div>
              <h3>The bench keeps growing.</h3>
              <p>
                Next up: a longer write-up of the Lottoplay.ph WebSocket gaming suite, plus a small
                experiment in motion-driven onboarding. Most production work is under NDA, so the
                personal bench is where the architectural decisions stay legible.
              </p>
              <a href="#contact" className="nav__cta" style={{ display: "inline-block" }}>
                Talk about a project →
              </a>
            </div>
          </article>
        </div>

        <div className="h-rail">
          <div className="h-rail__fill" id="hRailFill" />
          <div className="h-rail__labels">
            <span>Bench</span>
            <span>TallyTappy</span>
            <span>Plan.it</span>
            <span>Next</span>
          </div>
        </div>
      </div>
    </section>
  );
}
