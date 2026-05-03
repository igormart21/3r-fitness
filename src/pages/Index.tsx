import { Hero } from "@/components/Hero";
import { Testimonials } from "@/components/Testimonials";
import { ColecaoDestaque } from "@/components/ColecaoDestaque";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        <Hero />
        <ColecaoDestaque
          eyebrow="Ateliê 3R"
          title="Peças já criadas"
          subtitle="Algumas histórias já nasceram prontas"
          ctaLabel="Explorar coleções"
          limit={4}
          cols={4}
        />
        <Testimonials />
      </main>
    </div>
  );
};

export default Index;
