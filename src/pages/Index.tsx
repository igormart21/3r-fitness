import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Hero />
        <ProductGrid />
        <section id="sobre" className="container py-20 md:py-28 max-w-3xl">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Nossa história</span>
          <h2 className="font-display text-4xl md:text-5xl font-medium mt-3 mb-6">
            Menos, melhor.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Acreditamos em peças que envelhecem bem. Trabalhamos com pequenos produtores
            que compartilham nosso compromisso com qualidade, origem e durabilidade.
            Cada item da loja foi escolhido a dedo para fazer parte do seu dia a dia.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
