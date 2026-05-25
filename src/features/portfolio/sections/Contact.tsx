import { CONTACT } from "../data";

export function Contact() {
  return (
    <section className="contact" id="contact" data-screen-label="07 Contact">
      <div className="contact__bg" />
      <div className="contact__inner container">
        <div
          className="section-eyebrow contact__eyebrow gs-reveal"
          style={{ color: "var(--color-sage)" }}
        >
          Get in touch
        </div>
        <h2 className="contact__h gs-reveal">
          {CONTACT.headline} <em>Let&apos;s talk.</em>
        </h2>

        <div className="contact__email-wrap gs-reveal">
          <a className="contact__email" href={`mailto:${CONTACT.email}`}>
            {CONTACT.email}
          </a>
        </div>

        <div className="contact__row">
          <div className="contact__col gs-reveal">
            <h4>Direct</h4>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <span style={{ opacity: 0.7 }}>I read everything. I respond slowly.</span>
          </div>
          <div className="contact__col gs-reveal">
            <h4>Code</h4>
            <a href={CONTACT.github} target="_blank" rel="noreferrer">
              {CONTACT.githubLabel}
            </a>
            <span style={{ opacity: 0.7 }}>Personal projects + write-ups.</span>
          </div>
          <div className="contact__col gs-reveal">
            <h4>Network</h4>
            <a href={CONTACT.linkedin}>{CONTACT.linkedinLabel}</a>
            <span style={{ opacity: 0.7 }}>For the formal version.</span>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer__brand">
            <i /> Avel Panaligan · Frontend engineer
          </div>
          <div className="footer__meta">Built with Next.js · Manila, GMT+8 · 2026</div>
        </div>
      </footer>
    </section>
  );
}
