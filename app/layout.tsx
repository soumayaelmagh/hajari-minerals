import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Hajari Minerals – From the Heart of Africa to the World",
  description:
    "A Sudanese mining and export company built on trust, discipline, and long-term commitment to quality supply.",
    
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bgDark text-white antialiased">
        {children}
      </body>
    </html>
  );
}
