"use client";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { heroContent } from "@/lib/content";
import { useBooking } from "@/lib/BookingContext";
import MagneticButton from "@/components/shared/MagneticButton";

export default function Hero() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const { openBooking } = useBooking();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-espresso"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-chai.jpg"
          alt="Steaming masala chai with samosas"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-espresso/80 via-espresso/50 to-espresso/90" />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={prefersReduced ? {} : { opacity }}
      >
        <motion.p
          className="eyebrow text-gold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {heroContent.eyebrow}
        </motion.p>

        <motion.h1
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-cream leading-[0.95] mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {heroContent.headline}
        </motion.h1>

        <motion.p
          className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold/90 mb-4 italic"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {heroContent.subheadline}
        </motion.p>

      </motion.div>


    </section>
  );
}
