"use client";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { heroContent } from "@/lib/content";
import MagneticButton from "@/components/shared/MagneticButton";

export default function Hero() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
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

        <motion.p
          className="text-muted text-base sm:text-lg max-w-xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {heroContent.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <MagneticButton
            as="a"
            href={heroContent.cta.href}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-espresso font-semibold text-base rounded-full hover:bg-amber transition-colors duration-200"
          >
            {heroContent.cta.label}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Floating food images with parallax */}
      {!prefersReduced && (
        <>
          <motion.div
            className="absolute top-[15%] left-[5%] w-28 sm:w-40 md:w-52 rounded-3xl overflow-hidden shadow-2xl opacity-60 hidden md:block"
            style={{ y: y1 }}
          >
            <Image
              src="/images/food-samosa.jpg"
              alt="Crispy samosas"
              width={208}
              height={208}
              className="object-cover w-full h-full"
            />
          </motion.div>

          <motion.div
            className="absolute bottom-[20%] right-[5%] w-24 sm:w-36 md:w-44 rounded-3xl overflow-hidden shadow-2xl opacity-50 hidden md:block"
            style={{ y: y2 }}
          >
            <Image
              src="/images/food-panipuri.jpg"
              alt="Pani Puri"
              width={176}
              height={176}
              className="object-cover w-full h-full"
            />
          </motion.div>

          <motion.div
            className="absolute top-[40%] right-[8%] w-20 sm:w-28 md:w-36 rounded-3xl overflow-hidden shadow-2xl opacity-40 hidden lg:block"
            style={{ y: y3 }}
          >
            <Image
              src="/images/food-chaat.jpg"
              alt="Papdi Chaat"
              width={144}
              height={144}
              className="object-cover w-full h-full"
            />
          </motion.div>
        </>
      )}

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="eyebrow text-cream/60 text-[10px]">
          {heroContent.scrollText}
        </span>
        <div className="scroll-indicator">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(250,245,239,0.5)" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
