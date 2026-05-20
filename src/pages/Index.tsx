import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BrandStory } from "@/components/home/BrandStory";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { Modalidades } from "@/components/home/Modalidades";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Footer } from "@/components/Footer";

const Index = () => (
  <div style={{ background: "#F8F5F0", minHeight: "100svh" }}>
    <AnnouncementBar />
    <Header />
    <main>
      <Hero />
      <BrandStory />
      <ProductShowcase />
      <Modalidades />
      <HowItWorks />
      <Testimonials />
      <FinalCTA />
    </main>
    <Footer />
  </div>
);

export default Index;
