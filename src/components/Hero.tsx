import { GoldCTA } from "@/components/home/GoldCTA";
import heroImg from "@/assets/hero-atletas.png";

export const Hero = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100vh", backgroundColor: "#000" }}
      aria-label="Hero"
    >
      <img
        src={heroImg}
        alt="Atletas 3R Fitness"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 30%", transform: "scale(1.03)" }}
      />

      {/* Vinheta cinematográfica + fade base para fundir com próxima seção */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.25) 60%, rgba(5,5,5,0.85) 88%, rgba(5,5,5,1) 100%), radial-gradient(ellipse 80% 60% at 50% 45%, rgba(244,215,122,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Texto Hero - posicionamento editorial */}
      <div className="hero-copy">
        <div className="eyebrow">Joias que representam</div>
        <h1 className="headline-gold">Quem você se tornou</h1>
        <div className="luxury-line" />
      </div>

      {/* CTA */}
      <div className="relative z-10 container mx-auto max-w-5xl px-6 min-h-screen flex flex-col items-center justify-end pb-24">
        <GoldCTA size="lg" />
      </div>
    </section>
  );
};

export default Hero;
