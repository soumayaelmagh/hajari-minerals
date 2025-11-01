"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Filter, Search } from "lucide-react";
import RequestQuoteModal from "@/components/RequestQuoteModal";

type Product = {
  slug: string;
  name: string;
  category: "Ferrous" | "Alloys" | "Non-metallic";
  image: string;
  summary: string;
  specs?: string[];
  grade?: string;
  minOrderMt?: number;
};

const PRODUCTS: Product[] = [
  {
    slug: "iron-ore-h",
    name: "Iron Ore (Hematite)",
    category: "Ferrous",
    image: "/products/iron-ore-hematite.png",
    summary:
      "High-grade hematite and magnetite ore sourced from Sudanese mines, suitable for steelmaking and sintering.",
    specs: ["Fe 58–64%+", "Size: 0–10 / 10–50 mm", "Moisture ≤ 8%"],
    grade: "Fe 58–64%+",
    minOrderMt: 25,
  },
   {
    slug: "iron-ore-m",
    name: "Iron Ore (Magnetite)",
    category: "Ferrous",
    image: "/products/iron-ore-magnetite.png",
    summary:
      "High-grade hematite and magnetite ore sourced from Sudanese mines, suitable for steelmaking and sintering.",
    specs: ["Fe 58–64%+", "Size: 0–10 / 10–50 mm", "Moisture ≤ 8%"],
    grade: "Fe 58–64%+",
    minOrderMt: 25,
  },
  {
    slug: "chromite",
    name: "Chromite (High Grade)",
    category: "Alloys",
    image: "/products/chromite.png",
    summary:
      "Consistent chromite supply for ferrochrome and refractory applications with stable sizing and low impurities.",
    specs: ["Cr2O3 38–45%+", "SiO2 ≤ 6%", "Size: Lumpy / ROM"],
    grade: "Cr2O3 38–45%+",
    minOrderMt: 25,
  },
  {
    slug: "tungsten-ore-s",
    name: "Tungsten Ore (Scheelite)",
    category: "Alloys",
    image: "/products/tungsten-ore-scheelite.png",
    summary:
      "Wolframite/scheelite concentrates for hard-metal, tooling and alloy production; sampling available.",
    specs: ["WO3 20–50% (concentrate)", "Moisture ≤ 10%"],
    grade: "WO3 20–50%",
    minOrderMt: 25,
  },
   {
    slug: "tungsten-ore-w",
    name: "Tungsten Ore (Wolframite)",
    category: "Alloys",
    image: "/products/tungsten-ore-wolframite.jpg",
    summary:
      "Wolframite/scheelite concentrates for hard-metal, tooling and alloy production; sampling available.",
    specs: ["WO3 20–50% (concentrate)", "Moisture ≤ 10%"],
    grade: "WO3 20–50%",
    minOrderMt: 25,
  },
  {
    slug: "manganese-ore",
    name: "Manganese Ore",
    category: "Alloys",
    image: "/products/manganese-ore.png",
    summary:
      "Mn ore for ferroalloy production with balanced chemistry and standard industrial sizing.",
    specs: ["Mn 32–44%+", "Size: 10–50 mm"],
    grade: "Mn 32–44%+",
    minOrderMt: 25,
  },
  {
    slug: "lead-ore",
    name: "Lead Ore",
    category: "Alloys",
    image: "/products/lead-ore.png",
    summary:
      "Lead ore supplied under verified specs and documentation for smelting and refining.",
    specs: ["Pb 40–60% (varies)", "Moisture ≤ 8%"],
    grade: "Pb 40–60%",
    minOrderMt: 25,
  },
  {
    slug: "mica-m",
    name: "Mica (Muscovite)",
    category: "Non-metallic",
    image: "/products/mica-Muscovite.png",
    summary:
      "Mica flakes and sheets for electrical, cosmetic, and industrial uses; consistent color and flake size.",
    specs: ["Flake size on request", "Low impurity"],
    grade: "Industrial",
    minOrderMt: 25,
  },
   {
    slug: "mica-p",
    name: "Mica (Phlogopite)",
    category: "Non-metallic",
    image: "/products/mica-Phlogopite.png",
    summary:
      "Mica flakes and sheets for electrical, cosmetic, and industrial uses; consistent color and flake size.",
    specs: ["Flake size on request", "Low impurity"],
    grade: "Industrial",
    minOrderMt: 25,
  },
  {
    slug: "talc",
    name: "Talc",
    category: "Non-metallic",
    image: "/products/talc.png",
    summary:
      "White to off-white talc for paint, plastics, paper and ceramics; controlled particle size.",
    specs: ["Whiteness 80–90", "Customized fineness"],
    grade: "Industrial",
    minOrderMt: 25,
  },
  {
    slug: "limestone",
    name: "Calcium Carbonate (Limestone)",
    category: "Non-metallic",
    image: "/products/calcium-carbonate.png",
    summary:
      "Limestone for construction, cement, and industrial processing with steady CaCO₃ profile.",
    specs: ["CaCO₃ ≥ 90%", "Size/fineness per order"],
    grade: "Industrial",
    minOrderMt: 25,
  },
  {
    slug: "kaolin",
    name: "Kaolin",
    category: "Non-metallic",
    image: "/products/koalin.png",
    summary:
      "Kaolin for ceramics, paper coating, and fillers; consistent brightness and rheology.",
    specs: ["Brightness on request", "Custom mesh/fines"],
    grade: "Industrial",
    minOrderMt: 25,
  },
  {
    slug: "feldspar",
    name: "Feldspar",
    category: "Non-metallic",
    image: "/products/Feldspar.png",
    summary:
      "Soda/potash feldspar for glass and ceramics; stable chemistry and controlled mesh.",
    specs: ["Na2O/K2O per grade", "Custom mesh"],
    grade: "Industrial",
    minOrderMt: 25,
  },
  {
    slug: "quartz-q",
    name: "Quartz",
    category: "Non-metallic",
    image: "/products/quartz.png",
    summary:
      "High-purity quartz/silica for glass, foundry, and industrial applications; low contaminant levels.",
    specs: ["SiO2 97–99%+", "Size: Lumpy / Mesh"],
    grade: "SiO2 97–99%+",
    minOrderMt: 25,
  },
  {
    slug: "quartz-s",
    name: "Silica",
    category: "Non-metallic",
    image: "/products/Silica.png",
    summary:
      "High-purity silica for glass, foundry, and industrial applications; low contaminant levels.",
    specs: ["SiO2 97–99%+", "Size: Lumpy / Mesh"],
    grade: "SiO2 97–99%+",
    minOrderMt: 25,
  },
];

