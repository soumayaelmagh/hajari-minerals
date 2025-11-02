"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Operations", path: "/operations" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (p: string) => pathname === p;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastScrollY && y > 100);
      setLastScrollY(y);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  // Close mobile menu when navigating
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transform transition-all duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
         menuOpen
        ? "bg-black border-b border-white/10"     
        :scrolled
          ? "bg-bgDark border-b border-white/10 shadow-md"
          : "bg-bgDark/70 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Hajari Minerals Logo"
            width={140}
            height={40}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 text-base">
          {links.map((l) => (
            <Link
              key={l.path}
              href={l.path}
              className={`transition font-semibold ${
                isActive(l.path)
                  ? "text-[#c2a165] border-b-2 border-[#c2a165]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {l.name}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden text-white focus:outline-none text-2xl"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile overlay menu */}
     <AnimatePresence>
  {menuOpen && (
    <motion.nav
      id="mobile-menu"
      initial={{ opacity: 0, y:0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: [0.25, 1, 0.3, 1] }}
     className="
        fixed left-0 right-0 bottom-0 
        top-30  
        bg-black md:hidden flex flex-col text-center shadow-xl z-50
      "
    >
      <ul className="divide-y divide-white/10">
        {links.map((l) => (
          <li key={l.path}>
            <Link
              href={l.path}
              onClick={() => setMenuOpen(false)}
              className={`block px-6 py-4 text-lg font-semibold transition
                bg-black hover:bg-[#111] // <- this line ensures each item is black
                ${
                  isActive(l.path)
                    ? "text-[#c2a165]"
                    : "text-white/90 hover:text-[#c2a165]"
                }`}
            >
              {l.name}
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  )}
</AnimatePresence>
    </header>
  );
}
