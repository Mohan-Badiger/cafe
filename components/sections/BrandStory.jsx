"use client";
import Image from "next/image";
import { brandStory } from "@/lib/content";
import SectionReveal from "@/components/shared/SectionReveal";
import MagneticButton from "@/components/shared/MagneticButton";

export default function BrandStory() {
  return (
    <section id="story" className="relative py-24 md:py-36 bg-cream overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <SectionReveal direction="left">
            <div className="relative rounded-3xl overflow-hidden aspect-3/4 shadow-2xl">
              <Image
                src={brandStory.image}
                alt="Inside Chaat & Chill Café"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </SectionReveal>

          {/* Text */}
          <div className="flex flex-col gap-6 lg:gap-8">
            <SectionReveal delay={0.1}>
              <span className="eyebrow text-amber">{brandStory.eyebrow}</span>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-espresso leading-tight">
                <span className="text-amber">Tradition</span> on a Plate,
                <br />
                Joy in Every Bite.
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.3}>
              <p className="text-lg text-espresso/70 leading-relaxed max-w-lg">
                {brandStory.description}
              </p>
            </SectionReveal>

            <SectionReveal delay={0.4}>
              <MagneticButton
                as="a"
                href={brandStory.cta.href}
                className="inline-flex items-center gap-3 text-espresso font-medium group w-fit"
              >
                <span className="border-b-2 border-amber pb-0.5 group-hover:border-gold transition-colors">
                  {brandStory.cta.label}
                </span>
                <span className="w-10 h-10 rounded-full border border-espresso/20 flex items-center justify-center group-hover:border-amber group-hover:bg-amber/10 transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </MagneticButton>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
