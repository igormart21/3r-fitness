import { Hero } from "@/components/Hero";
import { Modalidades } from "@/components/home/Modalidades";
import { CinematicTransition } from "@/components/home/CinematicTransition";
import { ColecaoDestaque } from "@/components/ColecaoDestaque";
import { BrandStatement } from "@/components/home/BrandStatement";
import { PersonalizationCTA } from "@/components/home/PersonalizationCTA";
import { Testimonials } from "@/components/Testimonials";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#000" }}>
      <main className="flex-1">
        <Hero />
        <Modalidades />
        <CinematicTransition />
        <ColecaoDestaque limit={4} />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

