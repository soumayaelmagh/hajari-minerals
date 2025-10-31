"use client";

import { motion } from "framer-motion";
import { Leaf, Globe2, ClipboardCheck } from "lucide-react";

export default function SustainabilitySection() {
  const items = [
    {
      title: "Responsible Practices. Local Impact.",
      icon: <Leaf size={36} className="text-[#c2a165]" />,
      description: (
        <>
          <p>
            At <strong>Hajari Minerals</strong>, we operate with deep respect for both the land and
            the people who make our work possible. We prioritise{" "}
            <strong>safe working conditions</strong>, <strong>community inclusion</strong>, and{" "}
            <strong>environmentally responsible</strong> mining practices.
          </p>
          <p className="mt-3">
            Our focus on continuous improvement drives us to enhance efficiency, reduce waste, and
            support <strong>sustainable employment</strong> across our areas of operation.
          </p>
        </>
      ),
    },
    {
      title: "Global Reach",
      icon: <Globe2 size={36} className="text-[#c2a165]" />,
      description: (
        <>
          <p>
            From our base in <strong>Sudan</strong>, Hajari Minerals exports directly to clients
            across <strong>Asia, Europe, and the Middle East</strong>.
          </p>
          <p className="mt-3">
            Our logistics team manages end-to-end cargo movement through{" "}
            <strong>Port Sudan</strong>, coordinating with trusted freight partners to ensure smooth
            and traceable deliveries.
          </p>
          <p className="mt-3">
            We supply under <strong>FOB</strong> and <strong>CIF</strong> terms based on client
            requirements and maintain transparent communication throughout each shipment.
          </p>
        </>
      ),
    },
    {
      title: "Our Approach",
      icon: <ClipboardCheck size={36} className="text-[#c2a165]" />,
      description: (
        <>
          <p>
            We believe in <strong>clarity, accountability, and measurable delivery</strong>.
            Every order is managed through verified documentation, defined specifications, and open
            communication.
          </p>
          <p className="mt-3">
            Whether for long-term partnerships or trial consignments, Hajari Minerals builds{" "}
            <strong>confidence through reliability</strong> — not overpromises.
          </p>
        </>
      ),
    },
  ];

  return (
    <section className="relative w-full bg-[#0b0b0b] text-white py-24 px-6 md:px-12 lg:px-24 border-t border-white/10">
      <div className="absolute inset-0 opacity-10 bg-[url('/textures/gold-dust.png')] bg-cover bg-center pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-5xl font-semibold mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Sustainability <span className="text-[#c2a165]">&amp; Global Reach</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 mt-12">
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="bg-[#141414] border border-[#c2a165]/30 hover:border-[#c2a165]/80 transition-colors duration-500 rounded-2xl p-8 text-left"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-4">
                {item.icon}
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </div>
              <div className="text-white/75 leading-relaxed text-sm md:text-base">
                {item.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
