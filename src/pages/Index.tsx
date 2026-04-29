import { Hero } from "@/components/Hero";
import { Testimonials } from "@/components/Testimonials";
import { InstagramFloatingButton } from "@/components/InstagramFloatingButton";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Hero />
        <Testimonials />
      </main>
      <InstagramFloatingButton />
    </div>
  );
};

export default Index;

