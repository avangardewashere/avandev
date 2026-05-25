"use client";

import { Nav } from "../sections/Nav";
import { Hero } from "../sections/Hero";
import { About } from "../sections/About";
import { Skills } from "../sections/Skills";
import { Projects } from "../sections/Projects";
import { ClientWork } from "../sections/ClientWork";
import { Companies } from "../sections/Companies";
import { Contact } from "../sections/Contact";
import { usePortfolioViewModel } from "../viewmodels/usePortfolioViewModel";

/**
 * The whole portfolio composed in one place. Each section is pure
 * presentation; the ViewModel hook owns every GSAP timeline and runs
 * once on mount.
 */
export function PortfolioView() {
  usePortfolioViewModel();

  return (
    <>
      <Nav />
      <div className="scroll-dot on-dawn" id="scrollDot" />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ClientWork />
      <Companies />
      <Contact />
    </>
  );
}
