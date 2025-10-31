"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Operations", path: "/operations" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transform transition-all duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-bgDark border-b border-white/10 shadow-md"
          : "bg-bgDark/70 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-base">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`transition font-semibold ${
                isActive(link.path)
                  ? "text-[#c2a165] border-b-2 border-[#c2a165]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-bgDark border-t border-white/10 flex flex-col text-center md:hidden">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setMenuOpen(false)}
                className={`py-3 border-b border-white/5 transition font-semibold ${
                  isActive(link.path)
                    ? "text-[#c2a165] bg-white/5"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
