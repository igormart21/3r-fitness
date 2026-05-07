import { Hero } from "@/components/Hero";
import { Modalidades } from "@/components/home/Modalidades";
import { CinematicTransition } from "@/components/home/CinematicTransition";
import { Testimonials } from "@/components/Testimonials";

const Index = () => {
  return (
    <div className="min-h-screen-safe flex flex-col" style={{ backgroundColor: "#000" }}>
      <main className="flex-1">
        <Hero />
        <Modalidades />
        <CinematicTransition />
        <Testimonials />
      </main>
    </div>
  );
};

export default Index;
