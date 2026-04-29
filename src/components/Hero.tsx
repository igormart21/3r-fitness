import heroImage from "@/assets/hero-3r-fitness.png";

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
      </div>
    </section>
  );
};
