"use client";
import { awards } from "@/lib/content";

export default function Awards() {
  const doubled = [...awards, ...awards];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-warm overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-8 sm:mb-10">
        <span className="eyebrow text-amber block text-center">
          AWARDS & RECOGNITION
        </span>
      </div>

      {/* Infinite marquee */}
      <div className="relative overflow-hidden" role="region" aria-label="Awards and recognition ticker">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-24 bg-linear-to-r from-warm to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-24 bg-linear-to-l from-warm to-transparent z-10 pointer-events-none" />

        <div className="marquee-track">
          {doubled.map((award, i) => (
            <div
              key={i}
              className="shrink-0 mx-4 sm:mx-8 flex items-center gap-2.5 sm:gap-3"
              aria-hidden={i >= awards.length ? "true" : undefined}
            >
              {/* Award icon */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <span className="text-espresso font-semibold text-base sm:text-lg whitespace-nowrap">
                {award}
              </span>
              <span className="text-gold text-xl sm:text-2xl">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
