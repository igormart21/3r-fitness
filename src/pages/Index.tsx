import { Hero } from "@/components/Hero";
import { Modalidades } from "@/components/home/Modalidades";
import { CinematicTransition } from "@/components/home/CinematicTransition";
import { Testimonials } from "@/components/Testimonials";
import { ShippingAnnouncementBar } from "@/components/ShippingAnnouncementBar";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#000" }}>
      <ShippingAnnouncementBar />
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
