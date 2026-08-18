"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { menuItems } from "@/lib/content";
import SectionReveal from "@/components/shared/SectionReveal";
import MagneticButton from "@/components/shared/MagneticButton";

export default function MenuShowcase() {
  const scrollRef = useRef(null);

  return (
    <section id="menu" className="relative py-24 md:py-36 bg-espresso-deep overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <SectionReveal>
              <span className="eyebrow text-gold mb-3 block">OUR MENU</span>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">
                A Taste of <span className="text-gold">Tradition</span>
              </h2>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <p className="text-muted text-lg mt-4 max-w-lg">
                From steaming chai to crispy chaats — every dish is crafted with
                fresh ingredients, traditional methods, and a dash of innovation.
              </p>
            </SectionReveal>
          </div>
          <SectionReveal delay={0.3}>
            <MagneticButton
              as="a"
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gold text-gold rounded-full hover:bg-gold hover:text-espresso transition-all duration-300 text-sm font-semibold whitespace-nowrap"
            >
              View Full Menu
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </MagneticButton>
          </SectionReveal>
        </div>
      </div>

      {/* Horizontal scroll carousel */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-6 lg:px-10 pb-6 menu-scroll snap-x snap-mandatory"
        style={{ scrollbarWidth: "thin" }}
      >
        {menuItems.map((item, i) => (
          <motion.div
            key={item.id}
            className="shrink-0 w-[320px] sm:w-90 snap-center group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div className="relative rounded-2xl overflow-hidden bg-espresso border border-white/5 hover:border-gold/30 transition-all duration-500">
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="360px"
                />
                <div className="absolute inset-0 bg-linear-to-t from-espresso/80 to-transparent" />
                {/* Tag badge */}
                <span className="absolute top-4 left-4 px-3 py-1 bg-gold/90 text-espresso text-xs font-bold rounded-full uppercase tracking-wider">
                  {item.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-xl font-semibold text-cream">
                    {item.title}
                  </h3>
                  <span className="text-gold font-bold text-lg">{item.price}</span>
                </div>
                <p className="text-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
