import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-3r-fitness.png";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      <img
        src={heroImage}
        alt="3R Fitness - Cada quilômetro tem uma história"
        className="w-full h-auto block opacity-60"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            CADA QUILÔMETRO CONTA.
            <br />
            <span style={{ color: "#D4AF37" }}>ALGUNS MERECEM SER ETERNOS.</span>
          </h1>

          <p className="mt-6 text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Transforme suas conquistas na corrida em uma joia única...
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              to="/criar-minha-joia"
              aria-label="Criar meu colar"
              className="inline-flex items-center justify-center px-8 md:px-12 py-4 md:py-5 rounded-none text-black font-semibold tracking-[0.2em] text-sm md:text-base shadow-elegant transition-smooth hover:-translate-y-0.5 hover:scale-105"
              style={{ backgroundColor: "#D4AF37" }}
            >
              CRIAR MEU COLAR
            </Link>
          </div>

          <p className="mt-6 text-xs md:text-sm text-muted-foreground tracking-wide">
            +centena de atletas já eternizaram suas conquistas
          </p>
        </div>
      </div>
    </section>
  );
};
