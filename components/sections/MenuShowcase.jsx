"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { menuItems } from "@/lib/content";
import SectionReveal from "@/components/shared/SectionReveal";
import MagneticButton from "@/components/shared/MagneticButton";

export default function MenuShowcase() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = () => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = Array.from(container.children);
    if (cards.length === 0) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestCardIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestCardIndex = index;
      }
    });

    setActiveIndex(closestCardIndex);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", updateActiveIndex, { passive: true });
    return () => container.removeEventListener("scroll", updateActiveIndex);
  }, []);

  const scrollToCard = (index) => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = Array.from(container.children);
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const scrollCarousel = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const cards = Array.from(container.children);
    if (cards.length === 0) return;

    let targetIndex = activeIndex;
    if (direction === "next") {
      targetIndex = Math.min(activeIndex + 1, cards.length - 1);
    } else {
      targetIndex = Math.max(activeIndex - 1, 0);
    }

    scrollToCard(targetIndex);
  };

  return (
    <section id="menu" className="relative py-24 md:py-36 bg-espresso-deep overflow-hidden scroll-mt-24">
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
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
              <MagneticButton
                as="a"
                href="#locations"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border border-gold text-gold rounded-full hover:bg-gold hover:text-espresso transition-all duration-300 text-xs sm:text-sm font-semibold whitespace-nowrap"
              >
                View Full Menu
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </MagneticButton>

              {/* Navigation Arrows - Accessible on all screen sizes */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollCarousel("prev")}
                  disabled={activeIndex === 0}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/10 flex items-center justify-center text-cream hover:border-gold hover:text-gold transition-colors duration-300 cursor-pointer disabled:opacity-30"
                  aria-label="Previous menu items"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollCarousel("next")}
                  disabled={activeIndex === menuItems.length - 1}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/10 flex items-center justify-center text-cream hover:border-gold hover:text-gold transition-colors duration-300 cursor-pointer disabled:opacity-30"
                  aria-label="Next menu items"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>

      {/* Horizontal scroll carousel */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-6 lg:px-10 pb-4 menu-scroll snap-x snap-mandatory"
      >
        {menuItems.map((item, i) => (
          <motion.div
            key={item.id}
            className="shrink-0 w-72.5 sm:w-87.5 md:w-92.5 snap-center group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div className="relative rounded-2xl overflow-hidden bg-espresso/45 border border-white/5 group-hover:border-gold/30 hover:shadow-2xl transition-all duration-500 flex flex-col h-115 backdrop-blur-xs">
              {/* Image */}
              <div className="relative h-57.5 w-full overflow-hidden shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="370px"
                />
                <div className="absolute inset-0 bg-linear-to-t from-espresso to-transparent opacity-60" />
                {/* Tag badge */}
                <span className="absolute top-4 left-4 px-3 py-1 bg-gold/90 text-espresso text-[10px] font-bold rounded-full uppercase tracking-wider">
                  {item.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-xl font-semibold text-cream">
                      {item.title}
                    </h3>
                    <span className="text-gold font-bold text-lg">{item.price}</span>
                  </div>
                  <p className="text-muted text-sm leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Elegant card footer micro-interaction */}
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gold/80 font-semibold uppercase tracking-wider group-hover:text-gold transition-colors">Popular Bite</span>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-cream group-hover:border-gold group-hover:bg-gold group-hover:text-espresso transition-all duration-300">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Carousel Pagination & Mobile Swipe Helper */}
      <div className="mt-6 px-6 lg:px-10 max-w-7xl mx-auto flex items-center justify-between">
        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {menuItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollToCard(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === activeIndex
                  ? "w-8 bg-gold shadow-[0_0_10px_rgba(212,168,83,0.5)]"
                  : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              aria-label={`Go to ${item.title} (item ${i + 1} of ${menuItems.length})`}
            />
          ))}
        </div>

        {/* Swipe Helper Hint for Mobile */}
        <div className="flex items-center gap-2 text-gold/70 text-xs font-semibold tracking-wider uppercase select-none">
          <span className="hidden sm:inline">Use arrows or drag</span>
          <span className="sm:hidden">Swipe to browse</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-pulse">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
