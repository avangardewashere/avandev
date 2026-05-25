"use client";

import { useState } from "react";
import { CONTACT } from "../data";

/**
 * Top navigation. The dawn/canvas mode classes are toggled by the
 * ViewModel's GSAP ScrollTrigger callbacks (matching the `setNavMode()`
 * helper from portfolio-anim.js).
 *
 * On narrow viewports the link list collapses behind a hamburger
 * button — `is-open` is the CSS hook that slides the menu in.
 */
export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav is-dawn" id="nav" data-screen-label="Nav">
      <div className="container">
        <a href="#top" className="nav__brand" onClick={() => setOpen(false)}>
          <span className="nav__dot" id="navDot" />
          <span>Avel Panaligan</span>
        </a>

        <button
          type="button"
          className={open ? "nav__hamburger is-open" : "nav__hamburger"}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={open ? "nav__links is-open" : "nav__links"}>
          <a href="#about" onClick={() => setOpen(false)}>About</a>
          <a href="#skills" onClick={() => setOpen(false)}>Skills</a>
          <a href="#projects" onClick={() => setOpen(false)}>Work</a>
          <a href="#clientwork" onClick={() => setOpen(false)}>Client</a>
          <a href="#companies" onClick={() => setOpen(false)}>Path</a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="nav__cta"
            onClick={() => setOpen(false)}
          >
            Get in touch
          </a>
        </div>
      </div>
    </nav>
  );
}
