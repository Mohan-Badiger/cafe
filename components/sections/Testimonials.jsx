"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/content";
import SectionReveal from "@/components/shared/SectionReveal";

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < rating ? "#D4A853" : "none"}
          stroke="#D4A853"
          strokeWidth="2"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 md:py-36 bg-espresso">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <SectionReveal>
          <span className="eyebrow text-gold block text-center mb-3">
            GUEST REVIEWS
          </span>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-cream text-center mb-16">
            What Our Guests <span className="text-gold">Say</span>
          </h2>
        </SectionReveal>

        {/* Testimonial carousel */}
        <div className="relative min-h-70 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center mb-6">
                <StarRating rating={testimonials[current].rating} />
              </div>

              <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-cream/90 leading-relaxed mb-8 italic">
                &ldquo;{testimonials[current].text}&rdquo;
              </blockquote>

              <div>
                <p className="text-cream font-semibold text-lg">
                  {testimonials[current].name}
                </p>
                <p className="text-muted text-sm">
                  {testimonials[current].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current
                  ? "bg-gold w-8"
                  : "bg-white/20 hover:bg-white/40"
                }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
