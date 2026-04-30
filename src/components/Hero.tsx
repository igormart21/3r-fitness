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
      {/* CTA sobreposto logo abaixo da coroa */}
      <Link
        to="/criar-minha-joia"
        aria-label="Criar minha joia"
        className="group absolute left-[8%] md:left-[12%] top-[70%] md:top-[72%] translate-x-[6px] inline-flex items-center gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-4 overflow-hidden transition-all duration-500 hover:-translate-y-0.5"
        style={{
          background:
            "linear-gradient(135deg, #B8860B 0%, #D4AF37 35%, #F4D77A 50%, #D4AF37 65%, #B8860B 100%)",
          backgroundSize: "200% 200%",
          boxShadow:
            "0 10px 40px -10px rgba(212,175,55,0.6), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.3)",
        }}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4 text-black/80 relative z-10" strokeWidth={1.5} />
        <span className="relative z-10 font-display text-xs md:text-sm tracking-[0.35em] uppercase text-black/90">
          Criar minha joia
        </span>
      </Link>
    </section>
  );
};
