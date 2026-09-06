"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { philosophy } from "@/lib/content";

export default function Philosophy() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const words = philosophy.statement.split(" ");

  return (
    <section
      id="philosophy"
      ref={ref}
      className="relative py-32 md:py-48 overflow-hidden scroll-mt-24"
    >
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        <Image
          src={philosophy.backgroundImage}
          alt="Indian street food market"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-espresso/85" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <motion.span
          className="eyebrow text-gold block mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {philosophy.eyebrow}
        </motion.span>

        <p className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug text-cream/90 font-medium">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em]"
              initial={{ opacity: prefersReduced ? 1 : 0.08 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{
                duration: 0.5,
                delay: prefersReduced ? 0 : i * 0.04,
                ease: "easeOut",
              }}
            >
              {word}
            </motion.span>
          ))}
        </p>
      </div>
    </section>
  );
}
