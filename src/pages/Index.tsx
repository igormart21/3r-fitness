import { Hero } from "@/components/Hero";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Hero />
        <section id="depoimentos" className="container py-20 md:py-28 min-h-[400px]">
          {/* Espaço reservado para o slide de depoimentos */}
        </section>
      </main>
    </div>
  );
};

export default Index;
