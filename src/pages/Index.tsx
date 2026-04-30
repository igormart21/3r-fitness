import { Hero } from "@/components/Hero";
import { Testimonials } from "@/components/Testimonials";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Hero />
        <Testimonials />
      </main>
    </div>
  );
};

export default Index;

