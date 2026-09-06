"use client";
import { locations } from "@/lib/content";
import { useBooking } from "@/lib/BookingContext";
import SectionReveal from "@/components/shared/SectionReveal";
import MagneticButton from "@/components/shared/MagneticButton";

export default function Locations() {
  const { openBooking } = useBooking();

  const cityWatermarks = {
    "Chat and Chill, Jamakhandi": "JM",
    "Shrishailam, Rabakavi": "RK",
  };

  return (
    <section id="locations" className="py-24 md:py-36 bg-warm scroll-mt-24">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {locations.map((loc, i) => (
            <SectionReveal key={i} delay={0.1 + i * 0.1}>
              <div className="relative overflow-hidden p-8 rounded-2xl bg-cream/35 border border-espresso/5 hover:border-gold/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.03)] transition-all duration-500 h-full flex flex-col backdrop-blur-xs group">

                {/* Minimal animated top gold line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out" />

                {/* City watermark in background */}
                <span className="absolute -top-4 -right-2 text-8xl font-sans font-black text-espresso/2 group-hover:text-espresso/5 transition-colors duration-500 select-none pointer-events-none tracking-tighter">
                  {cityWatermarks[loc.name] || "CC"}
                </span>

                {/* Locator pin icon */}
                <div className="w-12 h-12 rounded-full bg-gold/5 flex items-center justify-center mb-6 shrink-0 group-hover:bg-gold/10 transition-all duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-espresso mb-1">
                      {loc.name.split(",")[0]}
                    </h3>
                    <span className="text-xs font-semibold uppercase text-gold tracking-wider block mb-4">
                      {loc.name.split(",")[1]?.trim()}
                    </span>

                    <p className="text-espresso/70 text-sm leading-relaxed mb-8">
                      {loc.address}
                    </p>
                  </div>

                  {/* Operational Details */}
                  <div className="space-y-3.5 mb-8 pt-5 border-t border-espresso/5">
                    <div className="flex items-center text-espresso/60 text-xs">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2.5 text-amber/70 shrink-0">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>{loc.hours}</span>
                    </div>
                    <div className="flex items-center text-espresso/60 text-xs">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2.5 text-amber/70 shrink-0">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span>{loc.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex flex-col gap-3.5">
                  <button
                    onClick={() => openBooking(loc.name)}
                    className="w-full text-center py-3.5 bg-espresso text-cream hover:bg-gold hover:text-espresso font-bold text-xs rounded-full transition-all duration-300 cursor-pointer shadow-md uppercase tracking-wider"
                  >
                    Book a Table
                  </button>

                  <a
                    href={loc.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-espresso/40 hover:text-amber transition-colors uppercase tracking-wider"
                  >
                    Get Directions
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
