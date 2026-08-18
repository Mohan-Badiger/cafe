"use client";

import { useRef, useEffect } from "react";
import { timeline } from "@/lib/content";

export default function Timeline() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let ctx;
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        const scrollWidth = track.scrollWidth - window.innerWidth;

        ctx = gsap.context(() => {
          gsap.to(track, {
            x: -scrollWidth,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 1,
              start: "top top",
              end: () => `+=${scrollWidth}`,
              invalidateOnRefresh: true,
            },
          });
        }, section);
      });
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative bg-espresso-deep overflow-hidden"
    >
      {/* Section header */}
      <div
        ref={trackRef}
        className="flex items-center h-screen"
        style={{ width: "fit-content" }}
      >
        {/* Intro slide */}
        <div className="shrink-0 w-screen h-full flex items-center justify-center px-6">
          <div className="text-center max-w-2xl">
            <span className="eyebrow text-gold block mb-4">OUR JOURNEY</span>
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-cream mb-6">
              The Road So <span className="text-gold">Far</span>
            </h2>
            <p className="text-muted text-lg">
              From a tiny street stall to a national movement — scroll to explore our timeline.
            </p>
            <div className="mt-8 flex items-center justify-center gap-2 text-gold">
              <span className="text-sm font-medium">Scroll to explore</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Timeline connector line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 z-0" />

        {/* Timeline items */}
        {timeline.map((item, i) => (
          <div
            key={item.year}
            className="shrink-0 w-screen h-full flex items-center justify-center px-6 relative"
          >
            <div
              className={`flex flex-col gap-6 max-w-lg ${i % 2 === 0 ? "items-start" : "items-end text-right"
                }`}
            >
              {/* Year */}
              <span className="font-serif text-8xl sm:text-9xl font-bold text-white/5">
                {item.year}
              </span>

              {/* Dot on timeline */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-4 h-4 rounded-full bg-gold shadow-[0_0_20px_rgba(212,168,83,0.5)]" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-cream mb-3">
                  {item.title}
                </h3>
                <p className="text-muted text-base leading-relaxed max-w-md">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
