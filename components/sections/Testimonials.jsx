"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/content";
import SectionReveal from "@/components/shared/SectionReveal";

function StarRating({ rating }) {
  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      <span className="sr-only">{rating} out of 5 stars</span>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={i < rating ? "#D4A853" : "none"}
          stroke="#D4A853"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isPlaying || isHovered || isFocused) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, isFocused]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      className="py-24 md:py-36 bg-espresso scroll-mt-24"
      aria-label="Guest Reviews"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
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

        {/* Testimonial carousel wrapper with hover/focus pause */}
        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer Testimonials"
        >
          {/* Card body with relative min-height */}
          <div className="relative min-h-75 flex items-center justify-center px-4 sm:px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className="text-center w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                aria-live="polite"
              >
                <div className="flex justify-center mb-6">
                  <StarRating rating={testimonials[current].rating} />
                </div>

                <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-cream/95 leading-relaxed mb-8 italic">
                  &ldquo;{testimonials[current].text}&rdquo;
                </blockquote>

                <div>
                  <p className="text-cream font-semibold text-lg">
                    {testimonials[current].name}
                  </p>
                  <p className="text-gold/80 text-sm font-medium">
                    {testimonials[current].location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 w-11 h-11 rounded-full border border-white/10 bg-espresso/80 backdrop-blur-xs flex items-center justify-center text-cream hover:border-gold hover:text-gold transition-all duration-300 cursor-pointer shadow-lg z-10"
            aria-label="Previous testimonial"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 w-11 h-11 rounded-full border border-white/10 bg-espresso/80 backdrop-blur-xs flex items-center justify-center text-cream hover:border-gold hover:text-gold transition-all duration-300 cursor-pointer shadow-lg z-10"
            aria-label="Next testimonial"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Controls: Play/Pause Toggle + Dots */}
        <div className="flex items-center justify-center gap-4 mt-12">
          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-gold hover:border-gold/50 transition-colors cursor-pointer"
            aria-label={isPlaying ? "Pause auto-rotation" : "Start auto-rotation"}
            title={isPlaying ? "Pause rotation" : "Play rotation"}
          >
            {isPlaying ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
            )}
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((item, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === current
                    ? "bg-gold w-8 shadow-[0_0_10px_rgba(212,168,83,0.5)]"
                    : "bg-white/20 hover:bg-white/40 w-2.5"
                }`}
                aria-label={`Go to testimonial by ${item.name} (${i + 1} of ${testimonials.length})`}
              />
            ))}
          </div>

          {/* Visual indicator when paused on hover/focus */}
          {(isHovered || isFocused) && isPlaying && (
            <span className="text-[11px] text-gold/60 uppercase tracking-widest hidden sm:inline">
              Paused on hover
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
