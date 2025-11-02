"use client";

import { motion, Variants } from "framer-motion";
import { Mountain, Pickaxe, Gem, Shield, Sparkles } from "lucide-react";

export default function AboutSection() {
  const container: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.12 },
    },
  };
  const child: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  return (
    <section
      id="about"
      className="relative w-full bg-[#0b0b0b] text-white py-24 px-6 md:px-12 lg:px-24 border-t border-white/10 overflow-hidden"
    >
      {/* subtle gold dust overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('/textures/gold-dust.jpg')] bg-cover bg-center pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="relative z-10 max-w-6xl mx-auto space-y-14"
      >
        {/* Header */}
        <motion.header variants={child} className="text-center space-y-3">
          <h2 className="text-3xl md:text-5xl font-semibold">
            About <span className="text-[#c2a165]">Hajari Minerals</span>
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto">
            Hajari Minerals is a Sudanese-owned mining and export company with over 20 years of experience in mineral exploration, processing, and global trade. We connect Sudan’s rich geological resources to international markets through responsible extraction, disciplined operations, and reliable delivery. Built on technical expertise and long-standing partnerships, we tailor our products to client needs by offering minerals at varying levels of processing while maintaining consistent quality and transparency.
          </p>
        </motion.header>

        {/* Vision */}
        <Block
          variants={child}
          icon={<Mountain size={28} className="text-[#c2a165]" />}
          title="Our Vision"
          lead="To be Africa’s most trusted and responsible supplier of mineral resources to global industries."
        />

        {/* Mission */}
        <Block
          variants={child}
          icon={<Pickaxe size={28} className="text-[#c2a165]" />}
          title="Our Mission"
          lead="To extract and deliver minerals responsibly while creating value for clients, communities, and Sudan’s economy through operational excellence and transparency."
        />

        {/* Cinematic banner */}
        <motion.div
          variants={child}
          className="relative h-56 rounded-2xl overflow-hidden border border-white/10 shadow-lg"
        >
          <img
            src="/banners/mine-banner.jpg"
            alt="Sudanese mining landscape"
            className="object-cover w-full h-full opacity-90"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0b0b0b]/90 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute bottom-6 left-6 md:left-10"
          >
            <p className="text-white/90 text-lg md:text-xl font-medium tracking-wide drop-shadow-lg">
              “Mining with Purpose — From the Heart of Africa”
            </p>
          </motion.div>
        </motion.div>

        {/* Core Values */}
          <motion.div variants={child} className="space-y-6"> 
            <SectionHeading icon={<Gem size={24} className="text-[#c2a165]" />} 
            title="Core Values" subtitle="The pillars that define how we operate and grow sustainably." /> 
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 justify-items-cente"> 
             {PILLARS.map((p, i) => (
                <div
                  key={p.title}
                  className={`w-full max-w-[320px] ${
                    i === 4 ? "col-span-2 justify-self-center sm:col-span-1" : ""
                  }`}
                >
                  <div
                    className="
                      h-full rounded-2xl border border-white/10 bg-[#121212]/80
                      p-5 text-center transition-transform duration-300
                      md:hover:scale-[1.03] md:hover:shadow-[0_0_40px_rgba(194,161,101,0.25)]
                      md:hover:border-[#c2a165]
                    "
                  >
                    <Pillar index={i + 1} title={p.title} body={p.body} />
                  </div>
                </div>
              ))}
               </div>
         </motion.div>

         <motion.div
          variants={child}
          className="relative h-56 rounded-2xl overflow-hidden border border-white/10 shadow-lg"
        >
          <img
            src="/banners/sudan-banner.jpg"
            alt="Sudanese mining landscape"
            className="object-cover w-full h-full opacity-90"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0b0b0b]/90 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute bottom-6 left-6 md:left-10"
          >
            <p className="text-white/90 text-lg md:text-xl font-medium tracking-wide drop-shadow-lg">
              “In Sudan, the rhythm of ancient culture meets the shimmer of gold, a land where history and resources intertwine”
            </p>
          </motion.div>
        </motion.div>
        {/* Commitment */}
        <Block
          variants={child}
          icon={<Shield size={28} className="text-[#c2a165]" />}
          title="Our Commitment"
          lead="From mine to port, Hajari Minerals operates to international standards of safety, environmental protection, and product quality. With logistics and processing capabilities across Sudan including access to Port Sudan, we guarantee secure and timely delivery to clients across Asia, the Middle East, and Europe. Every shipment reflects two decades of expertise, transparency, and commitment to long-term partnership."
         
        />
      </motion.div>
    </section>
  );
}

/* ---------------- subcomponents ---------------- */

function Block({
  variants,
  icon,
  title,
  lead,
  body,
}: {
  variants: Variants;
  icon: React.ReactNode;
  title: string;
  lead: string;
  body?: React.ReactNode;
}) {
  return (
    <motion.section
      variants={variants}
      className="relative rounded-2xl border border-white/10 bg-[#121212]/80 overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#c2a165]/60 to-transparent" />
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10">
            {icon}
          </span>
          <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
        </div>
        <p className="text-white/80 leading-relaxed">{lead}</p>
        {body ? <p className="text-white/70 leading-relaxed mt-4">{body}</p> : null}
      </div>
    </motion.section>
  );
}

function SectionHeading({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-2">
        <span className="inline-flex p-2 rounded-full bg-white/5 border border-white/10">{icon}</span>
        <h3 className="text-2xl font-semibold">{title}</h3>
      </div>
      {subtitle && <p className="text-white/70 mt-2 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}

const PILLARS = [
  { title: "Integrity", body: "Act with fairness and honesty." },
  { title: "Reliability", body:" Ensure consistent quality and dependable supply." },
  { title: "Practicality", body: "Focus on practical, results-driven execution." },
  { title: "Accountability", body:" Take ownership of outcomes and commitments." },
  { title: "Respect", body: "Safeguard people, communities, and the environment." },
];

function Pillar({ index, title, body }: { index: number; title: string; body: string }) {
  return (
    <div className="relative">
      <div className="h-full rounded-xl border border-white/10 bg-[#141414]/80 p-4 flex flex-col items-center text-center">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0f0f0f] border border-white/10 mb-2">
          <Sparkles size={15} className="text-[#c2a165]" />
        </div>
        <h4 className="text-base font-semibold mb-1">{title}</h4>
        <p className="text-white/70 text-xs leading-relaxed">{body}</p>
        <div className="mt-4 w-1/2 h-1 rounded bg-linear-to-r from-[#c2a165]/40 to-transparent" />
      </div>
    </div>
  );
}
