"use client";

import { motion, Variants } from "framer-motion";
import { Gem, Pickaxe, Mountain, Shield } from "lucide-react";

export default function AboutSection() {
  const container: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        when: "beforeChildren",
        staggerChildren: 0.12,
      },
    },
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative w-full bg-linear-to-b from-black via-[#0b0b0b] to-[#0b0b0b] text-white py-28 px-6 md:px-12 lg:px-24 border-t border-white/10 overflow-hidden">
      {/* Subtle fade overlay (top gradient to blend from Hero) */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-linear-to-b from-black to-transparent z-0" />

      {/* Gold texture overlay (lazy loaded via CSS) */}
      <div className="absolute inset-0 opacity-10 bg-[url('/textures/gold-dust.jpg')] bg-cover bg-center bg-fixed pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto space-y-16 relative z-10"
      >
        {/* Section Title */}
        <motion.div variants={child} className="text-center max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-semibold text-[#c2a165] mb-4">
            Who We Are
          </h3>
          <p className="text-white/70 leading-relaxed text-base md:text-lg">
            <strong>Hajari Minerals</strong> is a Sudanese-owned mining and export company
            focused on the sustainable extraction, processing, and global distribution of
            high-quality minerals. Built on integrity, technical expertise, and strategic
            partnerships, we connect Sudan’s abundant geological resources to
            international industries with a commitment to excellence.
          </p>
        </motion.div>

        {/* Fade-in cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={child}
              whileHover={{
                scale: 1.04,
                rotate: 1,
                boxShadow: "0px 0px 25px rgba(194,161,101,0.3)",
              }}
              transition={{ type: "spring", stiffness: 220, damping: 14 }}
              className="relative bg-[#121212]/80 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-500 hover:border-[#c2a165]"
            >
              <div className="text-[#c2a165] mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold text-[#c2a165] mb-3">
                {card.title}
              </h3>
              {card.content}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom fade to transition into Operations section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent z-0" />
    </section>
  );
}

// 🪨 Card Data
const cards = [
  {
    title: "Our Vision",
    icon: <Mountain size={40} />,
    content: (
      <p className="text-white/70 leading-relaxed text-sm">
        To position Hajari Minerals as a leading, reliable, and ethical supplier of
        African minerals to global markets—driving sustainable development and
        contributing to Sudan’s economic growth.
      </p>
    ),
  },
  {
    title: "Our Mission",
    icon: <Pickaxe size={40} />,
    content: (
      <p className="text-white/70 leading-relaxed text-sm">
        To responsibly extract and export mineral resources through innovation,
        transparency, and disciplined operations while maintaining strong relationships
        with clients, local communities, and international partners.
      </p>
    ),
  },
  {
    title: "Core Values",
    icon: <Gem size={40} />,
    content: (
      <ul className="text-white/70 text-sm space-y-2 text-left">
        {[
          "Integrity — conducting business with honesty and fairness.",
          "Reliability — delivering consistent quality and long-term supply.",
          "Practicality — applying efficient, result-oriented methods.",
          "Accountability — taking responsibility for our commitments.",
          "Respect — promoting safety, diversity, and care for the environment.",
        ].map((value, i) => (
          <li key={i} className="flex items-start gap-2 leading-relaxed">
            {value}
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Our Commitment",
    icon: <Shield size={40} />,
    content: (
      <p className="text-white/70 leading-relaxed text-sm">
        From exploration to export, Hajari Minerals adheres to international standards
        in safety, environmental protection, and product quality. Through partnerships
        with logistics and processing facilities across Sudan—including operations
        linked to <strong>Port Sudan</strong>—we ensure timely and secure delivery of
        mineral products to clients in Asia, the Middle East, and Europe.
      </p>
    ),
  },
];
