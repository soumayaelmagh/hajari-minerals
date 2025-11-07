"use client";

import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState } from "react";

const images = [
  "/hero/workers.jpeg",
  "/hero/mine.png",
  "/hero/port.png",
  "/hero/minerals.jpg",
  
];
const parent: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

const child: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
export default function HeroSection() {
  const [index, setIndex] = useState(0);
  //const prefersReduce = useReducedMotion();

  // Auto-advance background image
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);
 
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt="Hajari Minerals background"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Darken for legible overlay text */}
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero copy */}
      <motion.div
        className="relative z-10 flex h-full flex-col justify-center px-6 md:px-12 lg:px-24"
        variants={parent}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-semibold leading-tight text-white drop-shadow-lg"
          variants={child}
        >
          From the <span className="text-stone">Rich Heart of Africa</span> to Global Markets
        </motion.h1>

        <motion.p
          className="mt-6 text-lg text-white/80 leading-relaxed max-w-2xl drop-shadow"
          variants={child}
        >
          Hajari Minerals is a Sudanese mining and export company specializing in the
          extraction, processing, and global supply of industrial minerals.
          With a commitment to responsible sourcing and sustainable growth, we bridge
          Africa’s abundant resources with international markets.
        </motion.p>

        <motion.div className="mt-10 flex flex-wrap gap-4" variants={child}>
          <a
            href="/operations"
            className="inline-block rounded-lg bg-[#c2a165] border border-white/40 text-bgDark text-sm font-medium px-5 py-3  hover:border-white transition"
          >
            View Operations
          </a>
          <a
            href="/contact"
            className="inline-block rounded-lg border border-white/40 text-white text-sm font-medium px-5 py-3 hover:border-white transition"
          >
            Contact Us
          </a>
        </motion.div>
      </motion.div>

      {/* Subtle bottom fade into page background */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-bgDark/90 to-transparent" />
    </section>
  );
}
