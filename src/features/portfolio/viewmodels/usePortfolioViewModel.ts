"use client";

import { useEffect } from "react";

/**
 * Portfolio ViewModel — owns every side effect that talks to the DOM
 * or `window`. Mirrors the IIFE in the original `portfolio-anim.js`,
 * but as a React effect so unmounting the page kills every
 * ScrollTrigger we created.
 *
 * Sections themselves stay pure — they just emit the markup with the
 * IDs / classes the timelines look up by selector. Feels old-fashioned
 * for React, but it's the cleanest way to lift a finished GSAP
 * choreography without rewriting the timeline graph against refs.
 */
export function usePortfolioViewModel() {
  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");
      if (cancelled) return;

      // ---------- Char-split utility for hero title ----------
      function splitChars(el: Element) {
        el.querySelectorAll(".word").forEach((word) => {
          const inner =
            word.firstChild && word.firstChild.nodeType === 1
              ? (word.firstChild as HTMLElement)
              : (word as HTMLElement);
          const text = inner.textContent ?? "";
          inner.textContent = "";
          [...text].forEach((c) => {
            const span = document.createElement("span");
            span.className = "char";
            span.textContent = c === " " ? " " : c;
            inner.appendChild(span);
          });
        });
      }

      // ---------- HERO entrance ----------
      const heroTitle = document.getElementById("heroTitle");
      if (heroTitle) splitChars(heroTitle);
      const chars = heroTitle?.querySelectorAll(".char") ?? [];

      gsap.set(chars, { yPercent: 110, opacity: 0 });
      gsap.set(["#heroSub", "#heroMeta", "#heroBottom"], { y: 24, opacity: 0 });
      gsap.set(".hero__eyebrow", { y: -12, opacity: 0 });

      const introTl = gsap.timeline({ delay: 0.15 });
      introTl
        .to(".hero__eyebrow", { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
        .to(chars, { yPercent: 0, opacity: 1, duration: 1.0, ease: "power4.out", stagger: 0.018 }, "-=0.35")
        .to("#heroSub", { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.55")
        .to("#heroMeta", { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.45")
        .to("#heroBottom", { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.45");

      // ---------- NAV mode helpers ----------
      const nav = document.getElementById("nav");
      const scrollDot = document.getElementById("scrollDot");
      function setNavMode(mode: "dawn" | "canvas") {
        if (!nav) return;
        nav.classList.toggle("is-dawn", mode === "dawn");
        nav.classList.toggle("is-canvas", mode === "canvas");
        scrollDot?.classList.toggle("on-dawn", mode === "dawn" || mode === "canvas");
      }

      // ---------- HERO PIN ----------
      // NOTE: every tween here uses fromTo with the post-intro "rest" state as
      // its `from` so scrubbing back to progress 0 restores the hero copy even
      // though the intro timeline only ran once on mount.
      gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "+=140%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (self.progress > 0.55) setNavMode("canvas");
            else setNavMode("dawn");
          },
          onLeave: () => setNavMode("canvas"),
          onEnterBack: () => setNavMode("dawn"),
        },
      })
        .fromTo("#heroSun", { y: 0, scale: 1 }, { y: () => -window.innerHeight * 0.45, scale: 0.7, ease: "power1.inOut", immediateRender: false }, 0)
        .fromTo("#heroStars", { yPercent: 0, opacity: 1 }, { yPercent: -20, opacity: 0.3, ease: "none", immediateRender: false }, 0)
        .fromTo("#heroTitle", { yPercent: 0, opacity: 1 }, { yPercent: -30, opacity: 0.55, ease: "power2.in", immediateRender: false }, 0.35)
        .fromTo("#heroSub", { yPercent: 0, opacity: 1 }, { yPercent: -45, opacity: 0, ease: "power2.in", immediateRender: false }, 0.35)
        .fromTo("#heroMeta", { yPercent: 0, opacity: 1 }, { yPercent: -65, opacity: 0, ease: "power2.in", immediateRender: false }, 0.35)
        .fromTo("#heroBottom", { yPercent: 0, opacity: 1 }, { yPercent: 80, opacity: 0, ease: "power2.in", immediateRender: false }, 0.35)
        .to("#heroSun", { y: () => -window.innerHeight * 0.95, scale: 0.42, ease: "power2.inOut" }, 0.5)
        .fromTo("#heroBg", { opacity: 1 }, { opacity: 0.85, ease: "none", immediateRender: false }, 0.7)
        .to("#heroTitle", { opacity: 0, ease: "none" }, 0.85);

      // Contact section forces dawn nav state too
      ScrollTrigger.create({
        trigger: ".contact",
        start: "top 80px",
        end: "bottom bottom",
        onEnter: () => setNavMode("dawn"),
        onLeaveBack: () => setNavMode("canvas"),
      });

      // ---------- Reveal helpers ----------
      document.querySelectorAll(".gs-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          },
        );
      });

      // ---------- Stat counters ----------
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const target = parseInt(el.dataset.count ?? "0", 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });

      // ---------- Skills pill stagger ----------
      document.querySelectorAll(".skill-row").forEach((row) => {
        gsap.fromTo(
          row.querySelectorAll(".pill"),
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.04,
            scrollTrigger: { trigger: row, start: "top 85%" },
          },
        );
      });

      // ---------- Plan.it grid generation ----------
      const planGrid = document.getElementById("planGrid");
      if (planGrid && planGrid.querySelectorAll(".app-plan__day").length === 0) {
        const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
        const dates = [28, 29, 30, 1, 2, 3, 4];
        const blocks = [
          { day: 0, top: 8, h: 22, kind: "deep", label: "Deep work", sub: "7–10am" },
          { day: 0, top: 38, h: 8, kind: "meet", label: "Standup", sub: "11am" },
          { day: 1, top: 12, h: 14, kind: "meet", label: "Design sync", sub: "8–10am" },
          { day: 1, top: 32, h: 18, kind: "deep", label: "Plan.it v2", sub: "feature" },
          { day: 1, top: 56, h: 8, kind: "break", label: "Walk", sub: "" },
          { day: 2, top: 6, h: 26, kind: "deep", label: "Migration", sub: "Vue → React" },
          { day: 2, top: 40, h: 8, kind: "errand", label: "Errand", sub: "" },
          { day: 3, top: 10, h: 12, kind: "meet", label: "1:1 review", sub: "8:30" },
          { day: 3, top: 26, h: 22, kind: "deep", label: "WebSocket bug", sub: "lottoplay" },
          { day: 4, top: 8, h: 18, kind: "deep", label: "Case study", sub: "tallytappy" },
          { day: 4, top: 32, h: 10, kind: "personal", label: "Gym", sub: "" },
          { day: 5, top: 14, h: 16, kind: "personal", label: "Reading", sub: "long arc" },
          { day: 5, top: 36, h: 12, kind: "break", label: "Coffee", sub: "" },
          { day: 6, top: 18, h: 22, kind: "deep", label: "Side project", sub: "tinker" },
        ];
        days.forEach((d, i) => {
          const col = document.createElement("div");
          col.className = "app-plan__day";
          const isToday = i === 1;
          col.innerHTML = `
            <div class="app-plan__dayhead${isToday ? " is-today" : ""}">${d}<b>${dates[i]}</b></div>
            ${Array.from({ length: 16 }, () => '<div class="app-plan__slot"></div>').join("")}
          `;
          blocks
            .filter((b) => b.day === i)
            .forEach((b) => {
              const blk = document.createElement("div");
              blk.className = `app-plan__block blk-${b.kind}`;
              blk.style.top = `calc(28px + ${b.top}%)`;
              blk.style.height = `${b.h}%`;
              blk.innerHTML = `${b.label}${b.sub ? `<small>${b.sub}</small>` : ""}`;
              col.appendChild(blk);
            });
          planGrid.appendChild(col);
        });
      }

      // ---------- PROJECTS — pinned horizontal scroll ----------
      const track = document.getElementById("projectsTrack");
      const pinSection = document.getElementById("projectsPin");
      const hRailFill = document.getElementById("hRailFill");

      if (track && pinSection) {
        const setupHorizontalScroll = () => {
          const totalScrollWidth = track.scrollWidth;
          const viewportW = window.innerWidth;
          const moveDistance = totalScrollWidth - viewportW;
          if (moveDistance <= 0) return;

          gsap.to(track, {
            x: () => -moveDistance,
            ease: "none",
            scrollTrigger: {
              trigger: pinSection,
              start: "top top",
              end: () => `+=${moveDistance + window.innerHeight * 0.3}`,
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (hRailFill) {
                  hRailFill.style.width = (self.progress * 100).toFixed(2) + "%";
                }
              },
            },
          });

          document.querySelectorAll("[data-phone]").forEach((phone) => {
            gsap.fromTo(
              phone,
              { y: 60, rotateY: -8, opacity: 0 },
              {
                y: 0,
                rotateY: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: { trigger: phone, start: "top 75%" },
              },
            );
          });
        };
        requestAnimationFrame(setupHorizontalScroll);
      }

      // ---------- CLIENT WORK — pinned horizontal scroll ----------
      const cwTrack = document.getElementById("clientworkTrack");
      const cwPin = document.getElementById("clientworkPin");
      const cwRailFill = document.getElementById("hRailFillClient");

      if (cwTrack && cwPin) {
        const setupClientHorizontalScroll = () => {
          const totalScrollWidth = cwTrack.scrollWidth;
          const viewportW = window.innerWidth;
          const moveDistance = totalScrollWidth - viewportW;
          if (moveDistance <= 0) return;

          gsap.to(cwTrack, {
            x: () => -moveDistance,
            ease: "none",
            scrollTrigger: {
              trigger: cwPin,
              start: "top top",
              end: () => `+=${moveDistance + window.innerHeight * 0.3}`,
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (cwRailFill) {
                  cwRailFill.style.width = (self.progress * 100).toFixed(2) + "%";
                }
              },
            },
          });

          document.querySelectorAll("[data-client-card]").forEach((card) => {
            gsap.fromTo(
              card,
              { y: 40, opacity: 0, scale: 0.96 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: card, start: "top 80%" },
              },
            );
          });
        };
        requestAnimationFrame(setupClientHorizontalScroll);
      }

      // ---------- TallyTappy increment animation when in view ----------
      const tallyCards = document.querySelectorAll<HTMLElement>("[data-tally]");
      if (tallyCards.length) {
        ScrollTrigger.create({
          trigger: "#panelTally",
          start: "left 60%",
          onEnter: () => {
            tallyCards.forEach((card, i) => {
              const countEl = card.querySelector<HTMLElement>("[data-tally-count]");
              if (!countEl) return;
              const start = parseInt(countEl.textContent ?? "0", 10);
              countEl.textContent = "0";
              const obj = { v: 0 };
              gsap.to(obj, {
                v: start,
                duration: 1.2,
                delay: 0.3 + i * 0.1,
                ease: "power2.out",
                onUpdate: () => {
                  countEl.textContent = String(Math.round(obj.v));
                },
              });
            });
          },
          once: true,
        });
      }

      // ---------- Plan.it blocks fly-in when in view ----------
      ScrollTrigger.create({
        trigger: "#panelPlan",
        start: "left 60%",
        onEnter: () => {
          const blks = document.querySelectorAll(".app-plan__block");
          gsap.fromTo(
            blks,
            { opacity: 0, y: 8, scale: 0.92 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out", stagger: 0.04 },
          );
        },
        once: true,
      });

      // ---------- Timeline progress fill ----------
      const tlProgress = document.getElementById("timelineProgress");
      const stops = document.querySelectorAll<HTMLElement>(".stop");
      if (tlProgress) {
        gsap.to(tlProgress, {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline",
            start: "top 70%",
            end: "bottom 50%",
            scrub: 0.6,
            onUpdate: (self) => {
              const p = self.progress;
              stops.forEach((stop, i) => {
                const node = stop.querySelector<HTMLElement>(".stop__node");
                if (!node) return;
                const stopPoint = i / (stops.length - 1);
                if (p >= stopPoint - 0.02) {
                  node.style.background = "var(--color-emerald)";
                  node.style.borderColor = "var(--color-emerald)";
                }
              });
            },
          },
        });

        stops.forEach((stop, i) => {
          gsap.fromTo(
            stop,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: i * 0.05,
              ease: "power2.out",
              scrollTrigger: { trigger: ".timeline", start: "top 75%" },
            },
          );
        });
      }

      // ---------- Contact email pulse-grow on enter ----------
      gsap.fromTo(
        ".contact__email",
        { opacity: 0, scale: 0.92, letterSpacing: "0em" },
        {
          opacity: 1,
          scale: 1,
          letterSpacing: "-0.03em",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact__email-wrap", start: "top 80%" },
        },
      );

      // ---------- Smooth nav link scroll ----------
      const onAnchorClick = (e: Event) => {
        const link = e.currentTarget as HTMLAnchorElement;
        const id = link.getAttribute("href") ?? "";
        if (id.length <= 1) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        gsap.to(window, {
          duration: 1.0,
          scrollTo: { y: target as Element, offsetY: 64 },
          ease: "power3.inOut",
        });
      };
      const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
      anchors.forEach((a) => a.addEventListener("click", onAnchorClick));

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);

      cleanup = () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
        anchors.forEach((a) => a.removeEventListener("click", onAnchorClick));
        window.removeEventListener("load", onLoad);
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);
}