/** ---------------------------------------------
 * Component
 * --------------------------------------------- */
export default function ProductsSection() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | "Ferrous" | "Alloys" | "Non-metallic">("All");
  const [quoteProduct, setQuoteProduct] = useState<{slug:string; name:string} | null>(null);
 
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const byCat = category === "All" ? true : p.category === category;
      const byQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        (p.specs || []).some((s) => s.toLowerCase().includes(q));
      return byCat && byQuery;
    });
  }, [query, category]);

  return (
    <section className="relative w-full bg-[#0b0b0b] text-white py-24 px-6 md:px-12 lg:px-24 border-t border-white/10">
      <div className="absolute inset-0 opacity-10 bg-[url('/textures/gold-dust.webp')] bg-cover bg-center pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-semibold">
              Products <span className="text-[#c2a165]">we supply</span>
            </h2>
            <p className="text-white/75 mt-2 max-w-2xl">
              Verified specs, disciplined operations, and shipment via Port Sudan under{" "}
              <strong>FOB</strong> or <strong>CIF</strong> per client request.
            </p>
          </div>

          {/* Search + filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <label className="flex items-center gap-2 bg-[#111] border border-white/10 rounded-lg px-3 py-2">
              <Search size={16} className="text-white/50" />
              <input
                placeholder="Search product, grade, spec…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent outline-none text-sm w-64 placeholder:text-white/40"
              />
            </label>
            <label className="flex items-center gap-2 bg-[#111] border border-white/10 rounded-lg px-3 py-2">
              <Filter size={16} className="text-white/50" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="bg-transparent outline-none text-sm"
              >
                <option>All</option>
                <option>Ferrous</option>
                <option>Alloys</option>
                <option>Non-metallic</option>
              </select>
            </label>
          </div>
        </div>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((p) => (
            <article
              key={p.slug}
              className="group rounded-2xl overflow-hidden bg-[#141414]/90 border border-white/10 hover:border-[#c2a165] transition"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={p.name}
                className="h-48 w-full object-cover"
                loading="lazy"
              />
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <span className="text-xs px-2 py-1 rounded bg-white/10 border border-white/10">
                    {p.category}
                  </span>
                </div>

                <p className="text-white/70 text-sm">{p.summary}</p>

                {/* Specs / tags */}
                {!!p.specs?.length && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {p.specs.slice(0, 3).map((s, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-3 text-xs text-white/60 pt-1">
                  {p.grade && <span>Grade: <b className="text-white/80">{p.grade}</b></span>}
                  {p.minOrderMt && (
                    <span className="ml-auto">
                      MOQ: <b className="text-white/80">{p.minOrderMt} mt</b>
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-3 flex gap-3">
                  <button
                    onClick={() => setQuoteProduct({ slug: p.slug, name: p.name })}
                    className="px-4 py-2 rounded-lg bg-[#c2a165] text-black font-semibold hover:bg-[#a98755] transition"
                  >
                    Request Quote
                  </button>
                  <a
                    href="/contact"
                    className="px-4 py-2 rounded-lg border border-[#c2a165]/60 text-white hover:bg-[#c2a165] hover:text-black transition"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </article>
          ))}
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center text-white/60 mt-16">
            No products matched your search.
          </div>
        )}
      </div>

      {/* Modal */}
     <RequestQuoteModal
      open={!!quoteProduct}
      product={quoteProduct}
      onClose={() => setQuoteProduct(null)}
    />

    </section>
  );
}
