import { CONTACT } from "../data";

/**
 * Top navigation. Pure presentation — the dawn/canvas mode classes are
 * toggled by the ViewModel's GSAP ScrollTrigger callbacks (matching the
 * `setNavMode()` helper from portfolio-anim.js).
 */
export function Nav() {
  return (
    <nav className="nav is-dawn" id="nav" data-screen-label="Nav">
      <div className="nav__sun" aria-hidden />
      <div className="container">
        <a href="#top" className="nav__brand">
          <span className="nav__dot" id="navDot" />
          <span>Avel Panaligan</span>
        </a>
        <div className="nav__links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Work</a>
          <a href="#companies">Path</a>
          <a href={`mailto:${CONTACT.email}`} className="nav__cta">
            Get in touch
          </a>
        </div>
      </div>
    </nav>
  );
}
