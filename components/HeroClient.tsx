"use client";

import dynamic from "next/dynamic";

// use a RELATIVE path here to avoid alias issues
const HeroSection = dynamic(() => import("./HeroSection"), {
  ssr: false,
  loading: () => (
    <section className="relative w-full h-screen bg-bgDark" />
  ),
});

export default function HeroClient() {
  return <HeroSection />;
}
