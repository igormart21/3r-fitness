import heroBg from "@/assets/hero-bloco1.png";
import { GoldCTA } from "@/components/home/GoldCTA";

export const Hero = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100vh", backgroundColor: "#000" }}
      aria-label="Joias que representam quem você se tornou"
    >
      {/* Imagem cinematográfica */}
      <img
        src={heroBg}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 30%", transform: "scale(1.04)" }}
      />

      {/* Vinheta + iluminação dourada */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 35%, rgba(244,215,122,0.18) 0%, rgba(212,175,55,0.06) 35%, transparent 70%), linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.55) 70%, rgba(5,5,5,1) 100%)",
        }}
      />

      {/* Conteúdo */}
      <div className="relative z-10 container mx-auto max-w-4xl px-6 min-h-screen flex flex-col items-center justify-center text-center">
        <h1
          className="font-display font-light text-white leading-[1.1] text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.8)" }}
        >
          Joias que representam<br />
          <span
            style={{
              background: "linear-gradient(180deg, #f4d77a 0%, #d4af37 55%, #b8860b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontStyle: "italic",
            }}
          >
            quem você se tornou
          </span>
        </h1>

        <p
          className="mt-8 sm:mt-10 max-w-xl font-light text-base sm:text-lg md:text-xl leading-relaxed text-white/80"
          style={{ letterSpacing: "0.02em" }}
        >
          Disciplina. Constância. Dedicação.
          <br />
          <span className="italic text-white/60">Transformadas em algo que permanece.</span>
        </p>

        <div className="mt-12 sm:mt-14">
          <GoldCTA size="lg" />
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60">
        <div className="h-10 w-px bg-gradient-to-b from-transparent via-[#d4af37] to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
