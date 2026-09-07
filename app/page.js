"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import BrandStory from "@/components/sections/BrandStory";
import Philosophy from "@/components/sections/Philosophy";
import MenuShowcase from "@/components/sections/MenuShowcase";
import Awards from "@/components/sections/Awards";
import Press from "@/components/sections/Press";
import Locations from "@/components/sections/Locations";
import Testimonials from "@/components/sections/Testimonials";

// Timeline uses GSAP ScrollTrigger — lazy-load for performance
const Timeline = dynamic(
  () => import("@/components/sections/Timeline"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <Hero />
      <BrandStory />
      <Philosophy />
      <MenuShowcase />
      <Awards />
      <Press />
      <div key="timeline-boundary">
        <Timeline />
      </div>
      <Locations />
      <Testimonials />
    </>
  );
}

