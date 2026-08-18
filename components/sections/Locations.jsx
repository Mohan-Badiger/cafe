"use client";

import { locations } from "@/lib/content";
import SectionReveal from "@/components/shared/SectionReveal";
import MagneticButton from "@/components/shared/MagneticButton";

export default function Locations() {
  return (
    <section id="locations" className="py-24 md:py-36 bg-warm">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionReveal>
          <span className="eyebrow text-amber block text-center mb-3">
            FIND US
          </span>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-espresso text-center mb-16">
            Our <span className="text-amber">Locations</span>
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc, i) => (
            <SectionReveal key={i} delay={0.1 + i * 0.1}>
              <div className="p-6 rounded-2xl bg-cream border border-espresso/5 hover:border-gold/30 hover:shadow-lg transition-all duration-500 h-full flex flex-col">
                {/* Location icon */}
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>

                <h3 className="font-serif text-xl font-bold text-espresso mb-2">
                  {loc.name}
                </h3>
                <p className="text-espresso/60 text-sm leading-relaxed mb-2">
                  {loc.address}
                </p>
                <p className="text-espresso/50 text-sm mb-1">
                  <span className="font-medium text-espresso/70">Hours:</span>{" "}
                  {loc.hours}
                </p>
                <p className="text-espresso/50 text-sm mb-6">
                  <span className="font-medium text-espresso/70">Phone:</span>{" "}
                  {loc.phone}
                </p>

                <div className="mt-auto">
                  <MagneticButton
                    as="a"
                    href={loc.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-amber hover:text-gold transition-colors"
                  >
                    Get Directions
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </MagneticButton>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
