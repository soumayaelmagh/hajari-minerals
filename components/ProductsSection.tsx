"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Filter, Search } from "lucide-react";
import RequestQuoteModal from "@/components/RequestQuoteModal";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Category = "Ferrous" | "Alloys" | "Non-metallic" | "Non-ferrous";
type CategoryFilter = "All" | Category;

type Product = {
  slug: string;
  name: string;
  category: Category;
  image: string;
  summary: string;
  specs?: string[];
  grade?: string;
  minOrderMt?: number;
};

const PRODUCTS: Product[] = [
  // ... your products exactly as you have them
];

export default function ProductsSection() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [quoteProduct, setQuoteProduct] =
    useState<{ slug: string; name: string } | null>(null);

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
      {/* ... header above search ... */}

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <label className="flex items-center gap-2 bg-[#111] border border-white/10 rounded-lg px-3 py-2">
          <Search size={16} className="text-white/50" />
          <input
            placeholder="Search product, grade, spec…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent outline-none text-sm w-64 placeholder:text-white/40"
          />
        </label>

        {/* Filter – custom select */}
        <Select
          value={category}
          onValueChange={(val) => setCategory(val as CategoryFilter)}
        >
          <SelectTrigger className="flex items-center gap-2 bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-sm w-[150px]">
            <Filter size={16} className="text-white/50" />
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent className="bg-[#111] text-white text-sm border border-white/10">
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Ferrous">Ferrous</SelectItem>
            <SelectItem value="Alloys">Alloys</SelectItem>
            <SelectItem value="Non-metallic">Non-metallic</SelectItem>
            <SelectItem value="Non-ferrous">Non-ferrous</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ... rest of your component (product grid, modal, etc.) ... */}
    </section>
  );
}
