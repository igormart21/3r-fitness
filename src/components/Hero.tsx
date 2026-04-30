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
      `}</style>
      {/* CTA sobreposto logo abaixo da coroa */}
      <Link
        to="/criar-minha-joia"
        aria-label="Criar minha joia"
        className="group absolute left-[8%] md:left-[12%] top-[70%] md:top-[72%] translate-x-[6px] inline-flex items-center gap-2 md:gap-3 px-6 md:px-12 py-3 md:py-5 overflow-hidden border border-black transition-all duration-500 hover:-translate-y-0.5"
        style={{
          background:
            "linear-gradient(110deg, #B8860B 0%, #D4AF37 25%, #F4D77A 50%, #D4AF37 75%, #B8860B 100%)",
          backgroundSize: "300% 100%",
          animation: "hero-shimmer 4s linear infinite",
        }}
      >
        <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4 text-black relative z-10" strokeWidth={1.5} />
        <span className="relative z-10 font-display text-xs md:text-sm tracking-[0.4em] uppercase text-black">
          Criar minha joia
        </span>
        <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </Link>
    </section>
  );
};
