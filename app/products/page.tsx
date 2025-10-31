// app/products/page.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductsSection from "@/components/ProductsSection";

export default function ProductsPage() {
  return (
    <main className="relative pt-20 md:pt-24">
      <Header />
      <ProductsSection />
      <Footer />
    </main>
  );
}
