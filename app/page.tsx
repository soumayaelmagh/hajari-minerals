import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroClient from "../components/HeroClient";
import AboutSection from "@/components/AboutSection";
import OperationsSection from "@/components/OperationStorySection";
import ProductsSection from "@/components/ProductsSection";
import SustainabilitySection from "@/components/SustainabilitySection";


export default function HomePage() {
  return (
    <main className="relative pt-20 md:pt-24">
      <Header />
      <HeroClient />
      <OperationsSection />
      <ProductsSection />
      <SustainabilitySection />
      <Footer />
    </main>
  );
}

