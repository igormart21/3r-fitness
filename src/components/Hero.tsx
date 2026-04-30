import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-3r-fitness.png";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      <img
        src={heroImage}
        alt="3R Fitness - Cada quilômetro tem uma história"
        className="w-full h-auto block"
        loading="eager"
      />
      <style>{`
        @keyframes hero-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes hero-shine {
          0% { transform: translateX(-150%) skewX(-20deg); }
          60%, 100% { transform: translateX(250%) skewX(-20deg); }
        }
      `}</style>
      {/* CTA sobreposto logo abaixo da coroa */}
      <Link
        to="/criar-minha-joia"
        aria-label="Criar minha joia"
        className="group absolute left-[8%] md:left-[12%] top-[70%] md:top-[72%] translate-x-[6px] inline-flex items-center gap-2 md:gap-3 px-6 md:px-12 py-3 md:py-5 overflow-hidden border border-black transition-all duration-500 hover:-translate-y-0.5"
        style={{
          background:
            "linear-gradient(110deg, rgba(184,134,11,0.55) 0%, rgba(212,175,55,0.55) 25%, rgba(244,215,122,0.55) 50%, rgba(212,175,55,0.55) 75%, rgba(184,134,11,0.55) 100%)",
          backgroundSize: "300% 100%",
          animation: "hero-shimmer 4s linear infinite",
        }}
      >
        {/* Faixa de luz que cruza o botão continuamente */}
        <span
          className="pointer-events-none absolute top-0 left-0 h-full w-1/3"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.85) 50%, transparent 100%)",
            animation: "hero-shine 3.5s ease-in-out infinite",
            mixBlendMode: "screen",
          }}
        />
        <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4 text-black relative z-10" strokeWidth={1.5} />
        <span className="relative z-10 font-display text-xs md:text-sm tracking-[0.4em] uppercase text-black">
          Criar minha joia
        </span>
        <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </Link>
    </section>
  );
};
