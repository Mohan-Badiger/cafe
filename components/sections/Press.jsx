"use client";

import { pressMentions } from "@/lib/content";
import SectionReveal from "@/components/shared/SectionReveal";

export default function Press() {
  return (
    <section className="py-24 md:py-36 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionReveal>
          <span className="eyebrow text-amber block text-center mb-3">
            IN THE PRESS
          </span>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-espresso text-center mb-16">
            What They're <span className="text-amber">Saying</span>
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pressMentions.map((item, i) => (
            <SectionReveal key={i} delay={0.1 + i * 0.1}>
              <a
                href={item.link}
                className="group block p-8 rounded-2xl bg-warm border border-espresso/5 hover:border-gold/30 hover:shadow-xl transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-amber font-bold text-sm uppercase tracking-wider">
                    {item.publication}
                  </span>
                  <span className="text-espresso/30">•</span>
                  <span className="text-espresso/40 text-sm">{item.date}</span>
                </div>

                <h3 className="font-serif text-xl font-semibold text-espresso mb-3 group-hover:text-amber transition-colors">
                  {item.headline}
                </h3>

                <p className="text-espresso/60 text-sm leading-relaxed mb-4">
                  {item.excerpt}
                </p>

                <span className="inline-flex items-center gap-2 text-sm font-medium text-amber group-hover:gap-3 transition-all">
                  Read Article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </a>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
