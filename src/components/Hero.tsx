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

      {/* Conteúdo */}
      <div className="relative z-10 container mx-auto max-w-5xl px-6 min-h-screen flex flex-col items-center justify-end pb-24 text-center">
        <h1
          className="font-light tracking-[0.02em] text-white mb-10"
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
            fontSize: "clamp(2.25rem, 5.5vw, 4.75rem)",
            lineHeight: 1.05,
            textShadow: "0 2px 30px rgba(0,0,0,0.6)",
          }}
        >
          Joias que representam
          <br />
          <span
            style={{
              fontStyle: "italic",
              background:
                "linear-gradient(180deg, #f4d77a 0%, #d4af37 60%, #b8860b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            quem você se tornou
          </span>
        </h1>
        <GoldCTA size="lg" />
      </div>
    </section>
  );
};

export default Hero;
