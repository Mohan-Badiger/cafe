"use client";

import { useEffect, useRef } from "react";

export default function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let lenis;
    let tickerCallback;
    let gsapInstance;
    let isMounted = true;

    Promise.all([
      import("@studio-freight/lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger")
    ]).then(([lenisMod, gsapMod, scrollTriggerMod]) => {
      if (!isMounted) return;

      const Lenis = lenisMod.default;
      const { gsap } = gsapMod;
      const { ScrollTrigger } = scrollTriggerMod;

      gsapInstance = gsap;
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      // Synchronize ScrollTrigger updates with Lenis scroll
      lenis.on("scroll", ScrollTrigger.update);

      // Drive Lenis scroll ticks from GSAP's ticker
      tickerCallback = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
    });

    return () => {
      isMounted = false;
      if (lenis) lenis.destroy();
      if (gsapInstance && tickerCallback) {
        gsapInstance.ticker.remove(tickerCallback);
      }
    };
  }, []);

  return <>{children}</>;
}
