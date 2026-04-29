import heroImage from "@/assets/hero-3r-fitness.png";
import modelImage from "@/assets/model-3r.png";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative w-full">
        <img
          src={heroImage}
          alt="3R Fitness - Cada quilômetro tem uma história"
          className="w-full h-auto block"
          loading="eager"
        />
        <img
          src={modelImage}
          alt="Modelo vestindo camiseta 3R Fitness com colar personalizado"
          className="absolute right-[6%] bottom-0 h-[85%] w-auto object-contain pointer-events-none select-none drop-shadow-2xl"
          loading="eager"
        />
      </div>
    </section>
  );
};
