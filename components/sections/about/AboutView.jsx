"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { aboutPageContent } from "@/lib/content";
import SectionReveal from "@/components/shared/SectionReveal";
import MagneticButton from "@/components/shared/MagneticButton";

export default function AboutView() {
  const { hero, founders, ideology, values, sustainability, timeline } =
    aboutPageContent;

  return (
    <div className="bg-cream overflow-hidden text-espresso">
      {/* =====================================================================
          1. HERO SECTION — SOUL OF RAMESHWARAM
          ===================================================================== */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-espresso pt-28 pb-20">
        <div className="absolute inset-0 z-0">
          <Image
            src={hero.image}
            alt="The bustling live kitchen at The Rameshwaram Cafe"
            fill
            priority
            className="object-cover opacity-30 scale-105 transition-transform duration-1000"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-espresso/95 via-espresso/80 to-espresso" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs uppercase tracking-[0.25em] font-semibold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span>✨</span>
            <span>{hero.eyebrow}</span>
          </motion.div>

          <motion.h1
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-cream leading-[1.08] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            {hero.headline}
          </motion.h1>

          <motion.div
            className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md max-w-3xl mx-auto mb-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-xl sm:text-2xl md:text-3xl text-gold font-serif italic leading-relaxed">
              &ldquo;{hero.subheadline}&rdquo;
            </p>
          </motion.div>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-cream/80 max-w-2xl mx-auto leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {hero.description}
          </motion.p>

          {/* Key Stat Badges */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto pt-8 border-t border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            {hero.stats.map((stat, i) => (
              <div
                key={i}
                className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs text-center hover:border-gold/40 transition-colors"
              >
                <div className="text-3xl sm:text-4xl font-serif font-bold text-gold mb-1">
                  {stat.number}
                </div>
                <div className="text-xs uppercase tracking-wider text-muted font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          2. THE MINDS BEHIND THE MAGIC (FOUNDERS SPOTLIGHT)
          ===================================================================== */}
      <section className="py-24 md:py-36 bg-cream relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionReveal>
              <span className="eyebrow text-amber block mb-2 font-semibold">
                {founders.eyebrow}
              </span>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-espresso leading-tight mb-4">
                {founders.headline}
              </h2>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <p className="text-espresso/75 text-base sm:text-lg leading-relaxed">
                {founders.lead}
              </p>
            </SectionReveal>
          </div>

          {/* Founders Large Portrait Feature */}
          <div className="mb-16">
            <SectionReveal>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-16/10 sm:aspect-21/9 max-w-5xl mx-auto">
                <Image
                  src={founders.image}
                  alt="Raghavendra Rao and Divya Raghavendra Rao — Founders of The Rameshwaram Cafe"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
                <div className="absolute inset-0 bg-linear-to-t from-espresso/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-cream">
                  <div>
                    <span className="px-3.5 py-1 rounded-full bg-gold text-espresso text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                      Founding Visionaries
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                      Raghavendra Rao & Divya Raghavendra Rao
                    </h3>
                  </div>
                  <p className="text-sm font-serif italic text-cream/90 max-w-md">
                    &ldquo;When every guest is welcomed as God, food is no longer a business — it becomes our sacred offering.&rdquo;
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Detailed Founder Profiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {founders.members.map((member, idx) => (
              <SectionReveal key={idx} delay={0.15 + idx * 0.15}>
                <div className="h-full p-8 sm:p-10 rounded-3xl bg-white shadow-xl border border-espresso/5 flex flex-col justify-between hover:shadow-2xl transition-all duration-300">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-serif text-2xl font-bold text-espresso">
                          {member.name}
                        </h3>
                        <span className="text-sm font-semibold text-amber block mt-0.5">
                          {member.role}
                        </span>
                      </div>
                      <span className="w-10 h-10 rounded-full bg-gold/15 text-espresso font-serif font-bold flex items-center justify-center shrink-0">
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="mb-6 inline-block px-3 py-1 rounded-lg bg-cream border border-espresso/10 text-xs font-mono text-espresso/70">
                      {member.badge}
                    </div>

                    <p className="text-espresso/80 text-sm leading-relaxed mb-6">
                      {member.bio}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-espresso/10">
                    <p className="font-serif italic text-sm text-espresso/90">
                      &ldquo;{member.quote}&rdquo;
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. SACRED IDEOLOGY & DR. KALAM'S INSPIRATION
          ===================================================================== */}
      <section className="py-24 md:py-32 bg-espresso text-cream relative overflow-hidden">
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="absolute -left-24 -top-24 w-96 h-96 rounded-full bg-amber/5 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="p-8 sm:p-14 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
            <SectionReveal>
              <div className="text-center max-w-3xl mx-auto mb-10">
                <span className="eyebrow text-gold block mb-3 font-semibold">
                  {ideology.eyebrow}
                </span>
                <blockquote className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-cream leading-tight mb-4">
                  {ideology.kalamQuote}
                </blockquote>
                <cite className="text-gold text-sm sm:text-base font-medium tracking-wide not-italic block">
                  {ideology.kalamAuthor}
                </cite>
              </div>
            </SectionReveal>

            <div className="w-16 h-0.5 bg-gold/40 mx-auto mb-10" />

            <div className="space-y-6 text-cream/80 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
              {ideology.storyParagraphs.map((para, i) => (
                <SectionReveal key={i} delay={0.1 + i * 0.1}>
                  <p>{para}</p>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. SERVING YESTERDAY, TODAY & TOMORROW (CORE VALUES)
          ===================================================================== */}
      <section className="py-24 md:py-36 bg-cream relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionReveal>
              <span className="eyebrow text-amber block mb-2 font-semibold">
                {values.eyebrow}
              </span>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-espresso mb-4">
                {values.headline}
              </h2>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <p className="text-espresso/70 text-base sm:text-lg font-serif italic">
                &ldquo;{values.subheadline}&rdquo;
              </p>
            </SectionReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.items.map((val, idx) => (
              <SectionReveal key={val.id} delay={0.1 + idx * 0.1}>
                <div className="h-full p-8 rounded-3xl bg-white border border-espresso/5 shadow-lg hover:shadow-2xl hover:border-gold/40 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-gold/15 text-espresso font-serif font-bold text-xl flex items-center justify-center mb-6 group-hover:bg-gold transition-colors">
                      {idx + 1}
                    </div>
                    <span className="text-xs uppercase font-mono tracking-widest text-amber font-semibold block mb-2">
                      {val.tag}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-espresso mb-3 group-hover:text-amber transition-colors">
                      {val.title}
                    </h3>
                    <p className="text-espresso/75 text-sm leading-relaxed">
                      {val.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-espresso/5 text-xs text-espresso/40 flex items-center justify-between">
                    <span>Guiding Value</span>
                    <span className="text-gold font-semibold">★ Uncompromised</span>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. SUSTAINABILITY PLEDGE — FRESH. LOCAL. LEGENDARY.
          ===================================================================== */}
      <section className="py-24 md:py-36 bg-espresso-deep text-cream relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <SectionReveal>
                <span className="eyebrow text-gold font-semibold">
                  {sustainability.eyebrow}
                </span>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cream leading-tight">
                  {sustainability.headline}
                </h2>
              </SectionReveal>
              <SectionReveal delay={0.2}>
                <div className="inline-block px-4 py-2 rounded-xl bg-white/5 border border-gold/30 text-gold font-serif italic text-lg sm:text-xl">
                  {sustainability.tagline}
                </div>
              </SectionReveal>
              <SectionReveal delay={0.3}>
                <p className="text-muted text-base sm:text-lg leading-relaxed">
                  {sustainability.description}
                </p>
              </SectionReveal>
              <SectionReveal delay={0.4}>
                <div className="pt-4">
                  <MagneticButton
                    as={Link}
                    href="/menu"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-espresso font-semibold text-sm rounded-full hover:bg-cream hover:text-espresso transition-all duration-300 shadow-lg cursor-pointer"
                  >
                    <span>Taste The Pure Ghee Magic</span>
                    <span>↗</span>
                  </MagneticButton>
                </div>
              </SectionReveal>
            </div>

            {/* Right Pillars Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {sustainability.pillars.map((pillar, idx) => (
                <SectionReveal key={idx} delay={0.15 + idx * 0.1}>
                  <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/40 hover:bg-white/10 transition-all duration-300">
                    <span className="text-xs uppercase font-mono tracking-wider text-gold block mb-2 font-semibold">
                      {pillar.tag}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-cream mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. MILESTONE JOURNEY & EXPANSION TIMELINE
          ===================================================================== */}
      <section className="py-24 md:py-36 bg-cream relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionReveal>
              <span className="eyebrow text-amber block mb-2 font-semibold">
                THE ADDA EXPANSION
              </span>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-espresso mb-4">
                Milestones Along Our Journey
              </h2>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <p className="text-espresso/70 text-base sm:text-lg">
                From a humble standing counter in Bengaluru to an iconic breakfast benchmark across India and beyond.
              </p>
            </SectionReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {timeline.map((item, idx) => (
              <SectionReveal key={idx} delay={0.1 + idx * 0.1}>
                <div className="p-8 rounded-3xl bg-white border border-espresso/5 shadow-lg hover:shadow-xl hover:border-gold/40 transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-serif text-3xl sm:text-4xl font-bold text-amber">
                        {item.year}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-cream border border-espresso/10 text-xs font-mono text-espresso/70">
                        Milestone
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-espresso mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs uppercase font-semibold text-gold mb-4 tracking-wider">
                      {item.location}
                    </p>
                    <p className="text-espresso/75 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-16 text-center">
            <SectionReveal>
              <div className="p-8 sm:p-12 rounded-3xl bg-espresso text-cream max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
                <div className="text-left">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
                    Experience The Authentic Taste Today
                  </h3>
                  <p className="text-muted text-sm max-w-md">
                    Freshly stone-ground batters, steaming sambhar, and piping hot pure ghee dosas waiting for you.
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <MagneticButton
                    as={Link}
                    href="/menu"
                    className="px-7 py-3.5 bg-gold text-espresso font-bold text-sm rounded-full hover:bg-cream transition-colors cursor-pointer"
                  >
                    View Menu
                  </MagneticButton>
                  <MagneticButton
                    as={Link}
                    href="/contact"
                    className="px-6 py-3.5 border border-white/20 text-cream font-semibold text-sm rounded-full hover:border-gold hover:text-gold transition-colors cursor-pointer"
                  >
                    Find Nearest Adda
                  </MagneticButton>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
