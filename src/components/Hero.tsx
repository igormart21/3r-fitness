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
        className="group absolute left-[8%] md:left-[12%] top-[70%] md:top-[72%] translate-x-[6px] inline-flex items-center gap-2 md:gap-4 px-6 md:px-12 py-3 md:py-5 transition-all duration-500 hover:bg-accent/5"
      >
        <span className="absolute -top-[2px] -left-[2px] h-3 w-3 border-t border-l border-accent transition-all duration-500 group-hover:h-4 group-hover:w-4" />
        <span className="absolute -top-[2px] -right-[2px] h-3 w-3 border-t border-r border-accent transition-all duration-500 group-hover:h-4 group-hover:w-4" />
        <span className="absolute -bottom-[2px] -left-[2px] h-3 w-3 border-b border-l border-accent transition-all duration-500 group-hover:h-4 group-hover:w-4" />
        <span className="absolute -bottom-[2px] -right-[2px] h-3 w-3 border-b border-r border-accent transition-all duration-500 group-hover:h-4 group-hover:w-4" />
        <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
        <span className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
        <span className="font-display text-xs md:text-sm tracking-[0.4em] uppercase text-accent">
          Criar minha joia
        </span>
        <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4 text-accent transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
      </Link>
    </section>
  );
};
