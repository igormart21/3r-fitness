import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
        className="group absolute left-[8%] md:left-[12%] top-[70%] md:top-[72%] translate-x-[6px] inline-flex items-center gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-4 bg-black border border-accent/40 hover:border-accent transition-all duration-500 hover:-translate-y-0.5"
        style={{
          boxShadow:
            "0 20px 50px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(212,175,55,0.15)",
        }}
      >
        <span className="absolute top-0 left-0 h-px w-1/3 bg-gradient-to-r from-accent to-transparent" />
        <span className="absolute bottom-0 right-0 h-px w-1/3 bg-gradient-to-l from-accent to-transparent" />
        <span className="font-display text-xs md:text-sm tracking-[0.4em] uppercase text-accent transition-colors">
          Criar minha joia
        </span>
        <span className="h-3.5 md:h-4 w-px bg-accent/40 group-hover:bg-accent transition-colors" />
        <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4 text-accent transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
      </Link>
    </section>
  );
};
