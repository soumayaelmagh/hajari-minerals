"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useInView,
} from "framer-motion";
import { useRef, useState } from "react";
import { Compass, Pickaxe, FlaskConical, Ship, ArrowUp } from "lucide-react";

/* ---------- Content ---------- */
const slides = [
  {
    title: "Exploration",
    description:
      "Our geologists conduct detailed mapping and analysis to locate high-potential mineral zones across Sudan — building the foundation for sustainable growth.",
    icon: <Compass size={42} className="text-stone mb-4" />,
    image: "/operations/exploration.jpg",
  },
  {
    title: "Extraction",
    description:
      "Through efficient and responsible mining practices, Hajari Minerals ensures every extraction phase prioritizes safety, productivity, and environmental care.",
    icon: <Pickaxe size={42} className="text-stone mb-4" />,
    image: "/operations/extraction.jpg",
  },
  {
    title: "Processing",
    description:
      "We refine and process extracted minerals using strict quality control standards — ensuring that every shipment meets international export specifications.",
    icon: <FlaskConical size={42} className="text-stone mb-4" />,
    image: "/operations/processing.jpg",
  },
  {
    title: "Export & Logistics",
    description:
      "Partnered with logistics hubs at Port Sudan, Hajari Minerals delivers refined minerals to global markets with precision, reliability, and on-time efficiency.",
    icon: <Ship size={42} className="text-stone mb-4" />,
    image: "/operations/export.jpg",
  },
];

/* ---------- Single slide with PARALLAX ---------- */
function SlideScene({
  title,
  description,
  icon,
  image,
  isLast,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Local parallax scroll for background
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={ref}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Parallax background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

      {/* Text content */}
      <motion.div
        className="relative z-10 text-center max-w-3xl px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1, delay: 0.15 }}
      >
        <div className="flex justify-center mb-4">{icon}</div>
        <h2 className="text-4xl md:text-6xl font-semibold mb-6 text-white">
          {title}
        </h2>
        <p className="text-white/80 text-lg leading-relaxed">{description}</p>
      </motion.div>

      {/* Bottom hint */}
      {!isLast && (
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-stone/60 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{ delay: 0.6 }}
        >
          Scroll to continue ↓
        </motion.div>
      )}
    </motion.div>
  );
}

/* ---------- Story container ---------- */
export default function OperationsStorySection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, {
    amount: 0.2,
    margin: "-10% 0px -10% 0px",
    once: false,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(slides.length - 1, Math.max(0, Math.floor(v * slides.length)));
    setActiveIndex(idx);
  });

  return (
    <section ref={sectionRef} className="relative w-full text-white">
      {/* Sidebar progress (desktop) */}
      {inView && (
        <div className="hidden lg:flex flex-col items-center justify-center fixed top-1/2 left-10 -translate-y-1/2 z-20 space-y-6">
          {slides.map((slide, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div
                  className={`absolute top-0 left-0 w-3 h-3 rounded-full bg-linear-to-r from-[#c2a165] to-[#a98755] transition-opacity duration-300 ${
                    activeIndex === i ? "opacity-100" : "opacity-30"
                  }`}
                />
              </div>
              <p
                className={`text-xs tracking-wide uppercase font-medium transition-colors duration-300 ${
                  activeIndex === i ? "text-white" : "text-white/60"
                }`}
              >
                {slide.title}
              </p>
            </div>
          ))}
          <motion.div
            className="absolute left-1/2 top-0 -translate-x-1/2 w-0.5 bg-linear-to-b from-[#c2a165] to-transparent"
            style={{ height: progress }}
          />
        </div>
      )}

      {/* Mobile progress bar */}
      {inView && (
        <div className="lg:hidden fixed top-0 left-0 right-0 h-[3px] bg-white/10 z-20">
          <motion.div
            className="h-[3px] bg-linear-to-r from-[#c2a165] to-[#a98755]"
            style={{ width: progress }}
          />
        </div>
      )}

      {/* Slides */}
      {slides.map((s, i) => (
        <SlideScene
          key={s.title}
          title={s.title}
          description={s.description}
          icon={s.icon}
          image={s.image}
          isLast={i === slides.length - 1}
        />
      ))}

      {/* Back to Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 z-30 p-3 rounded-full bg-[#c2a165] hover:bg-[#a98755] text-black shadow-xl transition-all"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
        transition={{ duration: 0.5 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp size={22} />
      </motion.button>
    </section>
  );
}
