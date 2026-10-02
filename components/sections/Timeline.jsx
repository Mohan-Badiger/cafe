"use client";

import { useRef, useEffect } from "react";
import { timeline } from "@/lib/content";
import SectionReveal from "@/components/shared/SectionReveal";

export default function Timeline() {
  const desktopContainerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let ctx;
    let isMounted = true;

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger")
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (!isMounted) return;

      gsap.registerPlugin(ScrollTrigger);

      const track = trackRef.current;
      const container = desktopContainerRef.current;
      if (!track || !container) return;

      // Use gsap.context scoped to the desktop inner container
      // Never pin the root <section> element to prevent React removeChild DOM conflicts on route unmount
      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
          gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: container,
              pin: true,
              scrub: 1,
              start: "top top",
              end: () => `+=${track.scrollWidth - window.innerWidth}`,
              invalidateOnRefresh: true,
            },
          });
        });
      }, desktopContainerRef);
    });

    return () => {
      isMounted = false;
      if (ctx) {
        ctx.revert();
      }
    };
  }, []);

  return (
    <section
      id="journey"
      className="relative bg-espresso-deep overflow-hidden scroll-mt-24"
    >
      {/* Mobile Vertical Timeline (< 768px) */}
      <div className="md:hidden px-6 py-20">
        <div className="text-center max-w-md mx-auto mb-14">
          <SectionReveal>
            <span className="eyebrow text-gold block mb-3">OUR JOURNEY</span>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="font-serif text-4xl font-bold text-cream mb-4">
              The Road So <span className="text-gold">Far</span>
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <p className="text-muted text-sm leading-relaxed">
              From a tiny street stall to a national movement — our journey through the years.
            </p>
          </SectionReveal>
        </div>

        {/* Vertical timeline items with connecting line */}
        <div className="relative max-w-md mx-auto pl-6 sm:pl-8">
          {/* Vertical gold connecting line */}
          <div className="absolute top-3 bottom-6 left-2 sm:left-3 w-0.5 bg-linear-to-b from-gold via-amber to-gold/20" />

          <div className="space-y-10">
            {timeline.map((item, i) => (
              <SectionReveal key={item.year} delay={i * 0.1}>
                <div className="relative group">
                  {/* Glowing timeline node */}
                  <div className="absolute -left-6 sm:-left-8 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-espresso border-2 border-gold flex items-center justify-center shadow-[0_0_12px_rgba(212,168,83,0.6)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  </div>

                  {/* Milestone Card */}
                  <div className="p-6 rounded-2xl bg-espresso/60 border border-white/10 group-hover:border-gold/30 transition-all duration-300 backdrop-blur-xs">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-gold/10 text-white border border-gold/20">
                        {item.year}
                      </span>
                      <span className="text-white/10 font-serif font-black text-3xl select-none">
                        #{i + 1}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-cream mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Horizontal Timeline (>= 768px) */}
      <div ref={desktopContainerRef} className="hidden md:block">
        {/* Timeline connector line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 z-0 pointer-events-none" />

        {/* Horizontal scroll track */}
        <div
          ref={trackRef}
          className="relative flex items-center h-screen"
          style={{ width: "fit-content" }}
        >
          {/* Intro slide */}
          <div className="shrink-0 w-screen h-full flex items-center justify-center px-10">
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

          {/* Timeline items */}
          {timeline.map((item, i) => (
            <div
              key={item.year}
              className="shrink-0 w-screen h-full flex items-center justify-center px-10 relative"
            >
              <div
                className={`flex flex-col gap-6 max-w-lg ${i % 2 === 0 ? "items-start" : "items-end text-right"
                  }`}
              >
                {/* Year */}
                <span className="font-serif text-8xl sm:text-9xl font-bold text-white">
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
      </div>
    </section>
  );
}
