import { HERO } from "../data";

export function Hero() {
  return (
    <section className="hero" id="top" data-screen-label="01 Hero">
      <div className="hero__bg" id="heroBg" />
      <div className="hero__stars" id="heroStars" />
      <div className="hero__sun" id="heroSun" />

      <div className="hero__inner container">
        <div>
          <div className="hero__eyebrow">
            <span className="hero__pulse" />
            {HERO.eyebrow}
          </div>

          <h1 className="hero__title" id="heroTitle">
            <span className="line">
              {HERO.titleWords.map((w, i) => (
                <span key={i} className="word">
                  {w.accent ? <span className="accent">{w.text}</span> : w.text}
                </span>
              ))}
            </span>
          </h1>

          <p className="hero__sub" id="heroSub">
            {HERO.sub}
          </p>

          <div className="hero__meta" id="heroMeta">
            {HERO.meta.map((m) => (
              <span key={m}>
                <i />
                {m}
              </span>
            ))}
          </div>
        </div>

        <div className="hero__bottom" id="heroBottom">
          <div className="hero__scroll">
            <span>Scroll</span>
            <div className="hero__scroll-line" />
          </div>
          <div className="hero__client-strip">
            Trusted into production at
            <br />
            <span>{HERO.clientStrip}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
