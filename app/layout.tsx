import "./globals.css";
import type { ReactNode } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

export const metadata = {
  title: "Hajari Minerals – From the Heart of Africa to the World",
  description:
    "A Sudanese mining and export company built on trust, discipline, and long-term commitment to quality supply.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full bg-[#0b0b0b]">
      <body className="min-h-dvh md:min-h-screen flex flex-col bg-[#0b0b0b] text-white antialiased">
        {/* <Header /> */}

        {/* Main grows to fill the leftover height so the footer sticks to bottom */}
        <main className="flex-1">{children}</main>

        {/* <Footer className="pb-safe" /> */}
      </body>
    </html>
  );
}
