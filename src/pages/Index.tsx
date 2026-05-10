import { Hero } from "@/components/Hero";
import { Modalidades } from "@/components/home/Modalidades";
import { CinematicTransition } from "@/components/home/CinematicTransition";
import { EditorialBridge } from "@/components/home/EditorialBridge";
import { Testimonials } from "@/components/Testimonials";

const Index = () => {
  return (
    <div
      className="min-h-screen-safe flex flex-col"
      style={{ background: "linear-gradient(180deg, #0a0908 0%, #131110 50%, #0a0908 100%)" }}
    >
      <main className="flex-1">
        <Hero />

        <EditorialBridge
          eyebrow="Capítulo 01"
          phrase="Cada disciplina revela uma forma única de se eternizar."
        />

        <Modalidades />

        <EditorialBridge
          eyebrow="Capítulo 02"
          phrase="Do gesto ao símbolo — onde a performance vira joia."
          tone="darker"
        />

        <CinematicTransition />

        <EditorialBridge
          eyebrow="Capítulo 03"
          phrase="Histórias esculpidas em ouro, vividas em alta performance."
        />

        <Testimonials />
      </main>
    </div>
  );
};

export default Index;
